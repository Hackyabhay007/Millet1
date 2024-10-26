// src/app/about/page.js
import Nav from "../Head/Nav";
import AboutHome from "./AboutHome";
import AboutMain from "./AboutMain";
import Footer from "../Bottom/Footer";
import Head from 'next/head';

export default function AboutUs() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>About Us | Purikam - Reviving Traditional Agriculture</title>
          <meta
            name="description"
            content="Learn more about Purikam, a startup focused on reviving traditional agriculture through organic, millet-based food products, empowering local farmers."
          />
          <meta
            name="keywords"
            content="about us, Purikam, organic food, millet products, sustainable agriculture, local farmers"
          />
          <meta property="og:title" content="About Us | Purikam" />
          <meta property="og:description" content="Discover how Purikam is committed to reviving traditional agriculture and supporting local farmers through sustainable practices." />
          <meta property="og:image" content="/images/about-og-image.jpg" /> {/* Replace with actual image */}
          <meta property="og:url" content="https://purikam.com/About_us" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Nav />
        <AboutHome />
        <AboutMain />
        <Footer /> 
      </>
    );
}
