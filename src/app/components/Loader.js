// components/Loader.js
import React from 'react';

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-green-900 z-50">
      <div className="flex space-x-4">
        <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
        <div className="w-8 h-8 bg-green-500 rounded-full animate-bounce animation-delay-400"></div>
      </div>
    </div>
  );
}

export default Loader;