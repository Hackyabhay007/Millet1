"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/app/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import AdminLayout from '../../Layout';
import { Clock, Package, Truck, AlertCircle, CheckCircle, XCircle, RefreshCcw } from 'lucide-react';

// Ensure these are set in your .env.local file
const SHIPROCKET_EMAIL = "flyyourtech@gmail.com";
const SHIPROCKET_PASSWORD = "flyyourtech@gmail.com";

const OrderStatusBadge = ({ status }) => {
    const getStatusColor = (status) => {
        const colors = {
            'Pending': 'bg-yellow-100 text-yellow-800',
            'Processing': 'bg-blue-100 text-blue-800',
            'Shipped': 'bg-green-100 text-green-800',
            'Cancelled': 'bg-red-100 text-red-800',
            'Delivered': 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            {status}
        </span>
    );
};

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [shiprocketResponse, setShiprocketResponse] = useState(null);
    const [shipmentLoading, setShipmentLoading] = useState(false);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        if (!orderId) return;
        
        try {
            const orderDoc = doc(db, 'orders', orderId);
            const orderSnap = await getDoc(orderDoc);
            
            if (orderSnap.exists()) {
                const orderData = orderSnap.data();
                
                // Convert Firestore timestamp to Date
                const orderDate = orderData.orderDate?.toDate?.() || new Date(orderData.orderDate);
                
                // Update order data with formatted date
                setOrder({
                    ...orderData,
                    orderDate: orderDate, // Store as Date object
                    formattedDate: orderDate.toLocaleString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Asia/Kolkata'
                    })
                });
                
                setStatus(orderData.status || 'Pending');
                
                if (orderData.tracking_id) {
                    setShiprocketResponse({
                        awb_code: orderData.tracking_id,
                        shipment_id: orderData.shiprocket_shipment_id,
                        label_url: orderData.label_url,
                        manifest_url: orderData.manifest_url
                    });
                }
            } else {
                setError('Order not found');
            }
        } catch (err) {
            console.error('Error fetching order:', err);
            setError('Failed to load order details');
        } finally {
            setLoading(false);
        }
    };

    const generateShiprocketToken = async () => {
        try {
            const response = await fetch('https://apiv2.shiprocket.in/v1/external/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: SHIPROCKET_EMAIL,
                    password: SHIPROCKET_PASSWORD,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to authenticate with Shiprocket');
            }

            const data = await response.json();
            return data.token;
        } catch (error) {
            console.error('Shiprocket authentication error:', error);
            throw new Error('Failed to authenticate with shipping service');
        }
    };

    const createShiprocketOrder = async () => {
        setShipmentLoading(true);
        try {
            const token = await generateShiprocketToken();

            const postData = {
                order_id: orderId,
                order_date: order.orderDate,
                pickup_location: 'Primary',
                billing_customer_name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
                billing_last_name: order.shippingAddress.lastName,
                billing_address: order.shippingAddress.address,
                billing_city: order.shippingAddress.city,
                billing_pincode: order.shippingAddress.pincode,
                billing_state: order.shippingAddress.state,
                billing_country: order.shippingAddress.country,
                billing_email: order.userEmail,
                billing_phone: order.shippingAddress.phone,
                shipping_is_billing: true,
                order_items: order.items.map(item => ({
                    name: item.name,
                    sku: item.productId,
                    units: item.quantity,
                    selling_price: item.price,
                })),
                payment_method: order.paymentMethod === 'cod' ? 'COD' : 'Prepaid',
                sub_total: order.totalAmount,
                length: 10,
                breadth: 10,
                height: 10,
                weight: 0.5,
            };

            const response = await fetch('https://apiv2.shiprocket.in/v1/external/shipments/create/forward-shipment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(postData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData);
                
                throw new Error(errorData.message || 'Failed to create shipment');
            }

            const data = await response.json();
            
            // Update Firestore with shipping details
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, {
                shiprocket_shipment_id: data.payload.shipment_id,
                tracking_id: data.payload.awb_code,
                label_url: data.payload.label_url,
                manifest_url: data.payload.manifest_url,
            });

            setShiprocketResponse(data.payload);
            return data;
        } catch (error) {
            console.error('Error creating shipment:', error);
            throw error;
        } finally {
            setShipmentLoading(false);
        }
    };

    const handleSaveStatus = async () => {
        setIsSaving(true);
        setError(null);
        
        try {
            const orderRef = doc(db, 'orders', orderId);
            
            if (status === 'Shipped' && !shiprocketResponse) {
                await createShiprocketOrder();
            }
            
            await updateDoc(orderRef, { 
                status,
                statusUpdatedAt: new Date().toISOString()
            });
            
            setOrder(prev => ({
                ...prev,
                status
            }));

        } catch (error) {
            console.error('Error updating order:', error);
            setError(error.message || 'Failed to update order status');
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <Clock className="w-6 h-6 mr-2 animate-spin" />
                    <p>Loading order details...</p>
                </div>
            </AdminLayout>
        );
    }

    if (error) {
        return (
            <AdminLayout>
                <div className="flex items-center justify-center min-h-screen text-red-600">
                    <AlertCircle className="w-6 h-6 mr-2" />
                    <p>{error}</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Order #{orderId}</h1>
                        <p className="text-sm text-gray-500">
                            Placed on {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                    </div>
                    <OrderStatusBadge status={status} />
                </div>

                {/* Customer and Shipping Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-lg font-semibold mb-4">Customer Details</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Name</span>
                                <span>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Email</span>
                                <span>{order.userEmail}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Phone</span>
                                <span>{order.shippingAddress.phone}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                        <div className="space-y-2">
                            <p>{order.shippingAddress.address}</p>
                            <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                            <p>{order.shippingAddress.country} - {order.shippingAddress.pincode}</p>
                        </div>
                    </div>
                </div>

                {/* Order Items */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Order Items</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Quantity
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {order.items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                            <div className="text-sm text-gray-500">SKU: {item.productId}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                            ₹{item.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                            ₹{item.subtotal}
                                        </td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-50">
                                    <td colSpan="3" className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                                        Total Amount
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                        ₹{order.totalAmount}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Shipping Information */}
                {shiprocketResponse && (
                    <div className="bg-white p-6 rounded-lg shadow-sm border">
                        <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Tracking ID</p>
                                <p className="font-medium">{shiprocketResponse.awb_code}</p>
                            </div>
                            <div>
                                <p className="text-gray-600">Shipment ID</p>
                                <p className="font-medium">{shiprocketResponse.shipment_id}</p>
                            </div>
                            {shiprocketResponse.label_url && (
                                <div className="col-span-2">
                                    <a 
                                        href={shiprocketResponse.label_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        <Truck className="w-4 h-4 mr-2" />
                                        Download Shipping Label
                                    </a>
                                </div>
                            )}
                            {shiprocketResponse.manifest_url && (
                                <div className="col-span-2">
                                    <a 
                                        href={shiprocketResponse.manifest_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                                    >
                                        <Package className="w-4 h-4 mr-2" />
                                        Download Manifest
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Order Actions */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Update Order Status</h2>
                    <div className="flex items-center space-x-4">
                    <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
                            disabled={isSaving || shipmentLoading}
                        >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>

                        <button
                            onClick={handleSaveStatus}
                            disabled={isSaving || shipmentLoading}
                            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                ${isSaving || shipmentLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {isSaving || shipmentLoading ? (
                                <>
                                    <RefreshCcw className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                    {status === 'Shipped' && !shiprocketResponse ? 'Creating Shipment...' : 'Updating Status...'}
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="-ml-1 mr-2 h-4 w-4" />
                                    Update Status
                                </>
                            )}
                        </button>
                    </div>

                    {/* Status Change Warning */}
                    {status === 'Shipped' && !shiprocketResponse && (
                        <div className="mt-4 p-4 bg-yellow-50 rounded-md">
                            <div className="flex">
                                <AlertCircle className="h-5 w-5 text-yellow-400" />
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">
                                        Shipping Notice
                                    </h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <p>
                                            Changing status to Shipped will automatically create a shipment with Shiprocket. 
                                            This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mt-4 p-4 bg-red-50 rounded-md">
                            <div className="flex">
                                <XCircle className="h-5 w-5 text-red-400" />
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">
                                        Error
                                    </h3>
                                    <div className="mt-2 text-sm text-red-700">
                                        <p>{error}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Payment Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Payment Method</p>
                            <p className="font-medium capitalize">{order.paymentMethod}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Payment Status</p>
                            <p className="font-medium capitalize">{order.paymentStatus}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Total Amount</p>
                            <p className="font-medium">₹{order.totalAmount}</p>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                    Order Placed
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(order.orderDate).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {order.statusUpdatedAt && (
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <RefreshCcw className="h-5 w-5 text-blue-600" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                        Status Updated to {order.status}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {new Date(order.statusUpdatedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        )}

                        {shiprocketResponse && (
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                                        <Truck className="h-5 w-5 text-purple-600" />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                        Shipment Created
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Tracking ID: {shiprocketResponse.awb_code}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default OrderDetails;