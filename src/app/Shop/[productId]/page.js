"use client";

import React, { useEffect, useState, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '@/app/firebase';
import { doc, getDoc, getDocs, collection, query, where } from 'firebase/firestore';
import { ChevronLeft } from 'lucide-react';
import { CartContext } from '@/Context/CartContext';
import Footer from '@/app/Bottom/Footer';
import Nav from '@/app/Head/Nav';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/app/components/Loader';
import { toast } from 'react-hot-toast';
import ReviewComponent from '../components/ReviewComponent';

const ProductDetails = ({ params }) => {
  const { productId, category } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart, isItemInCart, getItemQuantity } = useContext(CartContext);
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 300;
      const newScrollPosition = 
        scrollContainer.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      scrollContainer.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenCart = () => {
    router.push('/Cart');
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!productId) return;
    
      try {
        const productRef = doc(db, 'products', productId);
        const productSnap = await getDoc(productRef);
    
        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProduct({
            id: productId,
            name: productData.name || '',
            price: typeof productData.price === 'number' ? productData.price : 0,
            stock: typeof productData.stock === 'number' ? productData.stock : 0,
            mainImage: productData.mainImage || '',
            additionalImages: productData.additionalImages || [], // Add additional images here
          });
          setSelectedImage(productData.mainImage);
          await fetchCategoryAndTagNames(productData);
          await fetchRelatedProducts(productData);
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

const handleAddToCart = () => {
  console.log('Current product before adding to cart:', product); // Log current product state

  if (product) {
      // Log each property of the product for clarity
      console.log("Validating product properties:", {
          id: productId,  // Using the document ID
          name: product.name,
          price: product.price,
          stock: product.stock,
      });

      // Validate product properties
      if (productId && typeof productId === 'string' && 
          product.name && typeof product.name === 'string' && 
          typeof product.price === 'number' && 
          typeof product.stock === 'number') {

          // Create a product object with the ID and its other properties
          const productToAdd = {
              id: productId, // Document ID
              name: product.name,
              price: product.price,
              stock: product.stock,
              mainImage: product.mainImage // if needed
          };

          addToCart(productToAdd, quantity); // Pass the new object to addToCart
          setAddedToCart(true);
          toast.success("Item added to cart!");
          setTimeout(() => setAddedToCart(false), 1000);
      } else {
          toast.error("Product has invalid data.");
          console.error("Invalid product data:", product); // Log invalid product data
      }
  } else {
      toast.error("No product found to add to cart.");
  }
};



  

  useEffect(() => {
    if (product) {
      const existingQuantity = getItemQuantity(product.id);
      setQuantity(existingQuantity || 1);
    }
  }, [product, getItemQuantity]);

  const fetchCategoryAndTagNames = async (productData) => {
    try {
      if (Array.isArray(productData.categories) && productData.categories.length > 0) {
        const categoryQuery = query(collection(db, 'categories'), where('__name__', 'in', productData.categories));
        const categorySnapshot = await getDocs(categoryQuery);
        const fetchedCategoryNames = categorySnapshot.docs.map(doc => doc.data().name);
        setCategories(fetchedCategoryNames);
      }

      if (Array.isArray(productData.tags) && productData.tags.length > 0) {
        const tagQuery = query(collection(db, 'tags'), where('__name__', 'in', productData.tags));
        const tagSnapshot = await getDocs(tagQuery);
        const fetchedTagNames = tagSnapshot.docs.map(doc => doc.data().name);
        setTags(fetchedTagNames);
      }
    } catch (error) {
      console.error('Error fetching category/tag names:', error);
      setError('Error fetching category or tag names.');
    }
  };

  const fetchRelatedProducts = async (productData) => {
    try {
      if (productData.categories && productData.categories.length > 0) {
        setLoadingRelated(true);
        const relatedQuery = query(
          collection(db, 'products'),
          where('categories', 'array-contains-any', productData.categories)
        );
  
        const relatedSnapshot = await getDocs(relatedQuery);
        const relatedProductsData = relatedSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(product => product.id !== productData.id);
  
        setRelatedProducts(relatedProductsData.length > 0 ? relatedProductsData : []);
      } else {
        setRelatedProducts([]);
      }
    } catch (error) {
      console.error('Error fetching related products:', error);
      setRelatedProducts([]);
    } finally {
      setLoadingRelated(false);
    }
  };



  
  const handleBuyNow = () => {
    if (product) {
      addToCart(product, 1);
      toast.success('Item added to cart! Redirecting to cart...'); // Show toast notification
      handleOpenCart();
    }
  };

  const handleRelatedProductClick = (id) => {
    router.push(`/Shop/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Nav />
      <div className="flex items-center mb-4 px-4 sm:px-6">
        <button
          onClick={() => category ? router.push(`/Shop/Category/${category}`) : router.push('/Shop')}
          className="flex items-center bg-green-600 text-white mt-6 sm:mt-10 py-2 px-3 rounded-md shadow-lg hover:bg-blue-500 transition duration-200"
        >
          <ChevronLeft className="mr-2" />
          <span className="text-sm">Back to {category ? `${category}` : 'Shop'}</span>
        </button>
      </div>
  
      <div className="p-4 sm:p-6 font-afacadFlux bg-gray-100">
        {/* Main Product Container */}
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-lg flex flex-col md:flex-row">
          
          {/* Left Side: Product Image Selector */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            {/* Main Image */}
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-auto object-contain border-2 border-green-500 rounded-lg mb-4"
            />
  
            {/* Additional Images Gallery */}
            {product.additionalImages && product.additionalImages.length > 0 && (
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {product.additionalImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Additional Image ${index + 1}`}
                    className="w-full p-1 sm:p-2 h-auto border border-green-500 object-cover rounded-lg cursor-pointer hover:border-green-700"
                    onClick={() => setSelectedImage(image)} // Set the selected image on click
                  />
                ))}
              </div>
            )}
          </div>
  
          {/* Right Side: Product Details */}
          <div className="flex-grow md:pl-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">Price: ₹{product.price}</p>
            <p className="text-gray-600 mb-4">In Stock: {product.stock}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
  
            {/* Quantity Selector */}
            <div className="flex items-center mb-4">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border border-gray-300 px-3 py-1 rounded-l"
                disabled={quantity === 1}
              >
                -
              </button>
              <input 
                type="number" 
                className="border-t border-b border-gray-300 w-16 text-center py-1" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="border border-gray-300 px-3 py-1 rounded-r"
              >
                +
              </button>
            </div>
  
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto bg-green-600 text-white py-2 px-4 shadow-lg hover:bg-green-500 transition duration-200 rounded-md relative overflow-hidden"
              >
                {isItemInCart(product.id) ? 'Update Cart' : 'Add To Cart'}
                <AnimatePresence>
                  {addedToCart && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center bg-green-600 text-white"
                    >
                      Added!
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto bg-green-600 text-white py-2 px-4 shadow-lg hover:bg-green-500 transition duration-200 rounded-md"
              >
                Buy Now
              </button>
            </div>
  
            {/* Categories and Tags */}
            <div className="flex flex-col items-start mb-4 pt-4">
              {categories.length > 0 && (
                <p className="text-sm text-gray-500 mb-1">
                  <span className="font-semibold">Categories:</span>{' '}
                  {categories.map((category, index) => (
                    <React.Fragment key={category}>
                      <Link href={`/Shop/Category/${category}`} className="text-blue-500 hover:text-blue-700">
                        {category}
                      </Link>
                      {index < categories.length - 1 && ', '}
                    </React.Fragment>
                  ))}
                </p>
              )}
              {tags.length > 0 && (
                <p className="text-sm text-gray-500">
                  <span className="font-semibold">Tags:</span> {tags.join(', ')}
                </p>
              )}
            </div>
          </div>
        </div>
        <ReviewComponent productId={productId} />
  
        {/* Related Products Section */}
        <div className="relative w-full mt-6 sm:mt-8">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 px-4 sm:px-0">Related Products</h2>
          {loadingRelated ? (
            <p className="text-gray-500 px-4">Loading related products...</p>
          ) : (
            <div className="relative group px-4 sm:px-0">
              {/* Scrollable Container */}
              <div ref={scrollContainer} className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct.id} className="flex-none w-48 sm:w-64 aspect-square cursor-pointer transition-transform hover:scale-105" onClick={() => handleRelatedProductClick(relatedProduct.id)}>
                      <div className="h-full bg-white border rounded-lg p-2 sm:p-4 shadow-md flex flex-col">
                        <div className="relative flex-1 mb-2">
                          <img src={relatedProduct.mainImage} alt={relatedProduct.name} className="absolute inset-0 w-full h-full object-cover rounded-md" />
                        </div>
                        <h3 className="text-base sm:text-lg font-semibold truncate">{relatedProduct.name}</h3>
                        <p className="text-sm text-gray-600">₹{relatedProduct.price}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No related products found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default ProductDetails;