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
        const awbNumber = params.awbNumber;

        // For testing mode
        if (process.env.SHIPROCKET_TEST_MODE === 'true') {
            return NextResponse.json({
                status: 'success',
                tracking_info: {
                    tracking_data: {
                        track_status: 1,
                        shipment_status: 42,
                        shipment_track: [
                            {
                                awb_code: awbNumber,
                                current_status: "IN_TRANSIT",
                                delivered_to: "Mumbai",
                                destination: "Mumbai",
                                edd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
                            }
                        ],
                        shipment_track_activities: [
                            {
                                date: new Date().toISOString(),
                                status: "IN_TRANSIT",
                                activity: "Package in transit",
                                location: "Delhi Hub",
                            },
                            {
                                date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
                                status: "PICKED_UP",
                                activity: "Package picked up",
                                location: "Delhi Hub",
                            }
                        ],
                        track_url: `https://shiprocket.co/tracking/${awbNumber}`,
                        etd: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
                    }
                }
            });
        }

        // Real API call
        const token = await generateShiprocketToken();

        const trackingResponse = await fetch(
            `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awbNumber}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!trackingResponse.ok) {
            throw new Error('Failed to fetch AWB tracking details');
        }

        const trackingData = await trackingResponse.json();

        return NextResponse.json({
            status: 'success',
            tracking_info: trackingData
        });

    } catch (error) {
        console.error('AWB tracking error:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: error.message || 'Failed to fetch tracking details'
            },
            { status: error.status || 500 }
        );
    }
}