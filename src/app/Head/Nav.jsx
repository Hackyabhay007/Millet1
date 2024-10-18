"use client"; // This is important for using useState

import Link from 'next/link';
import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css'; // Import Remix Icons

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // For mobile menu
  const [isSearchOpen, setIsSearchOpen] = useState(false); // For search bar
  const [searchQuery, setSearchQuery] = useState(''); // For storing the search query

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect or handle the search query here
      console.log("Searching for:", searchQuery);
      // For example, you can redirect to the search results page with the query
      // window.location.href = `/search?query=${searchQuery}`;
    }
  };

  return (
    <nav className="bg-green-500 font-afacadFlux max-w-screen p-4">
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
          <Link href="/">
            <div className="hidden md:flex items-center">
              <img
                src="https://gcdnb.pbrd.co/images/vJFrQP8Fgx9X.png?o=1"
                alt="Logo"
                className="h-16"
              />
            </div>
          </Link>

          {/* Centered Nav Links */}
          <div className="hidden md:flex items-center space-x-10 mx-auto text-lg font-bold">
            <Link href="/" className="text-white hover:text-gray-200">HOME</Link>
            <div className="relative group">
              <button className="text-white hover:text-gray-200">SHOP</button>
              <div className="absolute items-center hidden group-hover:flex w-screen py-10 text-center justify-center h-auto -left-[480px] animate-slideDown z-20 bg-white text-black mt-0 shadow-xl">
                <a href="#" className="block px-4 py-2">
                  <img
                    src="https://gcdnb.pbrd.co/images/rGq54oVxCeXf.jpg?o=1"
                    alt=""
                    className="hover:scale-105"
                  />
                  <p>SoulFull</p>
                </a>
                <a href="#" className="block px-4 py-2">
                  <img
                    src="https://gcdnb.pbrd.co/images/JF1ds3oEUDcn.jpg?o=1"
                    alt=""
                    className="hover:scale-105"
                  />
                  <p>Supper Millets</p>
                </a>
                <a href="#" className="block px-4 py-2">
                  <img
                    src="https://gcdnb.pbrd.co/images/OvPFuBiWMqoS.jpg?o=1"
                    alt=""
                    className="hover:scale-105"
                  />
                  <p>Millets Health Mix</p>
                </a>
                <a href="#" className="block px-4 py-2">
                  <img
                    src="https://gcdnb.pbrd.co/images/WSe7gVhHkgDh.jpg?o=1"
                    alt=""
                    className="hover:scale-105"
                  />
                  <p>Powder</p>
                </a>
                <Link href="/Shop">
                  <button className="bg-rose-700 text-white h-10 px-5 transition-colors border-2 duration-300 hover:bg-white hover:border-2 hover:border-gray-700 hover:text-black">
                    More Product <i className="ri-arrow-right-line"></i>
                  </button>
                </Link>
              </div>
            </div>
            <Link href="/About_us">
              <p className="text-white hover:text-gray-200">ABOUT US</p>
            </Link>
            <Link href="/Track_order">
              <p className="text-white hover:text-gray-200">TRACK ORDER</p>
            </Link>
            <Link href="/contact">
              <p className="text-white hover:text-gray-200">CONTACT US</p>
            </Link>
          </div>
        </div>

        {/* Right Icons */}
        <div className="flex space-x-10 font-thin text-2xl">
          <a
            href="#"
            className="text-white hover:scale-150 transition-transform duration-300"
            onClick={() => setIsSearchOpen(!isSearchOpen)} // Toggle search bar visibility
          >
            <i className="ri-search-line"></i> {/* Search Icon */}
          </a>
          <Link href="/User" className="text-white hover:scale-150 transition-transform duration-300">
            <i className="ri-user-line"></i> {/* Profile Icon */}
          </Link>
          <Link href="/Cart" className="text-white hover:scale-150 transition-transform duration-300">
            <i className="ri-shopping-cart-2-line"></i> {/* Cart Icon */}
          </Link>
        </div>
      </div>

      {/* Search Bar */}
      <div
        className={`${
          isSearchOpen ? "block" : "hidden"
        } fixed top-0 left-0 z-40 bg-white w-full p-4 transition-transform duration-300 ease-in-out`}
      >
        <form onSubmit={handleSearchSubmit} className="flex items-center justify-center space-x-2">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded w-3/4"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Search
          </button>
          <button
            type="button"
            onClick={() => setIsSearchOpen(false)} // Close search bar
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            <i className="ri-close-line text-3xl"></i>
          </button>
        </form>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-16 right-0 z-50 bg-green-500 h-1/2 w-screen transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center h-full text-xl font-semibold justify-center">
          <img
            src="https://gcdnb.pbrd.co/images/vJFrQP8Fgx9X.png?o=1"
            alt="Logo"
            className="h-14 mb-2 rounded-sm"
          />
          <Link href="/" className="text-white py-2">
            Home
          </Link>
          <div className="relative group">
            <Link href="/Shop">
              <button className="text-white py-2">Shop</button>
            </Link>
          </div>
          <Link href="/About_us" className="text-white py-2">
            About Us
          </Link>
          <a href="/Track_order" className="text-white py-2">
            Track Order
          </a>
          <a href="/contact" className="text-white py-2">
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
