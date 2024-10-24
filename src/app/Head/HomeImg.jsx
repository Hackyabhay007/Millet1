"use client";

import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Loader from '../components/Loader';

function HomeImg() {
  const [heroSections, setHeroSections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroSections = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, 'heroSections'));
        const sections = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        if (sections.length === 0) {
          setError('No hero sections found');
          return;
        }
        
        setHeroSections(sections);
      } catch (err) {
        console.error('Error fetching hero sections:', err);
        setError('Failed to load content');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroSections();
  }, []);

  useEffect(() => {
    if (heroSections.length === 0) return;

    const intervalId = setInterval(() => {
      handleNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [heroSections]);

  const handleNext = () => {
    if (heroSections.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroSections.length);
  };

  const handlePrev = () => {
    if (heroSections.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroSections.length) % heroSections.length);
  };

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center">
      <Loader />
    </div>
  );

  if (error) return (
    <div className="h-screen flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  if (!heroSections.length) return (
    <div className="h-screen flex items-center justify-center">
      No content available
    </div>
  );

  const currentSection = heroSections[currentIndex];
  if (!currentSection) return (
    <div className="h-screen flex items-center justify-center">
      Error loading content
    </div>
  );

  const { 
    title = 'Default Title', 
    subheading = 'Default Subheading', 
    buttonName = 'Learn More', 
    link = '#', 
    image = '', 
    background = 'bg-gray-100' 
  } = currentSection;

  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center relative ${background} bg-cover bg-center h-screen`}
    >
      {/* Text Section */}
      <div className="flex flex-col justify-center items-center text-center md:text-left w-full md:w-1/2 z-10 p-6 md:p-12 backdrop-blur-md">
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
              key={section.id || index}
              src={section.image}
              alt={section.title || `Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0 rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Carousel Navigation Buttons */}
      {heroSections.length > 1 && (
        <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2 z-20 px-4">
          <button
            onClick={handlePrev}
            className="border border-gray-500 bg-white/80 p-2 rounded-full shadow-lg hover:bg-gray-200 hover:border-gray-700 transition duration-200"
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <button
            onClick={handleNext}
            className="border border-gray-500 bg-white/80 p-2 rounded-full shadow-lg hover:bg-gray-200 hover:border-gray-700 transition duration-200"
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default HomeImg;