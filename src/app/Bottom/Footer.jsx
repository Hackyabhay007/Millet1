import React from 'react';
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-green-700 font-afacadFlux text-white py-8 px-4">
      {/* Top Section: Logo, Text, and Email Input */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-8">
        <div className="flex items-center">
          {/* Logo Placeholder */}
         <Link href="/"><img src="https://gcdnb.pbrd.co/images/0Tt4D5KPyeNU.png?o=1" alt="Logo" className="w-28 h-auto" /></Link>
        </div>
        <div className="text-center mx-4">
          <h2 className="text-xl font-bold">“We are reviving the traditional ways of old Bharat”</h2>
        </div>
        {/* <div className="flex flex-col items-center">
          <label htmlFor="email" className="mb-2">Get updated</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            className="p-2  text-black"
          />
          <button className='border border-white mt-1 py-1 px-6 hover:bg-white hover:text-black'>Get Email</button>
        </div> */}
      </div>

      {/* Divider */}
      <hr className="border-white mb-8" />

      {/* Bottom Section: Four Columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-20">
        
        {/* Column 1: Helpful Links */}
        <div>
          <h3 className="font-bold text-xl mb-2">Helpful Links</h3>
          <ul>
            <li>Our Story</li>
            <li>All Products</li>
            <li>Recipes</li>
            <li>Blog</li>
            <li>Lab Reports</li>
          </ul>
        </div>

        {/* Column 2: Policies */}
        <div>
          <h3 className="font-bold text-xl mb-2">Policies</h3>
          <ul>
            <li>Refund Policy</li>
            <li>Shipping Policy</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Column 3: Contact Us */}
        <div>
          <h3 className="font-bold text-xl mb-2">Contact Us</h3>
          <ul>
            <li>Help</li>
            <li>Career</li>
          </ul>
        </div>

        {/* Column 4: Follow Us */}
        <div className='text-4xl'>
          <h3 className="font-bold mb-2 text-xl">Follow Us</h3>
          <ul className='flex gap-5'>
            <li><i className="ri-facebook-box-line hover:text-green-500"></i></li>
            <li><i className="ri-instagram-line hover:text-green-500"></i></li>
            <li><i className="ri-youtube-line hover:text-green-500"></i></li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default Footer;
