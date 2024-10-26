// src/app/home/page.js
import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";
import Term_condition from "./Term_condition";
import Head from 'next/head';

export default function Home() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Home | Purikam - Reviving Traditional Agriculture</title>
          <meta
            name="description"
            content="Welcome to Purikam, where we focus on reviving traditional agriculture and providing organic, millet-based food products."
          />
          <meta
            name="keywords"
            content="home, Purikam, organic food, millet products, sustainable agriculture, healthy eating"
          />
          <meta property="og:title" content="Home | Purikam" />
          <meta property="og:description" content="Explore our range of organic, millet-based food products and learn about our commitment to sustainability." />
          <meta property="og:image" content="/images/home-og-image.jpg" /> {/* Replace with actual image */}
          <meta property="og:url" content="https://purikam.com/Term_and_condition" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Nav />
        <Term_condition />
        <Footer /> 
      </>
    );
}
