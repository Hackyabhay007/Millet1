"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Update this path to your Firebase setup
import { collection, getDocs } from 'firebase/firestore';
import Loader from '../components/Loader';
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
    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [heroSections]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSections.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroSections.length) % heroSections.length);
  };

  if (!heroSections.length) return <div><Loader/></div>;

  const { title, subheading, buttonName, link, image, background } = heroSections[currentIndex];

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center relative ${background} bg-cover bg-center h-screen`}
    >
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center text-center md:text-left w-full md:w-1/2 z-10 p-6 md:p-12  backdrop-blur-md">
        <h1 className="text-3xl md:text-5xl font-bold text-green-700">{title}</h1>
        <p className="mt-4 text-lg md:text-xl">{subheading}</p>
        <a
          href={link}
          className="mt-6 px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
        >
          {buttonName}
        </a>
      </div>

      {/* Image Carousel */}
      <div className="w-full h-3/5 md:h-full md:w-1/2 flex justify-center overflow-hidden relative z-0">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {heroSections.map((section, index) => (
            <img
              key={index}
              src={section.image}
              alt={section.title}
              className="w-full h-full object-cover flex-shrink-0 rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Carousel Navigation Buttons */}
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2 z-20">
        <button
          onClick={handlePrev}
          className="border border-gray-500 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 hover:border-gray-700 transition duration-200"
        >
          &lt;
        </button>
        <button
          onClick={handleNext}
          className="border border-gray-500 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 hover:border-gray-700 transition duration-200"
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default HomeImg;
