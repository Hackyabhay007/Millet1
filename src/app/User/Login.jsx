"use client";

import React, { useState } from 'react';
import 'remixicon/fonts/remixicon.css';  // Import Remix Icon

function Login() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with', { email, password });
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    if (!acceptTerms) {
      alert('You must accept the terms and conditions');
      return;
    }
    console.log('Signing up with', { email, password });
  };

  return (
    <div className="h-fit py-2 font-afacadFlux bg-gray-100 flex items-center justify-center">

      {/* Login Form */}
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg px-6 py-3">
        {/* Flip Card Container */}
        <div className={`w-full h-full transform transition-transform duration-700 ${isFlipped ? ' scale-95' : ''}`}>
          {/* Login Form */}
          <div className={`w-full ${isFlipped ? 'hidden' : ''}`}>
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleLoginSubmit}>
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
                <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold"
              >
                Login
              </button>
            </form>
            <div className="flex justify-between items-center mt-4">
              <p>New user?</p>
              <button onClick={() => setIsFlipped(true)} className="text-blue-500 hover:underline">
                Create an account
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">
              <i class="ri-google-fill"></i> Log in with Google
              </button>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className={`w-full ${isFlipped ? '' : 'hidden'}`}>
            <h2 className="text-2xl font-bold mb-6">Create an account</h2>
            <form onSubmit={handleSignUpSubmit}>
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
                className="w-full bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
              >
                Create an account
              </button>
            </form>
            <div className="flex justify-between items-center mt-4">
              <p>Already have an account?</p>
              <button onClick={() => setIsFlipped(false)} className="text-blue-500 hover:underline">
                Login here
              </button>
            </div>
            <div className="mt-6 flex justify-center">
              <button className="bg-red-500 text-white  px-4 py-2 rounded-full hover:bg-red-600">
              <i class="ri-google-fill font-thin"></i> Sign up with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
