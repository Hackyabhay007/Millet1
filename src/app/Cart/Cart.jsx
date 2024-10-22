"use client";

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/Context/CartContext";
import "remixicon/fonts/remixicon.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'react-hot-toast';

// Price formatting utility
const formatPrice = (price) => {
  if (typeof price !== 'number') return '₹0';
  return `₹${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// Loading Skeleton
const CartSkeleton = () => (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="animate-pulse max-w-6xl mx-auto space-y-6">
      <div className="h-8 bg-gray-200 w-48 rounded"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/4 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    total,
    itemCount,
    isLoading: isCartLoading,
  } = useContext(CartContext);

  const router = useRouter();
  const [productImages, setProductImages] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch product images
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      const images = {};

      try {
        for (const item of cartItems) {
          if (item && item.id && !images[item.id]) {
            const productRef = doc(db, "products", item.id);
            const productSnap = await getDoc(productRef);

            if (productSnap.exists()) {
              images[item.id] = productSnap.data().mainImage;
            }
          }
        }
        setProductImages(images);
      } catch (error) {
        console.error("Error fetching product images:", error);
        toast.error("Failed to load some product images");
      } finally {
        setIsLoading(false);
      }
    };

    if (cartItems.length > 0) {
      fetchImages();
    } else {
      setIsLoading(false);
    }
  }, [cartItems]);

  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    try {
      const itemIds = cartItems.map(item => item.id);
      const query = new URLSearchParams({
        items: JSON.stringify(itemIds)
      }).toString();
      router.push(`/Order?${query}`);
    } catch (error) {
      console.error("Error proceeding to checkout:", error);
      toast.error("Failed to proceed to checkout");
    }
  };

  if (isLoading || isCartLoading) {
    return <CartSkeleton />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center space-y-6 font-afacadFlux">
        <div className="text-center space-y-4">
          <i className="ri-shopping-cart-line text-6xl text-green-500"></i>
          <h2 className="text-2xl font-bold text-gray-800">Your cart is empty!</h2>
          <p className="text-gray-600">Add some products to your cart</p>
        </div>
        <Link 
          href="/Shop" 
          className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
        >
          <i className="ri-store-2-line"></i>
          <span>Continue Shopping</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-afacadFlux">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
            <i className="ri-shopping-cart-2-line text-green-600"></i>
            <span>Shopping Cart</span>
            <span className="text-sm text-gray-500">({itemCount} items)</span>
          </h1>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <Link 
              href="/Shop"
              className="text-green-600 hover:text-green-700 flex items-center space-x-1"
            >
              <i className="ri-arrow-left-line"></i>
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>

        {/* Cart Items */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Product Image */}
                <div className="flex-none">
                  <img
                    src={productImages[item.id]}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-medium">{formatPrice(item.price)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="p-2 text-green-600 hover:text-green-800 transition-colors disabled:opacity-50"
                      disabled={item.quantity <= 1}
                    >
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="p-2 text-green-600 hover:text-green-800 transition-colors disabled:opacity-50"
                      disabled={item.quantity >= item.stock}
                    >
                      <i className="ri-add-line"></i>
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 p-2"
                    title="Remove Item"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total</p>
                  <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-4">
              <span className="text-gray-600">Subtotal ({itemCount} items):</span>
              <span className="text-2xl font-bold text-green-600">{formatPrice(total)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleProceedToCheckout}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <i className="ri-shopping-bag-line"></i>
                <span>Proceed to Checkout</span>
              </button>
              
              <button
                onClick={clearCart}
                className="flex-1 bg-red-50 text-red-600 py-3 px-6 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center space-x-2"
              >
                <i className="ri-delete-bin-line"></i>
                <span>Clear Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;