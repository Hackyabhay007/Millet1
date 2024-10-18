"use client"; // Mark the component as a Client Component

import React, { useState, useContext } from "react";
import { CartContext } from "@/Context/CartContext"; // Import the CartContext

function ProductCart() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Soulfull Ragi dosa",
      price: 250,
      image: "https://gcdnb.pbrd.co/images/rGq54oVxCeXf.jpg?o=1",
    },
    {
      id: 2,
      name: "Super Millets",
      price: 150,
      image: "https://gcdnb.pbrd.co/images/JF1ds3oEUDcn.jpg?o=1",
    },
    {
      id: 3,
      name: "Millets health Milk",
      price: 200,
      image: "https://gcdnb.pbrd.co/images/OvPFuBiWMqoS.jpg?o=1",
    },
    {
      id: 4,
      name: "Sprouted Ragi Powder",
      price: 300,
      image: "https://gcdnb.pbrd.co/images/WSe7gVhHkgDh.jpg?o=1",
    },
    {
      id: 5,
      name: "Pearl Cookies",
      price: 180,
      image: "https://gcdnb.pbrd.co/images/Nk2Ag27XZQcw.jpg?o=1",
    },
    {
      id: 6,
      name: "Millet Rusk",
      price: 120,
      image: "https://gcdnb.pbrd.co/images/oCHDV8Vs98Be.jpg?o=1",
    },
  ];

  const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
  const [clickedItemId, setClickedItemId] = useState(null); // State to track clicked item

  // Handler for adding item to the cart
  const handleAddToCart = (product) => {
    addToCart(product); // Call the addToCart function from context
    setClickedItemId(product.id); // Set the clicked item ID for animation
    setTimeout(() => setClickedItemId(null), 500); // Reset clicked item ID after animation
  };

  return (
    <div className="overflow-hidden w-screen font-afacadFlux">
      <h1 className="pl-8 py-10 text-3xl text-gray-600 font-bold">Best Sellers</h1>
      <div className="flex space-x-6 md:ml-5 md:pl-20 ml-5 pl-5 h-fit py-10 overflow-x-auto scrollbar-hide w-full max-w-full flex-nowrap">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex h-fit flex-col w-1/6 min-w-[200px] bg-yellow-50 rounded-xl shadow-lg shadow-gray-500 overflow-hidden flex-shrink-0"
          >
            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-cover"
            />
            <div className="flex text-center flex-col flex-grow pt-5">
              {/* Product Details */}
              <p className="text-lg font-semibold py-2">{product.name}</p>
              <p className="text-gray-500 font-semibold pb-3">Price: ₹{product.price}</p>

              {/* Add to Cart Button with Animation */}
              <button
                onClick={() => handleAddToCart(product)}
                className={`mt-auto text-white px-4 py-2 font-semibold rounded-b-md transition-transform ${
                  clickedItemId === product.id
                    ? "bg-yellow-400 transform scale-110 duration-500"
                    : "bg-green-600"
                } focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50`}
                style={{
                  transition: "background-color 0.5s ease, transform 0.5s ease",
                }}
              >
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
