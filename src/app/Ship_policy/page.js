// src/app/shipping/page.js
import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";
import Ship_policy from "./Ship_policy";
import Head from "next/head"; // Import Head for adding SEO tags

export default function Shippolicy() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Shipping Policy | Purikam - Organic Millet-Based Food Products</title>
          <meta
            name="description"
            content="Read Purikam's Shipping Policy for organic, millet-based food products, ensuring timely delivery and customer satisfaction."
          />
          <meta
            name="keywords"
            content="Purikam shipping policy, organic food shipping, millet-based products delivery, customer satisfaction, sustainable practices"
          />
          <meta
            property="og:title"
            content="Shipping Policy | Purikam - Organic Millet-Based Food Products"
          />
          <meta
            property="og:description"
            content="Explore Purikam's shipping policy to understand our commitment to timely delivery of organic and millet-based food products."
          />
          <meta property="og:image" content="/images/shipping-policy-og-image.jpg" />
          <meta property="og:url" content=" https://purikam.com/Ship_policy" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="robots" content="index, follow" />
        </Head>

        {/* Main Page Components */}
        <Nav />
        <Ship_policy />
        <Footer /> 
      </>
    );
}
