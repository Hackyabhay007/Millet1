import React from 'react';

const reviews = [
  {
    id: 1,
    rating: '⭐⭐⭐⭐⭐',
    text: "Purikam has changed my life for the better. I can't recommend it enough!",
  },
  {
    id: 2,
    imgSrc: 'https://img.freepik.com/premium-vector/man-standing-vector_211046-468.jpg?semt=ais_hybrid',
  },
  {
    id: 3,
    rating: '⭐⭐⭐⭐⭐',
    text: "Purikam product has changed my life for the better. I can't recommend it enough!", 
  },
  {
    id: 4,
    imgSrc: 'https://img.freepik.com/premium-vector/south-asian-girl-her-20s-attending-university_1238364-87880.jpg?ga=GA1.1.124401647.1710342314&semt=ais_hybrid',
  },
];

const loveImages = [
  'https://www.rosierfoods.com/cdn/shop/files/no-additives_2_642d2456-cc21-46a8-b108-01de2ecd962f.png?v=1711626982&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/harvest_2.png?v=1711626973&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/multiple_2.png?v=1711626982&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/organic-2_2_4d7c649d-a9ec-4ceb-81aa-519976cf5323.png?v=1711626982&width=75',
  'https://www.rosierfoods.com/cdn/shop/files/panigrahena_2_7eefacd1-281f-4c2f-9d4f-3151e13ef22c.png?v=1711626982&width=75',
];

function Why() {
  return (
    <div className="bg-green-50 font-afacadFlux">
      {/* Top Image */}
      <img
        src="https://cdn.prod.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg"
        alt="Banner"
        className="w-full h-96 object-cover object-center mb-8 shadow-md"
      />

{/* Green-Theme Section for PNG Images */}
<div className="bg-green-300 py-10">
  <h1 className="text-4xl font-bold text-green-800 text-center mb-10">
    Why Purikam
  </h1>
  <div className="flex flex-wrap justify-center gap-4 md:gap-8">
    {loveImages.map((imgSrc, index) => (
      <img
        key={index}
        src={imgSrc}
        alt={`Love Image ${index + 1}`}
        className="w-16 h-16 md:w-20 md:h-20 bg-green-500 p-1 rounded-full shadow-md"
      />
    ))}
  </div>
</div>



      {/* Reviews Section */}
      <h2 className="text-3xl font-bold text-green-800 text-center mt-12 mb-8">Customer Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-12 py-10">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white text-black rounded-lg shadow-lg flex flex-col items-center p-6">
            {review.rating ? (
              <>
                <div className="text-xl font-bold text-green-700">{review.rating}</div>
                <p className="mt-4 text-gray-800 font-medium text-center">{review.text}</p>
              </>
            ) : (
              <img
                src={review.imgSrc}
                alt={`Review Image ${review.id}`}
                className="w-40 h-40 object-cover rounded-full shadow-sm"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Why;
