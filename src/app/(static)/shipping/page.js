'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";

export default function ShippingPage() {
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
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Shipping Policy</h1>

        <h2 className="text-xl font-semibold text-blue-800 mb-3">Domestic Shipping</h2>
        <p className="mb-3 text-gray-700">
          We process and ship your orders within 2 working days via India Post or trusted courier partners like DTDC.
        </p>
        <p className="mb-3 text-gray-700">
          Delivery times typically range from 1 to 5 business days depending on your location relative to Chennai.
        </p>
        <p className="mb-6 text-gray-700">
          Shipping rates vary based on package weight and destination and will be communicated upon shipment creation.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3">International Shipping</h2>
        <p className="mb-3 text-gray-700">
          We ship globally to 220+ countries using couriers such as India Post, DHL, and FedEx.
        </p>
        <p className="mb-3 text-gray-700">
          Standard shipping delivery can take 7 to 20 business days; priority express options (4–6 days) are available upon request with additional charges.
        </p>
        <p className="mb-6 text-gray-700">
          Please note customs clearance delays are outside our control. Any customs duties or taxes must be paid by the recipient.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3">Shipment Confirmation and Tracking</h2>
        <p className="mb-6 text-gray-700">
          Once your order is dispatched, you will receive email and WhatsApp notifications with tracking details.
        </p>

        <h2 className="text-xl font-semibold text-blue-800 mb-3">Returns and Undeliverable Packages</h2>
        <p className="mb-3 text-gray-700">
          If a package is undeliverable due to customs or incorrect address and marked “Return to Origin,” return shipping charges apply to the customer.
        </p>
        <p className="mb-6 text-gray-700">
          Returned packages can be reshipped domestically upon request; additional domestic shipping fees will apply.
        </p>

        <p className="text-gray-700">
          For shipping questions or support, please email <a href="mailto:support@shopease.com" className="text-blue-600 underline">support@shopease.com</a>.
        </p>
        
        <div className="mt-8 text-gray-400 text-sm">
          Last updated on {new Date().toLocaleDateString()}
        </div>
      </section>
    </div>
  );
}
