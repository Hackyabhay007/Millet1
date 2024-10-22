"use client"; // Mark the component as a Client Component

import React, { useState, useEffect, useContext } from "react";
import { db } from "../firebase"; // Import your Firebase configuration
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { CartContext } from "@/Context/CartContext"; // Import the CartContext
import Link from 'next/link';
function ProductCart() {
  const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
  const [products, setProducts] = useState([]); // State for fetched products
  const [loading, setLoading] = useState(true); // State to manage loading
  const [addedToCartId, setAddedToCartId] = useState(null); // State for tracking recently added product

  // Fetch 5 random products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading

        // Step 1: Fetch all products from the `products` collection
        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);

        // Step 2: Get random products
        const allProducts = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Shuffle products and take the first 5
        const shuffledProducts = allProducts.sort(() => 0.5 - Math.random()).slice(0, 5);

        setProducts(shuffledProducts); // Set products to state
        setLoading(false); // Stop loading
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false); // Ensure loading state is reset even if there's an error
      }
    };

    fetchProducts();
  }, []);

  // Handler for adding item to the cart
  const handleAddToCart = (product) => {
    addToCart(product); // Call the addToCart function from context
    setAddedToCartId(product.id); // Track the added product

    // Remove the "added" feedback after 2 seconds
    setTimeout(() => {
      setAddedToCartId(null); // Reset the state after 2 seconds
    }, 500);
  };

  return (
    <div className="overflow-hidden bg-green-200  font-afacadFlux">
      <h1 className="pl-8 py-10 text-3xl text-gray-700 font-bold">Top Products</h1>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-10 px-11">
        {loading ? (
          <p className="text-center col-span-full">Loading products...</p> // Loading message
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-neutral-100 cursor-pointer rounded-xl shadow  shadow-gray-500 overflow-hidden" // Card styles
            >
              {/* Product Image */}
              <div className="h-52 w-full overflow-hidden transition-transform transform hover:scale-105">
                <img
                  src={product.mainImage} // Ensure you use the correct image field
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col flex-grow p-0 text-center"> {/* Add padding */}
                {/* Product Details */}
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-500 font-semibold pb-1">Price: ₹{product.price}</p>
                <p className="text-gray-500">{product.description}</p>

                {/* Add to Cart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from bubbling up
                    handleAddToCart(product);
                  }}
                  className={`mt-auto  px-4 py-2 font-semibold rounded-b-md transition-colors ${
                    addedToCartId === product.id
                      ? "bg-yellow-500 text-green-700"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {addedToCartId === product.id ? "Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More Products Button */}
      <div className="flex justify-end px-11 mt-6">
      <Link href="/Shop"><button
          onClick={() => console.log('Load more products functionality here')}
          className="bg-green-600 text-white py-2 px-4 rounded-lg  hover:bg-yellow-500 hover:text-black"
        >
          More Products..
        </button></Link>
      </div>
    </div>
  );
}

export default ProductCart;
