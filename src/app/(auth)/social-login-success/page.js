"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SocialLoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/user/home");
    }, 800); // Give time for cookie to be stored

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center max-w-md w-full text-center">
        <svg
          className="animate-spin h-10 w-10 text-blue-600 mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Logging you in...</h2>
        <p className="text-gray-600 text-sm">
          Please wait while we redirect you to your dashboard.
        </p>
      </div>
    </div>
  );
}
