import React from 'react';

const reviews = [
  {
    id: 1,
    rating: '⭐⭐⭐⭐⭐',
    text: "Purikam has changed my life for the better. I can't recommend it enough!",
  },
  {
    id:2,
    imgSrc:'https://img.freepik.com/premium-vector/man-standing-vector_211046-468.jpg?semt=ais_hybrid'
   },  
  {
    id: 3,
    rating: '⭐⭐⭐⭐⭐',
    text: "Purikam product has changed my life for the better. I can't recommend it enough!", 
  },
 {
  id:4,
  imgSrc:'https://img.freepik.com/premium-vector/south-asian-girl-her-20s-attending-university_1238364-87880.jpg?ga=GA1.1.124401647.1710342314&semt=ais_hybrid'
 } 
];

// Add an array of new images for the pink background section
const loveImages = [
  'https://www.rosierfoods.com/cdn/shop/files/no-additives_2_642d2456-cc21-46a8-b108-01de2ecd962f.png?v=1711626982&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/harvest_2.png?v=1711626973&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/multiple_2.png?v=1711626982&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/organic-2_2_4d7c649d-a9ec-4ceb-81aa-519976cf5323.png?v=1711626982&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/panigrahena_2_7eefacd1-281f-4c2f-9d4f-3151e13ef22c.png?v=1711626982&width=75'
];

function Why() {
  return (
    <div className="bg-green-200 font-afacadFlux">
      {/* Top Image */}
      <img src="https://cdn.prod.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg" alt="Banner" className="w-screen h-96  object-cover object-center"/>
      
      {/* Heading */}
      {/* Pink Background for PNG Images */}
      <div className="bg-pink-500 pt-10 pb-20">
        {/* Description */}
        <h1 className="text-3xl font-bold text-white text-center mb-16">why Purikam</h1>
        <div className="grid ml-28 grid-cols-2 md:grid-cols-5 gap-4">
          {/* Four different PNG Images */}
          {loveImages.map((imgSrc, index) => (
            <img 
              key={index} 
              src={imgSrc} 
              alt={`Love Image ${index + 1}`} 
              className="w-16 h-16"
            />
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <h2 className="text-2xl font-bold text-center mt-6">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 mx-10 py-5">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-300 text-black h-80  rounded-lg shadow-md flex flex-col items-center">
            {review.rating ? (
              <>
                <div className="text-xl p-10">{review.rating}</div>
                <p className="mt-2 text-gray-600 p-10 font-semibold text-center">{review.text}</p>
              </>
            ) : (
              <>
                <img src={review.imgSrc} alt={`Review Image ${review.id}`} className="w-screen h-full object-cover rounded-lg "/>
                
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Why;
