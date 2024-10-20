// src/app/Admin/categories/page.jsx

"use client"; // Ensure this component is treated as a client component

import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import AdminLayout from '../Layout'; // Import AdminLayout

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null); // State for the category being edited
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const categoriesCollection = await getDocs(collection(db, 'categories'));
            const categoriesData = categoriesCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(categoriesData);
        } catch (err) {
            console.error('Error fetching categories: ', err);
        }
    };

    const handleCreateOrUpdateCategory = async (e) => {
        e.preventDefault();
        try {
            if (editCategoryId) {
                // Update existing category
                const categoryRef = doc(db, 'categories', editCategoryId);
                await updateDoc(categoryRef, { name: categoryName });
            } else {
                // Create new category
                await addDoc(collection(db, 'categories'), { name: categoryName });
            }
            resetForm();
            fetchCategories(); // Refresh categories
        } catch (err) {
            console.error('Error saving category: ', err);
        }
    };

    const handleEdit = (category) => {
        setCategoryName(category.name);
        setEditCategoryId(category.id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            try {
                const categoryRef = doc(db, 'categories', id);
                await deleteDoc(categoryRef);
                fetchCategories(); // Refresh categories after deletion
            } catch (err) {
                console.error('Error deleting category: ', err);
            }
        }
    };

    const resetForm = () => {
        setCategoryName('');
        setEditCategoryId(null);
        setShowForm(false);
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-afacadFlux font-bold">Categories</h1>
            <button 
                onClick={() => setShowForm(!showForm)} 
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {showForm ? 'Cancel' : 'Create New Category'}
            </button>

            {showForm && (
                <form onSubmit={handleCreateOrUpdateCategory} className="mt-4 mb-6">
                    <input
                        type="text"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {editCategoryId ? 'Update Category' : 'Create Category'}
                    </button>
                </form>
            )}

            <table className="mt-6 min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id}>
                            <td className="border border-gray-300 p-2">{category.id}</td>
                            <td className="border border-gray-300 p-2">{category.name}</td>
                            <td className="border border-gray-300 p-2">
                                <button 
                                    onClick={() => handleEdit(category)} 
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(category.id)} 
                                    className="ml-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </AdminLayout>
    );
};

export default Categories;
