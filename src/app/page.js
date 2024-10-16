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

export default function Home() {
  return (
    <>
    <Nav/>
    <HomeImg/>
    <Product_cart/>
    <Shop_Catalog/>
    <Why/>
    <Story/> 
    <Footer/> 
    </>
  );
}
