// src/app/Admin/tags/page.jsx

"use client"; // Ensure this component is treated as a client component

import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import AdminLayout from '../Layout'; // Import AdminLayout

const Tags = () => {
    const [tags, setTags] = useState([]);
    const [tagName, setTagName] = useState('');
    const [showForm, setShowForm] = useState(false); // State to control form visibility

    useEffect(() => {
        fetchTags();
    }, []);

    const fetchTags = async () => {
        try {
            const tagsCollection = await getDocs(collection(db, 'tags'));
            const tagsData = tagsCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTags(tagsData);
        } catch (err) {
            console.error('Error fetching tags: ', err);
        }
    };

    const handleAddTag = async (e) => {
        e.preventDefault();
        try {
            // Add new tag to Firestore
            await addDoc(collection(db, 'tags'), { name: tagName });
            setTagName(''); // Clear input
            fetchTags(); // Refresh tags
        } catch (err) {
            console.error('Error adding tag: ', err);
        }
    };

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this tag?")) {
            try {
                const tagRef = doc(db, 'tags', id);
                await deleteDoc(tagRef);
                fetchTags(); // Refresh tags after deletion
            } catch (err) {
                console.error('Error deleting tag: ', err);
            }
        }
    };

    return (
        <AdminLayout>
            <h1 className="text-3xl font-afacadFlux font-bold">Tags Management</h1>
            <button 
                onClick={() => setShowForm(!showForm)} 
                className="mt-4 bg-blue-500 text-white px-4 font-afacadFlux py-2 rounded hover:bg-blue-600"
            >
                {showForm ? 'Cancel' : 'Add New Tag'}
            </button>

            {showForm && (
                <form onSubmit={handleAddTag} className="mt-4 mb-6 font-afacadFlux">
                    <input
                        type="text"
                        placeholder="Tag Name"
                        value={tagName}
                        onChange={(e) => setTagName(e.target.value)}
                        required
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button 
                        type="submit" 
                        className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Tag
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
                    {tags.map(tag => (
                        <tr key={tag.id}>
                            <td className="border border-gray-300 p-2">{tag.id}</td>
                            <td className="border border-gray-300 p-2">{tag.name}</td>
                            <td className="border border-gray-300 p-2">
                                <button 
                                    onClick={() => handleDelete(tag.id)} 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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

export default Tags;
