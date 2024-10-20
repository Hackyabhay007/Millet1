"use client"
import React, { useEffect, useState } from 'react';

// Simulate fetching order history data
const fetchOrderHistory = () => {
  // In a real scenario, you'd fetch this from an API like `fetch('/api/orders')`
  return [
    {
      id: 1,
      date: "2024-10-15",
      totalAmount: 120.00,
      products: [
        {
          id: 101,
          name: "Product 1",
          imageUrl: "https://via.placeholder.com/100",
          price: 40.00,
          quantity: 2,
        },
        {
          id: 102,
          name: "Product 2",
          imageUrl: "https://via.placeholder.com/100",
          price: 40.00,
          quantity: 1,
        },
      ],
    },
    {
      id: 2,
      date: "2024-09-30",
      totalAmount: 150.00,
      products: [
        {
          id: 103,
          name: "Product 3",
          imageUrl: "https://via.placeholder.com/100",
          price: 50.00,
          quantity: 3,
        },
      ],
    },
  ];
};

function History() {
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch the order history when the component mounts
  useEffect(() => {
    const data = fetchOrderHistory();
    setOrderHistory(data);
  }, []);

  return (
    <div className="max-w-7xl font-afacadFlux mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6">Order History</h2>

      {orderHistory.length === 0 ? (
        <p>No order history available.</p>
      ) : (
        orderHistory.map((order) => (
          <div key={order.id} className="mb-6 border-b border-gray-200 pb-6">
            <div className="flex justify-between items-center mb-3">
              <p className="text-lg font-bold">Order ID: {order.id}</p>
              <p className="text-sm text-gray-600">Date: {order.date}</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {order.products.map((product) => (
                <div key={product.id} className="flex items-center space-x-4">
                  <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <p className="text-lg font-medium">{product.name}</p>
                    <p className="text-gray-600">Price: ${product.price.toFixed(2)}</p>
                    <p className="text-gray-600">Quantity: {product.quantity}</p>
                  </div>
                  <p className="ml-auto text-lg font-semibold">
                    ${product.price * product.quantity}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-semibold">Total Amount: ${order.totalAmount.toFixed(2)}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                View Order Details
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default History;
