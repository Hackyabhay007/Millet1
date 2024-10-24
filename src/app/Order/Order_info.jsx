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
import Script from 'next/script';

// Utility functions
const formatPrice = (price) => {
  if (typeof price !== 'number') return '₹0';
  return `₹${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
};



// First, add the Razorpay script safely
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
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
      className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${error ? 'border-red-500' : 'border-gray-300'
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
const OrderSuccessModal = ({ isOpen, orderId, paymentMethod }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fadeIn">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl animate-scaleIn">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-bounce">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-lg font-semibold text-gray-800">#{orderId}</p>
          </div>
          <p className="text-gray-600 mb-8">
            {paymentMethod === 'cod'
              ? 'Your order has been placed successfully. Please keep cash ready at the time of delivery.'
              : 'Payment successful! Your order is being processed and will be delivered soon.'}
          </p>
          <div className="space-y-4">
            <button
              onClick={() => window.location.href = '/History'}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all transform hover:scale-105"
            >
              Track Your Order
            </button>
            <button
              onClick={() => window.location.href = '/Shop'}
              className="w-full bg-white text-green-600 border-2 border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-all"
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
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

  useEffect(() => {
    if (!isLoading && cartItems.length === 0) {
      router.push('/History');
    }
  }, [cartItems, isLoading, router]);
  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^\d{10}$/;
    const pincodeRegex = /^\d{6}$/;
    // Modified name regex to better handle real names
    const nameRegex = /^[a-zA-Z\s'-]{1,50}$/;

    // Debug logging
    console.log('Validating form data:', {
      firstName: formData.firstName,
      email: formData.email
    });

    // First Name validation with better handling
    if (!formData.firstName || formData.firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
    } else if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = 'Please enter a valid first name';
    }

    // Email validation with better handling
    if (!formData.email || formData.email.trim() === '') {
      newErrors.email = 'Email is required';
    } else {
      // More permissive email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Rest of the validations remain the same
    if (!formData.lastName?.trim() || !nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = 'Please enter a valid last name';
    }

    if (!formData.phone?.trim() || !phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address?.trim()) {
      newErrors.address = 'Please enter your complete address';
    }

    if (!formData.city?.trim() || !nameRegex.test(formData.city.trim())) {
      newErrors.city = 'Please enter a valid city name';
    }

    if (!formData.state?.trim() || !nameRegex.test(formData.state.trim())) {
      newErrors.state = 'Please enter a valid state name';
    }

    if (!formData.pincode?.trim() || !pincodeRegex.test(formData.pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    // Debug logging
    console.log('Validation errors:', newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    try {
      if (formData.paymentMethod === 'online') {
        await handlePayment();
      } else {
        setProcessing(true);
        // Handle COD order...
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
          paymentMethod: 'cod',
          status: 'pending',
          paymentStatus: 'pending'
        };

        const orderRef = await addDoc(collection(db, "orders"), orderData);
        setOrderId(orderRef.id);
        clearCart();
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setProcessing(false);
    }
  };


  const handlePayment = async () => {
    try {
      setProcessing(true);
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error('Payment gateway failed to load. Please try again.');
        return;
      }

      // Create order data
      const orderData = {
        amount: Math.round(cartTotal * 100),
        currency: 'INR',
        receipt: `order_${Date.now()}`,
      };

      // Initialize Razorpay options
      const options = {
        key: "rzp_test_OCMTdiTaga98x7",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Purkam",
        description: "Order Payment",
        //image: "your-logo-url",
        handler: async function (response) {
          try {
            console.log('Razorpay Response:', response); // Debug log

            // Create payment details object with null checks
            const paymentDetails = {
              razorpayPaymentId: response.razorpay_payment_id || null,
              razorpayOrderId: response.razorpay_order_id || null,
              razorpaySignature: response.razorpay_signature || null,
              paymentTime: serverTimestamp()
            };

            // Handle successful payment
            const orderDetails = {
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
              paymentMethod: 'online',
              paymentStatus: 'paid',
              status: 'pending',
              paymentDetails: paymentDetails,
              paymentResponse: response // Store complete response
            };

            console.log('Saving order details:', orderDetails); // Debug log

            // Save order to Firestore
            const orderRef = await addDoc(collection(db, "orders"), orderDetails);
            console.log('Order saved with ID:', orderRef.id); // Debug log

            setOrderId(orderRef.id);
            clearCart();
            setShowSuccessModal(true);

          } catch (error) {
            console.error('Error saving order:', error);
            // Store failed order with error details
            const failedOrderDetails = {
              userId: user.uid,
              userEmail: user.email,
              orderDate: serverTimestamp(),
              paymentMethod: 'online',
              paymentStatus: 'failed',
              status: 'failed',
              error: error.message,
              paymentResponse: response,
              amount: cartTotal,
              items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                quantity: item.quantity
              }))
            };

            // Save failed order for tracking
            await addDoc(collection(db, "failed_orders"), failedOrderDetails);

            toast.error('Payment successful but order creation failed. Our team will contact you soon.');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          address: formData.address,
          shipping_address: `${formData.address}, ${formData.city}, ${formData.state}, ${formData.pincode}`,
        },
        theme: {
          color: "#16a34a"
        },
        modal: {
          ondismiss: function () {
            setProcessing(false);
            toast.error('Payment cancelled. Please try again.');
          }
        }
      };

      // Create Razorpay instance and open payment modal
      const razorpay = new window.Razorpay(options);

      // Handle payment failure
      razorpay.on('payment.failed', function (failedResponse) {
        console.log('Payment failed:', failedResponse); // Debug log
        setProcessing(false);

        // Save failed payment details
        const failedPayment = {
          userId: user.uid,
          timestamp: serverTimestamp(),
          error: failedResponse.error,
          amount: cartTotal,
          items: cartItems.map(item => ({
            productId: item.id,
            name: item.name,
            quantity: item.quantity
          }))
        };

        addDoc(collection(db, "failed_payments"), failedPayment);

        toast.error('Payment failed: ' + (failedResponse.error?.description || 'Please try again'));
      });

      razorpay.open();

    } catch (error) {
      console.error('Payment initialization error:', error);
      setProcessing(false);
      toast.error('Failed to initialize payment. Please try again.');
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
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      error={errors.firstName}
                    />
                    <InputField
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      error={errors.lastName}
                    />
                  </div>

                  <InputField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                    disabled={true}
                  />

                  <InputField
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    error={errors.phone}
                  />

                  {/* Address Information */}
                  <InputField
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    error={errors.address}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      error={errors.city}
                    />
                    <InputField
                      label="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      error={errors.state}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <InputField
                      label="Pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
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
                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <div>
                          <span className="font-medium">Cash on Delivery (COD)</span>
                          <p className="text-sm text-gray-500">Pay when you receive your order</p>
                        </div>
                      </label>

                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          checked={formData.paymentMethod === 'online'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'online' })}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">Pay Online</span>
                              <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Netbanking</p>
                            </div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="w-full h-auto max-w-[150px] md:max-w-[200px] lg:max-w-[216px]"
                              preserveAspectRatio="xMidYMid meet"
                              viewBox="0 0 1896 401"
                              fill="#072654"
                              id="razorpay"
                            >
                              <path
                                fill="#3395FF"
                                d="m122.63 105.7-15.75 57.97 90.15-58.3-58.96 219.98 59.88.05L285.05.48"
                              />
                              <path d="M25.6 232.92.8 325.4h122.73l50.22-188.13L25.6 232.92m426.32-81.42c-3 11.15-8.78 19.34-17.4 24.57-8.6 5.22-20.67 7.84-36.25 7.84h-49.5l17.38-64.8h49.5c15.56 0 26.25 2.6 32.05 7.9 5.8 5.3 7.2 13.4 4.22 24.6m51.25-1.4c6.3-23.4 3.7-41.4-7.82-54-11.5-12.5-31.68-18.8-60.48-18.8H324.4l-66.5 248.1h53.67l26.8-100h35.2c7.9 0 14.12 1.3 18.66 3.8 4.55 2.6 7.22 7.1 8.04 13.6l9.58 82.6h57.5l-9.32-77c-1.9-17.2-9.77-27.3-23.6-30.3 17.63-5.1 32.4-13.6 44.3-25.4a92.6 92.6 0 0 0 24.44-42.5m130.46 86.4c-4.5 16.8-11.4 29.5-20.73 38.4-9.34 8.9-20.5 13.3-33.52 13.3-13.26 0-22.25-4.3-27-13-4.76-8.7-4.92-21.3-.5-37.8 4.42-16.5 11.47-29.4 21.17-38.7 9.7-9.3 21.04-13.95 34.06-13.95 13 0 21.9 4.5 26.4 13.43 4.6 8.97 4.7 21.8.2 38.5zm23.52-87.8-6.72 25.1c-2.9-9-8.53-16.2-16.85-21.6-8.34-5.3-18.66-8-30.97-8-15.1 0-29.6 3.9-43.5 11.7-13.9 7.8-26.1 18.8-36.5 33-10.4 14.2-18 30.3-22.9 48.4-4.8 18.2-5.8 34.1-2.9 47.9 3 13.9 9.3 24.5 19 31.9 9.8 7.5 22.3 11.2 37.6 11.2a82.4 82.4 0 0 0 35.2-7.7 82.11 82.11 0 0 0 28.4-21.2l-7 26.16h51.9L709.3 149h-52zm238.65 0H744.87l-10.55 39.4h87.82l-116.1 100.3-9.92 37h155.8l10.55-39.4h-94.1l117.88-101.8m142.4 52c-4.67 17.4-11.6 30.48-20.75 39-9.15 8.6-20.23 12.9-33.24 12.9-27.2 0-36.14-17.3-26.86-51.9 4.6-17.2 11.56-30.13 20.86-38.84 9.3-8.74 20.57-13.1 33.82-13.1 13 0 21.78 4.33 26.3 13.05 4.52 8.7 4.48 21.67-.13 38.87m30.38-80.83c-11.95-7.44-27.2-11.16-45.8-11.16-18.83 0-36.26 3.7-52.3 11.1a113.09 113.09 0 0 0-41 32.06c-11.3 13.9-19.43 30.2-24.42 48.8-4.9 18.53-5.5 34.8-1.7 48.73 3.8 13.9 11.8 24.6 23.8 32 12.1 7.46 27.5 11.17 46.4 11.17 18.6 0 35.9-3.74 51.8-11.18 15.9-7.48 29.5-18.1 40.8-32.1 11.3-13.94 19.4-30.2 24.4-48.8 5-18.6 5.6-34.84 1.8-48.8-3.8-13.9-11.7-24.6-23.6-32.05m185.1 40.8 13.3-48.1c-4.5-2.3-10.4-3.5-17.8-3.5-11.9 0-23.3 2.94-34.3 8.9-9.46 5.06-17.5 12.2-24.3 21.14l6.9-25.9-15.07.06h-37l-47.7 176.7h52.63l24.75-92.37c3.6-13.43 10.08-24 19.43-31.5 9.3-7.53 20.9-11.3 34.9-11.3 8.6 0 16.6 1.97 24.2 5.9m146.5 41.1c-4.5 16.5-11.3 29.1-20.6 37.8-9.3 8.74-20.5 13.1-33.5 13.1s-21.9-4.4-26.6-13.2c-4.8-8.85-4.9-21.6-.4-38.36 4.5-16.75 11.4-29.6 20.9-38.5 9.5-8.97 20.7-13.45 33.7-13.45 12.8 0 21.4 4.6 26 13.9 4.6 9.3 4.7 22.2.28 38.7m36.8-81.4c-9.75-7.8-22.2-11.7-37.3-11.7-13.23 0-25.84 3-37.8 9.06-11.95 6.05-21.65 14.3-29.1 24.74l.18-1.2 8.83-28.1h-51.4l-13.1 48.9-.4 1.7-54 201.44h52.7l27.2-101.4c2.7 9.02 8.2 16.1 16.6 21.22 8.4 5.1 18.77 7.63 31.1 7.63 15.3 0 29.9-3.7 43.75-11.1 13.9-7.42 25.9-18.1 36.1-31.9 10.2-13.8 17.77-29.8 22.6-47.9 4.9-18.13 5.9-34.3 3.1-48.45-2.85-14.17-9.16-25.14-18.9-32.9m174.65 80.65c-4.5 16.7-11.4 29.5-20.7 38.3-9.3 8.86-20.5 13.27-33.5 13.27-13.3 0-22.3-4.3-27-13-4.8-8.7-4.9-21.3-.5-37.8 4.4-16.5 11.42-29.4 21.12-38.7 9.7-9.3 21.05-13.94 34.07-13.94 13 0 21.8 4.5 26.4 13.4 4.6 8.93 4.63 21.76.15 38.5zm23.5-87.85-6.73 25.1c-2.9-9.05-8.5-16.25-16.8-21.6-8.4-5.34-18.7-8-31-8-15.1 0-29.68 3.9-43.6 11.7-13.9 7.8-26.1 18.74-36.5 32.9-10.4 14.16-18 30.3-22.9 48.4-4.85 18.17-5.8 34.1-2.9 47.96 2.93 13.8 9.24 24.46 19 31.9 9.74 7.4 22.3 11.14 37.6 11.14 12.3 0 24.05-2.56 35.2-7.7a82.3 82.3 0 0 0 28.33-21.23l-7 26.18h51.9l47.38-176.7h-51.9zm269.87.06.03-.05h-31.9c-1.02 0-1.92.05-2.85.07h-16.55l-8.5 11.8-2.1 2.8-.9 1.4-67.25 93.68-13.9-109.7h-55.08l27.9 166.7-61.6 85.3h54.9l14.9-21.13c.42-.62.8-1.14 1.3-1.8l17.4-24.7.5-.7 77.93-110.5 65.7-93 .1-.06h-.03z" />
                            </svg>

                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total Amount:</span>
                      <span className="text-green-600">{formatPrice(cartTotal)}</span>
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
                        {formData.paymentMethod === 'online' ? 'Initiating Payment...' : 'Processing Order...'}
                      </>
                    ) : (
                      <>
                        <i className="ri-secure-payment-line"></i>
                        <span>{formData.paymentMethod === 'online' ? 'Pay Now' : 'Place Order'}</span>
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
        paymentMethod={formData.paymentMethod}
      />

      {/* Toaster for notifications */}
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

// Export the page component
export default function CheckoutPage() {
  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <Nav />
      <Checkout />
      <Footer />
    </>
  );
}