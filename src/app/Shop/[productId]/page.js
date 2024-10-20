"use client"; // Required for Next.js to indicate this is a client component

import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/navigation'; // For client-side navigation
import { db } from '@/app/firebase'; // Import Firebase
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { CartContext } from '@/Context/CartContext'; // Import CartContext
import 'remixicon/fonts/remixicon.css'; // Correct import statement

const ProductDetails = ({ params }) => {
  const { productId } = params; // Get the dynamic productId from the URL
  const [product, setProduct] = useState(null); // State to hold the product
  const [loading, setLoading] = useState(true); // Loading state
  const [categories, setCategories] = useState([]); // State to hold category names
  const [tags, setTags] = useState([]); // State to hold tag names
  const [error, setError] = useState(null); // State for error handling
  const router = useRouter();
  const { addToCart } = useContext(CartContext); // Add to cart from context

  // Fetch product details from Firestore
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return; // Avoid fetching if productId is missing

      try {
        const productRef = doc(db, 'products', productId); // Get document reference
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProduct(productData);
          await fetchCategoryAndTagNames(productData); // Fetch categories and tags names
        } else {
          setError('No such product found!');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Error fetching product details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Function to fetch category and tag names
  const fetchCategoryAndTagNames = async (productData) => {
    try {
      // Fetch category names based on IDs in productData.categories
      if (Array.isArray(productData.categories) && productData.categories.length > 0) {
        const categoryQuery = query(collection(db, 'categories'), where('__name__', 'in', productData.categories));
        const categorySnapshot = await getDocs(categoryQuery);
        const fetchedCategoryNames = categorySnapshot.docs.map(doc => doc.data().name); // Assuming each category document has a 'name' field
        setCategories(fetchedCategoryNames);
      }

      // Fetch tag names based on IDs in productData.tags
      if (Array.isArray(productData.tags) && productData.tags.length > 0) {
        const tagQuery = query(collection(db, 'tags'), where('__name__', 'in', productData.tags));
        const tagSnapshot = await getDocs(tagQuery);
        const fetchedTagNames = tagSnapshot.docs.map(doc => doc.data().name); // Assuming each tag document has a 'name' field
        setTags(fetchedTagNames);
      }
    } catch (error) {
      console.error('Error fetching category/tag names:', error);
      setError('Error fetching category or tag names.');
    }
  };

  // Handle adding to cart
  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Add the product to the cart
    }
  };

  const handleOrderNow = () => {
    // Placeholder for order logic (could navigate to checkout or open modal)
    console.log('Order now clicked');
  };

  if (loading) {
    return <div>Loading product details...</div>; // Display a loading state
  }

  if (error) {
    return <div>{error}</div>; // If an error occurred
  }

  if (!product) {
    return <div>Product not found</div>; // If the product is not found
  }

  return (
    <div className="p-6 font-afacadFlux bg-green-400">
      {/* Back Button */}
      <button onClick={() => router.back()} className="text-blue-black flex bg-white p-4 mb-4 rounded-sm">
      <i class="ri-arrow-left-line"></i><p className='hidden md:block'> Back to Shop</p>
      </button>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        {/* Main Product Image */}
        <div className="flex justify-center">
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-80 object-contain border-2 border-green-500 rounded-lg mb-6"
          />
        </div>

        {/* Additional Images */}
        {product.additionalImages && product.additionalImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            {product.additionalImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Additional Image ${index + 1}`}
                className="w-auto p-2 h-auto border border-green-500 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

   

        {/* Product Information */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-2">
            Price: ₹{product.price}
          </p>
          <p className="text-gray-600 mb-4">{product.description}</p>

               {/* Categories and Tags Section */}
        <div className="flex flex-col items-center mb-4  pt-4">
          {categories.length > 0 && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Categories:</span> {categories.join(', ')}
            </p>
          )}
          {tags.length > 0 && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Tags:</span> {tags.join(', ')}
            </p>
          )}
        </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="bg-green-600 text-white py-2 px-4  shadow-lg hover:bg-green-500 transition duration-200"
            >
              Add to Cart
            </button>
            <button
              onClick={handleOrderNow}
              className="bg-blue-600 text-white py-2 px-4  shadow-lg hover:bg-blue-500 transition duration-200"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
