"use client"; // For Next.js environment, enable client-side rendering

import React, { useState } from 'react';
import { auth, provider, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore functions
import 'remixicon/fonts/remixicon.css';  // Import Remix Icon

function Login() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState(''); // State to track form errors
  const [formSuccess, setFormSuccess] = useState(''); // State to track form success message

  // Handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Reset previous error or success messages
    setFormError('');
    setFormSuccess('');

    // Validation: Check for empty fields
    if (!email || !password) {
      setFormError('Please fill out all fields.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in successfully:', user);
        setFormSuccess('Login Success!'); // Show success message
        // Redirect or update UI with user profile
      })
      .catch((error) => {
        setFormError('Login failed: ' + error.message);
      });
  };

  // Handle sign-up submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous error or success messages
    setFormError('');
    setFormSuccess('');

    // Validation: Check for empty fields and mismatched passwords
    if (!email || !password || !confirmPassword) {
      setFormError('Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }

    if (!acceptTerms) {
      setFormError('You must accept the terms and conditions');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore 'Users' collection
      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      console.log('Account created and user data stored successfully:', user);
      setFormSuccess('Sign-Up Success!'); // Show success message
      // Redirect or update UI, possibly to profile page
    } catch (error) {
      setFormError('Sign up failed: ' + error.message);
    }
  };

  // Handle forgot password
  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email sent!');
      })
      .catch((error) => {
        alert('Error sending reset email: ' + error.message);
      });
  };

  return (
    <div className="h-fit py-2 font-afacadFlux bg-gray-100 flex items-center justify-center">
      {/* Login Form */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg px-6 py-3">
        <div className={`w-full h-full transform transition-transform duration-700 ${isFlipped ? ' scale-95' : ''}`}>
          
          {/* Login Form */}
          <div className={`w-full ${isFlipped ? 'hidden' : ''}`}>
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              {formError && <p className="text-red-500">{formError}</p>} {/* Error message */}
              {formSuccess && <p className="text-green-500">{formSuccess}</p>} {/* Success message */}
              <div className="mb-4">
                <label className="block mb-2 text-lg">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block mb-2 text-lg">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  placeholder="••••••••"
                  required
                />
                <i
                  className={`ri-eye-line absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'ri-eye-off-line' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              <div className="flex justify-between items-center mb-6">
                <button type="button" onClick={handleForgotPassword} className="text-blue-500 hover:underline">Forgot password?</button>
              </div>
              <button
                type="submit"
                className={`w-full ${formSuccess ? 'bg-green-500' : 'bg-blue-500'} text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold`}
              >
                {formSuccess ? 'Login Success' : 'Login'}
              </button>
            </form>
            <div className="flex justify-between items-center mt-4">
              <p>New user?</p>
              <button onClick={() => setIsFlipped(true)} className="text-blue-500 hover:underline">
                Create an account
              </button>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className={`w-full ${isFlipped ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-bold mb-6">Create an account</h2>
            <form onSubmit={handleSignUpSubmit}>
              {formError && <p className="text-red-500">{formError}</p>} {/* Error message */}
              {formSuccess && <p className="text-green-500">{formSuccess}</p>} {/* Success message */}
              <div className="mb-4">
                <label className="block mb-2 text-lg">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div className="mb-4 relative">
                <label className="block mb-2 text-lg">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  placeholder="••••••••"
                  required
                />
                <i
                  className={`ri-eye-line absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer ${showPassword ? 'ri-eye-off-line' : ''}`}
                  onClick={() => setShowPassword(!showPassword)}
                ></i>
              </div>
              <div className="mb-4 relative">
                <label className="block mb-2 text-lg">Confirm password</label>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-400 rounded"
                  placeholder="••••••••"
                  required
                />
                <i
                  className={`ri-eye-line absolute right-3 top-3/4 transform -translate-y-1/2 cursor-pointer ${showConfirmPassword ? 'ri-eye-off-line' : ''}`}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                ></i>
              </div>
              <div className="mb-4 flex items-center">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="mr-2"
                  required
                />
                <p>I accept the <a href="#" className="text-blue-500 hover:underline">Terms and Conditions</a></p>
              </div>
              <button
                type="submit"
                className={`w-full ${formSuccess ? 'bg-green-500' : 'bg-blue-500'} text-white px-6 py-2 rounded hover:bg-green-700 font-semibold`}
              >
                {formSuccess ? 'Sign-Up Success' : 'Create an account'}
              </button>
            </form>
            <div className="flex justify-between items-center mt-4">
              <p>Already have an account?</p>
              <button onClick={() => setIsFlipped(false)} className="text-blue-500 hover:underline">
                Login here
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
