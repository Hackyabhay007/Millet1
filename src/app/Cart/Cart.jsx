"use client";
import React, { useContext } from "react";
import { CartContext } from "@/Context/CartContext";
import "remixicon/fonts/remixicon.css"; // Import Remix Icons
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter for redirect

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
  } = useContext(CartContext);

  const router = useRouter(); // Initialize router

  // Function to handle ordering individual item and redirecting to Order page
  const handleOrderItem = (item) => {
    // Construct URL with query parameters, including the image
    const query = new URLSearchParams({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image, // Pass the image URL as well
    }).toString();

    // Use router.push() with the query string as part of the URL
    router.push(`/Order?${query}`);
  };

  // Function to handle ordering all selected items
  const handleOrderSelectedItems = () => {
    // Get the selected items
    const selectedItems = cartItems.filter(item => item.selected);

    // If there are selected items, redirect to the Order page with those items
    if (selectedItems.length > 0) {
      // Pass all selected items to the Order page as a JSON string in query
      const selectedItemsString = JSON.stringify(selectedItems);

      // Encode the selected items string to ensure safe transmission
      router.push(`/Order?items=${encodeURIComponent(selectedItemsString)}`);
    } else {
      alert("No items selected!");
    }
  };

  if (cartItems.length === 0) {
    return (
      <p className="min-h-fit text-center py-40 text-xl font-bold font-afacadFlux bg-gray-300">
        Your cart is empty! <i className="ri-box-3-line"></i><br /><br />
        <Link href="/Shop" className="bg-rose-600 text-white py-1 px-4 text-lg hover:bg-rose-700">GO TO SHOP <i className="ri-store-2-line font-thin text-xl"></i></Link>
      </p>
    );
  }

  return (
    <div className="container font-afacadFlux mx-auto p-6">
      <div className="flex justify-between">
      <h2 className="text-2xl font-semibold mb-6">Your Cart </h2>
    <Link href="/History"><button className="text-xl bg-gray-600 my-2 px-4 hover:bg-gray-400 text-white rounded"><i class="ri-history-line "></i>history</button></Link>
      </div>
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
              <div className="flex items-center border border-black p-1 rounded-full space-x-2">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="bg-gray-700 font-bold text-xl text-white md:py-1 px-3 md:px-5 rounded-full"
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
                onClick={() => handleOrderItem(item)} // Redirect to Order page with details
                className="ml-4 font-semibold text-xl rounded-full bg-green-500 text-white px-6 py-2"
              >
                Order
              </button>

              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-xl border border-black rounded-full hover:bg-gray-800 hover:text-white text-gray-800 px-3 w-full"
              >
                <i className="ri-delete-bin-line"></i>
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
        <h3 className="text-lg text-gray-400 font-semibold">
          All Product Total: ₹{totalPrice()}
        </h3>
      </div>

      {/* Order Selected Items Button */}
      <div className="mt-4">
        <button
          onClick={handleOrderSelectedItems}
          className="bg-yellow-800 border-b font-semibold border-transparent flex gap-2 hover:border-black hover:bg-yellow-400 hover:text-black text-white px-6 py-2"
        >
          Order Selected Items
          <i className="ri-box-1-fill text-lg"></i>
        </button>
      </div>

      {/* Clear Cart Button */}
      <div className="mt-4">
        <button
          onClick={clearCart}
          className="bg-red-500 flex gap-2 font-semibold hover:bg-gray-700 text-white px-6 py-2"
        >
          Clear Cart
          <i className="ri-delete-bin-7-line"></i>
        </button>
      </div>
    </div>
  );
}

export default Cart;
