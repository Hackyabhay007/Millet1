// middleware.js

import { NextResponse } from 'next/server';
import { getAuth } from 'firebase/auth';
import { app } from './src/firebase/firebase'; // Adjust the path based on your folder structure

const auth = getAuth(app);

export async function middleware(req) {
    const token = req.cookies.get('authToken'); // Get the auth token from cookies

    // Check if the path starts with /Admin
    if (req.nextUrl.pathname.startsWith('/Admin')) {
        if (!token) {
            // If no token is found, redirect to the login page
            return NextResponse.redirect('/Admin/login'); // Redirect to the admin login page
        }

        try {
            // Verify the token; you might need to adjust this part
            const user = await auth.verifyIdToken(token); // Verify token with Firebase
            if (!user || user.email !== 'rewa@gmail.com') { // Ensure it's the correct admin
                return NextResponse.redirect('/Admin/login'); // Redirect if not authorized
            }
        } catch (error) {
            console.error('Authentication error:', error);
            return NextResponse.redirect('/Admin/login'); // Redirect on verification error
        }
    }

    return NextResponse.next(); // Allow the request to continue if the user is authorized
}

export const config = {
    matcher: ['/Admin/:path*'], // This will apply to all routes under /Admin
};
