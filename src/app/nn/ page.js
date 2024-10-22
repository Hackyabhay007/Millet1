"use client";

import dynamic from 'next/dynamic';
import Nav from "@/app/Head/Nav";
import Footer from "@/app/Bottom/Footer";

const OrderHistory = dynamic(() => import('../History/OrderHistory'), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
    </div>
  ),
  ssr: false
});

export default function Page() {
  return (
    <main className="min-h-screen">
      <Nav />
      <OrderHistory />
      <Footer />
    </main>
  );
}