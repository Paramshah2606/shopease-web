'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";

export default function AboutPage() {
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
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">About ShopEase</h1>
        <p className="text-lg text-gray-800 mb-5">
          ShopEase was founded to make fashion shopping effortless, inspiring, and accessible to everyone. Our mission is to connect people with looks they love, from everyday essentials to bold new launches, all curated with care and delivered with speed.
        </p>
        <p className="mb-5 text-gray-800">
          We started as a group of friends who were frustrated by how hard it was to find trustworthy, on-trend, fairly-priced apparel online. Today our team brings passion, expertise, and heart to helping customers discover, experiment, and express themselves—confidently!
        </p>
        <ul className="list-disc pl-6 text-gray-700 mb-6">
          <li>Curated collections for every mood and season.</li>
          <li>Fast, reliable shipping and free returns.</li>
          <li>Exclusive deals and early access for loyal customers.</li>
          <li>Always-open support, always listening to your feedback.</li>
        </ul>
        <p className="mb-6 text-gray-700">
          Whether you&rsquo;re here for basics, trends, or inspiration, ShopEase is excited to be your trusted style partner. Thank you for shopping with us!
        </p>
        <div className="mt-8 text-gray-400 text-sm">© {new Date().getFullYear()} ShopEase. All rights reserved.</div>
      </section>
    </div>
  );
}
