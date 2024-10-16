import React from "react";

function Contact_Home() {
    return (
        <div className="relative w-screen h-auto">
            <img
                src="https://img.freepik.com/premium-vector/horizontal-background-with-border-consisted-fresh-organic-food_198278-4360.jpg"
                alt="Contact Background"
                className="object-cover w-screen h-96"
            />

            <div className="absolute inset-0 bg-black opacity-75 flex items-center justify-center">
                <p className="font-bold text-white text-3xl md:text-5xl text-center">
                    Connect with us!
                </p>
            </div>
        </div>
    );
}

export default Contact_Home;
