"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  FiCheckCircle,
  FiXCircle,
  FiBox,
  FiChevronRight,
  FiInfo,
} from "react-icons/fi";
import { fetchOrderSummary } from "@/api/apiHandler"; // Your API call

// Status helpers
const STATUS_ICONS = {
  Delivered: <FiCheckCircle className="text-green-500 text-5xl mb-2" />,
  Pending: <FiInfo className="text-blue-500 text-5xl mb-2" />,
  Accepted: <FiInfo className="text-blue-500 text-5xl mb-2" />,
  Processing: <FiInfo className="text-blue-500 text-5xl mb-2" />,
  Shipped: <FiInfo className="text-blue-500 text-5xl mb-2" />,
  Cancelled: <FiXCircle className="text-red-500 text-5xl mb-2" />,
};

const STATUS_MESSAGES = {
  Delivered: "Order Delivered Successfully!",
  Pending: "Order Placed! Awaiting Confirmation.",
  Accepted: "Order Accepted.",
  Processing: "Order Processing.",
  Shipped: "Order Shipped.",
  Cancelled: "Order Cancelled",
};

const STATUS_COLORS = {
  Delivered: "text-green-600",
  Pending: "text-blue-600",
  Accepted: "text-blue-600",
  Processing: "text-blue-600",
  Shipped: "text-blue-600",
  Cancelled: "text-red-600",
};

export default function OrderSummaryPage() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { order_id } = useParams();

  useEffect(() => {
    if (!order_id) return;
    async function getOrderData() {
      setLoading(true);
      const res = await fetchOrderSummary({ order_id });
      if (res.code === 1 && res.data && res.data.length > 0) {
        setOrder(res.data[0]);
      } else {
        router.push("/user/orders");
      }
      setLoading(false);
    }
    getOrderData();
  }, [order_id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-gray-500">Loading your order...</div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-500">Order not found.</div>
      </div>
    );
  }

  // Determine status
  const status = order.status || "Pending";
  const isCancelled = status === "Cancelled";
  const isDelivered = status === "Delivered";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center py-10">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8">
        {/* Status Icon and Message */}
        <div className="flex flex-col items-center mb-8">
          {STATUS_ICONS[status] || <FiInfo className="text-blue-500 text-5xl mb-2" />}
          <h1 className={`text-2xl font-bold mb-2 ${STATUS_COLORS[status] || "text-blue-800"}`}>
            {STATUS_MESSAGES[status] || "Order Status"}
          </h1>
          <p className="text-gray-600 text-center">
            {isCancelled
              ? "Your order was cancelled. If this was a mistake, please contact support."
              : <>
                  Your order <span className="font-semibold text-blue-600">#{order.id}</span> status: <span className="font-semibold">{status}</span>
                </>
            }
          </p>
        </div>

        {/* Order Summary */}
        {order.order_items && order.order_items.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-3">Order Summary</h2>
            <div className="space-y-4">
              {order.order_items.map(item => (
                <div key={item.id} className="flex items-center gap-4 bg-blue-50 rounded-xl p-3">
                  <img
                    src={item.cover_image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-blue-100"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-500">
                      {item.size_label && <>Size: {item.size_label} </>}
                      {item.color_name && <>Color: {item.color_name}</>}
                    </div>
                    <div className="text-gray-700 text-sm">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-semibold text-blue-700">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Info */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="font-semibold text-gray-700 mb-2">Order Info</div>
            <div className="text-sm text-gray-600">Order ID: <span className="font-medium">{order.id}</span></div>
            <div className="text-sm text-gray-600">Status: <span className="font-medium">{order.status}</span></div>
            <div className="text-sm text-gray-600">Shipping: <span className="font-medium">{order.shipping_method}</span></div>
            <div className="text-sm text-gray-600">Payment: <span className="font-medium">{order.payment_method}</span></div>
          </div>
          {/* Address/Card Info */}
          {order.shipping_method === "Delivery" && order.shipping_detail && (
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="font-semibold text-gray-700 mb-2">Shipping Address</div>
              <div className="text-sm text-gray-600">
                {order.shipping_detail.first_name} {order.shipping_detail.last_name}<br />
                {order.shipping_detail.address}, {order.shipping_detail.city}, {order.shipping_detail.state} {order.shipping_detail.zip}<br />
                {order.shipping_detail.phone}
              </div>
            </div>
          )}
          {order.payment_method === "Card" && order.card_detail && (
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="font-semibold text-gray-700 mb-2">Paid with</div>
              <div className="text-sm text-gray-600">
                {order.card_detail.name} • **** **** **** {order.card_detail.card_number.slice(-4)}
              </div>
            </div>
          )}
        </div>

        {/* Price Summary */}
        <div className="mb-8">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-gray-700">Subtotal</span>
              <span className="text-gray-700">₹{Number(order.sub_total).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Discount</span>
              <span className="text-gray-700">-₹{Number(order.discount).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span className="text-gray-700">Total</span>
              <span className="text-gray-700">₹{Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            href="/user/orders"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            <FiBox /> Go to My Orders <FiChevronRight />
          </Link>
          <Link
            href="/user/product"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
          >
            Continue Shopping <FiChevronRight />
          </Link>
        </div>

        <div className="mt-6 text-center text-gray-400 text-sm">
          Need help?{" "}
          <Link href="/support" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
