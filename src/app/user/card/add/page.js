"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { addCard } from "@/api/apiHandler"; // You implement this

// ✅ Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),

  card_number: Yup.string()
    .matches(/^\d{16}$/, "Card number must be 16 digits")
    .required("Card number is required"),

  expiry_month: Yup.string()
    .matches(/^(0[1-9]|1[0-2])$/, "Must be a valid month (01–12)")
    .required("Expiry month is required"),

  expiry_year: Yup.string()
    .matches(/^\d{2}$/, "Must be a 2-digit year")
    .required("Expiry year is required"),
});

export default function AddCardForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      card_number: "",
      expiry_month: "",
      expiry_year: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const res = await addCard(values);
      if (res.code === 1) {
        toast.success(res.message || "Card added successfully");
        formik.resetForm();
        router.push("/user/card");
      } else {
        toast.error(res.message || "Failed to add card");
      }
      setLoading(false);
    },
  });

  return (
    <div className=" flex justify-center bg-gradient-to-br from-blue-50 to-blue-100 py-10">
      <div className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl border border-blue-100 p-8">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.push("/user/menu")}
          className="flex items-center gap-2 mb-6 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium hover:bg-blue-100 transition"
        >
          <FiArrowLeft /> Back
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add New Card
        </h2>

        <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className={`w-full px-4 py-3 rounded-xl border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-400"
                  : "border-gray-200"
              } focus:ring-2 focus:ring-blue-400 bg-white/80 text-black`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="card_number"
              placeholder="1234 1234 1234 1234"
              maxLength={16}
              className={`w-full px-4 py-3 rounded-xl border ${
                formik.touched.card_number && formik.errors.card_number
                  ? "border-red-400"
                  : "border-gray-200"
              } focus:ring-2 focus:ring-blue-400 bg-white/80 text-black`}
              value={formik.values.card_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading}
            />
            {formik.touched.card_number && formik.errors.card_number && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.card_number}</p>
            )}
          </div>

          {/* Expiry Month & Year */}
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Month<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="expiry_month"
                placeholder="MM"
                maxLength={2}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.expiry_month && formik.errors.expiry_month
                    ? "border-red-400"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-blue-400 bg-white/80 text-black`}
                value={formik.values.expiry_month}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              {formik.touched.expiry_month && formik.errors.expiry_month && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.expiry_month}
                </p>
              )}
            </div>

            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Year<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="expiry_year"
                placeholder="YY"
                maxLength={2}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.expiry_year && formik.errors.expiry_year
                    ? "border-red-400"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-blue-400 bg-white/80 text-black`}
                value={formik.values.expiry_year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              {formik.touched.expiry_year && formik.errors.expiry_year && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.expiry_year}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save Card"}
          </button>
        </form>
      </div>
    </div>
  );
}
