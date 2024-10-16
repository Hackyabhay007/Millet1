import React from 'react';
import Image from 'next/image'; // Import the Image component

function Contact_location() {
    return (
        <div className="w-screen bg-gray-300">
            {/* Cards Section */}
            <div className="max-w-4xl mx-auto px-5 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Contact Number */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Contact Number</h2>
                    <p className="text-gray-700">+91-9711580581</p>
                    <p className="text-gray-700">+91 120-4244430</p>
                </div>

                {/* Card 2: Location */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Location</h2>
                    <p className="text-gray-700">
                        Village - Gesupur Janubi, Kithore, Mawana, Meerut, Uttar Pradesh-250406
                    </p>
                </div>

                {/* Card 3: Email */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">Email</h2>
                    <p className="text-gray-700">care@rosierfoods.com</p>
                </div>
            </div>

            {/* Images Section */}
            <div className="bg-slate-700 w-screen mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Image 1 */}
                <div className="flex flex-col items-center">
                    <Image 
                        src="https://www.rosierfoods.com/cdn/shop/files/5.png?v=1711636095&width=150"
                        alt="Image 1"
                        width={150} // Specify width
                        height={150} // Specify height
                        className="w-24 mb-2"
                    />
                    <span className='text-green-400 font-semibold text-lg'>Quality</span>
                </div>

                {/* Image 2 */}
                <div className="flex flex-col items-center">
                    <Image 
                        src="https://www.rosierfoods.com/cdn/shop/files/6.png?v=1711636096&width=150"
                        alt="Image 2"
                        width={150}
                        height={150}
                        className="w-24 mb-2"
                    />
                    <span className='text-green-400 font-semibold text-lg'>Natural</span>
                </div>

                {/* Image 3 */}
                <div className="flex flex-col items-center">
                    <Image 
                        src="https://www.rosierfoods.com/cdn/shop/files/7.png?v=1711636095&width=150"
                        alt="Image 3"
                        width={150}
                        height={150}
                        className="w-24 mb-2"
                    />
                    <span className='text-green-400 font-semibold text-lg'>Chemical free</span>
                </div>

                {/* Image 4 */}
                <div className="flex flex-col items-center">
                    <Image 
                        src="https://www.rosierfoods.com/cdn/shop/files/8.png?v=1711636096&width=150"
                        alt="Image 4"
                        width={150}
                        height={150}
                        className="w-24 mb-2"
                    />
                    <span className='text-green-400 font-semibold text-lg'>Organic</span>
                </div>
            </div>
        </div>
    );
}

export default Contact_location;
