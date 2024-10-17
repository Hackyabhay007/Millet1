"use client";
import React, { useContext } from "react";
import { CartContext } from "@/Context/CartContext";
import "remixicon/fonts/remixicon.css"; // Import Remix Icons
import Link from "next/link";
function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    selectItem,
    totalPrice,
    selectedItemsTotal,
    orderSelectedItems, // Added for ordering selected items
    orderItem, // Added for ordering individual items
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <p className="min-h-fit text-center py-40 text-xl font-bold bg-gray-300">
        Your cart is empty! <i class="ri-box-3-line"></i><br /><br />
        <Link href="/Shop" className="bg-rose-600 text-white py-1 px-4 text-lg hover:bg-rose-700  ">GO TO SHOP <i class="ri-store-2-line font-thin text-xl"></i></Link>
      </p>
    );
  }

  return (
    <div className="container font-afacadFlux  mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

      {/* Cart Items */}
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center justify-around bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-4 md:space-y-0 md:space-x-4"
          >
            {/* Left Column: Selection Input (Checkbox) */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={item.selected || false}
                onChange={() => selectItem(item.id)} // Now works as expected
                className="h-6 w-6 cursor-pointer"
              />
            </div>

            {/* Right Column: Product Image, Name, Price */}
            <div className="flex flex-col md:flex-row items-center space-x-3">
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />

              {/* Item Details */}
              <div className="flex flex-col">
                <p className="text-lg font-semibold">{item.name}</p>
                <p className="text-gray-600">Price: ₹{item.price}</p>
              </div>
            </div>

            {/* Quantity Control and Order Button */}
            <div className="flex items-center md:space-x-10 w-full md:w-auto">
              {/* Quantity Control */}
              <div className="flex items-center border border-black p-1  rounded-full space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-700 font-bold text-xl text-white md:py-1 px-3 md:px-5 rounded-full "
                >
                  -
                </button>
                <span className="px-4 text-lg font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="bg-gray-700 text-xl font-bold text-white md:py-1 px-3 md:px-5 rounded-full"
                >
                  +
                </button>
              </div>

              {/* Order Button for Individual Item */}
              <button
                onClick={() => orderItem(item.id)}
                className="ml-4 font-semibold text-xl rounded-full bg-green-500 text-white px-6 py-2"
              >
                Order
              </button>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-xl border border-black rounded-full hover:bg-gray-800 hover:text-white text-gray-800 px-3 w-full"
              >
                <i class="ri-delete-bin-line "></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-6 space-y-4">
        <h3 className="text-xl font-bold">
          Selected Items Total: ₹{selectedItemsTotal()}
        </h3>
        <h3 className="text-lg text-gray-400 font-semibold ">
          All Product Total: ₹{totalPrice()}
        </h3>
      </div>

      {/* Order Selected Items Button */}
      <div className="mt-4">
        <button
          onClick={orderSelectedItems}
          className="bg-yellow-800 border-b font-semibold border-transparent flex gap-2 hover:border-black hover:bg-yellow-400 hover:text-black text-white px-6 py-2"
        >
          Order Selected Items
          <i class="ri-box-1-fill text-lg"></i>
        </button>
      </div>

      {/* Clear Cart Button */}
      <div className="mt-4">
        <button
          onClick={clearCart}
          className="bg-red-500 flex gap-2 font-semibold hover:bg-gray-700 text-white px-6 py-2"
        >
          Clear Cart
          <i class="ri-delete-bin-7-line"></i>
        </button>
      </div>
    </div>
  );
}

export default Cart;
