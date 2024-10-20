// src/app/Admin/Sidebar/Sidebar.jsx

import React, { useState } from 'react';
import Link from 'next/link';
import 'remixicon/fonts/remixicon.css'; // Import Remix Icons

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility

    const toggleSidebar = () => {
        setIsOpen(!isOpen); // Toggle the sidebar visibility
    };

    return (
        <div className="flex font-afacadFlux">
            {/* Hamburger Menu Button for Mobile */}
            <button 
                onClick={toggleSidebar} 
                className="md:hidden p-2 text-white bg-slate-700 rounded focus:outline-none absolute top-4 left-4 z-20"
            >
                <i className="ri-menu-3-line"></i> {/* Hamburger icon */}
            </button>

            {/* Sidebar */}
            <nav className={`bg-gray-800 text-white w-64 h-full p-5 shadow-md fixed top-0 left-0 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative md:block md:h-auto`}>
                <button 
                    onClick={toggleSidebar} 
                    className="md:hidden text-right mb-4" 
                >
                    <i className="ri-close-line text-white"></i> {/* Close icon */}
                </button>
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <ul className="space-y-4">
                    <li>
                        <Link href="/Admin/dashboard" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsOpen(false)}>
                            <i className="ri-dashboard-3-line mr-2"></i>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link href="/Admin/product" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsOpen(false)}>
                            <i className="ri-product-hunt-line mr-2"></i>
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link href="/Admin/orders" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsOpen(false)}>
                            <i className="ri-box-1-line mr-2"></i>
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link href="/Admin/categories" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsOpen(false)}>
                            <i className="ri-command-line mr-2"></i>
                            Categories
                        </Link>
                    </li>
                    <li>
                        <Link href="/Admin/tag" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsOpen(false)}>
                            <i className="ri-bookmark-line mr-2"></i>
                            Tag
                        </Link>
                    </li>
                    <li>
                        <Link href="/Admin/hero" className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200" onClick={() => setIsOpen(false)}>
                            <i className="ri-gallery-upload-line mr-2"></i>
                            Hero Section
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-10 bg-black opacity-50 md:hidden" 
                    onClick={toggleSidebar} // Clicking the overlay will close the sidebar
                ></div>
            )}
        </div>
    );
};

export default Sidebar;
