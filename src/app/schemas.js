// schemas.js
export const Schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Purikam",
    "url": "https://purikam.com",
    "logo": "https://purikam.com/logo.png", // Add your logo URL
    "description": "Traditional and organic products from Rewa, Madhya Pradesh",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Your Street Address",
      "addressLocality": "Rewa",
      "addressRegion": "Madhya Pradesh",
      "postalCode": "Your Postal Code",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "Your-Phone-Number",
      "contactType": "customer service",
      "availableLanguage": ["en", "hi"]
    },
    "sameAs": [
      "https://facebook.com/purikam", // Replace with your social media URLs
      "https://twitter.com/purikam",
      "https://instagram.com/purikam",
      "https://linkedin.com/company/purikam"
    ]
  };
  
  // You can add more specific schemas for products, articles, etc.
  export const ProductSchema = (product) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Purikam"
    },
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    }
  });