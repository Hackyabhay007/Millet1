"use client";

import React, { useState, useEffect, useContext, useRef } from "react";
import { collection, getDocs, query, where, orderBy, limit, doc, getDoc } from "firebase/firestore";
import { CartContext } from "@/Context/CartContext";
import { db } from "../firebase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

function ProductCart({ 
  title = "Top Products", 
  type = "top", 
  maxProducts = 5,
  searchKeyword = "" 
}) {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainer = useRef(null);
  const router = useRouter();

  // Scroll Functionality
  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = 200;
      const newScrollPosition =
        scrollContainer.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainer.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Product Fetching Logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const productsCollection = collection(db, "products");
        let productsQuery;
  
        if (searchKeyword) {
          console.log("Searching with keyword:", searchKeyword);
          
          // First, get all tags
          const tagsCollection = collection(db, "tags");
          const tagsSnapshot = await getDocs(tagsCollection);
          
          // Find if any tag matches the search keyword
          let matchingTagId = null;
          
          tagsSnapshot.forEach((doc) => {
            // Get the tag name from the document data
            const tagData = doc.data();
            const tagName = tagData.name?.toLowerCase() || '';
            
            if (tagName === searchKeyword.toLowerCase()) {
              matchingTagId = doc.id;
              console.log("Found matching tag:", tagName, "with ID:", matchingTagId);
            }
          });
  
          if (matchingTagId) {
            // If matching tag found, query products with this tag ID
            productsQuery = query(
              productsCollection,
              where("tags", "array-contains", matchingTagId),
              limit(maxProducts)
            );
            console.log("Searching products with tag ID:", matchingTagId);
          } else {
            console.log("No matching tags found");
            setProducts([]);
            return;
          }
        } else {
          // Regular queries for non-search cases
          switch (type) {
            case "trending":
              productsQuery = query(
                productsCollection,
                where("trending", "==", true),
                orderBy("sales", "desc"),
                limit(maxProducts)
              );
              break;
            case "top":
            default:
              productsQuery = query(
                productsCollection,
                orderBy("rating", "desc"),
                limit(maxProducts)
              );
              break;
          }
        }
  
        // Execute the products query
        const productSnapshot = await getDocs(productsQuery);
        console.log(`Found ${productSnapshot.size} products`);
  
        if (!productSnapshot.empty) {
          // Get all unique tag IDs from the products
          const tagIds = new Set();
          productSnapshot.docs.forEach(doc => {
            const data = doc.data();
            if (data.tags) {
              data.tags.forEach(tagId => tagIds.add(tagId));
            }
          });
  
          // Fetch all referenced tags in one query
          const tagRefs = Array.from(tagIds);
          let tagNames = {};
          
          if (tagRefs.length > 0) {
            const tagsQuery = query(
              collection(db, "tags"),
              where("__name__", "in", tagRefs)
            );
            const tagsSnapshot = await getDocs(tagsQuery);
            
            tagsSnapshot.forEach(doc => {
              tagNames[doc.id] = doc.data().name;
            });
          }
  
          // Map products with resolved tag names
          const fetchedProducts = productSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              tagNames: (data.tags || []).map(tagId => tagNames[tagId] || tagId)
            };
          });
  
          setProducts(fetchedProducts);
        } else if (!searchKeyword) {
          // Fallback to random products only if not searching
          const allProductsSnapshot = await getDocs(productsCollection);
          const allProducts = allProductsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            tagNames: [] // Will be populated if needed
          }));
  
          const shuffledProducts = allProducts
            .sort(() => 0.5 - Math.random())
            .slice(0, maxProducts);
  
          setProducts(shuffledProducts);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [type, maxProducts, searchKeyword]);
  // Navigation Handler
  const handleProductClick = (productId) => {
    router.push(`/Shop/${productId}`);
  };

  // Render Component
  return (
    <div className="overflow-hidden bg-green-100 font-afacadFlux md:p-8">
      {/* Title Section */}
      <h1 className="pl-8 py-10 text-3xl text-gray-700 font-bold">
        {title}
      </h1>

      {/* Main Content */}
      <div className="relative group px-4 sm:px-0">
        {/* Left Navigation Arrow */}
        <button
          onClick={() => scroll("left")}
          className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50"
          aria-label="Scroll left"
        >
          <i className="ri-arrow-left-s-line text-xl"></i>
        </button>

        {/* Products Container */}
        <div
          ref={scrollContainer}
          className="flex overflow-x-auto gap-6 px-4 sm:px-0 pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {loading ? (
            <div className="w-full flex justify-center items-center py-12">
              <Loader className="animate-spin" />
            </div>
          ) : error ? (
            <div className="w-full text-center py-12 text-red-500">
              {error}
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="flex-none w-48 sm:w-64 aspect-square cursor-pointer transition-transform hover:scale-105"
                onClick={() => handleProductClick(product.id)}
              >
                <div className="h-full bg-white shadow-md border border-green-200 rounded-lg p-4 flex flex-col justify-between">
                  {/* Product Image */}
                  <div className="relative flex-1 mb-2">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover rounded-md"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-green-600 font-bold">
                      ₹{product.price}
                    </p>
                    {/* Tags Display */}
                    {product.tagNames && product.tagNames.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {product.tagNames.slice(0, 2).map((tagName, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                          >
                            {tagName}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-12 text-gray-500">
              No products found {searchKeyword && `for "${searchKeyword}"`}
            </div>
          )}
        </div>

        {/* Right Navigation Arrow */}
        <button
          onClick={() => scroll("right")}
          className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-2 shadow-md border border-gray-200 hover:bg-gray-50"
          aria-label="Scroll right"
        >
          <i className="ri-arrow-right-s-line text-xl"></i>
        </button>
      </div>

      {/* More Products Button */}
      <div className="flex justify-center px-11 mt-6">
        <Link href="/Shop">
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg transition-colors hover:bg-green-500 hover:text-gray-900">
            More Products
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ProductCart;