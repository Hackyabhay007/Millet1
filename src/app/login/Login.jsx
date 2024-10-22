"use client";

import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import 'remixicon/fonts/remixicon.css';
import { useRouter } from 'next/navigation';  // For Next.js 13+
function Login() {
  // Form States
  const router = useRouter();
  const [isFlipped, setIsFlipped] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Reset states when switching forms
  const resetStates = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAcceptTerms(false);
    setFormError('');
    setFormSuccess('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Handle login submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsLoading(true);

    if (!email || !password) {
      setFormError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setFormSuccess('Login successful! Redirecting...');
      handleRedirect()
    } catch (error) {
      setFormError(
        error.code === 'auth/wrong-password' ? 'Invalid email or password.' :
        error.code === 'auth/user-not-found' ? 'No account found with this email.' :
        'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRedirect = () => {
    setTimeout(() => {
      router.push('/'); // Redirect to home page
      router.refresh(); // Refresh the page to update auth state
    }, 1500); // Small delay to show success message
  };


  // Handle sign-up submission
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsLoading(true);

    if (!email || !password || !confirmPassword) {
      setFormError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setFormError('You must accept the terms and conditions');
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "Users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      setFormSuccess('Account created successfully! Redirecting...');
      // Add your redirect logic here
    } catch (error) {
      setFormError(
        error.code === 'auth/email-already-in-use' ? 'An account with this email already exists.' :
        error.code === 'auth/weak-password' ? 'Password should be at least 6 characters.' :
        'Sign up failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsLoading(true);

    if (!email) {
      setFormError('Please enter your email address.');
      setIsLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setFormSuccess('Password reset email sent! Please check your inbox.');
    } catch (error) {
      setFormError(
        error.code === 'auth/user-not-found' ? 'No account found with this email.' :
        'Failed to send reset email. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent ml-2"/>
  );

  return (
    <div className="min-h-screen py-8 font-afacadFlux bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className={`transform transition-all duration-500 ${isFlipped ? 'scale-95' : ''}`}>
          
          {/* Forgot Password Form */}
          {showForgotPassword && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
                <p className="text-gray-600">Enter your email to receive a reset link</p>
              </div>
              
              <form onSubmit={handleForgotPassword} className="space-y-4">
                {formError && <p className="text-red-500 text-sm">{formError}</p>}
                {formSuccess && <p className="text-green-600 text-sm">{formSuccess}</p>}
                
                <div>
                  <label className="block text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>Send Reset Link <LoadingSpinner /></>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword(false);
                    resetStates();
                  }}
                  className="w-full text-green-600 hover:text-green-700"
                >
                  Back to Login
                </button>
              </form>
            </div>
          )}

          {/* Login Form */}
          {!showForgotPassword && !isFlipped && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Login</h2>
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {formError && <p className="text-red-500 text-sm">{formError}</p>}
                {formSuccess && <p className="text-green-600 text-sm">{formSuccess}</p>}
                
                <div>
                  <label className="block text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-gray-700 mb-1.5">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line`}></i>
                  </button>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(true);
                      resetStates();
                    }}
                    className="text-green-600 hover:text-green-700 text-sm"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>Logging in <LoadingSpinner /></>
                  ) : (
                    'Login'
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  New user?{' '}
                  <button
                    onClick={() => {
                      setIsFlipped(true);
                      resetStates();
                    }}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          {!showForgotPassword && isFlipped && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Create an account</h2>
              <form onSubmit={handleSignUpSubmit} className="space-y-4">
                {formError && <p className="text-red-500 text-sm">{formError}</p>}
                {formSuccess && <p className="text-green-600 text-sm">{formSuccess}</p>}

                <div>
                  <label className="block text-gray-700 mb-1.5">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-gray-700 mb-1.5">Password</label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`ri-${showPassword ? 'eye-off' : 'eye'}-line`}></i>
                  </button>
                </div>

                <div className="relative">
                  <label className="block text-gray-700 mb-1.5">Confirm password</label>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`ri-${showConfirmPassword ? 'eye-off' : 'eye'}-line`}></i>
                  </button>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 mr-2"
                    required
                  />
                  <p className="text-sm text-gray-600">
                    I accept the{' '}
                    <a href="#" className="text-green-600 hover:text-green-700">
                      Terms and Conditions
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  {isLoading ? (
                    <>Creating account <LoadingSpinner /></>
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>

              <div className="text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setIsFlipped(false);
                      resetStates();
                    }}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Login;