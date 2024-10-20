// ./src/app/Admin/orders/[id].jsx

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AdminLayout from '../Layout'; // Import AdminLayout

const OrderDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (id) {
                const orderDoc = doc(db, 'orders', id);
                const orderSnap = await getDoc(orderDoc);
                if (orderSnap.exists()) {
                    setOrder(orderSnap.data());
                } else {
                    console.log("No such order!");
                }
                setLoading(false); // Stop loading after fetching
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) return <div>Loading...</div>;

    return (
        <AdminLayout>
            <div className="p-6 font-afacadFlux">
                <h1 className="text-3xl font-bold mb-4">Order Details for #{order.id}</h1>
                <h2 className="text-xl font-semibold mt-4">Customer Details</h2>
                <p>Email: {order.customerEmail}</p>
                <p>Phone: {order.customerPhone}</p>
                <p>Address: {order.customerAddress}</p>
                
                <h2 className="text-xl font-semibold mt-4">Order Details</h2>
                <p>Total Amount: {order.totalAmount}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                <p>Status: {order.status}</p>
                
                <h2 className="text-xl font-semibold mt-4">Order Items</h2>
                <ul className="list-disc list-inside">
                    {order.items.map(item => (
                        <li key={item.id}>
                            {item.name} - Quantity: {item.quantity} - Price: ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>
                
                {/* Button to update order status */}
                <button onClick={() => {/* Handle status update */}} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Update Status
                </button>
            </div>
        </AdminLayout>
    );
};

export default OrderDetails;
