// src/app/contact/page.js
import Nav from "../Head/Nav";
import Contact_Home from "./Contact_Home";
import Contact_form from "./Contact_form";
import Contact_location from "./Contact_location";
import Footer from "../Bottom/Footer"; // Adjust the path if necessary
import Head from "next/head"; // Import Head for SEO metadata

export default function ContactPage() {
    return (
        <>
            {/* SEO Metadata */}
            <Head>
                <title>Contact Purikam | Organic Millet-Based Food Products in Rewa, Madhya Pradesh</title>
                <meta
                    name="description"
                    content="Get in touch with Purikam, a startup rooted in Rewa, Madhya Pradesh, dedicated to reviving traditional agriculture through organic millet-based food products."
                />
                <meta
                    name="keywords"
                    content="Purikam contact, millet-based products, organic food Rewa, sustainable agriculture Madhya Pradesh, healthy ready-to-eat products"
                />
                <meta
                    property="og:title"
                    content="Contact Purikam | Organic Millet-Based Food Products in Rewa"
                />
                <meta
                    property="og:description"
                    content="Reach out to Purikam to learn more about our mission to support local farmers and promote sustainable agriculture in Rewa with our organic millet-based food products."
                />
                <meta property="og:image" content="/images/purikam-contact-og-image.jpg" />
                <meta property="og:url" content=" https://purikam.com//contact" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="robots" content="index, follow" />
            </Head>

            {/* Main Page Components */}
            <Nav />
            <Contact_Home />
            <Contact_form />
            <Contact_location /> 
            <Footer />
        </>
    );
}
