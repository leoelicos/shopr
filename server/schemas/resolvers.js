const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const authThrow = (text) => {
  throw new AuthenticationError(text);
};

const resolvers = {
  Query: {
    /**
     * get all categories
     * @return {[Category]} A list of categories.
     */

    categories: async () => await Category.find(),

    /**
     * get all products
     * @param {ID} category - The ID of the category to search.
     * @param {String} name - The name of the product to search.
     * @return {[Product]} A list of products.
     */

    products: async (_, { category, name }) => {
      const params = {};

      if (category) params.category = category;

      if (name) params.name = { $regex: name, $options: 'i' };

      // find all products with these params and populate categories
      const products = await Product.find(params).populate('category');
      return products;
    },

    /**
     * get one product
     * @param {ID!} _id - The ID of the product.
     * @return {Product} The product object.
     */
    product: async (_, { _id }) =>
      // find one product with this ID and populate its category
      await Product.findById(_id).populate('category'),

    /**
     * get user from context
     * @return {User} The user object.
     */

    user: async (_, __, context) => {
      if (!context.user) authThrow('Not logged in!');

      // find one user with this ID and populate category for each ordered product
      const user = await User.findById(context.user._id).populate({ path: 'orders.products', populate: 'category' });

      // sort the user's orders by purchase date
      user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

      return user;
    },

    /**
     * get one order
     * @param {ID} _id
     * @return {Order}
     */

    order: async (_, { _id }, context) => {
      if (!context.user) authThrow('Not logged in!');

      // find one user with this ID and populate category for each ordered product
      const user = await User.findById(context.user._id).populate({ path: 'orders.products', populate: 'category' });

      return user.orders.id(_id);
    },

    /**
     * checkout in Stripe
     * @param {[ID]!} products
     * @return {Checkout}
     */

    checkout: async (_, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ products: args.products });

      // array to store product metadata in Stripe
      const line_items = [];

      const { products } = await order.populate('products');

      for (let i = 0; i < products.length; i++) {
        const product = await stripe.products.create({
          name: products[i].name,
          description: products[i].description,
          images: [`${url}/images/${products[i].image}`]
        });

        const price = await stripe.prices.create({
          product: product.id,
          unit_amount: products[i].price * 100,
          currency: 'usd'
        });

        line_items.push({ price: price.id, quantity: 1 });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`
      });

      return { session: session.id };
    }
  },

  Mutation: {
    /**
     * add a new user
     * @param {UserInput!} input
     * @return {Auth}
     */

    addUser: async (_, { input }) => {
      const user = await User.create({ ...input });
      const token = signToken(user);

      return { token, user };
    },

    /**
     * add a new order to a user's order history
     * @param {[ID]!} products - List of product IDs
     * @returns {Order} The new order.
     */

    addOrder: async (_, { products }, context) => {
      if (!context.user) authThrow('Not logged in!');

      const order = new Order({ products });

      await User.findByIdAndUpdate(
        // find user with id and push the order to its order history
        context.user._id,
        { $push: { orders: order } }
      );

      return order;
    },

    /**
     * update a user
     * @param {UserInput!} input
     * @returns {User}
     */

    updateUser: async (_, { input }, context) => {
      if (!context.user) handleNotLoggedIn();
      return await User.findByIdAndUpdate(
        // find user matching id, update user, return updated user
        context.user._id,
        { ...input },
        { new: true }
      );
    },

    /**
     * update a product
     * @param {ID!} _id - The ID of the product.
     * @param {Int!} quantity - The quantity of the product.
     * @returns {Product}
     */

    updateProduct: async (_, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        // find product matching _id, decrement quantity property, return updated product
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    /**
     * login a user
     * @param {String!} email - The user's email.
     * @param {String!} password - The user's password.
     * @returns {Auth} An object with token and user.
     */

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) authThrow('Incorrect credentials!');

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) authThrow('Incorrect credentials!');

      const token = signToken(user);
      return { token, user };
    }
  }
};

module.exports = resolvers;
