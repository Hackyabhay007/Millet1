import React from 'react';

function Refund() {
  return (
    <div className="min-h-screen font-afacadFlux bg-gray-100 p-8 flex flex-col justify-start">
      {/* Company Overview */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-green-800">Purikam</h1>
        <p className="text-lg italic text-gray-600">&quot;Bringing Nature&apos;s Goodness to Your Home&quot;</p>
      </header>

      <section className="text-gray-700 space-y-6">
        {/* Refund and Return Policy */}
        <div>
          <h2 className="text-3xl font-bold mb-4 text-green-800">Refund and Return Policy</h2>

          <p>
            Our return policy lasts for <strong>30 days</strong> from the date of purchase. Unfortunately, we cannot offer refunds or exchanges after this period. To be eligible for a return, the item must be unused, in the same condition as when you received it, and in its original packaging. Please note that certain items, such as personalized products, gift cards, and perishable food products, are non-returnable. To process your return, you must provide a receipt or proof of purchase.
          </p>

          <h3 className="text-xl font-semibold mt-6">1. Refunds (if applicable)</h3>
          <p>
            Once your return is received and inspected, we will notify you via email about the approval or rejection of your refund. If approved, your refund will be processed, and a credit will be applied to your original method of payment within a few days.
          </p>

          <h3 className="text-xl font-semibold mt-6">2. Late or Missing Refunds (if applicable)</h3>
          <p>
            If you haven&apos;t received your refund yet, first check your bank account. Then contact your credit card company or bank, as processing times can vary. If you&apos;ve done all this and still haven&apos;t received your refund, please contact us at <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a>.
          </p>

          <h3 className="text-xl font-semibold mt-6">3. Sale Items (if applicable)</h3>
          <p>
            Only regular priced items may be refunded. Unfortunately, sale items cannot be refunded.
          </p>

          <h3 className="text-xl font-semibold mt-6">4. Exchanges (if applicable)</h3>
          <p>
            We only replace items if they are defective or damaged. If you need to exchange an item, send us an email at <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a>.
          </p>

          <h3 className="text-xl font-semibold mt-6">5. Shipping</h3>
          <p>
            To return your product, mail it to:
            <br />
            <strong>Location:</strong> Near Ajigarha Bypass, Satna Road, Rewa, Madhya Pradesh - 486001, India.
          </p>
          <p>
            You will be responsible for paying your own shipping costs for returning your item. Shipping costs are non-refundable. If you are shipping an item worth over ₹1000, consider using a trackable shipping service or purchasing shipping insurance.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="mt-8 text-center text-gray-700">
        <h3 className="text-lg font-semibold">Contact Us</h3>
        <p>Phone: <strong>+91 120-4244430</strong></p>
        <p>Email: <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a></p>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-gray-500 text-sm">&copy; 2024 Purikam. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Refund;
