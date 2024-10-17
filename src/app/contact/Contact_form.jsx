"use client"
import React, { useState } from 'react';
import { database } from '../firebase';
import { ref, set } from "firebase/database";

function Contact_form() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comments: ''
    });
    const [loading, setLoading] = useState(false);
    const [messageSent, setMessageSent] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const newRef = ref(database, 'contacts/' + formData.name);
        set(newRef, formData)
            .then(() => {
                setLoading(false);
                setMessageSent(true);
                setFormData({ name: '', email: '', phone: '', comments: '' }); // Clear the form after submit
                setTimeout(() => {
                    setMessageSent(false); // Hide the message after 3 seconds
                }, 3000);
            })
            .catch((error) => {
                console.error("Error sending message: ", error);
                setLoading(false);
            });
    };

    return (
        <div className="min-h-screen bg-slate-700 flex flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-semibold text-white mb-4">Contact Information</h1>
            <p className="text-lg text-gray-300 font-thin mb-6 text-center">
                We’d love to hear about your experience with Rosier. <br />
                Please get in touch with any comments, suggestions, or questions you might have.
            </p>
            <form onSubmit={handleSubmit} className="bg-transparent p-6 rounded-none w-full max-w-lg">
                <div className="flex flex-col space-y-4 mb-4">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="p-2 border border-gray-300 rounded-none text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="p-2 border border-gray-300 rounded-none text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="p-2 border border-gray-300 rounded-none text-white bg-transparent placeholder-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <textarea
                        rows="4"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
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

            {/* Pop-up message */}
            {messageSent && (
                <div className="fixed bottom-4 right-4 bg-green-600 text-white py-2 px-4 rounded shadow-lg">
                    <div className="flex items-center">
                        {loading && <div className="loader animate-spin h-4 w-4 border-2 border-t-2 border-white rounded-full mr-2"></div>}
                        Your message has been sent.
                    </div>
                </div>
            )}
        </div>
    );
}

export default Contact_form;
