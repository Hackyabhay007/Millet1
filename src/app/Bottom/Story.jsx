import React from 'react';

function Story() {
  return (
    <div className="relative font-afacadFlux bg-green-200 overflow-hidden">
      {/* Full-width Image */}
      <img 
        src="https://img.freepik.com/premium-vector/native-american-male-farmer-his-50s-plowing-field_1238364-105433.jpg?w=826" 
        alt="Story Background" 
        className="w-screen h-96 object-cover"
      />

      {/* Overlay Section with Backdrop Blur */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-white/10 backdrop-blur-md flex items-center p-4 md:p-8">
        <div className="text-slate-600 w-full">
          <h1 className="text-4xl md:text-5xl font-semibold">Our Story</h1>
          <p className="mt-4 text-gray-500 text-base md:text-xl">
            Purikam is a startup rooted in Rewa, Madhya Pradesh, focused on reviving traditional agriculture and promoting organic, millet-based food products. We aim to provide healthy, ready-to-eat products while empowering local farmers through sustainable farming practices. By combining ancient wisdom with modern techniques, Purikam contributes to rural development, community well-being, and environmental sustainability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Story;
