import { NextResponse } from 'next/server';

const SHIPROCKET_EMAIL = "flyyourtech@gmail.com";
const SHIPROCKET_PASSWORD = "flyyourtech@gmail.com";

async function generateShiprocketToken() {
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
            throw new Error('Failed to generate token');
        }

        const data = await response.json();
        return data.token;
    } catch (error) {
        console.error('Token generation error:', error);
        throw new Error('Authentication failed');
    }
}

export async function GET(request, { params }) {
    try {
        const orderId = params.orderId;
        console.log('Tracking Order ID:', orderId); // Debug log

        // Generate token
        const token = await generateShiprocketToken();
        console.log('Token generated successfully'); // Debug log

        // First, try to get order details
        const orderResponse = await fetch(
            `https://apiv2.shiprocket.in/v1/external/orders/show/${orderId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!orderResponse.ok) {
            console.log('Order fetch failed:', await orderResponse.text()); // Debug log
            throw new Error('Order not found');
        }

        const orderData = await orderResponse.json();
        console.log('Order data:', orderData); // Debug log

        // If no shipment_id, return order status
        if (!orderData.shipment_id) {
            return NextResponse.json({
                status: 'success',
                tracking_info: {
                    tracking_data: {
                        track_status: 1,
                        shipment_status: 1,
                        shipment_track: [{
                            id: orderData.id,
                            order_id: orderId,
                            current_status: orderData.status || 'Processing',
                            destination: orderData.shipping_address || 'Not available',
                            edd: orderData.expected_delivery_date || null
                        }],
                        shipment_track_activities: [{
                            date: orderData.created_at,
                            activity: 'Order Placed',
                            location: 'Order Processing Center'
                        }],
                        track_url: '',
                        is_return: false
                    }
                }
            });
        }

        // If there's a shipment_id, get tracking details
        const trackingResponse = await fetch(
            `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${orderData.shipment_id}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!trackingResponse.ok) {
            console.log('Tracking fetch failed:', await trackingResponse.text()); // Debug log
            throw new Error('Failed to fetch tracking details');
        }

        const trackingData = await trackingResponse.json();
        console.log('Tracking data:', trackingData); // Debug log

        // If no tracking activities, provide order status
        if (!trackingData.tracking_data.shipment_track_activities) {
            return NextResponse.json({
                status: 'success',
                tracking_info: {
                    tracking_data: {
                        track_status: 1,
                        shipment_status: 1,
                        shipment_track: [{
                            id: orderData.id,
                            awb_code: trackingData.tracking_data.shipment_track?.[0]?.awb_code || '',
                            order_id: orderId,
                            current_status: orderData.status || 'Processing',
                            destination: orderData.shipping_address || 'Not available',
                            edd: orderData.expected_delivery_date || null
                        }],
                        shipment_track_activities: [{
                            date: orderData.created_at,
                            activity: 'Order Placed',
                            location: 'Order Processing Center'
                        }],
                        track_url: trackingData.tracking_data.track_url || '',
                        is_return: false
                    }
                }
            });
        }

        return NextResponse.json({
            status: 'success',
            tracking_info: trackingData
        });

    } catch (error) {
        console.error('Order tracking error:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: error.message || 'Failed to fetch tracking details',
                tracking_info: {
                    tracking_data: {
                        track_status: 1,
                        shipment_status: 1,
                        shipment_track: [{
                            current_status: 'Order Processing',
                            destination: 'Not available yet',
                        }],
                        shipment_track_activities: [{
                            date: new Date().toISOString(),
                            activity: 'Order Processing',
                            location: 'Order Processing Center'
                        }],
                        is_return: false
                    }
                }
            },
            { status: 200 } // Return 200 even for no tracking data
        );
    }
}