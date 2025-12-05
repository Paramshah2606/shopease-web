"use client";
import { useEffect, useState } from "react";
import { fetchUserOrders } from "@/api/apiHandler"; 
import { FiBox, FiTruck, FiCreditCard, FiXCircle, FiCheckCircle ,FiPackage,FiArrowLeft} from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

const FILTERS = [
  { key: "upcoming", label: "Upcoming",tag:"U" },
  { key: "completed", label: "Completed",tag:"D" },
  { key: "cancelled", label: "Cancelled",tag:"C" },
];

export default function OrdersPage() {
  const [filter, setFilter] = useState("upcoming");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router=useRouter();

  // Fetch orders on filter change
  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders(data) {
      setLoading(true);
      const res = await fetchUserOrders(data);
      if (res.code === 1) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
      setLoading(false);
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pt-3">
      <div className="max-w-3xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8 mt-8">
      <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition"
          >
            <FiArrowLeft /> Back
          </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-8">My Orders</h1>

        {/* Filter Bar */}
        <div className="flex mb-8 rounded-xl overflow-hidden border border-blue-100">
          {FILTERS.map(({ key, label,tag }) => (
            <button
              key={key}
              onClick={() =>{
                 getOrders({tag:tag});
                 setFilter(key);
              }}
              className={`flex-1 py-3 font-semibold transition
                ${filter === key
                  ? "bg-blue-600 text-white shadow"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Order List */}
        {loading ? (
          <div className="flex items-center justify-center py-10 text-gray-500">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
<div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
  <FiPackage className="text-5xl text-blue-400 mb-4" />
  <h2 className="text-xl font-semibold mb-1">No orders found</h2>
  <p className="text-sm text-gray-400 mb-6">
    Looks like you haven&rsquo;t placed any orders yet.
  </p>
  <Link
    href="/user/product"
    className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
  >
    Start Shopping
  </Link>
</div>

        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Link
                href={`/user/orders/${order.id}`}
                key={order.id}
                className="block bg-blue-50 hover:bg-blue-100 rounded-xl p-5 transition border border-blue-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2 text-blue-700 font-bold">
                    <FiBox /> Order #{order.id}
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold
                    ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  `}>
                    {order.status === "Delivered" && <FiCheckCircle />}
                    {order.status === "Cancelled" && <FiXCircle />}
                    {order.status !== "Delivered" && order.status !== "Cancelled" && <FiTruck />}
                    {order.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-6 text-gray-700 text-sm">
                  <div className="flex items-center gap-1">
                    <FiTruck className="text-blue-400" />
                    <span>{order.shipping_method}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FiCreditCard className="text-blue-400" />
                    <span>{order.payment_method}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Total:</span> ₹{Number(order.total).toFixed(2)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
