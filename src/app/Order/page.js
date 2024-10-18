import dynamic from 'next/dynamic';
import Nav from "../Head/Nav";
import Footer from "../Bottom/Footer";

// Dynamically import the Order_info component with SSR disabled
const Order_info = dynamic(() => import('./Order_info'), { ssr: false });

export default function OrderPage() {
    return (
      <>
        <Nav />
        <Order_info /> {/* Render client-side only */}
        <Footer />
      </>
    );
}
