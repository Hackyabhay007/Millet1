import React from 'react';
// import { Link } from 'react-router-dom';
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-green-500 font-afacadFlux text-white py-8 md:px-4">
      {/* Top Section: Logo, Text, and Email Input */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center mb-8">
        <div className="flex items-center">
          {/* Logo Placeholder */}
         <img src="https://i.ibb.co/VSfMLj9/purikam-logo.png" alt="Logo" className="h-16 rounded" />
        </div>
        <div className="text-center mx-4">
          <h2 className="text-xl font-bold">“Harvesting Vindhya Nourishing India”</h2>
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 px-10 text-justify md:px-20">
        
        {/* Column 1: Helpful Links */}
        <div>
          <h3 className="font-bold text-xl mb-2">Helpful Links</h3>
          <ul >
            {/* <li>Our Story</li> */}
          <Link href="/Shop"><li className='hover:text-slate-400'>All Products</li></Link>
            {/* <li>Recipes</li>
            <li>Blog</li>
            <li>Lab Reports</li> */}
          </ul>
        </div>

        {/* Column 2: Policies */}
        <div>
          <h3 className="font-bold text-xl mb-2">Policies</h3>
          <ul>
          <Link href="/Refund_policy"><li className='hover:text-slate-400'>Refund Policy</li></Link>
          <Link href="/Ship_policy"><li className='hover:text-slate-400'>Shipping Policy</li></Link>
           <Link href="/Privacy_policy"><li className='hover:text-slate-400'>Privacy Policy</li></Link>
           <Link href="/Term_and_condition"><li className='hover:text-slate-400'>Terms & Conditons</li></Link>
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
     
        {/* Attribution */}
        <div className="text-center border-t border-white/40 pt-2">
          <p className="text-sm text-white/80">
            Developed by{' '}
            <Link 
              href="https://flyyourtech.com" 
              className="hover:text-white transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              FlyYourtech
            </Link>
          </p>
        </div>
    </div>
  );
}

export default Footer;
