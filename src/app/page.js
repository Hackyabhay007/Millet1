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
import { Schema } from './schemas';  // We'll create this next

export default function Home() {
  return (
    <Fragment>
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
          {/* Top Products */}
          <div itemProp="itemListElement">
          <Product_cart  title = "Trending Products" searchKeyword="trending" limit={10} />  

          </div>

          {/* Trending Products */}
          <div itemProp="itemListElement">
<Product_cart title='Popular Products' searchKeyword="popular" limit={10} />  
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