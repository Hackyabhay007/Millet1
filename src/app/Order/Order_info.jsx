'use client'; // Ensure this is a client-side component

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Updated for App Router

function Order_info() {
  const searchParams = useSearchParams(); // Use useSearchParams for query parameters

  const [orderData, setOrderData] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online');
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    // Get the 'items' query parameter
    const items = searchParams.get('items');
    
    if (items) {
      // Handle multiple selected items
      try {
        const parsedItems = JSON.parse(decodeURIComponent(items));
        setOrderData(parsedItems);
      } catch (error) {
        console.error("Error parsing items:", error);
      }
    } else {
      // Handle single item (individual product order)
      const id = searchParams.get('id');
      const name = searchParams.get('name');
      const price = parseFloat(searchParams.get('price')) || 0;
      const quantity = parseInt(searchParams.get('quantity')) || 1;
      const image = searchParams.get('image'); // Get image parameter
      setOrderData([{ id, name, price, quantity, image }]);
    }
  }, [searchParams]);

  // Calculate total price based on items
  useEffect(() => {
    if (orderData.length > 0) {
      const total = orderData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalAmount(total);
    }
  }, [orderData]);

  // Function to handle form submission (order placement)
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed for items with total of ₹${totalAmount}. Payment Method: ${paymentMethod}.`);
    // Here, you can send the order data to your backend or payment gateway integration
  };

  return (
    <div className="container font-afacadFlux mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

      {/* Display product details */}
      {orderData.length > 0 ? (
        orderData.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row items-center space-x-4">
              {/* Display the product image */}
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Quantity: {item.quantity}</p>
                <p>Price per item: ₹{item.price}</p>
                <h3 className="text-xl font-bold mt-4">
                  Total: ₹{item.price * item.quantity}
                </h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading order details...</p>
      )}

      {/* Total Amount */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-2xl font-bold">Total Amount to Pay: ₹{totalAmount}</h2>
      </div>

      {/* Order Form */}
      <form onSubmit={handleOrderSubmit} className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>

        {/* State, City, and Pincode in one row for larger screens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-lg font-semibold">State:</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter your state"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">City:</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter your city"
            />
          </div>
          <div>
            <label className="block mb-2 text-lg font-semibold">Pincode:</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter your pincode"
            />
          </div>
        </div>

        {/* Address in a separate row */}
        <div className="mb-4">
          <label className="block mb-2 text-lg font-semibold">Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full p-2 border border-gray-400 rounded"
            placeholder="Enter your delivery address"
          />
        </div>

        {/* Payment Method Selection */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4">Payment Method</h2>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Online"
                checked={paymentMethod === 'Online'}
                onChange={() => setPaymentMethod('Online')}
                className="mr-2"
              />
              Online Payment
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={() => setPaymentMethod('Card')}
                className="mr-2"
              />
              Card Payment
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
                className="mr-2"
              />
              Cash on Delivery
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Order_info;
