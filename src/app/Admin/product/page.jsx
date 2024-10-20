"use client"; // Ensure this component is treated as a client component

import React, { useState, useEffect } from 'react';
import { db } from '@/app/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AdminLayout from '../Layout'; // Import AdminLayout

const CreateProduct = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]); // State to hold categories
    const [selectedCategories, setSelectedCategories] = useState([]); // For selected categories
    const [tags, setTags] = useState([]); // State to hold tags
    const [selectedTags, setSelectedTags] = useState([]); // For selected tags
    const [mainImage, setMainImage] = useState(''); // State to hold the main image
    const [additionalImages, setAdditionalImages] = useState([]); // State to hold additional images
    const [showForm, setShowForm] = useState(false); // State to control form visibility
    const [products, setProducts] = useState([]); // State to hold existing products
    const [editProductId, setEditProductId] = useState(null); // State to hold the ID of the product being edited

    useEffect(() => {
        fetchProducts(); // Fetch products on component mount
        fetchCategories(); // Fetch categories on component mount
        fetchTags(); // Fetch tags on component mount
    }, []);

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productData);
        } catch (error) {
            console.error("Error fetching products: ", error);
        }
    };

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'categories'));
            const categoryData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(categoryData);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };

    const fetchTags = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'tags'));
            const tagData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTags(tagData);
        } catch (error) {
            console.error("Error fetching tags: ", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if main image is provided
        if (!mainImage) {
            alert("Main image is required.");
            return;
        }

        try {
            const productData = {
                name: productName,
                price: parseFloat(price),
                stock: parseInt(stockQuantity, 10),
                description,
                categories: selectedCategories.map(id => {
                    const category = categories.find(cat => cat.id === id);
                    return category ? category.name : null; // Save category name
                }).filter(name => name), // Filter out any null values
                tags: selectedTags.map(id => {
                    const tag = tags.find(tag => tag.id === id);
                    return tag ? tag.name : null; // Save tag name
                }).filter(name => name),
                mainImage, // Save main image
                additionalImages, // Save additional images
            };

            if (editProductId) {
                // Update existing product
                const productRef = doc(db, 'products', editProductId);
                await updateDoc(productRef, productData);
            } else {
                // Add new product to Firestore
                await addDoc(collection(db, 'products'), productData);
            }

            // Reset form after submission
            resetForm();

            // Refresh the product list after adding/updating a product
            fetchProducts();
            setShowForm(false); // Hide form after submission
        } catch (error) {
            console.error("Error adding/updating product: ", error);
        }
    };

    const resetForm = () => {
        setProductName('');
        setPrice('');
        setStockQuantity('');
        setDescription('');
        setSelectedCategories([]); // Reset selected categories
        setSelectedTags([]); // Reset selected tags
        setMainImage(''); // Reset main image
        setAdditionalImages([]); // Reset additional images
        setEditProductId(null); // Reset the edit product ID
    };

    // Function to handle editing a product
    const handleEdit = (product) => {
        setProductName(product.name);
        setPrice(product.price);
        setStockQuantity(product.stock);
        setDescription(product.description);
        setSelectedCategories(product.categories || []); // Set selected categories
        setSelectedTags(product.tags || []); // Set selected tags
        setMainImage(product.mainImage || ''); // Set existing main image
        setAdditionalImages(product.additionalImages || []); // Set existing additional images
        setEditProductId(product.id); // Set the product ID being edited
        setShowForm(true); // Show the form for editing
    };

    // Function to handle deleting a product
    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                const productRef = doc(db, 'products', id);
                await deleteDoc(productRef);
                fetchProducts(); // Refresh product list after deletion
            } catch (error) {
                console.error("Error deleting product: ", error);
            }
        }
    };

    const handleMainImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setMainImage(reader.result); // Set main image
            };
            reader.readAsDataURL(file); // Convert to base64
        }
    };

    const handleAdditionalImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const imagePreviews = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise(resolve => {
                reader.onloadend = () => {
                    resolve(reader.result); // Resolve with base64 data
                };
            });
        });

        Promise.all(imagePreviews).then(previews => {
            setAdditionalImages(previews.slice(0, 3)); // Set additional images (limit to 3)
        });
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategories(prev => 
            prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
        );
    };

    const handleTagChange = (e) => {
        const value = e.target.value;
        setSelectedTags(prev => 
            prev.includes(value) ? prev.filter(id => id !== value) : [...prev, value]
        );
    };

    return (
        <AdminLayout>
            <div className="p-4 font-afacadFlux">
                <button 
                    onClick={() => setShowForm(!showForm)} 
                    className="mb-4 bg-blue-500 text-white px-4 py-2  hover:bg-blue-600 transition duration-200"
                >
                    {showForm ? 'Hide Product Form' : 'Add Product +'}
                </button>

                {/* Product Form */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4">{editProductId ? 'Edit Product' : 'Create Product'}</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="productName">Product Name</label>
                            <input 
                                type="text" 
                                id="productName" 
                                value={productName} 
                                onChange={(e) => setProductName(e.target.value)} 
                                required
                                className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="price">Price</label>
                            <input 
                                type="number" 
                                id="price" 
                                value={price} 
                                onChange={(e) => setPrice(e.target.value)} 
                                required
                                className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="stockQuantity">Stock Quantity</label>
                            <input 
                                type="number" 
                                id="stockQuantity" 
                                value={stockQuantity} 
                                onChange={(e) => setStockQuantity(e.target.value)} 
                                required
                                className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="description">Description</label>
                            <textarea 
                                id="description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Main Image Upload Section */}
                        <div className="mb-4">
                            <label className="block text-gray-700" htmlFor="mainImage">Main Image (Required)</label>
                            <input 
                                type="file" 
                                onChange={handleMainImageChange}
                                accept="image/*" // Accept image files only
                                required // Main image is required
                                className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {mainImage && <img src={mainImage} alt="Main Product" className="w-40 h-40 object-cover mt-2" />}
                        </div>

                        {/* Additional Images Upload Section */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Additional Images (Optional, up to 3)</label>
                            <input 
                                type="file" 
                                onChange={handleAdditionalImagesChange}
                                accept="image/*" // Accept image files only
                                multiple // Allow multiple file uploads
                                className="mt-2 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="mt-2 flex flex-wrap">
                                {additionalImages.map((image, index) => (
                                    <img key={index} src={image} alt={`Additional Image ${index + 1}`} className="w-20 h-20 object-cover mr-2" />
                                ))}
                            </div>
                        </div>

                        {/* Categories Checkbox Section */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Categories</label>
                            {categories.map(category => (
                                <div key={category.id} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={category.id} 
                                        value={category.id} 
                                        checked={selectedCategories.includes(category.id)} 
                                        onChange={handleCategoryChange} 
                                        className="mr-2" 
                                    />
                                    <label htmlFor={category.id}>{category.name}</label>
                                </div>
                            ))}
                        </div>

                        {/* Tags Checkbox Section */}
                        <div className="mb-4">
                            <label className="block text-gray-700">Tags</label>
                            {tags.map(tag => (
                                <div key={tag.id} className="flex items-center">
                                    <input 
                                        type="checkbox" 
                                        id={tag.id} 
                                        value={tag.id} 
                                        checked={selectedTags.includes(tag.id)} 
                                        onChange={handleTagChange} 
                                        className="mr-2" 
                                    />
                                    <label htmlFor={tag.id}>{tag.name}</label>
                                </div>
                            ))}
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                        >
                            {editProductId ? 'Update Product' : 'Create Product'}
                        </button>
                    </form>
                )}

                {/* Display Existing Products */}
                <h2 className="text-2xl font-bold mb-4">Existing Products</h2>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <ul className="space-y-2">
                        {products.length > 0 ? (
                            products.map(product => (
                                <li key={product.id} className="border-b py-2 flex justify-between items-center">
                                    <div className="flex-1">
                                        <h3 className="font-bold">{product.name}</h3>
                                        <p>Price: ₹{product.price.toLocaleString()}</p>
                                        <p>Stock: {product.stock}</p>
                                        <p>{product.description}</p>
                                        
                                        {/* Display Categories */}
                                        <p>Categories: {
                                            (product.categories || []).map(catId => {
                                                const category = categories.find(cat => cat.id === catId);
                                                return category ? category.name : null;
                                            }).filter(name => name).join(', ')
                                        }</p>

                                        {/* Display Tags */}
                                        <p>Tags: {
                                            (product.tags || []).map(tagId => {
                                                const tag = tags.find(tag => tag.id === tagId);
                                                return tag ? tag.name : null;
                                            }).filter(name => name).join(', ')
                                        }</p>

                                        {/* Display Main Image */}
                                        {product.mainImage && (
                                            <div className="mt-2">
                                                <h4 className="font-semibold">Main Image:</h4>
                                                <img src={product.mainImage} alt="Main Product" className="w-40 h-40 object-cover mr-2 mb-2" />
                                            </div>
                                        )}

                                        {/* Display Additional Images */}
                                        {product.additionalImages && product.additionalImages.length > 0 && (
                                            <div className="mt-2">
                                                <h4 className="font-semibold">Additional Images:</h4>
                                                <div className="flex flex-wrap">
                                                    {product.additionalImages.map((img, index) => (
                                                        <img key={index} src={img} alt={`Additional Image ${index + 1}`} className="w-20 h-20 object-cover mr-2" />
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleEdit(product)} // Call edit function
                                            className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-200"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(product.id)} // Call delete function
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No products available.</p>
                        )}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
};

export default CreateProduct;
