// src/app/refund/page.js
import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";
import Refund from "./Refund";
import Head from "next/head"; // Import Head for adding SEO tags

export default function RefundPage() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Refund Policy | Purikam - Organic Millet-Based Food Products</title>
          <meta
            name="description"
            content="Explore Purikam's Refund Policy for organic, millet-based food products, focused on customer satisfaction and sustainable practices."
          />
          <meta
            name="keywords"
            content="Purikam refund policy, organic food refund, millet-based products, customer satisfaction, sustainable farming, Rewa, Madhya Pradesh"
          />
          <meta
            property="og:title"
            content="Refund Policy | Purikam - Organic Millet-Based Food Products"
          />
          <meta
            property="og:description"
            content="Learn about Purikam's refund policy for organic and millet-based food products."
          />
          <meta property="og:image" content="/images/refund-policy-og-image.jpg" />
          <meta property="og:url" content=" https://purikam.com/Refund_policy" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="robots" content="index, follow" />
        </Head>

        {/* Main Page Components */}
        <Nav />
        <Refund />
        <Footer /> 
      </>
    );
}
