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
            When you purchase something from our store, we collect the personal information you give us such as your name, address, and email address. When you browse our store, we also automatically receive your computer’s internet protocol (IP) address to help us learn about your browser and operating system. 
          </p>
          <p>
            Email marketing (if applicable): With your permission, we may send you emails about our store, new products, and other updates.
          </p>
        </div>

        {/* Consent */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Consent</h2>
          <p>
            How do you get my consent? When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only. If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent or provide you with an opportunity to say no. 
          </p>
          <p>
            How do I withdraw my consent? If you change your mind after opting in, you may withdraw your consent for us to contact you, for the continued collection, use, or disclosure of your information, at any time, by contacting us at <strong>Near Ajigarha Bypass, Satna Road, Rewa, Madhya Pradesh - 486001, India</strong> or mailing us at <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a>.
          </p>
        </div>

        {/* Disclosure */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Disclosure</h2>
          <p>
            We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.
          </p>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Payment</h2>
          <p>
            We use Razorpay for processing payments. We/Razorpay do not store your card data on their servers. The data is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS) when processing payment. Your purchase transaction data is only used as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is not saved.
          </p>
          <p>
            Our payment gateway adheres to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express, and Discover. For more insight, you may also want to read the terms and conditions of Razorpay on <a href="https://razorpay.com" className="text-blue-500 underline">razorpay.com</a>.
          </p>
        </div>

        {/* Third-Party Services */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
          <p>
            In general, the third-party providers used by us will only collect, use, and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies regarding the information we are required to provide to them for your purchase-related transactions.
          </p>
          <p>
            For these providers, we recommend that you read their privacy policies to understand how your personal information will be handled. Once you leave our store’s website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website’s Terms of Service.
          </p>
        </div>

        {/* Security */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Security</h2>
          <p>
            To protect your personal information, we take reasonable precautions and follow industry best practices to ensure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.
          </p>
        </div>

        {/* Cookies */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Cookies</h2>
          <p>
            We use cookies to maintain the session of your user. It is not used to personally identify you on other websites.
          </p>
        </div>

        {/* Age of Consent */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Age of Consent</h2>
          <p>
            By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and have given us your consent to allow any of your minor dependents to use this site.
          </p>
        </div>

        {/* Changes to this Privacy Policy */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it. If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.
          </p>
        </div>

        {/* Questions and Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold mb-2">Questions and Contact Information</h2>
          <p>
            If you would like to access, correct, amend, or delete any personal information we have about you, register a complaint, or simply want more information, contact our Privacy Compliance Officer at <strong>Near Ajigarha Bypass, Satna Road, Rewa, Madhya Pradesh - 486001, India</strong> or by mail at <a href="mailto:rewastatefarms@gmail.com" className="text-blue-500 underline">rewastatefarms@gmail.com</a>.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-gray-500 text-sm">&copy; 2024 Rewa State Farms. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Privacy;
