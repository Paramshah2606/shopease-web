'use client';
import { useRouter } from 'next/navigation';
import { FiArrowLeft } from "react-icons/fi";

const FAQS = [
  {
    q: "How do I track my order?",
    a: "Once your order is shipped, you will receive a tracking link by email and SMS. You can also track your orders through your ShopEase account dashboard.",
  },
  {
    q: "What is the return policy?",
    a: "You may return any unused items within 7 days of receiving your order. We offer hassle-free pickup and refunds.",
  },
  {
    q: "Do you offer international shipping?",
    a: "Currently, ShopEase ships only within India. We are working on expanding our delivery areas.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards, UPI, net banking, and cash on delivery for select regions.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes. All payments are processed through encrypted payment gateways and no payment information is stored on our servers.",
  },
];

export default function FAQPage() {
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
        <h1 className="text-3xl font-extrabold text-blue-900 mb-6">Frequently Asked Questions</h1>
        <dl className="space-y-6">
          {FAQS.map(({ q, a }, index) => (
            <div key={index}>
              <dt className="font-semibold text-blue-800 mb-1">{q}</dt>
              <dd className="text-gray-700">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
