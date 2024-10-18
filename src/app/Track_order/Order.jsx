"use client"; // This directive tells Next.js to treat this file as a client component

import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css'; // Ensure you've imported the icon stylesheet

function Order() {
    const [searchType, setSearchType] = useState('orderId'); // State to keep track of the selected search type
    const [inputValue, setInputValue] = useState('');

    // Function to handle the radio button change
    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
        setInputValue(''); // Clear input value when switching options
    };

    return (
        <div className="bg-white font-afacadFlux p-6 rounded-lg shadow-md  mx-auto w-screen  md:w-3/5 md:my-20 h-auto"> {/* Changed max width to 80% */}
            <div className="flex items-center mb-4">
                <i className="ri-box-1-fill text-3xl mr-2"></i>
                <h2 className="text-lg font-bold">Track Your Order</h2>
            </div>
            <hr className="my-2" />
            <div className="my-4">
                <label className="block mb-2 font-semibold">Search by:</label>
                <div className="flex mb-4">
                    <label className="mr-4">
                        <input
                            type="radio"
                            value="orderId"
                            checked={searchType === 'orderId'}
                            onChange={handleSearchTypeChange}
                            className="mr-2"
                        />
                        Order ID
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="awb"
                            checked={searchType === 'awb'}
                            onChange={handleSearchTypeChange}
                            className="mr-2"
                        />
                        AWB
                    </label>
                </div>
                <input
                    type="text"
                    placeholder={`Enter ${searchType === 'orderId' ? 'Order ID' : 'AWB'}...`}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded p-2"
                />
            </div>
            <button
                className="w-full hover:bg-green-500 bg-blue-600 text-white h-10 rounded-lg"
                onClick={() => console.log(`Searching for ${inputValue} with type: ${searchType}`)}
            >
                Submit
            </button>
            <hr className="border-black my-4" />
        </div>
    );
}

export default Order;
