"use client"; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import { db } from '@/app/firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import AdminLayout from '../Layout'; // Import AdminLayout

const HeroSection = () => {
    const [heroSections, setHeroSections] = useState([]);
    const [newHero, setNewHero] = useState({
        title: '',
        subheading: '',
        buttonName: '',
        link: '',
        image: '',
        background: 'bg-white' // Default background color
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // State for success message
    const [editMode, setEditMode] = useState(false); // State to track edit mode
    const [currentId, setCurrentId] = useState(null); // State to track the id of the current hero section being edited

    // Define available background color options
    const backgroundOptions = [
        'bg-green-200',
        'bg-yellow-100',
        'bg-red-200',
        'bg-blue-200',
        'bg-purple-200',
        'bg-gray-200',
        'bg-indigo-200',
        'bg-pink-200',
    ];

    useEffect(() => {
        const fetchHeroSections = async () => {
            try {
                const snapshot = await getDocs(collection(db, 'heroSections'));
                const sections = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setHeroSections(sections);
            } catch (err) {
                console.error('Error fetching hero sections: ', err);
                setError('Failed to load hero sections.');
            } finally {
                setLoading(false); // Ensure loading is set to false regardless of success or failure
            }
        };

        fetchHeroSections();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewHero({ ...newHero, [name]: value });
    };

    const handleAddHero = async () => {
        try {
            await addDoc(collection(db, 'heroSections'), newHero);
            setHeroSections([...heroSections, newHero]); // Append new hero to the list
            resetForm();
            setSuccessMessage('Hero section added successfully!'); // Set success message
            setError(null); // Clear any previous error messages
        } catch (err) {
            console.error('Error adding hero section: ', err);
            setError('Failed to add hero section. Please try again.');
            setSuccessMessage(null); // Clear any previous success messages
        }
    };

    const handleEditHero = async (id) => {
        setEditMode(true);
        const sectionToEdit = heroSections.find(section => section.id === id);
        setCurrentId(id);
        setNewHero(sectionToEdit); // Populate the form with the existing section data
    };

    const handleUpdateHero = async () => {
        try {
            const sectionRef = doc(db, 'heroSections', currentId);
            await updateDoc(sectionRef, newHero); // Update Firestore document
            const updatedSections = heroSections.map(section =>
                section.id === currentId ? { ...section, ...newHero } : section
            );
            setHeroSections(updatedSections); // Update the local state
            resetForm();
            setSuccessMessage('Hero section updated successfully!'); // Set success message
            setError(null); // Clear any previous error messages
        } catch (err) {
            console.error('Error updating hero section: ', err);
            setError('Failed to update hero section. Please try again.');
            setSuccessMessage(null); // Clear any previous success messages
        }
    };

    const handleDeleteHero = async (id) => {
        try {
            await deleteDoc(doc(db, 'heroSections', id));
            setHeroSections(heroSections.filter(section => section.id !== id));
            setSuccessMessage('Hero section deleted successfully!'); // Set success message
            setError(null); // Clear any previous error messages
        } catch (err) {
            console.error('Error deleting hero section: ', err);
            setError('Failed to delete hero section. Please check if it exists.');
            setSuccessMessage(null); // Clear any previous success messages
        }
    };

    const resetForm = () => {
        setNewHero({
            title: '',
            subheading: '',
            buttonName: '',
            link: '',
            image: '',
            background: 'bg-white'
        });
        setEditMode(false); // Reset edit mode
        setCurrentId(null); // Reset current id
    };

    if (loading) return <p>Loading hero sections...</p>; // Keep loading indication

    return (
        <AdminLayout>
            <h1 className="text-3xl font-afacadFlux font-bold">Hero Sections</h1>
            {error && <p className="text-red-500 mt-2">{error}</p>} {/* Show error message */}
            {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>} {/* Show success message */}
            <h2 className="text-xl mt-4">{editMode ? 'Edit Hero Section' : 'Create New Hero Section'}</h2>
            <div className="mt-2">
                <input
                    name="title"
                    value={newHero.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="border rounded p-2 mr-2"
                />
                <input
                    name="subheading"
                    value={newHero.subheading}
                    onChange={handleInputChange}
                    placeholder="Subheading"
                    className="border rounded p-2 mr-2"
                />
                <input
                    name="buttonName"
                    value={newHero.buttonName}
                    onChange={handleInputChange}
                    placeholder="Button Name"
                    className="border rounded p-2 mr-2"
                />
                <input
                    name="link"
                    value={newHero.link}
                    onChange={handleInputChange}
                    placeholder="Link"
                    className="border rounded p-2 mr-2"
                />
                <input
                    name="image"
                    value={newHero.image}
                    onChange={handleInputChange}
                    placeholder="Image URL"
                    className="border rounded p-2 mr-2"
                />
                
                {/* Background Color Selection */}
                <select
                    name="background"
                    value={newHero.background}
                    onChange={handleInputChange}
                    className="border rounded p-2 mr-2"
                >
                    {backgroundOptions.map((bgClass, index) => (
                        <option key={index} value={bgClass}>{bgClass}</option>
                    ))}
                </select>

                <button
                    onClick={editMode ? handleUpdateHero : handleAddHero} // Call update or add based on edit mode
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {editMode ? 'Update Hero Section' : 'Add Hero Section'}
                </button>
            </div>

            <h2 className="text-xl mt-6">Existing Hero Sections</h2>
            <ul className="mt-2">
                {heroSections.map(section => (
                    <li key={section.id} className={`border-b py-2 flex justify-between items-center ${section.background}`}>
                        <div>
                            <h3 className="font-bold">{section.title}</h3>
                            <p>{section.subheading}</p>
                        </div>
                        <div className="flex space-x-2"> {/* Space between buttons */}
                            <button
                                onClick={() => handleEditHero(section.id)} // Handle edit button click
                                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDeleteHero(section.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
};

export default HeroSection;
