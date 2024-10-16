"use client"; // This is important for using useState

import Link from 'next/link';
import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css'; // Import Remix Icons

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-500 w-screen p-4">
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
          <img src="https://gcdnb.pbrd.co/images/vJFrQP8Fgx9X.png?o=1" alt="Logo" className="h-16" />
          </div>

          {/* Centered Nav Links */}
          <div className="hidden md:flex items-center space-x-10 mx-auto text-lg font-bold">
            <Link href="/" className="text-white hover:text-gray-200">HOME</Link>
            <div className="relative group">
              <button className="text-white hover:text-gray-200">SHOP</button>
              <div className="absolute items-center hidden group-hover:flex w-screen py-10 text-center justify-center  h-auto -left-[440px] animate-slideDown z-20 bg-white text-black mt-0  shadow-xl">
                <a href="#" className="block px-4 py-2"><img src="https://gcdnb.pbrd.co/images/rGq54oVxCeXf.jpg?o=1" alt="" className='hover:scale-105' /><p>SoulFull</p></a>
                <a href="#" className="block px-4 py-2"><img src="https://gcdnb.pbrd.co/images/JF1ds3oEUDcn.jpg?o=1" alt="" className='hover:scale-105' /><p>Supper Millets</p></a>
                <a href="#" className="block px-4 py-2"><img src="https://gcdnb.pbrd.co/images/OvPFuBiWMqoS.jpg?o=1" alt="" className='hover:scale-105' /><p>Millets Health Mix</p></a>
                <a href="#" className="block px-4 py-2"><img src="https://gcdnb.pbrd.co/images/WSe7gVhHkgDh.jpg?o=1" alt="" className='hover:scale-105' /><p>Powder</p></a>
               <Link href="/Shop"><button className='bg-rose-700 text-white h-10 px-5 transition-colors border-2 duration-300 hover:bg-white hover:border-2 hover:border-gray-700 hover:text-black'>More Product <i class="ri-arrow-right-line"></i></button></Link>
              </div>
            </div>
           <Link href="/About_us"> <p  className="text-white hover:text-gray-200">ABOUT US</p></Link>
           <Link href="/Track_order"><p className="text-white hover:text-gray-200">TRACK ORDER</p></Link>
          <Link href="/contact"><p className="text-white hover:text-gray-200">CONTACT US</p></Link>
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
          <img src="https://gcdnb.pbrd.co/images/vJFrQP8Fgx9X.png?o=1" alt="Logo" className="h-14 mb-2 rounded-sm" />
          <a href="#" className="text-white py-2">Home</a>
          <div className="relative group">
            <button className="text-white py-2">Shop</button>
            <div className="absolute  hidden group-hover:block bg-white text-black mt-1 rounded shadow-lg">
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
