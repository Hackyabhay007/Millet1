"use client"; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Use useParams to get dynamic params
import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Import Firestore functions
import AdminLayout from '../../Layout'; // Import AdminLayout

const OrderDetails = () => {
    const { orderId } = useParams(); // Get dynamic orderId from the route
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('Pending'); // Initialize status with 'Pending'
    const [isSaving, setIsSaving] = useState(false); // To track if we're saving the status change

    // Fetch order details from Firestore
    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (orderId) {
                try {
                    const orderDoc = doc(db, 'orders', orderId); // Get order document reference
                    const orderSnap = await getDoc(orderDoc); // Fetch order data
                    if (orderSnap.exists()) {
                        const orderData = orderSnap.data();
                        setOrder(orderData); // Set order data in state
                        setStatus(orderData.status || 'Pending'); // Set initial status
                    } else {
                        console.log("No such order!");
                    }
                } catch (error) {
                    console.error("Error fetching order details:", error);
                } finally {
                    setLoading(false); // Stop loading after data fetch
                }
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    // Handle status change and save to Firestore
    const handleSaveStatus = async () => {
        setIsSaving(true); // Mark saving process
        try {
            const orderDocRef = doc(db, 'orders', orderId); // Reference to the specific order
            await updateDoc(orderDocRef, { status: status }); // Update status in Firestore
            console.log("Order status updated successfully");
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsSaving(false); // Reset saving process
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <AdminLayout>
            <div className="p-6 font-afacadFlux">
                <h1 className="text-3xl font-bold mb-4">Order Details for #{orderId}</h1>
                {order ? (
                    <>
                        <h2 className="text-xl font-semibold mt-4">Customer Details</h2>
                        <p>Email: {order.customerEmail}</p>
                        <p>Phone: {order.customerPhone}</p>
                        <p>Address: {order.customerAddress}</p>

                        <h2 className="text-xl font-semibold mt-4">Order Details</h2>
                        <p>Total Amount: ₹{order.totalAmount}</p>
                        <p>Payment Method: {order.paymentMethod}</p>

                        {/* Dropdown for order status */}
                        <h2 className="text-xl font-semibold mt-4">Order Status</h2>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)} // Update local status state
                            className="mt-2 border border-gray-300 rounded px-4 py-2"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        {/* Save Status Button */}
                        <button
                            onClick={handleSaveStatus}
                            className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={isSaving} // Disable button while saving
                        >
                            {isSaving ? 'Saving...' : 'Change Status'}
                        </button>

                        <h2 className="text-xl font-semibold mt-4">Order Items</h2>
                        <ul className="list-disc list-inside">
                            {Array.isArray(order.items) && order.items.map(item => (
                                <li key={item.id}>
                                    {item.name} - Quantity: {item.quantity} - Price: ₹{item.price.toFixed(2)}
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p>No order found.</p>
                )}
            </div>
        </AdminLayout>
    );
};

export default OrderDetails;
