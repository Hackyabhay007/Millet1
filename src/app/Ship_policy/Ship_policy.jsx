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
          <h2 className="text-2xl font-semibold mb-2">At Purikam</h2>
          <p>
            We are committed to ensuring that your orders are delivered promptly and efficiently. This shipping policy outlines our practices regarding the shipping of your orders.
          </p>
        </div>

        {/* Delivery Timeline */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Delivery Timeline</h2>
          <p>
            We strive to ensure prompt delivery of your orders. The estimated delivery timeline is between <strong>5 to 15 days</strong> from the date of your order confirmation, depending on your location and the availability of the products ordered. Please note that unforeseen circumstances may occasionally affect delivery times.
          </p>
        </div>

        {/* Processing Time */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Processing Time</h2>
          <p>
            All orders are processed within <strong>1-2 business days</strong>. You will receive a notification once your order has been shipped.
          </p>
        </div>

        {/* Shipping Methods */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Shipping Methods</h2>
          <p>
            We offer several shipping methods to ensure your order reaches you safely. Available shipping methods include <strong>Standard Shipping</strong>.
          </p>
        </div>

        {/* Shipping Costs */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Shipping Costs</h2>
          <p>
            Shipping costs are calculated at checkout based on your location and the weight of your order. We also offer <strong>free shipping</strong> on orders over INR 500.
          </p>
        </div>

        {/* Tracking Your Order */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Tracking Your Order</h2>
          <p>
            Once your order has shipped, you will receive an invoice containing a tracking ID so you can monitor your order’s status.
          </p>
        </div>

        {/* Questions and Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Questions and Contact Information</h2>
          <p>
            If you have any questions regarding our shipping policy, please contact us at <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a> or call us at <strong>Mobile: +91 9981297707</strong>.
          </p>
        </div>

        {/* Changes to this Shipping Policy */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Changes to This Shipping Policy</h2>
          <p>
            We reserve the right to modify this shipping policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-gray-500 text-sm">&copy; 2024 Purikam. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ShipPolicy;
