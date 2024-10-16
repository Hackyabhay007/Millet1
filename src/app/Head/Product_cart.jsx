"use client"; // Mark the component as a Client Component

import React from 'react';

function ProductCart() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Organic Apple',
      price: 250,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsmmmsIaJkdyDqCENnDj6k7H6OHdFBF4b5Pg&s',
    },
    {
      id: 2,
      name: 'Organic Banana',
      price: 150,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69zZYig4fuojGwASOCKB_LQp3fM1kTZ8dPA&s',
    },
    {
      id: 3,
      name: 'Organic Carrot',
      price: 200,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69zZYig4fuojGwASOCKB_LQp3fM1kTZ8dPA&s',
    },
    {
      id: 4,
      name: 'Organic Broccoli',
      price: 300,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJmvLW5gDXZOVoWe6bgSg4xYxypI3WPtFRQ&s',
    },
    {
      id: 5,
      name: 'Organic Tomato',
      price: 180,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS69zZYig4fuojGwASOCKB_LQp3fM1kTZ8dPA&s',
    },
  ];

  return (
    <div className="overflow-hidden w-screen">
        <h1 className='pl-8 py-10 text-3xl text-gray-600 font-bold'>Best Sellers</h1>
      <div className="flex  space-x-6 md:ml-5 md:pl-20 ml-5 pl-5 h-fit py-10  overflow-x-auto scrollbar-hide w-full  max-w-full flex-nowrap">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex h-fit flex-col w-1/6 min-w-[200px] bg-yellow-50 rounded-xl shadow-lg shadow-gray-500 overflow-hidden flex-shrink-0"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover"
            />
            <div className="flex text-center  flex-col flex-grow pt-5 ">
              <p className="text-lg font-semibold py-2">{product.name}</p>
              <p className="text-gray-500 font-semibold pb-3">Price: ₹ {product.price}</p>
              <button className="mt-auto  bg-green-600 text-white px-0 py-3 font-semibold  rounded-b-md">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCart;
