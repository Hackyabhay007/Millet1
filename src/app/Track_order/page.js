// src/app/Track_order/page.js
import Nav from "../Head/Nav";
import Order from "./Order";
import Footer from "../Bottom/Footer";
import Head from 'next/head';

export default function TrackOrder() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Track Your Order | Purikam</title>
          <meta
            name="description"
            content="Track your order with Purikam. Stay updated on your organic millet-based food products shipment."
          />
          <meta
            name="keywords"
            content="track order, Purikam, organic food, millet products, order tracking"
          />
          <meta property="og:title" content="Track Your Order | Purikam" />
          <meta property="og:description" content="Keep track of your order status with Purikam and ensure timely delivery." />
          <meta property="og:image" content="/images/track-order-og-image.jpg" /> {/* Replace with actual image */}
          <meta property="og:url" content="https://purikam.com/Track_order" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <Nav />
        <Order />
        <Footer /> 
      </>
    );
}
