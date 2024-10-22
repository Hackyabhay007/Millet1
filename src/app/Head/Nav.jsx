"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { auth } from '@/app/firebase'; // Adjust the path according to your firebase config
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import 'remixicon/fonts/remixicon.css';

const Nav = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileDropdownRef = useRef(null);

  // Handle authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsProfileOpen(false);
      router.push('/shop');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-green-500 font-afacadFlux max-w-screen p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? (
              <i className="ri-close-line"></i>
            ) : (
              <i className="ri-menu-line"></i>
            )}
          </button>
        </div>

        {/* Logo and Nav Links */}
        <div className="flex-1 flex justify-between items-center">
          <Link href="/">
            <div className="hidden md:flex items-center">
              <img
                src="https://i.ibb.co/VSfMLj9/purikam-logo.png"
                alt="Logo"
                className="h-20"
              />
            </div>
          </Link>

          {/* Centered Nav Links */}
          <div className="hidden md:flex items-center space-x-10 mx-auto text-lg font-bold">
            <Link href="/" className="text-white hover:text-gray-200">HOME</Link>
            <Link href="/Shop"><p className="text-white hover:text-gray-200">SHOP</p></Link>
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
          <button
            className="text-white hover:scale-150 transition-transform duration-300"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <i className="ri-search-line"></i>
          </button>
          
          {/* Profile Section with Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-white hover:scale-150 transition-transform duration-300"
            >
              <i className="ri-user-line"></i>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                {!loading && (
                  <div className="py-1">
                    {user ? (
                      <>
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          {user.email}
                        </div>
                        <Link href="/order-history">
                          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i className="ri-history-line mr-2"></i>Order History
                          </p>
                        </Link>
                        <Link href="/profile">
                          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i className="ri-user-settings-line mr-2"></i>Profile Settings
                          </p>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                        >
                          <i className="ri-logout-box-line mr-2"></i>Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link href="/login">
                          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i className="ri-login-box-line mr-2"></i>Login
                          </p>
                        </Link>
                        <Link href="/login">
                          <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <i className="ri-user-add-line mr-2"></i>Register
                          </p>
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link href="/Cart" className="text-white hover:scale-150 transition-transform duration-300">
            <i className="ri-shopping-cart-2-line"></i>
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
            onClick={() => setIsSearchOpen(false)}
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
          <Link href="/Shop">
            <p className="text-white py-2">Shop</p>
          </Link>
          <Link href="/About_us" className="text-white py-2">
            About Us
          </Link>
          <Link href="/Track_order" className="text-white py-2">
            Track Order
          </Link>
          <Link href="/contact" className="text-white py-2">
            Contact Us
          </Link>
          {user && (
            <button
              onClick={handleLogout}
              className="text-white py-2 hover:text-gray-200"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;