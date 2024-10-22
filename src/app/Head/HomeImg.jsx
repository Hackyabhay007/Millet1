"use client";
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Adjust the import path to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';

function HomeImg() {
  const [heroSections, setHeroSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchHeroSections = async () => {
      const querySnapshot = await getDocs(collection(db, 'heroSections'));
      const sections = querySnapshot.docs.map(doc => doc.data());
      setHeroSections(sections);
    };

    fetchHeroSections();
  }, []);

  useEffect(() => {
    // Auto-scroll functionality
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000); // Change every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [heroSections]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSections.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroSections.length) % heroSections.length);
  };

  if (!heroSections.length) return <div>Loading...</div>;

  const {title, subheading, buttonName, link, image, background } = heroSections[currentIndex];

  return (
    <div 
      className={`flex font-afacadFlux flex-col md:flex-row items-center h-auto relative ${background}`}  // Dynamically apply background class
    >
      {/* Left Section: Title, Subheading, and Button */}
      <div className="flex flex-col justify-center items-center text-center md:text-left w-full md:w-1/2 z-10 p-4">
        <h1 className="text-3xl md:text-5xl font-bold text-green-600">{title}</h1>
        <p className="mt-4 text-lg md:text-xl text-green-500">{subheading}</p>
        <a 
          href={link} 
          className="mt-6 px-6 py-3 bg-green-600 text-white shadow-lg hover:bg-green-900 transition duration-100"
        >
          {buttonName}
        </a>
      </div>

      {/* Right Section: Image */}
      <div className="w-full h-auto md:w-1/2 flex justify-center overflow-hidden relative z-0">
        <div className="flex transition-transform duration-500 ease-in-out" 
             style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {heroSections.map((section, index) => (
            <img
              key={index}
              src={section.image}
              alt={section.title}
              className="w-fit h-full object-cover  flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Carousel Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2 z-20 px-4">
        <button 
          onClick={handlePrev} 
          className="border border-gray-700 bg-white/20 p-3 rounded-full hover:bg-gray-300 transition duration-200 mx-4"
        >
          &lt;
        </button>
        <button 
          onClick={handleNext} 
          className="border border-gray-700 bg-white/20 p-3 rounded-full hover:bg-gray-300 transition duration-200 mx-4"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default HomeImg;
