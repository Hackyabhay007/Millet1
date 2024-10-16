// src/app/contact/page.js
import Nav from "../Head/Nav";
import Contact_Home from "./Contact_Home";
import Contact_form from "./Contact_form";
import Contact_location from "./Contact_location";
import Footer from "../Bottom/Footer"; // Adjust the path if necessary

export default function ContactPage() {
    return (
        <>
            <Nav />
            <Contact_Home />
            <Contact_form />
            <Contact_location />
            <Footer />
        </>
    );
}
