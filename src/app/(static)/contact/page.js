'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";

export default function ContactPage() {
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
        <h1 className="text-3xl font-extrabold text-blue-900 mb-4">Contact Us</h1>
        <p className="text-lg text-gray-800 mb-5">
          We&rsquo;re here to help with any questions, issues, or feedback. Reach out to us using any of these methods, or just fill out the form below!
        </p>
        <div className="mb-5 text-gray-700">
          <div className="mb-1">
            <span className="font-semibold text-blue-700">Email:</span>{' '}
            <a href="mailto:support@shopease.com" className="text-blue-600 underline">support@shopease.com</a>
          </div>
          <div className="mb-1">
            <span className="font-semibold text-blue-700">Phone:</span>{' '}
            <a href="tel:+18001234567" className="text-blue-600 underline">+1 800 123 4567</a>
          </div>
          <div>
            <span className="font-semibold text-blue-700">Hours:</span> Mon–Sat: 9am–7pm IST
          </div>
        </div>
        <form className="space-y-4 mt-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 bg-white"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              type="email"
              className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 bg-white"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              className="w-full rounded-xl border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-blue-300 bg-white"
              rows={4}
              placeholder="How can we help?"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-xl bg-blue-700 text-white font-semibold hover:bg-blue-900 transition"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
