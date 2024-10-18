"use client";
import React, { useState, useContext } from 'react';
import { CartContext } from '@/Context/CartContext'; // Import the CartContext

// Product list
const products = [
  { id: 1, name: 'Organic Apple', price: 250, category: 'Fruits', onSale: true, inStock: true, image: 'https://gcdnb.pbrd.co/images/rGq54oVxCeXf.jpg?o=1' },
  { id: 2, name: 'Organic Banana', price: 150, category: 'Fruits', onSale: false, inStock: true, image: 'https://gcdnb.pbrd.co/images/JF1ds3oEUDcn.jpg?o=1' },
  { id: 3, name: 'Organic Carrot', price: 200, category: 'Vegetables', onSale: true, inStock: false, image: 'https://gcdnb.pbrd.co/images/OvPFuBiWMqoS.jpg?o=1' },
  { id: 4, name: 'Organic Broccoli', price: 300, category: 'Vegetables', onSale: false, inStock: true, image: 'https://gcdnb.pbrd.co/images/WSe7gVhHkgDh.jpg?o=1' },
  { id: 5, name: 'Organic Tomato', price: 180, category: 'Vegetables', onSale: true, inStock: true, image: 'https://gcdnb.pbrd.co/images/Nk2Ag27XZQcw.jpg?o=1' },
  { id: 6, name: 'Organic Spinach', price: 120, category: 'Vegetables', onSale: false, inStock: true, image: 'https://gcdnb.pbrd.co/images/oCHDV8Vs98Be.jpg?o=1' },
  { id: 7, name: 'Organic Potato', price: 50, category: 'Vegetables', onSale: false, inStock: false, image: 'https://gcdnb.pbrd.co/images/K27d9xHI1JJ5.jpg?o=1' },
  { id: 8, name: 'Organic Cucumber', price: 100, category: 'Vegetables', onSale: true, inStock: true, image: 'https://gcdnb.pbrd.co/images/3AmDLfUR6RAs.jpg?o=1' },
  { id: 9, name: 'Organic Bell Pepper', price: 200, category: 'Vegetables', onSale: false, inStock: true, image: 'https://gcdnb.pbrd.co/images/3AmDLfUR6RAs.jpg?o=1' },
  { id: 10, name: 'Organic Zucchini', price: 150, category: 'Vegetables', onSale: false, inStock: false, image: 'https://gcdnb.pbrd.co/images/Nk2Ag27XZQcw.jpg?o=1' },
];

function Shop() {
  const { addToCart } = useContext(CartContext); // Access the addToCart function from CartContext
  const [clickedItemId, setClickedItemId] = useState(null);
  const [filters, setFilters] = useState({
    onSale: false,
    inStock: false,
    category: '',
  });
  const [sortOrder, setSortOrder] = useState('');

  // Handler for adding item to the cart
  const handleAddToCart = (product) => {
    addToCart(product);
    setClickedItemId(product.id);
    setTimeout(() => setClickedItemId(null), 500);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle reset filter
  const handleResetFilter = () => {
    setFilters({ onSale: false, inStock: false, category: '' });
    setSortOrder('');
  };

  // Handle sorting
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Apply filters and sorting to products
  const filteredProducts = products
    .filter((product) => {
      if (filters.onSale && !product.onSale) return false;
      if (filters.inStock && !product.inStock) return false;
      if (filters.category && product.category !== filters.category) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'low-to-high') return a.price - b.price;
      if (sortOrder === 'high-to-low') return b.price - a.price;
      return 0;
    });

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4">
      {/* Filter Sidebar (Left on Desktop, Top on Mobile) */}
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
            onChange={handleFilterChange}
            className="w-full border-gray-300 rounded p-2"
          >
            <option value="">All Categories</option>
            <option value="Fruits">Organic Fruits</option>
            <option value="Vegetables">Organic Vegetables</option>
          </select>
        </div>

        <button
          onClick={handleResetFilter}
          className="bg-red-500 text-white w-full py-2 rounded mt-4"
        >
          Reset Filter
        </button>
      </div>

      {/* Product Listing */}
      <div className="flex-grow">
        {/* Sort Dropdown (Top of the Products) */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Sort by Price</label>
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="w-40 border  border-gray-500 rounded p-2"
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
              className="flex flex-col bg-yellow-50 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Image Section */}
              <div className="h-52 hover:scale-105 transition-transform duration-300 w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col flex-grow p-0 text-center">
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-gray-500 font-semibold pb-2">Price: ₹{product.price}</p>

                {/* Add to Cart Button with Animation */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`mt-auto text-white px-4 py-2 font-semibold rounded transition-transform ${
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
