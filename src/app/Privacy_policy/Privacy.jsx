import React from 'react';

function Privacy() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 font-afacadFlux flex flex-col justify-start">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-green-800">Privacy Policy</h1>
      </header>

      <section className="text-gray-700 space-y-6">
        {/* What We Do With Your Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">What Do We Do With Your Information?</h2>
          <p>
            At Purikam Foods, we value your privacy and transparency in how we handle your personal information. When you purchase our organic, millet-based food products, we collect the necessary information such as your name, address, and email to ensure seamless transactions and efficient delivery. When you browse our website, we may also receive information about your device, such as IP address, to help us understand user behavior and improve your experience.
          </p>
          <p>
            With your consent, we may send you updates on new products, promotions, and insights into sustainable farming practices that align with our values.
          </p>
        </div>

        {/* Consent */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Consent</h2>
          <p>
            By providing us with personal information during a transaction, such as placing an order or arranging for a delivery, you consent to our collecting and using it for the specified purpose only. For additional uses, like marketing, we will explicitly ask for your consent.
          </p>
          <p>
            To withdraw consent, contact us at <strong>Near Ajigarha Bypass, Satna Road, Rewa, Madhya Pradesh - 486001, India</strong> or email us at <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a>.
          </p>
        </div>

        {/* Disclosure */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Disclosure</h2>
          <p>
            We may disclose your personal information only if required by law or if you violate our Terms of Service.
          </p>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Payment</h2>
          <p>
            Purikam Foods processes payments securely through Razorpay, which adheres to PCI-DSS standards to ensure the protection of your card information. Transaction data is only used for completing your purchase and is not stored post-transaction. For more, refer to Razorpay’s privacy policy on <a href="https://razorpay.com" className="text-blue-500 underline">razorpay.com</a>.
          </p>
        </div>

        {/* Third-Party Services */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
          <p>
            Our third-party service providers, like payment gateways, only access your information to perform necessary functions. We encourage reviewing their privacy policies to understand how your data is handled outside our website. When redirected to a third-party site, this Privacy Policy and our Terms of Service no longer apply.
          </p>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Security</h2>
          <p>
            We take reasonable precautions and follow best practices to secure your personal information from unauthorized access, misuse, or loss.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
          <p>
            Our website uses cookies to maintain session information for a better user experience. Cookies do not identify you personally across other websites.
          </p>
        </div>

        {/* Age of Consent */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Age of Consent</h2>
          <p>
            By using this site, you represent that you are of legal age in your residence area, or you have the consent of your legal guardian if you are a minor.
          </p>
        </div>

        {/* Changes to this Privacy Policy */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update this policy as needed. Changes take effect immediately upon posting. If Purikam Foods undergoes a merger or acquisition, your information may transfer to the new owners to continue serving you.
          </p>
        </div>

        {/* Questions and Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Questions and Contact Information</h2>
          <p>
            For questions, or to access, correct, or delete your information, please contact us at <strong>Near Ajigarha Bypass, Satna Road, Rewa, Madhya Pradesh - 486001, India</strong> or email <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a>.
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

export default Privacy;
