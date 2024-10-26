import React from 'react';

function ShipPolicy() {
  return (
    <div className="min-h-screen font-afacadFlux bg-gray-100 p-8 flex flex-col justify-start">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-green-800">Shipping Policy</h1>
      </header>

      <section className="text-gray-700 space-y-6">
        {/* Shipping Policy Overview */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">At Purikam Foods</h2>
          <p>
            Purikam Foods, a startup based in Rewa, Madhya Pradesh, is dedicated to reviving traditional agriculture by producing organic, millet-based foods. Our shipping policy reflects our commitment to delivering fresh, quality products while supporting sustainable farming practices and empowering local farmers.
          </p>
        </div>

        {/* Delivery Timeline */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Delivery Timeline</h2>
          <p>
            We strive to deliver your organic and ready-to-eat products promptly. The estimated delivery timeline is between <strong>5 to 15 days</strong> from the date of your order confirmation, depending on your location and product availability. Occasionally, unforeseen circumstances such as demand surges or transportation delays may affect delivery times, particularly for perishable items.
          </p>
        </div>

        {/* Processing Time */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Processing Time</h2>
          <p>
            All orders are processed within <strong>1-2 business days</strong> to ensure freshness and quality. Once your order is shipped, you will receive a notification with tracking information.
          </p>
        </div>

        {/* Shipping Methods */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Shipping Methods</h2>
          <p>
            We offer <strong>Standard Shipping</strong> with careful handling to maintain the freshness of our organic and millet-based food products. Our packaging is eco-friendly to align with our sustainable values.
          </p>
        </div>

        {/* Shipping Costs */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on your location and the weight of your order. We are pleased to offer <strong>free shipping</strong> on orders over INR 500 as part of our commitment to making healthy, organic food more accessible.
          </p>
        </div>

        {/* Tracking Your Order */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Tracking Your Order</h2>
          <p>
            Once your order has been shipped, you will receive an email with a tracking ID so you can monitor your order’s status and estimated delivery date.
          </p>
        </div>

        {/* Questions and Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Questions and Contact Information</h2>
          <p>
            For any questions regarding our shipping policy, feel free to contact us at <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a> or call us at <strong>Mobile: +91 9981297707</strong>. We’re here to help and ensure that your experience with Purikam Foods is delightful.
          </p>
        </div>

        {/* Changes to this Shipping Policy */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Changes to This Shipping Policy</h2>
          <p>
            We may update this shipping policy as we continue to grow and adapt our services. Changes will take effect immediately upon posting, so please check this page periodically for the latest updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-gray-500 text-sm">&copy; 2024 Purikam Foods. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ShipPolicy;
