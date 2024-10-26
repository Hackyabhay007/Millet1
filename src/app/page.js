// src/app/home/page.js
import { Fragment } from 'react';
import Head from 'next/head';
import Contact_form from "./contact/Contact_form";
import Contact_Home from "./contact/Contact_Home";
import Contact_location from "./contact/Contact_location";
import Footer from "./Bottom/Footer";
import Story from "./Bottom/Story";
import HomeImg from "./Head/HomeImg";
import Nav from "./Head/Nav";
import Product_cart from "./Head/Product_cart";
import Shop_Catalog from "./Head/Shop_Catalog";
import Why from "./Mid/Why";
import 'remixicon/fonts/remixicon.css';
import { Schema } from './schemas';  // Ensure this contains valid JSON-LD

export default function Home() {
  return (
    <Fragment>
      {/* SEO Metadata */}
      <Head>
        <title>Purikam | Reviving Traditional Agriculture with Organic Products</title>
        <meta
          name="description"
          content="Explore Purikam's organic, millet-based food products. Shop healthy, ready-to-eat meals while empowering local farmers."
        />
        <meta
          name="keywords"
          content="organic food, millet products, healthy meals, sustainable agriculture, Purikam"
        />
        <meta property="og:title" content="Purikam | Organic Millet-Based Food Products" />
        <meta property="og:description" content="Discover a variety of healthy, organic food products made from millet, supporting local farmers and sustainable practices." />
        <meta property="og:image" content="/images/home-og-image.jpg" />
        <meta property="og:url" content=" https://purikam.com/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(Schema)
        }}
      />

      <main itemScope itemType="https://schema.org/WebPage">
        {/* Navigation */}
        <Nav />

        {/* Hero Section */}
        <section itemScope itemType="https://schema.org/WebPageElement">
          <HomeImg />
        </section>

        {/* Products Sections */}
        <section 
          itemScope 
          itemType="https://schema.org/ItemList"
          className=""
        >
          {/* Trending Products */}
          <div itemProp="itemListElement">
            <Product_cart title="Trending Products" searchKeyword="trending" limit={10} />  
          </div>

          {/* Popular Products */}
          <div itemProp="itemListElement">
            <Product_cart title="Popular Products" searchKeyword="popular" limit={10} />  
          </div>
        </section>

        {/* Shop Catalog */}
        <section 
          itemScope 
          itemType="https://schema.org/CollectionPage"
          className=""
        >
          <Shop_Catalog />
        </section>

        {/* Why Choose Us */}
        <section 
          itemScope 
          itemType="https://schema.org/WebPageElement"
          className=""
        >
          <Why />
        </section>

        {/* Our Story */}
        <section 
          itemScope 
          itemType="https://schema.org/AboutPage"
          className=""
        >
          <Story />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </Fragment>
  );
}
