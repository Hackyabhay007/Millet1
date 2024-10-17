import React from 'react';

// Functional Component
function HomeImg() {
  return (
    <div className="relative font-afacadFlux w-screen h-96 overflow-hidden"> 
      <img 
        src="https://img.freepik.com/premium-vector/horizontal-banner-with-organic-food-composition-with-vegetables-plate-different-fresh-products-greenery-fruit-drinks-monochrome-vector-illustration-lineart-style_198278-7459.jpg" 
        alt="Organic Food"
        className="absolute  top-0 left-0 w-full h-full object-bottom object-contain" // Full screen and responsive properties
      />
      <div className="absolute inset-0 flex items-center justify-center text-white"> 
        {/* Optional overlay for text visibility */}
        
      </div>
      
    </div>
  );
}

export default HomeImg;
