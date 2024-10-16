"use client"; // This is important for using useState

import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css'; // Import Remix Icons

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-500  p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? (
              <i className="ri-close-line"></i> // Cross Icon to close the menu
            ) : (
              <i className="ri-menu-line"></i> // Menu Icon to open the menu
            )}
          </button>
        </div>

        {/* Logo and Nav Links */}
        <div className="flex-1 flex justify-between items-center">
          <div className="hidden md:flex items-center">
            <img src="https://www.rosierfoods.com/cdn/shop/files/logo_1_1_bb8fb2d6-681f-4ca4-aad5-5dbc7e581ce4.png?v=1710946898&width=90" alt="Logo" className="h-20" />
          </div>

          {/* Centered Nav Links */}
          <div className="hidden md:flex items-center space-x-10 mx-auto text-xl font-bold">
            <a href="#" className="text-white">HOME</a>
            <div className="relative group">
              <button className="text-white">SHOP</button>
              <div className="absolute hidden group-hover:block bg-white text-black mt-1 rounded shadow-lg">
                <a href="#" className="block px-4 py-2">Product 1</a>
                <a href="#" className="block px-4 py-2">Product 2</a>
                <a href="#" className="block px-4 py-2">Product 3</a>
              </div>
            </div>
            <a href="#" className="text-white">ABOUT US</a>
            <a href="#" className="text-white">TRACK ORDER</a>
            <a href="#" className="text-white">CONTACT US</a>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex space-x-10 font-thin text-2xl">
          <a href="#" className="text-white">
            <i className="ri-search-line"></i> {/* Search Icon */}
          </a>
          <a href="#" className="text-white">
            <i className="ri-user-line"></i> {/* Profile Icon */}
          </a>
          <a href="#" className="text-white">
            <i className="ri-shopping-cart-line"></i> {/* Cart Icon */}
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-16 right-0 z-50 bg-green-500 h-1/2 w-screen transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col items-center h-full text-xl font-semibold justify-center">
          <img src="https://www.rosierfoods.com/cdn/shop/files/logo_1_1_bb8fb2d6-681f-4ca4-aad5-5dbc7e581ce4.png?v=1710946898&width=90" alt="Logo" className="h-14 mb-2" />
          <a href="#" className="text-white py-2">Home</a>
          <div className="relative group">
            <button className="text-white py-2">Shop</button>
            <div className="absolute hidden group-hover:block bg-white text-black mt-1 rounded shadow-lg">
              <a href="#" className="block px-4 py-2">Product 1</a>
              <a href="#" className="block px-4 py-2">Product 2</a>
              <a href="#" className="block px-4 py-2">Product 3</a>
            </div>
          </div>
          <a href="#" className="text-white py-2">About Us</a>
          <a href="#" className="text-white py-2">Track Order</a>
          <a href="#" className="text-white py-2">Contact Us</a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
