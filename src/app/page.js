import Footer from "./Head/Bottom/Footer";
import Story from "./Head/Bottom/Story";
import HomeImg from "./Head/HomeImg";
import Nav from "./Head/Nav";
import Product_cart from "./Head/Product_cart";
import Shop_Catalog from "./Head/Shop_Catalog";
import Why from "./Mid/Why";


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
