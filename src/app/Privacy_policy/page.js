// src/app/privacy/page.js
import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";
import Privacy from "./Privacy";
import Head from "next/head"; // Import Head for adding SEO tags

export default function PrivacyPolicy() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Privacy Policy | Purikam - Traditional and Organic Millet-Based Foods</title>
          <meta
            name="description"
            content="Purikam's Privacy Policy explains our data handling practices as we support traditional agriculture in Rewa, Madhya Pradesh, and offer organic millet-based foods."
          />
          <meta
            name="keywords"
            content="Purikam privacy policy, data protection, organic food, millet-based products, sustainable farming, traditional agriculture, Rewa, Madhya Pradesh"
          />
          <meta
            property="og:title"
            content="Privacy Policy | Purikam - Organic Millet-Based Food Products"
          />
          <meta
            property="og:description"
            content="Learn about how Purikam protects your data and our commitment to sustainable agriculture and organic, millet-based products."
          />
          <meta property="og:image" content="/images/privacy-policy-og-image.jpg" />
          <meta property="og:url" content=" https://purikam.com/Privacy_policy" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="robots" content="index, follow" />
        </Head>

        {/* Main Page Components */}
        <Nav />
        <Privacy />
        <Footer /> 
      </>
    );
}
