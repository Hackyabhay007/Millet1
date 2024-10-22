"use client";

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/app/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast, Toaster } from 'react-hot-toast';
import { CartContext } from '@/Context/CartContext';
import Nav from "@/app/Head/Nav";
import Footer from "@/app/Bottom/Footer";
import Image from 'next/image';


// Utility functions
const formatPrice = (price) => {
  if (typeof price !== 'number') return '₹0';
  return `₹${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};

// Input Component
const InputField = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  error, 
  required = true, 
  disabled = false 
}) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
        error ? 'border-red-500' : 'border-gray-300'
      } ${disabled ? 'bg-gray-50' : ''}`}
      required={required}
    />
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
);

// Order Summary Component
const OrderSummary = ({ cartItems, subtotal }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-bold mb-6 pb-4 border-b">Order Summary</h2>
    
    <div className="space-y-4 mb-6">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-start space-x-4 py-4 border-b last:border-0">
          <img
            src={item.mainImage}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            <p className="text-sm font-medium text-green-600">
              {formatPrice(item.price)} × {item.quantity}
            </p>
          </div>
          <p className="font-medium text-gray-900">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      ))}
    </div>

    <div className="space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Shipping</span>
        <span className="text-green-600">Free</span>
      </div>
      <div className="flex justify-between text-base font-medium pt-4 border-t">
        <span>Total</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
    </div>
  </div>
);

// Success Modal Component
const OrderSuccessModal = ({ isOpen, orderId }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <i className="ri-check-line text-2xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Thank You for Your Order!</h2>
          {/* // eslint-disable-next-line react/no-unescaped-entities
<p className="text-gray-600 mb-2">Order ID: {orderId}</p> */}
          {/* <p className="text-gray-500 mb-6">
            We'll send you an email with your order details and tracking information.
          </p> */}
          <div className="space-y-3">
            <button
              onClick={() => window.location.href = '/History'}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              View Order History
            </button>
            <button
              onClick={() => window.location.href = '/Shop'}
              className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Checkout Component
function Checkout() {
  const router = useRouter();
  const { cartItems, clearCart, total: cartTotal } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [user, setUser] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    paymentMethod: 'cod'
  });
  const [errors, setErrors] = useState({});

  // Auth check and data population
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Pre-fill form data
        setFormData(prev => ({
          ...prev,
          email: currentUser.email || '',
          firstName: currentUser.displayName?.split(' ')[0] || '',
          lastName: currentUser.displayName?.split(' ')[1] || ''
        }));
      } else {
        router.push('/login?redirect=checkout');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // Cart check
  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      router.push('/History');
    }
  }, [cartItems, isLoading, router]);

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    const nameRegex = /^[a-zA-Z\s]{1,50}$/;

    if (!formData.firstName.trim() || !nameRegex.test(formData.firstName))
      newErrors.firstName = 'Please enter a valid first name';
      
    if (!formData.lastName.trim() || !nameRegex.test(formData.lastName))
      newErrors.lastName = 'Please enter a valid last name';
      
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email address';
      
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone))
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      
    if (!formData.address.trim())
      newErrors.address = 'Please enter your complete address';
      
    if (!formData.city.trim() || !nameRegex.test(formData.city))
      newErrors.city = 'Please enter a valid city name';
      
    if (!formData.state.trim() || !nameRegex.test(formData.state))
      newErrors.state = 'Please enter a valid state name';
      
    if (!formData.pincode.trim() || !pincodeRegex.test(formData.pincode))
      newErrors.pincode = 'Please enter a valid 6-digit pincode';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
      setProcessing(true);

      // Create order in Firebase
      const orderData = {
        userId: user.uid,
        userEmail: user.email,
        orderDate: serverTimestamp(),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
          phone: formData.phone
        },
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity
        })),
        totalAmount: cartTotal,
        paymentMethod: formData.paymentMethod,
        status: 'pending',
        paymentStatus: 'pending'
      };

      const orderRef = await addDoc(collection(db, "orders"), orderData);
      setOrderId(orderRef.id);
      
      // Clear cart and show success
      clearCart();
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500" />
      </div>
    );
  }

  return (
    <>

      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            {/* Left Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="mb-8 lg:sticky lg:top-8">
                <OrderSummary 
                  cartItems={cartItems}
                  subtotal={cartTotal}
                />
              </div>
            </div>

            {/* Right Column - Checkout Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6">Shipping Information</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      error={errors.firstName}
                    />
                    <InputField
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      error={errors.lastName}
                    />
                  </div>

                  <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    error={errors.email}
                    disabled={true}
                  />

                  <InputField
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    error={errors.phone}
                  />

                  {/* Address Information */}
                  <InputField
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    error={errors.address}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      error={errors.city}
                    />
                    <InputField
                      label="State"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                      error={errors.state}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                      error={errors.pincode}
                    />
                    <InputField
                      label="Country"
                      value={formData.country}
                      disabled={true}
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="border-t pt-6">
                    <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                    <div className="space-y-4">
                      <label className="flex items-center space-x-3">
                        <input
                          type="radio"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({...formData, paymentMethod: 'cod'})}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <span>Cash on Delivery (COD)</span>
                      </label>
                    </div>
                  </div>

           {/* Submit Button */}
           <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <i className="ri-secure-payment-line"></i>
                        <span>Place Order</span>
                      </>
                    )}
                  </button>

                  {/* Order Note */}
                  <div className="mt-4 text-sm text-gray-500 text-center">
                    <p>By placing this order, you agree to our</p>
                    <div className="flex justify-center space-x-2">
                      <a href="/terms" className="text-green-600 hover:text-green-700">Terms of Service</a>
                      <span>&</span>
                      <a href="/privacy" className="text-green-600 hover:text-green-700">Privacy Policy</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <OrderSuccessModal 
        isOpen={showSuccessModal}
        orderId={orderId}
      />

      <Footer />
    </>
  );
}

// Export the page component
export default function CheckoutPage() {
  return (
    <>
      <Checkout />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#22c55e',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}