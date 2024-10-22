"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { CartContext } from "@/Context/CartContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

function ProductCart() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainer = useRef(null);
  const router = useRouter();

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      const newScrollPosition =
        scrollContainer.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainer.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const productsCollection = collection(db, "products");
        const productSnapshot = await getDocs(productsCollection);

        const allProducts = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const shuffledProducts = allProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);

        setProducts(shuffledProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products: ", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    router.push(`/Shop/${productId}`);
  };

  return (
    <div className="overflow-hidden bg-green-100 font-afacadFlux md:p-8">
      <h1 className="pl-8 py-10 text-3xl text-gray-700 font-bold">
        Top Products
      </h1>

      <div className="relative group px-4 sm:px-0">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto gap-6 px-4 sm:px-0 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            <Loader />
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-48 sm:w-64 aspect-square cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="h-full bg-white shadow-md border border-green-200 rounded-lg p-4 flex flex-col justify-between">
                  <div className="relative flex-1 mb-2">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-green-600 font-bold">₹{product.price}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* Load More Products Button */}
  
      {/* Load More Products Button */}
      <div className="flex justify-end px-11 mt-6">
        <Link href="/Shop">
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg transition-colors hover:bg-green-500 hover:text-gray-900">
            More Products..
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCart;
