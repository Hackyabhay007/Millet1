"use client"; // Indicate this component is a Client Component

import React, { useEffect, useState } from 'react'; 
import AdminLayout from '../Layout'; // Import the AdminLayout
import { db } from '@/app/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        categories: 0,
        orders: 0,
        tags: 0,
        processing: 0,
        complete: 0,
        shipped: 0,
        cancelled: 0,
    });
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const categoriesSnapshot = await getDocs(collection(db, 'categories'));
                const tagsSnapshot = await getDocs(collection(db, 'tags'));

                // Count total orders and orders by status
                const ordersSnapshot = await getDocs(collection(db, 'orders'));
                let processingCount = 0;
                let completeCount = 0;
                let shippedCount = 0;
                let cancelledCount = 0;

                ordersSnapshot.forEach(doc => {
                    const orderData = doc.data();
                    if (orderData.status === "Processing") {
                        processingCount++;
                    } else if (orderData.status === "Complete") {
                        completeCount++;
                    } else if (orderData.status === "Shipped") {
                        shippedCount++;
                    } else if (orderData.status === "Cancelled") {
                        cancelledCount++;
                    }
                });

                setStats({
                    products: productsSnapshot.size,
                    categories: categoriesSnapshot.size,
                    orders: ordersSnapshot.size,
                    tags: tagsSnapshot.size,
                    processing: processingCount,
                    complete: completeCount,
                    shipped: shippedCount,
                    cancelled: cancelledCount,
                });
                setLoading(false); // Set loading to false after data is fetched
            } catch (err) {
                console.error('Error fetching data: ', err);
                setError('Failed to load data'); // Set error message
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-afacadFlux font-bold">Admin Dashboard</h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Total Products Card */}
                <div className="bg-blue-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Total Products</h2>
                    <p className="text-2xl">{stats.products}</p>
                </div>
                {/* Total Categories Card */}
                <div className="bg-green-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Total Categories</h2>
                    <p className="text-2xl">{stats.categories}</p>
                </div>
                {/* Total Orders Card */}
                <div className="bg-yellow-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Total Orders</h2>
                    <p className="text-2xl">{stats.orders}</p>
                </div>
                {/* Total Tags Card */}
                <div className="bg-purple-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Total Tags</h2>
                    <p className="text-2xl">{stats.tags}</p>
                </div>
                {/* Processing Orders Card */}
                <div className="bg-orange-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Processing Orders</h2>
                    <p className="text-2xl">{stats.processing}</p>
                </div>
                {/* Complete Orders Card */}
                <div className="bg-teal-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Complete Orders</h2>
                    <p className="text-2xl">{stats.complete}</p>
                </div>
                {/* Shipped Orders Card */}
                <div className="bg-indigo-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Shipped Orders</h2>
                    <p className="text-2xl">{stats.shipped}</p>
                </div>
                {/* Cancelled Orders Card */}
                <div className="bg-red-200 p-4 rounded-lg shadow-lg flex flex-col items-center">
                    <h2 className="text-lg font-bold">Cancelled Orders</h2>
                    <p className="text-2xl">{stats.cancelled}</p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
