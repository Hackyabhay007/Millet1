import React from 'react';

const milestones = [
  {
    year: "2024",
    title: "The Beginning",
    description: "Started with a vision to revive traditional agriculture in Rewa"
  },
  {
    year: "2025",
    title: "Community Growth",
    description: "Partnered with 100+ local farmers and launched first product line"
  },
  {
    year: "2026",
    title: "Expansion",
    description: "Reaching more communities and expanding product offerings"
  }
];

function Story() {
  return (
    <div className="font-afacadFlux bg-green-200 overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px]">
        <img 
          src="https://img.freepik.com/premium-vector/native-american-male-farmer-his-50s-plowing-field_1238364-105433.jpg?w=826"
          alt="Traditional farmer plowing field" 
          className="w-full h-full object-cover"
        />
        
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
              empowering local farmers through sustainable farming practices.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div className="grid md:grid-cols-2 gap-8 p-8 md:p-16 bg-green-100">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To bridge the gap between traditional farming wisdom and modern consumer needs,
              while ensuring sustainable livelihoods for our farming communities.
            </p>
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the leading force in reviving and modernizing traditional agriculture,
              making healthy, sustainable food accessible to all.
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-4">Our Values</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "ri-heart-line", text: "Farmer First" },
              { icon: "ri-leaf-line", text: "Sustainability" },
              { icon: "ri-scales-3-line", text: "Fair Trade" },
              { icon: "ri-recycle-line", text: "Eco-Friendly" }
            ].map((value, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm">
                <i className={`${value.icon} text-2xl text-green-600`}></i>
                <span className="text-gray-700">{value.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="p-8 md:p-16 bg-white">
        <h2 className="text-3xl font-semibold text-green-800 text-center mb-12">Our Plans</h2>
        <div className="max-w-4xl mx-auto">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex flex-col md:flex-row items-start mb-8 relative">
              <div className="md:w-32 flex-shrink-0">
                <div className="text-xl font-bold text-green-600">{milestone.year}</div>
              </div>
              <div className="flex-grow pl-4 md:pl-8 border-l-2 border-green-300">
                <h3 className="text-xl font-semibold text-green-800 mb-2">{milestone.title}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="grid md:grid-cols-3 gap-6 p-8 md:p-16 bg-green-50">
        {[
          { number: "10+", label: "Farmer Partners" },
          { number: "100+", label: "Happy Customers" },
          { number: "20+", label: "Product Varieties" }
        ].map((stat, index) => (
          <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm">
            <div className="text-4xl font-bold text-green-600 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-green-500 text-white text-center p-8 md:p-16">
        <h2 className="text-3xl font-semibold mb-4">Be Part of Our Story</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          Join us in our mission to revolutionize traditional agriculture and create
          a sustainable future for our farming communities.
        </p>
       <a href="/contact">
       <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
          Contact Us
        </button>
       </a>
      </div>
    </div>
  );
}

export default Story;