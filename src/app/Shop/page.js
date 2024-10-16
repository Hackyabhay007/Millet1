import Shop_Home from "./Shop_Home";
import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";
import Shop from "./Shop";

export default function Home() {
    return (
      <>
      <Nav/>
      <Shop_Home/>
      <Shop/>
      <Footer/> 
      </>
    );
  }
  