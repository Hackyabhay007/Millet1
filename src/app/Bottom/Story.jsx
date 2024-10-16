import React from 'react';

function Story() {
  return (
    <div className="relative overflow-hidden my-5">
      {/* Full-width Image */}
      <img 
        src="https://images.pexels.com/photos/699422/pexels-photo-699422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        alt="Story Background" 
        className="w-screen h-96 object-cover"
      />

      {/* Overlay Section with Backdrop Blur */}
      <div className="absolute top-0 left-0 w-screen md:w-1/2 h-full bg-white/10 backdrop-blur-md flex items-center p-8">
        <div className="text-white">
          <h1 className="text-5xl font-semibold">Our Story</h1>
          <p className="mt-4  text-gray-300 text-xl">
            This is a brief description of our story. We started with a vision to create quality products and provide exceptional service. 
            Our journey has been filled with challenges and triumphs, and we are proud of what we ve achieved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Story;
