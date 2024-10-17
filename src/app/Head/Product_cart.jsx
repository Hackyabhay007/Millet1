"use client"; // Mark the component as a Client Component

import React from 'react';

function ProductCart() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: 'Organic Apple',
      price: 250,
      image: 'https://gcdnb.pbrd.co/images/rGq54oVxCeXf.jpg?o=1',
    },
    {
      id: 2,
      name: 'Organic Banana',
      price: 150,
      image: 'https://gcdnb.pbrd.co/images/JF1ds3oEUDcn.jpg?o=1',
    },
    {
      id: 3,
      name: 'Organic Carrot',
      price: 200,
      image: 'https://gcdnb.pbrd.co/images/OvPFuBiWMqoS.jpg?o=1',
    },
    {
      id: 4,
      name: 'Organic Broccoli',
      price: 300,
      image: 'https://gcdnb.pbrd.co/images/WSe7gVhHkgDh.jpg?o=1',
    },
    {
      id: 5,
      name: 'Organic Tomato',
      price: 180,
      image: 'https://gcdnb.pbrd.co/images/Nk2Ag27XZQcw.jpg?o=1',
    },
    {
      id: 6,
      name: 'Organic Tomato',
      price: 180,
      image: 'https://gcdnb.pbrd.co/images/oCHDV8Vs98Be.jpg?o=1',
    },
    {
      id: 7,
      name: 'Organic Tomato',
      price: 180,
      image: 'https://gcdnb.pbrd.co/images/K27d9xHI1JJ5.jpg?o=1',
    },
    {
      id: 8,
      name: 'Organic Tomato',
      price: 180,
      image: 'https://gcdnb.pbrd.co/images/3AmDLfUR6RAs.jpg?o=1',
    },
    {
      id: 9,
      name: 'Organic Tomato',
      price: 180,
      image: 'https://gcdnb.pbrd.co/images/3AmDLfUR6RAs.jpg?o=1',
    },
    {
      id: 10,
      name: 'Organic Tomato',
      price: 180,
      image: 'https://gcdnb.pbrd.co/images/Nk2Ag27XZQcw.jpg?o=1',
    },
  ];

  return (
    <div className="overflow-hidden w-screen font-afacadFlux">
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
