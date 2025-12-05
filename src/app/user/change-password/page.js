"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { FiLock, FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { changePassword } from "@/api/apiHandler";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    old_password: Yup.string()
      .required("Old password is required"),
    new_password: Yup.string()
      .required("New password is required"),
    confirm_new_password: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "Passwords do not match")
      .required("Please confirm your new password"),
  });

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      confirm_new_password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
    let res=await changePassword({...values});
    setLoading(false);
    if(res.code==1){
        toast.success(res.message);
        router.push("/user/menu");
    }else{
        toast.error(res.message);
    }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl border border-blue-100 rounded-3xl p-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-700 hover:underline mb-4"
        >
          <FiArrowLeft className="text-lg" />
          Back
        </button>

        {/* Header */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow">
            <FiLock className="text-blue-600 text-2xl" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-blue-800 mb-2">Change Password</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          For your security, choose a strong password you haven&rsquo;t used before.
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Old Password */}
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Old Password</label>
  <div className="relative">
    <input
      type={showOldPassword ? "text" : "password"}
      name="old_password"
      className={`w-full px-4 py-3 pr-12 rounded-xl border text-gray-700 ${
        formik.touched.old_password && formik.errors.old_password
          ? "border-red-400"
          : "border-gray-200"
      } focus:ring-2 focus:ring-blue-400 transition bg-white placeholder-gray-400`}
      value={formik.values.old_password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      placeholder="Your current password"
      disabled={loading}
    />
    <button
      type="button"
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
      onClick={() => {setShowOldPassword(true)
        setTimeout(()=>{
            setShowOldPassword(false);
        },1000)
      }}
    >
      {showOldPassword ? <FiEyeOff /> : <FiEye />}
    </button>
  </div>
  {formik.touched.old_password && formik.errors.old_password && (
    <p className="text-red-500 text-xs mt-1">{formik.errors.old_password}</p>
  )}
</div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              name="new_password"
              className={`w-full px-4 py-3 rounded-xl border text-gray-700 ${
                formik.touched.new_password && formik.errors.new_password
                  ? "border-red-400"
                  : "border-gray-200"
              } focus:ring-2 focus:ring-blue-400 transition bg-white placeholder-gray-400`}
              value={formik.values.new_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter a new password"
              disabled={loading}
            />
            <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => {setShowNewPassword(true)
        setTimeout(()=>{
            setShowNewPassword(false);
        },1000)
      }}
                >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            </div>
            {formik.touched.new_password && formik.errors.new_password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.new_password}</p>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_new_password"
              className={`w-full px-4 py-3 rounded-xl border text-gray-700 ${
                formik.touched.confirm_new_password && formik.errors.confirm_new_password
                  ? "border-red-400"
                  : "border-gray-200"
              } focus:ring-2 focus:ring-blue-400 transition bg-white placeholder-gray-400`}
              value={formik.values.confirm_new_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Retype new password"
              disabled={loading}
            /><button
      type="button"
      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
      onClick={() => {setShowConfirmPassword(true)
        setTimeout(()=>{
            setShowConfirmPassword(false);
        },1000)
      }}
    >
      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
    </button>
    </div>
            {formik.touched.confirm_new_password && formik.errors.confirm_new_password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.confirm_new_password}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
