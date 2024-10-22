"use client";

import dynamic from 'next/dynamic';
import Nav from "@/app/Head/Nav";
import Footer from "@/app/Bottom/Footer";
import { Toaster } from 'react-hot-toast';

// Dynamically import the OrderHistory component
const OrderHistory = dynamic(() => import('./OrderHistory'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  ),
  ssr: false
});

export default function HistoryPage() {
  return (
    <>
      <Nav />
      <OrderHistory />
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          }
        }}
      />
    </>
  );
}