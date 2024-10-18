"use client";
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import 'remixicon/fonts/remixicon.css';
// Functional Component
function HomeImg() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isManual, setIsManual] = useState(false); // To detect manual interaction
  const autoScrollRef = useRef();

  // Array of images for the carousel
  const images = [
    "https://cdn.farmjournal.com/s3fs-public/styles/840x600/public/2024-07/organic.png",
    "https://regencyhealthcare.in/wp-content/uploads/2019/09/03_09_Sept_blog.jpg",
    "https://blog.nasm.org/hubfs/food-restriction-header.jpg",
    "https://img.freepik.com/premium-photo/happy-indian-farmer-family-smiling-green-field-bright-sunny-day_1076263-3881.jpg",
  ];

  // Auto-scroll functionality
  useEffect(() => {
    // If manual interaction occurs, stop auto-scroll for a moment
    if (!isManual) {
      autoScrollRef.current = setInterval(() => {
        nextImage();
      }, 100); // Auto scroll every 3 seconds
    }

    return () => clearInterval(autoScrollRef.current); // Cleanup on component unmount or manual scroll
  }, [isManual]);

  // Debounce manual scrolling for 5 seconds before reactivating auto-scroll
  useEffect(() => {
    if (isManual) {
      const manualScrollTimeout = setTimeout(() => {
        setIsManual(false); // Re-enable auto-scroll after 5 seconds
      }, 5000);
      return () => clearTimeout(manualScrollTimeout); // Cleanup on unmount
    }
  }, [isManual]);

  // Handle manual image navigation
  const prevImage = () => {
    setIsManual(true); // Mark interaction as manual
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const nextImage = () => {
    setIsManual(true); // Mark interaction as manual
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="relative flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between h-[32rem] font-afacadFlux w-screen p-4 bg-orange-50">
      {/* Left Section: Company Name, Tagline, and Button */}
      <div className="w-full md:w-1/2  flex flex-col justify-center items-center text-center md:items-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">Rewa</h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-700">
          Bringing Nature’s Goodness to Your Home <i class="ri-plant-line"></i>
        </p>
      <Link href="/About_us"><button className="mt-6 px-6 py-3 bg-green-600 text-white shadow-lg hover:bg-green-900 transition duration-100">
          Know More
        </button></Link>
      </div>

      {/* Right Section: Image Carousel */}
      <div className="relative w-full md:w-1/2 h-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-full relative">
          <div
            className="absolute w-full h-full flex transform transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentImageIndex * 100}%)`,
            }}
          >
            {/* Render the images */}
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-sm"
                style={{ minWidth: "100%" }}
              />
            ))}
          </div>
        </div>

        {/* Left and Right Buttons */}
        <button
          className="absolute left-4 text-gray-900 text-xl font-bold border border-gray-600 backdrop-blur-sm bg-white/20 p-3 rounded-full hover:bg-green-100 transition duration-300"
          onClick={prevImage}
        >
          &lt;
        </button>
        <button
          className="absolute right-4 text-gray-900 text-xl font-bold border border-gray-600 backdrop-blur-sm bg-white/20 p-3 rounded-full hover:bg-green-100 transition duration-300"
          onClick={nextImage}
        >
          &gt;
        </button>

        {/* Image index indicators */}
        <div className="absolute bottom-4 flex space-x-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-green-500' : 'bg-gray-400'
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeImg;
