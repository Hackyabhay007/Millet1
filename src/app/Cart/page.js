"use client";

import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";
import Cart from "./Cart";

export default function Home({ cartItems, setCartItems }) {
    return (
        <>
            <Nav />
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
            <Footer />
        </>
    );
}
