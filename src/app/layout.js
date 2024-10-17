// src/app/layout.js

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
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </head>
                <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                    {children}
                </body>
            </html>
        </CartProvider>
    );
}
