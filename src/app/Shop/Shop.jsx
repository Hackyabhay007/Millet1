
"use client";
import React, { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { CartContext } from '@/Context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';

function Shop() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [filters, setFilters] = useState({ onSale: false, inStock: false, category: '' });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [loading, setLoading] = useState(true); // Loading state
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10; // Display 10 products per page
  
  // Apply filters and sort products
  const filteredProducts = products
    .filter((product) => {
      if (filters.onSale && !product.onSale) return false;
      if (filters.inStock && product.stockQuantity <= 0) return false;
      if (filters.category && !product.categories.includes(filters.category)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'low-to-high') return a.price - b.price;
      if (sortOrder === 'high-to-low') return b.price - a.price;
      return 0;
    });
  
  // Calculate paginated products based on current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const paginatedProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Handle Next and Previous Page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filteredProducts.length / productsPerPage)));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before fetching
      let productQuery = collection(db, 'products');

      // Check if a category is selected in the URL
      const urlCategory = router.query?.category;
      if (urlCategory) {
        productQuery = query(productQuery, where('categories', 'array-contains', urlCategory));
      }

      const productSnapshot = await getDocs(productQuery);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
      setLoading(false); // Set loading to false after fetching
    };

    fetchProducts();
  }, [router.query?.category]);

  useEffect(() => {
    const urlCategory = router.query?.category;
    if (urlCategory) {
      setFilters((prevFilters) => ({ ...prevFilters, category: urlCategory }));
    }
  }, [router.query?.category]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const tagsCollection = collection(db, 'tags');
      const tagSnapshot = await getDocs(tagsCollection);
      const tagList = tagSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTags(tagList);
    };

    fetchTags();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setClickedItemId(product.id);
    setTimeout(() => setClickedItemId(null), 500);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleResetFilter = () => {
    setFilters({ onSale: false, inStock: false, category: '' });
    setSortOrder('');
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleProductClick = (productId) => {
    router.push(`/Shop/${productId}`);
  };

  // const filteredProducts = products
  //   .filter((product) => {
  //     if (filters.onSale && !product.onSale) return false;
  //     if (filters.inStock && product.stockQuantity <= 0) return false;
  //     if (filters.category && !product.categories.includes(filters.category)) return false;
  //     return true;
  //   })
  //   .sort((a, b) => {
  //     if (sortOrder === 'low-to-high') return a.price - b.price;
  //     if (sortOrder === 'high-to-low') return b.price - a.price;
  //     return 0;
  //   });

  return (
    <div className="flex flex-col font-afacadFlux bg-green-50 md:flex-row gap-4 p-4">
    
    <div className="w-full md:w-1/4 bg-white shadow-md p-4 rounded-lg">
  <h2 className="font-bold text-lg text-green-700 mb-4">Filters</h2>
  
  <div className="mb-4">
    <label className="block font-semibold text-green-700 mb-2">Product Status</label>
    <div className="flex items-center">
      <input
        type="checkbox"
        name="onSale"
        checked={filters.onSale}
        onChange={handleFilterChange}
        className="mr-2 text-green-600 focus:ring-green-500"
      />
      <label className="text-green-700">On Sale</label>
    </div>
    <div className="flex items-center">
      <input
        type="checkbox"
        name="inStock"
        checked={filters.inStock}
        onChange={handleFilterChange}
        className="mr-2 text-green-600 focus:ring-green-500"
      />
      <label className="text-green-700">In Stock</label>
    </div>
  </div>
  
  <div className="mb-4">
    <label className="block font-semibold text-green-700 mb-2">Categories</label>
    <select
      name="category"
      value={filters.category}
      onChange={handleFilterChange}
      className="w-full border border-green-300 rounded p-2 bg-white text-green-700 hover:bg-green-50 focus:outline-none focus:ring focus:border-green-500"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  </div>
  
  <button
    onClick={handleResetFilter}
    className="bg-green-600 text-white w-full py-2 rounded mt-4 hover:bg-green-700 focus:ring focus:outline-none focus:ring-green-500"
  >
    Reset Filter
  </button>
</div>


      <div className="flex-grow">
      <div className="mb-4">
  <label className="block font-semibold text-green-700 mb-2">Sort by Price</label>
  <select
    value={sortOrder}
    onChange={handleSortChange}
    className="w-40 border border-green-500 rounded p-2 bg-white text-green-700 hover:bg-green-100 focus:outline-none focus:ring focus:border-green-700"
  >
    <option value="">Select</option>
    <option value="low-to-high">Low to High</option>
    <option value="high-to-low">High to Low</option>
  </select>
</div>


{loading ? (
      <Loader />
    ) : filteredProducts.length > 0 ? (
      <div className="grid grid-cols-2 font-afacadFlux gap-6 md:grid-cols-3 lg:grid-cols-5">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col bg-green-100 cursor-pointer rounded-xl shadow shadow-gray-500 overflow-hidden"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="h-52 hover:scale-105 transition-transform duration-300 w-full overflow-hidden">
              <img
                src={product.mainImage}
                alt={product.productName}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>
            <div className="flex flex-col flex-grow p-0 text-center">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-gray-500 font-semibold pb-2">Price: ₹{product.price}</p>
              
              <AnimatePresence>
                {clickedItemId === product.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 flex items-center justify-center z-50"
                  >
                    <div className="bg-white rounded-lg p-6 text-center">
                      <p className="text-xl font-semibold mb-2">Added to Cart!</p>
                      <button
                        onClick={() => setClickedItemId(null)}
                        className="bg-green-500 text-white py-2 px-4 rounded mt-4"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="mt-auto text-white px-4 py-2 font-semibold rounded-b transition-transform bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50"
                style={{
                  transition: 'background-color 0.5s ease, transform 0.5s ease',
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="text-center">
        {filters.category ? (
          <p>No products found for the selected category.</p>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    )}

    {/* Pagination Controls */}
    {filteredProducts.length > productsPerPage && (
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-green-600 text-white font-bold px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          className="bg-green-600 text-white font-bold px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    )}
      </div>
    </div>
  );
}

export default Shop;