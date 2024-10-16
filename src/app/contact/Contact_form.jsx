import React from 'react';

function Contact_form() {
    return (
        <div className="min-h-screen bg-slate-700 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-semibold text-white mb-4">Contact Information</h1>
            <p className="text-lg text-gray-300 font-thin mb-6 text-center">
                We’d love to hear about your experience with Rosier. <br />
                Please get in touch with any comments, suggestions, or questions you might have.
            </p>

            <form className="bg-transparent p-6 rounded-none w-full max-w-lg">
                <div className="flex flex-col space-y-4 mb-4"> {/* Changed to flex-col for mobile responsiveness */}
                    <input
                        type="text"
                        placeholder="Name"
                        className="p-2 border border-gray-300 rounded-none text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded-none text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="p-2 border border-gray-300 rounded-none text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <textarea
                        rows="4"
                        placeholder="Comments"
                        className="p-2 border border-gray-300 rounded-none text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white font-semibold py-2 rounded-none hover:bg-white hover:text-black transition duration-100"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default Contact_form;
