# Snapfire Shop

![react](https://img.shields.io/badge/17.0.1-0?label=react.js&style=for-the-badge&labelColor=white&color=black) ![apollo client](https://img.shields.io/badge/3.5.8-0?label=@apollo/client&style=for-the-badge&labelColor=white&color=black) ![apollo server express](https://img.shields.io/badge/3.10.0-0?label=@apollo%20server%20express&style=for-the-badge&labelColor=white&color=black) ![graphql](https://img.shields.io/badge/15.4.0-0?label=graphql&style=for-the-badge&labelColor=white&color=black)

## Introduction

This seven-page web app was an exercise in the appreciation of Redux, usually used with large web applications using complex state, requiring a refactor from an app using React Context API into Redux. It features a Store with React and Redux and Apollo client front-end and Apollo Server and Graph QL backend. The app allows users to login and save items to their shopping list without refreshing the page. They can also filter items by category by clicking on filters. They can also pay with Stripe using a credit card.

On the front end, this Node application uses npm packages `@apollo/client`, `react`, , `redux` and `react-redux`.

On the back end, this application uses npm packages `apollo-server-express`, `graphql`, `jsonwebtoken` and `mongoose`.

I made this app in order to learn how to implement Redux on the back end.

## Usage

- The app is deployed at https://leoelicos-one-stop-shop.herokuapp.com/
- The repo is at https://github.com/leoelicos/one-stop-shop

## Development and Testing

### Download Node: https://nodejs.org/en/download/

```sh
git clone https://github.com/leoelicos/one-stop-shop.git
cd one-stop-shop
npm install
npm run develop
```

## Video Demo

https://user-images.githubusercontent.com/99461390/180640699-7b9b8f17-8962-4099-aecc-b7f5554c8442.mp4

Video is also available on [YouTube](https://www.youtube.com/watch?v=uBL-Q8F1VVY)

## Screenshots

### Home

![home](https://user-images.githubusercontent.com/99461390/180640816-fede5803-4a99-4ae8-8764-75a21b5425c4.jpg)

### Detail

![detail](https://user-images.githubusercontent.com/99461390/180640818-1289eafd-d15f-4393-8234-98dd91e5b573.jpg)

### Checkout

![checkout](https://user-images.githubusercontent.com/99461390/180640820-6e6bb88f-5237-43cc-ae89-925624ccbd65.jpg)

### Success

![success](https://user-images.githubusercontent.com/99461390/180640821-c31ec290-027b-4750-a5fd-7faab8bdb08c.jpg)

## Credits

- BCS Resources

## License

&copy; Leo Wong <leoelicos@gmail.com>

Licensed under the [MIT License](./LICENSE).
