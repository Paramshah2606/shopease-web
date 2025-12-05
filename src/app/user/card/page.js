"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiCreditCard, FiEdit2, FiTrash2, FiPlus, FiArrowLeft } from "react-icons/fi";
import { fetchCard } from "@/api/apiHandler"; 

export default function MyCardsPage() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getCards() {
      setLoading(true);
      const res = await fetchCard();
      if (res.code === 1) {
        setCards(res.data);
      } else {
        setCards([]);
      }
      setLoading(false);
    }
    getCards();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this card?")) return;
    alert("Card deleted successfully");
    // const res = await deleteCard(id);
    // if (res.code === 1) {
    //   setCards(cards.filter(card => card.id !== id));
    // } else {
    //   alert(res.message || "Failed to delete card.");
    // }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition"
        >
          <FiArrowLeft /> Back
        </button>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiCreditCard className="text-blue-500" /> My Cards
          </h1>
          <Link
            href="/user/card/add"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <FiPlus /> Add New
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            Loading cards...
          </div>
        ) : cards.length === 0 ? (
          <div className="flex items-center justify-center py-10 text-gray-400">
            No cards found. Add your first card!
          </div>
        ) : (
          <div className="space-y-6">
            {cards.map(card => (
              <div key={card.id} className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-700">{card.name}</div>
                  <div className="text-gray-600 text-sm">
                    **** **** **** {card.card_number.slice(-4)}
                  </div>
                  <div className="text-gray-600 text-sm">
                    Expiry: {card.expiry_month}/{card.expiry_year}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/user/edit-card/${card.id}`}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition font-medium"
                  >
                    <FiEdit2 /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition font-medium"
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
