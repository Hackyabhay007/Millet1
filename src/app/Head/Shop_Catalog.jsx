"use client";

import React from 'react';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Cookies', imgSrc: 'https://images6.alphacoders.com/132/1325451.png' },
  { id: 2, name: 'Ghee', imgSrc: 'https://img.freepik.com/premium-photo/ghee-clarified-butter-bowl-with-spoon-white-background_641503-169994.jpg?semt=ais_hybrid' },
  { id: 3, name: 'Honey', imgSrc: 'https://img.freepik.com/free-photo/honey-jar-ai-generated-image_268835-5046.jpg' },
  { id: 4, name: 'Laddo', imgSrc: 'https://t4.ftcdn.net/jpg/06/14/80/29/360_F_614802940_yWmEJuNkUL93Bc0CjtFiJd7uriozeNr4.jpg' },
  { id: 5, name: 'Latta', imgSrc: 'https://gcdnb.pbrd.co/images/VwRneHMiU6Fo.png?o=1' },
  { id: 6, name: 'Ready To Eat', imgSrc: 'https://img.freepik.com/premium-vector/ready-eat-meal-sign-label-precooked-food-vector-stock-illustration_100456-11823.jpg' },
];

function ShopCatalog({ onCategoryClick }) {
  return (
    <div className="relative bg-green-50 min-h-screen py-10">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-20" style={{ backgroundImage: 'url(https://your-background-image-url.jpg)' }} />

      {/* Watermark */}
      <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <h1 className="text-green-700 opacity-5 text-9xl font-bold animate-watermark">
          GreenStupe
        </h1>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-green-700 mb-8 text-center animate-fade-in">
          Shop by Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/Shop`}
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="bg-white rounded-lg shadow-md transition-all duration-500 ease-in-out transform hover:-translate-y-2 hover:scale-105 hover:bg-green-100 animate-slide-in">
                <div className="relative h-48 rounded-t-lg overflow-hidden">
                  <img
                    src={category.imgSrc}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 py-4">
                  <h3 className="text-xl font-semibold text-green-800 mb-2">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
        .animate-watermark {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateY(20px); }
          to { transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

export default ShopCatalog;
