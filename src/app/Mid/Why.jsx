import React from 'react';

const reviews = [
  {
    id: 1,
    rating: '⭐⭐⭐⭐⭐',
    text: "Purikam has changed my life for the better. I can't recommend it enough!",
    author: "Rahul Sharma",
    location: "Rewa, MP"
  },
  {
    id: 2,
    imgSrc: 'https://img.freepik.com/premium-vector/man-standing-vector_211046-468.jpg?semt=ais_hybrid',
    name: "Anil Kumar"
  },
  {
    id: 3,
    rating: '⭐⭐⭐⭐⭐',
    text: "Purikam product has changed my life for the better. I can't recommend it enough!",
    author: "Priya Singh",
    location: "Bhopal, MP"
  },
  {
    id: 4,
    imgSrc: 'https://img.freepik.com/premium-vector/south-asian-girl-her-20s-attending-university_1238364-87880.jpg?ga=GA1.1.124401647.1710342314&semt=ais_hybrid',
    name: "Meera Patel"
  },
];

const loveImages = [
  {
    src: 'https://www.rosierfoods.com/cdn/shop/files/no-additives_2_642d2456-cc21-46a8-b108-01de2ecd962f.png?v=1711626982&width=75',
    title: 'No Additives',
    description: 'Pure and natural ingredients only'
  },
  {
    src: 'https://www.rosierfoods.com/cdn/shop/files/harvest_2.png?v=1711626973&width=75',
    title: 'Fresh Harvest',
    description: 'Direct from local farmers'
  },
  {
    src: 'https://www.rosierfoods.com/cdn/shop/files/multiple_2.png?v=1711626982&width=75',
    title: 'Variety',
    description: 'Wide range of products'
  },
  {
    src: 'https://www.rosierfoods.com/cdn/shop/files/organic-2_2_4d7c649d-a9ec-4ceb-81aa-519976cf5323.png?v=1711626982&width=75',
    title: 'Organic',
    description: 'Certified organic products'
  },
  {
    src: 'https://www.rosierfoods.com/cdn/shop/files/panigrahena_2_7eefacd1-281f-4c2f-9d4f-3151e13ef22c.png?v=1711626982&width=75',
    title: 'Traditional',
    description: 'Ancient wisdom, modern methods'
  },
];

const benefits = [
  {
    title: "Farmer Empowerment",
    description: "Supporting local farmers with fair prices and sustainable practices",
    icon: "ri-plant-line"
  },
  {
    title: "Health & Wellness",
    description: "Providing nutritious, chemical-free food options",
    icon: "ri-heart-pulse-line"
  },
  {
    title: "Environmental Impact",
    description: "Promoting eco-friendly farming and packaging",
    icon: "ri-earth-line"
  },
  {
    title: "Community Growth",
    description: "Building stronger rural communities through agriculture",
    icon: "ri-team-line"
  }
];

function Why() {
  return (
    <div className="bg-green-50 font-afacadFlux">
      {/* Hero Banner */}
      <div className="relative">
        <img
          src="https://cdn.prod.website-files.com/5bff8886c3964a992e90d465/5c00621b7aefa4f9ee0f4303_wide-shot.svg"
          alt="Banner"
          className="w-full h-96 object-cover object-center shadow-md"
        />
        <div className="absolute inset-0 bg-green-900/70 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Why Choose Purikam
          </h1>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 leading-relaxed">
          At Purikam, we're committed to reviving traditional agriculture while embracing modern sustainability. 
          Our journey begins with local farmers and ends with healthy, happy customers - creating a positive impact 
          at every step.
        </p>
      </div>

      {/* Features Section */}
      <div className="bg-green-300 py-16">
        <h2 className="text-4xl font-bold text-green-800 text-center mb-12">
          What Sets Us Apart
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto px-4">
          {loveImages.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-black p-4 rounded-full shadow-lg mb-4">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-16 h-16 md:w-20 md:h-20"
                />
              </div>
              <h3 className="text-green-800 font-semibold text-center mb-2">{item.title}</h3>
              <p className="text-sm text-green-900/80 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="py-16 px-4">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-12">Our Impact</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <i className={`${benefit.icon} text-3xl text-green-600 mb-4`}></i>
              <h3 className="text-xl font-bold text-green-800 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-green-100 py-16 px-4">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-12">Customer Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
              {review.rating ? (
                <>
                  <div className="text-xl mb-4">{review.rating}</div>
                  <p className="text-gray-800 font-medium mb-4">{review.text}</p>
                  <div className="text-green-700 font-semibold">{review.author}</div>
                  <div className="text-sm text-gray-500">{review.location}</div>
                </>
              ) : (
                <div className="text-center">
                  <img
                    src={review.imgSrc}
                    alt={review.name}
                    className="w-32 h-32 mx-auto rounded-full shadow-sm mb-4"
                  />
                  <div className="font-semibold text-green-700">{review.name}</div>
                  <div className="text-sm text-gray-500">Satisfied Customer</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-600 text-white py-16 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Join the Purikam Family</h2>
        <p className="max-w-2xl mx-auto mb-8">
          Experience the goodness of traditional agriculture with modern convenience. 
          Start your journey towards healthier living today.
        </p>
        <a href="/Shop">
        <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
          Shop Now With Us
        </button>
        </a>
        
      </div>
    </div>
  );
}

export default Why;