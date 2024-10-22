'use client'; // Ensure this is a client-side component

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Updated for App Router
import { db } from "../firebase"; // Ensure Firebase is imported
import { doc, getDoc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import Link from 'next/link'; // Import Link from next/link

// Modal Component for displaying order confirmation and error message
const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6  shadow-lg">
        <h2 className="text-lg font-bold mb-4">{message}</h2>
        <div className="flex justify-between gap-4 py-2">
          <Link href="/" passHref>
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-40 py-2 rounded hover:bg-green-700"
            >
              OK
            </button>
          </Link>
          <Link href="/Shop" passHref>
            <button
              className="bg-blue-600 text-white px-40 py-2 rounded hover:bg-blue-700"
            >
              Shop
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Order_info() {
  const searchParams = useSearchParams(); // Use useSearchParams for query parameters

  const [orderData, setOrderData] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState(''); // Store selected address ID
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Online');
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState(''); // Message to show on the page
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false); // State to control showing address form
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(''); // Message for the modal
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); // For success modal

  useEffect(() => {
    const items = searchParams.get('items');
    
    if (items) {
      try {
        const parsedIds = JSON.parse(decodeURIComponent(items)); // Parse IDs
        const fetchProducts = async () => {
          const products = await Promise.all(parsedIds.map(async (id) => {
            const productRef = doc(db, "products", id); // Reference to the product document
            const productSnap = await getDoc(productRef); // Fetch the product document
            if (productSnap.exists()) {
              const productData = productSnap.data();
              return {
                id,
                name: productData.name || '', // Ensure name is a string
                price: parseFloat(productData.price) || 0, // Ensure price is a valid number
                quantity: parseInt(productData.quantity) || 1, // Ensure quantity is a valid number
                image: productData.image || '', // Ensure image is a string
              };
            }
            return null; // Return null if product doesn't exist
          }));
          setOrderData(products.filter(Boolean)); // Set order data and filter out null results
        };
        fetchProducts();
      } catch (error) {
        console.error("Error parsing items:", error);
      }
    } else {
      const id = searchParams.get('id');
      const name = searchParams.get('name') || '';
      const price = parseFloat(searchParams.get('price')) || 0;
      const quantity = parseInt(searchParams.get('quantity')) || 1;
      const image = searchParams.get('image') || '';
      setOrderData([{ id, name, price, quantity, image }]);
    }

    // Fetch saved addresses from Firestore when the component mounts
    const fetchAddresses = async () => {
      const userId = "user-id"; // Replace this with actual user ID logic
      const addressesRef = collection(db, `users/${userId}/addresses`); // Adjust path to addresses
      const addressSnap = await getDocs(addressesRef);
      const fetchedAddresses = addressSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAddresses(fetchedAddresses);
    };
    
    fetchAddresses();
  }, [searchParams]);

  // Calculate total price based on items
  useEffect(() => {
    if (orderData.length > 0) {
      const total = orderData.reduce((sum, item) => {
        const itemTotal = (item.price * item.quantity) || 0; // Fallback to 0 if undefined
        return sum + itemTotal;
      }, 0);
      setTotalAmount(total);
    } else {
      setTotalAmount(0); // Reset total if no items
    }
  }, [orderData]);

  // Function to save new address
  const handleNewAddressSubmit = async (e) => {
    e.preventDefault();
    const newAddress = { address, city, state, pincode };

    try {
      const userId = "user-id"; // Replace this with actual user ID logic
      const addressRef = collection(db, `users/${userId}/addresses`);
      await addDoc(addressRef, newAddress);
      setAddresses(prev => [...prev, newAddress]);
      setMessage('Address saved successfully!'); // Display success message
      // Reset fields after submission
      setAddress('');
      setCity('');
      setState('');
      setPincode('');
      setIsAddingNewAddress(false); // Close the address form
    } catch (error) {
      console.error("Error saving address:", error);
      setMessage('Error saving address. Please try again.'); // Display error message
    }
  };

  // Function to handle order submission
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    const selectedAddress = addresses.find(address => address.id === selectedAddressId);
    
    if (!selectedAddress) {
      setMessage("Please select a valid address."); // Display error if no address selected
      return;
    }

    try {
      const orderDataToSave = {
        items: orderData,
        totalAmount,
        paymentMethod,
        selectedAddress,
        createdAt: new Date(),
      };
      await addDoc(collection(db, "orders"), orderDataToSave);
      setModalMessage(`:) Order placed successfully for a total of ₹${totalAmount}. Payment Method: ${paymentMethod}.`); // Display order confirmation message
      setIsSuccessModalVisible(true); // Show success modal
    } catch (error) {
      console.error("Error saving order:", error);
      setModalMessage('Error placing order. Please try again.'); // Set the message for modal
      setModalVisible(true); // Show the modal
    }
  };

  // Function to close the success modal
  const closeSuccessModal = () => {
    setIsSuccessModalVisible(false);
    setModalMessage(''); // Reset modal message
  };

  // Function to close the error modal
  const closeErrorModal = () => {
    setModalVisible(false);
    setModalMessage(''); // Reset modal message
  };

  return (
    <div className="container font-afacadFlux mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Summary</h1>

      {/* Display product details */}
      {orderData.length > 0 ? (
        orderData.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row items-center space-x-4">
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
                  Total: ₹{(item.price * item.quantity).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Loading order details...</p>
      )}

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Total Amount: ₹{totalAmount.toFixed(2)}</h2>
      </div>

      {/* Add New Address Button */}
      <button
        onClick={() => setIsAddingNewAddress(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
      >
        Add New Address
      </button>

      {/* Select Address */}
      <h2 className="text-2xl font-bold mb-4">Select Address:</h2>
      <select
        onChange={(e) => setSelectedAddressId(e.target.value)}
        className="mb-4 border border-gray-300 rounded px-4 py-2"
        value={selectedAddressId}
      >
        <option value="">Select an address</option>
        {addresses.map(address => (
          <option key={address.id} value={address.id}>
            {address.address}, {address.city}, {address.state}, {address.pincode}
          </option>
        ))}
      </select>

      {/* New Address Form */}
      {isAddingNewAddress && (
        <form onSubmit={handleNewAddressSubmit} className="mb-4">
          <input
            type="text"
            placeholder="Address"
            className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded px-4 py-2 mb-2 w-full"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Pincode"
            className="border border-gray-300 rounded px-4 py-2 mb-4 w-full"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Save Address
          </button>
        </form>
      )}

      {/* Payment Method Selection */}
      <h2 className="text-2xl font-bold mb-4">Payment Method:</h2>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setPaymentMethod('Online')}
          className={`px-4 py-2 rounded ${paymentMethod === 'Online' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Online
        </button>
        <button
          onClick={() => setPaymentMethod('Cash on Delivery')}
          className={`px-4 py-2 rounded ${paymentMethod === 'Cash on Delivery' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
        >
          Cash on Delivery
        </button>
      </div>

      {/* Order Submit Button */}
      <button
        onClick={handleOrderSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Place Order
      </button>

      {/* Success Modal */}
      {isSuccessModalVisible && (
        <Modal message={modalMessage} onClose={closeSuccessModal} />
      )}

      {/* Error Modal */}
      {modalVisible && (
        <Modal message={modalMessage} onClose={closeErrorModal} />
      )}
    </div>
  );
}

export default Order_info;
