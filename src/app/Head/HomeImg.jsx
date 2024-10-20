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

  // Array of text and button labels for the text carousel
  const carouselContent = [
    {
      heading: "Rewa",
      tagline: "Bringing Nature’s Goodness to Your Home",
      buttonText: "Know More",
      buttonLink: "/About_us",
      icon: "ri-plant-line"
    },
    {
      heading: "Diwali Offer",
      tagline: "Celebrate with Organic Delights!",
      buttonText: "Explore Offers",
      buttonLink: "/Offers",
      icon: "ri-gift-line"
    },
    {
      heading: "Fresh from the Farm",
      tagline: "Taste the Purity of Organic Farming",
      buttonText: "Shop Now",
      buttonLink: "/Shop",
      icon: "ri-leaf-line"
    },
    {
      heading: "Sustainable Living",
      tagline: "Nourish Your Body and the Planet",
      buttonText: "Learn More",
      buttonLink: "/Sustainability",
      icon: "ri-earth-line"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    // If manual interaction occurs, stop auto-scroll for a moment
    if (!isManual) {
      autoScrollRef.current = setInterval(() => {
        nextImage();
      }, 1000); // Auto scroll every 3 seconds
    }

    return () => clearInterval(autoScrollRef.current); // Cleanup on component unmount or manual scroll
  }, [isManual]);

  // Debounce manual scrolling for 5 seconds before reactivating auto-scroll
  useEffect(() => {
    if (isManual) {
      const manualScrollTimeout = setTimeout(() => {
        setIsManual(false); // Re-enable auto-scroll after 1 seconds
      }, 1000);
      return () => clearTimeout(manualScrollTimeout); // Cleanup on unmount
    }
  }, [isManual]);

  // Handle manual image and text navigation
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
    <div className="relative flex flex-col gap-5 md:gap-0 md:flex-row items-center justify-between h-[32rem] font-afacadFlux w-screen p-4 bg-green-200">
      {/* Left Section: Carousel button, Company Name, Tagline, and Button */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center  md:text-left relative">
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">
          {carouselContent[currentImageIndex].heading}
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-700">
          {carouselContent[currentImageIndex].tagline}{' '}
          <i className={carouselContent[currentImageIndex].icon}></i>
        </p>
        <Link href={carouselContent[currentImageIndex].buttonLink}>
          <button className="mt-6 px-6 py-3 bg-green-600 text-white shadow-lg hover:bg-green-900 transition duration-100">
            {carouselContent[currentImageIndex].buttonText}
          </button>
        </Link>
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

      {/* Carousel Buttons */}
      <div className="absolute inset-0 flex justify-between  items-center px-5">
        {/* Left Button */}
        <button
          className="text-gray-900 text-xl font-bold border border-gray-600 backdrop-blur-sm bg-white/20 p-3 rounded-full hover:bg-green-100 transition duration-300"
          onClick={prevImage}
        >
          &lt;
        </button>

        {/* Right Button */}
        <button
          className="text-gray-900 text-xl font-bold border border-gray-600 backdrop-blur-sm bg-white/20 p-3 rounded-full hover:bg-green-100 transition duration-300"
          onClick={nextImage}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default HomeImg;
