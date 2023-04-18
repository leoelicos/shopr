import React from 'react'
import Auth from '../../utils/auth'
import { Link } from 'react-router-dom'
import logo from './shopr.png'
function Nav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <ul className='flex-row'>
          <li className='mx-1'>
            <Link to='/orderHistory'>Order History</Link>
          </li>
          <li className='mx-1'>
            {/* this is not using the Link component to logout or user and then refresh the application to the start */}
            <a
              href='/'
              onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className='flex-row'>
          <li className='mx-1'>
            <Link to='/signup'>Signup</Link>
          </li>
          <li className='mx-1'>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      )
    }
  }

  return (
    <header
      className='flex-row px-1'
      style={{ display: 'flex', alignItems: 'center' }}>
      <h1>
        <Link
          to='/'
          style={{ display: 'flex', alignItems: 'center' }}>
          <span
            role='img'
            aria-label='shopping bag'
            style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt='logo'
              style={{ height: '55px', marginRight: '4px' }}
            />
          </span>
          <span style={{ color: '#FF9500', display: 'flex', alignItems: 'center' }}>shopr</span>
        </Link>
      </h1>

      <nav>{showNavigation()}</nav>
    </header>
  )
}

export default Nav
