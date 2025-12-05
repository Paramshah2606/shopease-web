"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiMail, FiPhone, FiArrowLeft, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { forgotPassword } from "@/api/apiHandler";

export default function ForgotPasswordForm() {
  const [mode, setMode] = useState("email");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      country_code: "+91",
    },
    validationSchema:
      mode === "email"
        ? Yup.object().shape({
            email: Yup.string()
              .email("Enter a valid email")
              .required("Email is required"),
          })
        : Yup.object().shape({
            country_code: Yup.string().required("Country code is required"),
            phone: Yup.string()
              .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
              .required("Phone number is required"),
          }),
    onSubmit: async (values) => {
      setLoading(true);
      let res=await forgotPassword(values);
      if(res.code==1){
        toast.success(res.message);
        if(res.data.user_id){
          localStorage.setItem('user_id',res.data.user_id);
          router.push('/forgot-password/verify');
        }else{
          router.back();
        }
      }else{
        toast.error(res.message);
      }
      setLoading(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-2 md:px-0">
      <div className="w-full max-w-md rounded-3xl shadow-2xl border border-blue-100 bg-white/70 backdrop-blur-md p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-blue-700 hover:underline mb-2"
        >
          <FiArrowLeft className="text-lg" />
          Back to Login
        </button>

        {/* Icon Banner */}
        <div className="flex justify-center mb-3">
          <div className="flex items-center justify-center w-16 h-16 rounded-full shadow bg-blue-100">
            <FiLock className="text-3xl text-blue-600" />
          </div>
        </div>

        {/* Headline & Info */}
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-1">
          Forgot Your Password?
        </h1>
        <p className="text-center text-gray-600 mb-6 text-base">
          No worries! Choose your recovery method and we&rsquo;ll send you a secure link or code to reset your password.
        </p>

        {/* Switch between Email/Phone */}
        <div className="flex justify-center mb-7">
          <button
            className={`flex items-center gap-1 px-5 py-2 rounded-l-xl font-medium text-base transition ${
              mode === "email"
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setMode("email")}
            type="button"
            disabled={loading}
          >
            <FiMail /> Email
          </button>
          <button
            className={`flex items-center gap-1 px-5 py-2 rounded-r-xl font-medium text-base transition ${
              mode === "phone"
                ? "bg-blue-600 text-white shadow"
                : "bg-blue-50 text-blue-700 hover:bg-blue-100"
            }`}
            onClick={() => setMode("phone")}
            type="button"
            disabled={loading}
          >
            <FiPhone /> Phone
          </button>
        </div>
        <p className="text-center text-xs text-gray-400 mb-5 transition-all duration-300">
          {mode === "email"
            ? "Reset instructions will be sent to your registered email address."
            : "You’ll receive a one-time code via SMS to your mobile."}
        </p>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {mode === "email" ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-blue-400 bg-white/90 text-black placeholder-gray-400 transition`}
                disabled={loading}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </label>
                <input
                  type="text"
                  name="country_code"
                  placeholder="+91"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.country_code}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formik.touched.country_code && formik.errors.country_code
                      ? "border-red-400"
                      : "border-gray-200"
                  } focus:ring-2 focus:ring-blue-400 bg-white/90 text-black placeholder-gray-400 transition`}
                  disabled={loading}
                />
                {formik.touched.country_code && formik.errors.country_code && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.country_code}
                  </p>
                )}
              </div>
              <div className="w-2/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="10-digit mobile number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-400"
                      : "border-gray-200"
                  } focus:ring-2 focus:ring-blue-400 bg-white/90 text-black placeholder-gray-400 transition`}
                  disabled={loading}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-base shadow-lg disabled:opacity-70"
          >
            {loading
              ? mode === "email"
                ? "Sending Link..."
                : "Sending OTP..."
              : mode === "email"
              ? "Send Reset Link"
              : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
