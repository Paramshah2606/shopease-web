'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";

export default function PrivacyPolicyPage() {
  const router = useRouter();

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
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">
          At ShopEase, your privacy is very important to us. We are committed to protecting your personal information and ensuring a safe shopping experience.
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-1">
          <li>We collect only necessary personal data to provide you with the best service and never sell your information.</li>
          <li>Your name, email, contact details, and delivery address are stored securely with encryption.</li>
          <li>We use cookies and analytics tools to improve site performance and customer experience.</li>
          <li>All payment transactions are processed securely through trusted payment gateways; no sensitive payment data is stored on our servers.</li>
        </ul>
        <p className="mb-4 text-gray-700">
          You may contact us anytime at <a href="mailto:privacy@shopease.com" className="text-blue-600 underline">privacy@shopease.com</a> for questions or data deletion requests.
        </p>
        <p className="text-xs text-gray-400 mt-4">Last updated on {new Date().toLocaleDateString()}</p>
      </section>
    </div>
  );
}
