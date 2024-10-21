"use client";
import React, { useState, useEffect, useContext } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore'; // Import additional Firestore methods
import { useRouter } from 'next/navigation'; // Import from next/navigation
import { CartContext } from '@/Context/CartContext';

function Shop() {
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [clickedItemId, setClickedItemId] = useState(null);
  const [filters, setFilters] = useState({ onSale: false, inStock: false, category: '' });
  const [categories, setCategories] = useState([]); // State for categories
  const [tags, setTags] = useState([]); // State for tags
  const [sortOrder, setSortOrder] = useState('');
  const router = useRouter(); // Initialize the router from next/navigation

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, []);

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesCollection = collection(db, 'categories');
      const categorySnapshot = await getDocs(categoriesCollection);
      const categoryList = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList); // Set categories state
    };

    fetchCategories();
  }, []);

  // Fetch tags from Firestore
  useEffect(() => {
    const fetchTags = async () => {
      const tagsCollection = collection(db, 'tags');
      const tagSnapshot = await getDocs(tagsCollection);
      const tagList = tagSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTags(tagList); // Set tags state
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
    router.push(`/Shop/${productId}`); // Navigate to the product details page
  };

  const filteredProducts = products
    .filter((product) => {
      // Filter by onSale status
      if (filters.onSale && !product.onSale) return false;
      // Filter by inStock status
      if (filters.inStock && product.stockQuantity <= 0) return false;
      // Filter by selected category
      if (filters.category && !product.categories.includes(filters.category)) return false;
      return true;
    })
    .sort((a, b) => {
      // Sort products by price
      if (sortOrder === 'low-to-high') return a.price - b.price;
      if (sortOrder === 'high-to-low') return b.price - a.price;
      return 0;
    });

  // Fetch related products based on selected category
  const fetchRelatedProducts = async (categoryId) => {
    if (!categoryId) return []; // No category selected, return empty array

    const relatedProductsQuery = query(
      collection(db, 'products'),
      where('categories', 'array-contains', categoryId) // Filter by category ID
    );

    const relatedSnapshot = await getDocs(relatedProductsQuery);
    return relatedSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  return (
    <div className="flex flex-col font-afacadFlux md:flex-row gap-4 p-4">
      <div className="w-full md:w-1/4 bg-white shadow-md p-4 rounded-lg">
        <h2 className="font-bold text-lg mb-4">Filters</h2>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Product Status</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="onSale"
              checked={filters.onSale}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label>On Sale</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={filters.inStock}
              onChange={handleFilterChange}
              className="mr-2"
            />
            <label>In Stock</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Categories</label>
          <select
            name="category"
            value={filters.category}
            onChange={async (e) => {
              const selectedCategoryId = e.target.value;
              handleFilterChange(e); // Update filters state
              const relatedProducts = await fetchRelatedProducts(selectedCategoryId); // Fetch related products
              console.log('Related Products:', relatedProducts); // Log related products for debugging
            }}
            className="w-full border-gray-300 rounded p-2"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleResetFilter}
          className="bg-red-500 text-white w-full py-2 rounded mt-4"
        >
          Reset Filter
        </button>
      </div>

      <div className="flex-grow">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Sort by Price</label>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-40 border border-gray-500 rounded p-2"
          >
            <option value="">Select</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 font-afacadFlux gap-6 md:grid-cols-3 lg:grid-cols-5">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col bg-yellow-100 cursor-pointer rounded-xl shadow shadow-gray-500 overflow-hidden"
              onClick={() => handleProductClick(product.id)} // Navigate on product click
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
                <p className="text-gray-500 pb-2">{product.description}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from bubbling up
                    handleAddToCart(product);
                  }}
                  className={`mt-auto text-white px-4 py-2 font-semibold rounded-b transition-transform ${
                    clickedItemId === product.id
                      ? 'bg-yellow-400 transform scale-110 duration-500'
                      : 'bg-green-600'
                  } focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50`}
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
      </div>
    </div>
  );
}

export default Shop;
