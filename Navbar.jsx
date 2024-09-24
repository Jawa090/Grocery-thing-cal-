import React from 'react';
import './Navbar.css';

export const Navbar = () => {
  return (
    <header className='header'>
      <a href="/" className="logo" ></a>
      <nav className='navbar'>
        <a href='/'>Home</a>
        <a href='/'>About</a>
        <a href='/'>Services</a>
        <a href='/'>Contact</a>
        <a href='/'>Sell/Price</a>
      </nav>
    </header>
  );
};


export default Navbar;
