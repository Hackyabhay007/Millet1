import React from 'react';

function Story() {
  return (
    <div className="relative font-afacadFlux bg-green-200 overflow-hidden">
      {/* Full-width Image with next/image optimization */}
      <div className="w-full h-96 relative">
        <img 
          src="/api/placeholder/826/384"
          alt="Traditional farmer plowing field" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Section with Backdrop Blur */}
      <div className="absolute top-0 left-0 w-full md:w-1/2 h-full bg-white/10 backdrop-blur-md flex items-center p-4 md:p-8">
        <div className="text-slate-600 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Our Story
          </h1>
          <p className="mt-4 text-gray-500 text-base sm:text-lg md:text-xl leading-relaxed">
            Purikam is a startup rooted in Rewa, Madhya Pradesh, focused on 
            reviving traditional agriculture and promoting organic, millet-based 
            food products. We aim to provide healthy, ready-to-eat products while 
            empowering local farmers through sustainable farming practices. By 
            combining ancient wisdom with modern techniques, Purikam contributes 
            to rural development, community well-being, and environmental 
            sustainability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Story;