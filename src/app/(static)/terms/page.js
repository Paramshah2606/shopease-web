'use client';

import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function TermsOfServicePage() {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Set the date only on the client side to avoid hydration mismatch
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-4 px-2">
      {/* Back Button */}
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-700 font-semibold mb-2 hover:underline hover:text-blue-900 transition"
        >
          <FiArrowLeft className="text-xl" />
          Back
        </button>
      </div>

      <section className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border border-blue-100 p-8 mt-2">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">
          Terms of Service
        </h1>
        <p className="text-gray-700 mb-4">
          Last updated: {lastUpdated}
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 mb-4">
          By using our website (ShopEase) and services, you agree to comply with and be bound by these Terms of Service.
          If you do not agree with any of these terms, you must not use this site or our services.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          2. Changes to Terms
        </h2>
        <p className="text-gray-700 mb-4">
          We reserve the right to update or modify these Terms at any time. Changes take effect upon posting.
          Please check this page regularly.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          3. Account Registration
        </h2>
        <p className="text-gray-700 mb-4">
          You must provide accurate information and keep your account credentials secure.
          You are responsible for all activity that occurs under your account.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          4. Orders & Payments
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>All prices are listed in INR unless specified otherwise.</li>
          <li>Payment must be made in full before orders are shipped.</li>
          <li>We reserve the right to cancel or refuse any order at our discretion.</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          5. Shipping & Returns
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>
            Shipping, delivery, and return policies are described on our Shipping Policy and Returns Policy pages.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          6. User Conduct
        </h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>Do not misuse the website, post harmful content, or violate anyone&rsquo;s rights.</li>
          <li>We may suspend or terminate accounts that violate these terms.</li>
        </ul>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          7. Intellectual Property
        </h2>
        <p className="text-gray-700 mb-4">
          All content, trademarks, and images are the property of ShopEase or licensors. Unauthorized use is prohibited.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          8. Limitation of Liability
        </h2>
        <p className="text-gray-700 mb-4">
          ShopEase shall not be liable for any indirect, special, or consequential damages. Our aggregate liability is limited to the amount paid for your order.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          9. Governing Law
        </h2>
        <p className="text-gray-700 mb-4">
          These Terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts where ShopEase is registered.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-4">
          10. Contact
        </h2>
        <p className="text-gray-700 mb-2">
          For any questions or concerns about these Terms, email us at{' '}
          <a href="mailto:legal@shopease.com" className="text-blue-600 underline">legal@shopease.com</a>.
        </p>

        <p className="text-xs text-gray-400 mt-6">
          This Terms of Service was generated based on recommended e-commerce T&C best practices.
        </p>
      </section>
    </div>
  );
}
