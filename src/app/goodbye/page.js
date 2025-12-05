"use client";
import Link from "next/link";
import { FiSmile, FiLogIn, FiHome } from "react-icons/fi";

export default function GoodbyePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-white flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full bg-white/90 backdrop-blur-md border border-blue-100 shadow-2xl rounded-3xl p-8 flex flex-col items-center text-center">
        <FiSmile className="text-5xl text-blue-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">We&rsquo;re sad to see you go 💔</h1>
        <p className="text-gray-600 mb-6">
          Your account has been successfully deleted. If you ever change your mind or need help, we&rsquo;re always here.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <FiHome /> Go to Home
          </Link>
          <Link
            href="/support"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
          >
            <FiLogIn /> Contact Support
          </Link>
        </div>

        <p className="text-xs text-gray-400 mt-6">We appreciate you being part of our journey. ❤️</p>
      </div>
    </div>
  );
}
