// ./src/app/Admin/orders/page.jsx

"use client"; // Ensure this is a client component

import React, { useEffect, useState } from 'react';
import Sidebar from '@/app/Sidebar/Sidebar'; // Import the Sidebar component
import { db } from '@/app/firebase';
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import AdminLayout from '../Layout'; // Import AdminLayout

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollection = await getDocs(collection(db, 'orders'));
                const ordersData = ordersCollection.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <AdminLayout>
            <div className="flex flex-col p-6 font-afacadFlux">
                <h1 className="text-3xl font-bold mb-4">Orders</h1>
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                <th className="py-3 px-6 text-left">Order ID</th>
                                <th className="py-3 px-6 text-left">Product Name</th>
                                <th className="py-3 px-6 text-left">Amount</th>
                                <th className="py-3 px-6 text-left">Status</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm font-light">
                            {orders.map(order => (
                                <tr key={order.id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-6">{order.id}</td>
                                    <td className="py-3 px-6">{order.items.map(item => item.name).join(', ')}</td>
                                    <td className="py-3 px-6">₹{order.totalAmount.toFixed(2)}</td>
                                    {/* Show "Pending" as the default status */}
                                    <td className="py-3 px-6">Pending</td>
                                    <td className="py-3 px-6 text-center">
                                        <Link href={`/Admin/orders/${order.id}`}>
                                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Edit</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Orders;
