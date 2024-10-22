import React from 'react';

function Story() {
  return (
    <div className="relative font-afacadFlux bg-green-200 overflow-hidden ">
      {/* Full-width Image */}
      <img 
        src="https://img.freepik.com/premium-vector/native-american-male-farmer-his-50s-plowing-field_1238364-105433.jpg?w=826" 
        alt="Story Background" 
        className="w-screen h-96 object-cover"
      />

      {/* Overlay Section with Backdrop Blur */}
      <div className="absolute top-0 left-0 w-screen  md:w-1/2 h-full bg-white/10 backdrop-blur-md flex items-center p-8">
        <div className="text-slate-600">
          <h1 className="text-5xl font-semibold">Our Story</h1>
          <p className="mt-4  text-gray-500 text-xl">
            This is a brief description of our story. We started with a vision to create quality products and provide exceptional service. 
            
          </p>
        </div>
      </div>
    </div>
  );
}

export default Story;
