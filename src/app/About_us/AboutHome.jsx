import React from 'react';
function AboutHome() {
    return (
        <div className="relative font-afacadFlux w-screen">
            <img
                src="https://images.pexels.com/photos/7412053/pexels-photo-7412053.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="About Us"
                className="w-full min-h-20 h-96 object-cover" // Makes the image responsive and cover the container
            />
            <div className="absolute inset-0 bg-black opacity-75 flex items-center justify-center">
                <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
                    About Us
                </h1>
            </div>
        </div>
    );
}

export default AboutHome;
