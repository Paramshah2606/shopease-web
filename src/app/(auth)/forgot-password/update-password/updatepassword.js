"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { forgotPasswordChange } from "@/api/apiHandler";

export default function PasswordResetPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetToken = searchParams.get("resetToken");

  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required("Password is required"),
      passwordConfirm: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: async (values) => {
      if (!resetToken) {
        toast.error("Invalid or missing token.");
        return;
      }

      setLoading(true);
      let res = await forgotPasswordChange({
        token: resetToken,
        password: values.password,
        passwordConfirm: values.passwordConfirm,
      });
      if (res.code === 1) {
        toast.success("Password updated successfully!");
        router.replace("/login");
      } else {
        toast.error(res.message || "Failed to update password.");
      }
      setLoading(false);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-md border border-white/30 shadow-2xl rounded-3xl p-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-blue-100 text-blue-600 w-14 h-14 rounded-full flex items-center justify-center shadow mb-4">
            <FiLock size={24} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            Set New Password
          </h2>
          <p className="text-sm text-gray-600">
            Enter your new password below to reset it.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* New Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-400"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-blue-400 bg-white/90 text-black placeholder-gray-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => {
                  setShowNewPassword(true);
                  setTimeout(() => {
                    setShowNewPassword(false);
                  }, 1000);
                }}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="passwordConfirm"
                placeholder="Retype password"
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.passwordConfirm &&
                  formik.errors.passwordConfirm
                    ? "border-red-400"
                    : "border-gray-200"
                } focus:ring-2 focus:ring-blue-400 bg-white/90 text-black placeholder-gray-500`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => {
                  setShowConfirmPassword(true);
                  setTimeout(() => {
                    setShowConfirmPassword(false);
                  }, 1000);
                }}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {formik.touched.passwordConfirm &&
              formik.errors.passwordConfirm && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.passwordConfirm}
                </p>
              )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
