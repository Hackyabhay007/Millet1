// src/app/shop/page.js
import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";
import Shop_Home from "./Shop_Home";
import Shop from "./Shop";
import Head from "next/head"; // Import Head for adding SEO tags

export default function ShopHome() {
    return (
      <>
        {/* SEO Metadata */}
        <Head>
          <title>Shop Organic Millet-Based Products | Purikam</title>
          <meta
            name="description"
            content="Discover Purikam's range of organic millet-based food products. Shop healthy, ready-to-eat meals while supporting sustainable farming practices."
          />
          <meta
            name="keywords"
            content="Purikam shop, organic food products, millet-based foods, healthy meals, sustainable farming"
          />
          <meta
            property="og:title"
            content="Shop Organic Millet-Based Products | Purikam"
          />
          <meta
            property="og:description"
            content="Explore our selection of organic millet-based products. Enjoy healthy meals while empowering local farmers."
          />
          <meta property="og:image" content="/images/shop-og-image.jpg" />
          <meta property="og:url" content=" https://purikam.com/Shop" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="robots" content="index, follow" />
        </Head>

        {/* Main Page Components */}
        <Nav />
        <Shop_Home />
        <Shop />
        <Footer />
      </>
    );
}
