"use client";

import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';
import { toast, Toaster } from 'react-hot-toast';

function Order() {
    const [searchType, setSearchType] = useState('orderId');
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [trackingDetails, setTrackingDetails] = useState(null);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setInputValue('');
        setError('');
        setTrackingDetails(null);
    };

    const handleSubmit = async () => {
        setError('');
        setTrackingDetails(null);

        if (!inputValue.trim()) {
            setError(`Please enter a valid ${searchType === 'orderId' ? 'Order ID' : 'AWB'}`);
            return;
        }

        setIsLoading(true);
        try {
            const endpoint = searchType === 'orderId' 
                ? `/api/orders/track/${inputValue.trim()}`
                : `/api/shipping/track-awb/${inputValue.trim()}`;

            const response = await fetch(endpoint);
            const data = await response.json();
            console.log(data);
            
            if (data.status === 'error') {
                throw new Error(data.message || 'Failed to fetch tracking details');
            }

            setTrackingDetails(data.tracking_info);
            toast.success('Tracking details fetched successfully');
        } catch (error) {
            console.error('Tracking error:', error);
            setError(error.message || 'Failed to track shipment');
            toast.error('Failed to fetch tracking details');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            return dateString;
        }
    };

    const renderTrackingDetails = () => {

        if (!trackingDetails?.tracking_data) {
            return (
                <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <div className="text-center">
                        <i className="ri-time-line text-4xl text-gray-400 mb-2"></i>
                        <h3 className="text-lg font-semibold mb-2">Order Processing</h3>
                        <p className="text-gray-600">
                            Your order is being processed. Tracking details will be available soon.
                        </p>
                    </div>
                </div>
            );
        }

   
        const trackingData = trackingDetails.tracking_data;
        const shipment = trackingData.shipment_track?.[0];

        return (
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                {/* Header with Refresh Button */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold">Tracking Details</h3>
                    <button 
                        onClick={handleSubmit}
                        className="text-green-500 hover:text-green-600 flex items-center text-sm"
                        disabled={isLoading}
                    >
                        <i className={`ri-refresh-line mr-1 ${isLoading ? 'animate-spin' : ''}`}></i>
                        Refresh
                    </button>
                </div>

                {/* Shipment Summary Cards */}
                {shipment && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">AWB Number</p>
                            <p className="font-medium">{shipment.awb_code}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Current Status</p>
                            <div className="flex items-center mt-1">
                                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                                    shipment.current_status === 'DELIVERED' ? 'bg-green-500' : 'bg-yellow-500'
                                }`}></span>
                                <p className="font-medium">{shipment.current_status}</p>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Destination</p>
                            <p className="font-medium">{shipment.destination || 'Not available'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Expected Delivery</p>
                            <p className="font-medium">
                                {shipment.edd ? formatDate(shipment.edd) : 'Not available'}
                            </p>
                        </div>
                    </div>
                )}

                {/* Tracking Timeline */}
                {trackingData.shipment_track_activities && (
                    <div className="mt-8">
                        <h4 className="font-semibold mb-4">Shipping Updates</h4>
                        <div className="space-y-4">
                            {trackingData.shipment_track_activities.map((activity, index) => (
                                <div key={index} className="relative pl-6 pb-4">
                                    <div className="absolute left-0 top-2 h-full w-[2px] bg-green-200">
                                        <div className={`absolute top-0 left-[-4px] w-[10px] h-[10px] rounded-full ${
                                            index === 0 ? 'bg-green-500 ring-2 ring-green-200' : 'bg-green-200'
                                        }`}></div>
                                    </div>
                                    <div className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                                        <p className="font-medium text-green-600">{activity.activity}</p>
                                        <p className="text-sm text-gray-600">
                                            {formatDate(activity.date)}
                                        </p>
                                        {activity.location && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                <i className="ri-map-pin-line mr-1"></i>
                                                {activity.location}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Track on Shiprocket Link */}
                {trackingData.track_url && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                        <a 
                            href={trackingData.track_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                        >
                            <i className="ri-external-link-line mr-2"></i>
                            Track on Shiprocket
                        </a>
                    </div>
                )}
            </div>
        );
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

            {/* Tracking Details */}
            {renderTrackingDetails()}

            {/* Help Card */}
            <div className="max-w-md mx-auto mt-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <div className="flex items-center text-green-500 mb-2">
                        <i className="ri-customer-service-2-line mr-2"></i>
                        <h3 className="font-semibold">Need Help?</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Contact our support team at support@purkam.com
                    </p>
                </div>
            </div>

            {/* Toaster */}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#333',
                        color: '#fff',
                    },
                    success: {
                        iconTheme: {
                            primary: '#22c55e',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </div>
    );
}

export default Order;