"use client";

import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';

function Order() {
    const [searchType, setSearchType] = useState('orderId');
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setInputValue('');
        setError('');
    };

    const handleSubmit = () => {
        setError('');
        if (!inputValue.trim()) {
            setError(`Please enter a valid ${searchType === 'orderId' ? 'Order ID' : 'AWB'}`);
            return;
        }
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            console.log(`Searching for ${inputValue} with type: ${searchType}`);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-afacadFlux">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg">
                {/* Header */}
                <div className="bg-green-500 text-white p-6 rounded-t-xl">
                    <div className="flex items-center">
                        <i className="ri-truck-line text-3xl mr-3"></i>
                        <div>
                            <h2 className="text-2xl font-bold">Track Your Order</h2>
                            <p className="text-sm mt-1 text-green-50">
                                Enter your order details below
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Content */}
                <div className="p-6">
                    <div className="mb-6">
                        <label className="block mb-3 font-semibold text-gray-700">
                            Search by:
                        </label>
                        <div className="flex space-x-6">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    value="orderId"
                                    checked={searchType === 'orderId'}
                                    onChange={handleSearchTypeChange}
                                    className="form-radio h-4 w-4 text-green-500 focus:ring-green-500"
                                />
                                <span className="ml-2 text-gray-700">Order ID</span>
                            </label>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    value="awb"
                                    checked={searchType === 'awb'}
                                    onChange={handleSearchTypeChange}
                                    className="form-radio h-4 w-4 text-green-500 focus:ring-green-500"
                                />
                                <span className="ml-2 text-gray-700">AWB</span>
                            </label>
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={`Enter ${searchType === 'orderId' ? 'Order ID' : 'AWB'} number`}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                            />
                            <i className="ri-search-line absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                        </div>
                        {error && (
                            <p className="mt-2 text-sm text-red-600">
                                <i className="ri-error-warning-line mr-1"></i>
                                {error}
                            </p>
                        )}
                    </div>

                    <button
                        className={`w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors
                            ${isLoading ? 'opacity-75 cursor-not-allowed' : ''} 
                            flex items-center justify-center`}
                        onClick={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Tracking...
                            </>
                        ) : (
                            <>
                                <i className="ri-truck-line mr-2"></i>
                                Track Order
                            </>
                        )}
                    </button>

                    <div className="mt-6 border-t border-gray-200 pt-4">
                        <div className="flex items-center text-sm text-gray-500">
                            <i className="ri-information-line mr-2"></i>
                            <p>Track the current status and location of your delivery</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info Cards */}
            <div className="max-w-md mx-auto mt-6 grid grid-cols-1 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center text-green-500 mb-2">
                        <i className="ri-customer-service-2-line mr-2"></i>
                        <h3 className="font-semibold">Need Help?</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Contact our support team at support@purikam.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Order;