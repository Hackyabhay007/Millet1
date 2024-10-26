"use client";

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '@/app/firebase';
import { signOut } from 'firebase/auth';
import { collection, query, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import 'remixicon/fonts/remixicon.css';
import { motion, AnimatePresence } from 'framer-motion';

// SearchResults Component
const SearchResults = ({ searchQuery, isOpen, onClose }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const searchTerms = searchQuery.toLowerCase().split(' ');
        const productsRef = collection(db, 'products');
        const productsSnapshot = await getDocs(productsRef);
        
        const matchedProducts = productsSnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(product => {
            const productName = product.name?.toLowerCase() || '';
            const productDescription = product.description?.toLowerCase() || '';
            const productCategory = product.category?.toLowerCase() || '';
            
            return searchTerms.some(term => 
              productName.includes(term) || 
              productDescription.includes(term) || 
              productCategory.includes(term)
            );
          });

        setResults(matchedProducts);
      } catch (error) {
        console.error('Error searching products:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimeout = setTimeout(searchProducts, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="fixed top-16 left-0 w-full bg-white shadow-lg z-50 p-4"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-700">
            {loading ? 'Searching...' : `Search Results (${results.length})`}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {results.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {results.map((product) => (
                  <Link 
                    href={`/Shop/${product.id}`} 
                    key={product.id}
                    onClick={onClose}
                  >
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer border hover:border-green-500 transition-all"
                    >
                      <div className="aspect-w-1 aspect-h-1">
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-1 truncate">
                          {product.name}
                        </h4>
                        <p className="text-green-600 font-bold">
                          ₹{product.price}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            ) : (
              searchQuery.trim() && (
                <div className="text-center py-8 text-gray-500">
                  No products found for &quot;{searchQuery}&quot;
                </div>
              )
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main Nav Component
const Nav = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const profileDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsProfileOpen(false);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
    setSearchQuery('');
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <nav className="bg-green-500 font-afacadFlux p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? (
              <i className="ri-close-line"></i>
            ) : (
              <i className="ri-menu-line"></i>
            )}
          </button>
        </div>

        <div className="flex-1 flex justify-between items-center">
          <Link href="/">
            <img
              src="https://i.ibb.co/VSfMLj9/purikam-logo.png"
              alt="Logo"
              className="h-24 hidden md:block"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-10 mx-auto text-lg font-bold">
            <Link href="/" className="text-white hover:text-gray-200 transition duration-300">HOME</Link>
            <Link href="/Shop" className="text-white hover:text-gray-200 transition duration-300">SHOP</Link>
            <Link href="/About_us" className="text-white hover:text-gray-200 transition duration-300">ABOUT US</Link>
            <Link href="/Track_order" className="text-white hover:text-gray-200 transition duration-300">TRACK ORDER</Link>
            <Link href="/contact" className="text-white hover:text-gray-200 transition duration-300">CONTACT US</Link>
          </div>
        </div>

        <div className="flex space-x-10 font-thin text-2xl">
          <button
            className="text-white hover:scale-150 transition-transform duration-300"
            onClick={handleSearchOpen}
          >
            <i className="ri-search-line"></i>
          </button>
          
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="text-white hover:scale-150 transition-transform duration-300"
            >
              <i className="ri-user-line"></i>
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50"
                >
                  {!loading && (
                    <div className="py-1">
                      {user ? (
                        <>
                          <div className="px-4 py-2 text-sm text-gray-700 border-b">
                            {user.email}
                          </div>
                          <Link href="/History">
                            <p className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              <i className="ri-history-line mr-2"></i>Order History
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/Cart" className="text-white hover:scale-150 transition-transform duration-300">
            <i className="ri-shopping-cart-2-line"></i>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 w-full bg-white z-40 p-4 shadow-lg"
          >
            <form onSubmit={handleSearchSubmit} className="flex items-center justify-center space-x-2">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-3/4 p-2 border rounded-lg focus:outline-none focus:border-green-500"
              />
              <button
                type="button"
                onClick={handleSearchClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="ri-close-line text-3xl"></i>
              </button>
            </form>

            <SearchResults 
              searchQuery={searchQuery}
              isOpen={isSearchOpen && searchQuery.trim().length > 0}
              onClose={handleSearchClose}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="md:hidden fixed top-16 right-0 z-50 bg-green-500 h-1/2 w-screen"
          >
            <div className="flex flex-col items-center h-full text-xl font-semibold justify-center">
              <img
                src="https://i.ibb.co/VSfMLj9/purikam-logo.png"
                alt="Logo"
                className="h-14 mb-2 rounded-sm"
              />
              <Link href="/" className="text-white py-2 hover:text-gray-200">Home</Link>
              <Link href="/Shop" className="text-white py-2 hover:text-gray-200">Shop</Link>
              <Link href="/About_us" className="text-white py-2 hover:text-gray-200">About Us</Link>
              <Link href="/Track_order" className="text-white py-2 hover:text-gray-200">Track Order</Link>
              <Link href="/contact" className="text-white py-2 hover:text-gray-200">Contact Us</Link>
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-white py-2 hover:text-gray-200"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;