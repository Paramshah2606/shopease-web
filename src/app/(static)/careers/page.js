'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";

export default function CareersPage() {
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
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Careers at ShopEase</h1>
        <p className="text-lg text-gray-800 mb-5">
          Dream of changing the way India shops online?
          <br />
          We’re growing fast and always looking for creative, passionate, and motivated people to join our mission.
        </p>
        <p className="mb-5 text-gray-800">
          At ShopEase, you’ll find a collaborative culture, flexible working options, real growth opportunities, and the chance to help shape a positive, smoother e-commerce experience for millions.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3 mt-6">We’re hiring for:</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
          <li>Customer Experience Specialist</li>
          <li>UI/UX Designer</li>
          <li>Full Stack Developer</li>
          <li>Merchandising & Buying Assistant</li>
        </ul>

        <p className="mb-6 text-gray-700">
          If you don&rsquo;t see your role here but love our mission, write to us anyway!
        </p>
        <p className="text-gray-700">
          Applications & queries: <a href="mailto:careers@shopease.com" className="text-blue-600 underline">careers@shopease.com</a>
        </p>
        <div className="mt-8 text-gray-400 text-sm">Current as of {new Date().toLocaleDateString()}</div>
      </section>
    </div>
  );
}
