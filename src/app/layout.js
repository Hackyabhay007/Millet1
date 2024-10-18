"use client";

import React from 'react';
import localFont from "next/font/local";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import { CartProvider } from '../Context/CartContext'; // Adjust import path

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// RootLayout Component
export default function RootLayout({ children }) {
    return (
        <CartProvider>
            <html lang="en">
                <head>
                    {/* Title */}
                    <title>Rewa State Farms - Bringing Nature’s Goodness to Your Home</title>

                    {/* Meta description for SEO */}
                    <meta name="description" content="Rewa State Farms offers organic, eco-friendly, and locally sourced agro products. Committed to sustainability, community development, and health & well-being." />

                    {/* Meta tags for viewport */}
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                    {/* Meta tag for character set */}
                    <meta charSet="UTF-8" />

                    {/* Open Graph meta tags for social media sharing */}
                    <meta property="og:title" content="Rewa State Farms - Bringing Nature’s Goodness to Your Home" />
                    <meta property="og:description" content="Rewa State Farms offers organic, eco-friendly, and locally sourced agro products. Committed to sustainability, community development, and health & well-being." />
                    <meta property="og:type" content="website" />
                    <meta property="og:image" content="https://gcdnb.pbrd.co/images/vJFrQP8Fgx9X.png?o=1" /> {/* Replace with actual image URL */}
                    <meta property="og:url" content="https://www.rewastatefarms.com" />

                    {/* Meta tags for social media platforms like Twitter */}
                    <meta name="twitter:title" content="Rewa State Farms - Bringing Nature’s Goodness to Your Home" />
                    <meta name="twitter:description" content="Rewa State Farms offers organic, eco-friendly, and locally sourced agro products. Committed to sustainability, community development, and health & well-being." />
                    <meta name="twitter:image" content="https://example.com/twitter-image.jpg" /> {/* Replace with actual image URL */}
                    <meta name="twitter:card" content="summary_large_image" />

                    {/* Favicon */}
                    <link rel="icon" href="/favicon.ico" />

                    {/* Google Fonts */}
                    <link href="https://fonts.googleapis.com/css2?family=Afacad+Flux&display=swap" rel="stylesheet" />

                    {/* Custom Fonts */}
                    <style>
                        {`
                            :root {
                                --font-geist-sans: ${geistSans.variable};
                                --font-geist-mono: ${geistMono.variable};
                            }
                        `}
                    </style>

                </head>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    {children}
                </body>
            </html>
        </CartProvider>
    );
}
