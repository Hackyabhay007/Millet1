import localFont from "next/font/local";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import { CartProvider } from '../Context/CartContext';

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

// Metadata configuration
export const metadata = {
    title: 'Rewa State Farms - Bringing Nature\'s Goodness to Your Home',
    description: 'Rewa State Farms offers organic, eco-friendly, and locally sourced agro products. Committed to sustainability, community development, and health & well-being.',
    viewport: 'width=device-width, initial-scale=1.0',
    charset: 'UTF-8',
    openGraph: {
        title: 'Rewa State Farms - Bringing Nature\'s Goodness to Your Home',
        description: 'Rewa State Farms offers organic, eco-friendly, and locally sourced agro products. Committed to sustainability, community development, and health & well-being.',
        type: 'website',
        image: 'https://gcdnb.pbrd.co/images/vJFrQP8Fgx9X.png?o=1',
        url: 'https://www.rewastatefarms.com',
    },
    twitter: {
        title: 'Rewa State Farms - Bringing Nature\'s Goodness to Your Home',
        description: 'Rewa State Farms offers organic, eco-friendly, and locally sourced agro products. Committed to sustainability, community development, and health & well-being.',
        image: 'https://example.com/twitter-image.jpg',
        card: 'summary_large_image',
    },
    icons: {
        icon: '/favicon.ico',
    },
};

// Cart Provider Wrapper Component
function Providers({ children }) {
    return <CartProvider>{children}</CartProvider>;
}

// RootLayout Component
export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
            <body className="antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}