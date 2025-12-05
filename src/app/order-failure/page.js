"use client";
import Link from "next/link";
import { FiXCircle, FiRefreshCw, FiBox, FiHome } from "react-icons/fi";

export default function OrderFailurePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-blue-50 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-lg bg-white/90 rounded-3xl shadow-2xl border border-red-100 p-8">
        <div className="flex flex-col items-center mb-8">
          <FiXCircle className="text-red-500 text-5xl mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Failed</h1>
          <p className="text-gray-600 text-center">
            Unfortunately, your order could not be completed.<br />
            <span className="text-gray-500 text-sm">
              This may be due to a payment issue or a technical error.
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4 mb-8">
          <Link
            href="/user/checkout"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            <FiRefreshCw /> Try Again
          </Link>
          <Link
            href="/user/orders"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
          >
            <FiBox /> Go to My Orders
          </Link>
          <Link
            href="/user/home"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-semibold hover:bg-gray-100 transition"
          >
            <FiHome /> Go to Home
          </Link>
        </div>

        <div className="text-center text-gray-400 text-sm">
          Need help?{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
