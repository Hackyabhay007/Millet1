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
        ondismiss: function() {
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
                      onChange={(e) => setFormData({...formData,firstName: e.target.value})}
                      error={errors.firstName}
                    />
                    <InputField
                      label="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData,lastName: e.target.value})}
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
                      <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={() => setFormData({...formData, paymentMethod: 'cod'})}
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
                          onChange={() => setFormData({...formData, paymentMethod: 'online'})}
                          className="h-4 w-4 text-green-600 focus:ring-green-500"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">Pay Online</span>
                              <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Netbanking</p>
                            </div>
                            <img 
                              src="/razorpay-icon.png" 
                              alt="Razorpay" 
                              className="h-8"
                            />
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