"use client";
import Link from "next/link";
import { FiAlertTriangle, FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-lg bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8 flex flex-col items-center">
        <FiAlertTriangle className="text-yellow-500 text-6xl mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Page Not Found</h1>
        <p className="text-gray-600 text-center mb-8">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition"
          >
            <FiArrowLeft /> Go Back
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <FiHome /> Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
