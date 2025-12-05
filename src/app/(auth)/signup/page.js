"use client";
import React, { useState } from "react";
import { handleGoogleLogin, manageGoogleLogin, signup } from "@/api/apiHandler";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  country_code: Yup.string().required("Country code is required"),
  phone: Yup.string()
    .matches(
      /^[0-9]{6,15}$/,
      "Phone must be a valid number between 6 to 15 digits"
    )
    .required("Phone is required"),
  full_name: Yup.string()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name must be under 50 characters")
    .matches(/^[a-zA-Z\s]+$/, "Full name must only contain letters and spaces")
    .required("Full name is required"),
  password: Yup.string().required("Password is required"),
});

const RegisterForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      country_code: "",
      phone: "",
      full_name: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      let data = {
        login_type: "N",
        email: values.email,
        country_code: values.country_code,
        phone: values.phone,
        full_name: values.full_name,
        password: values.password,
      };
      let res = await signup(data);
      setLoading(false);
      if (res.code == 1) {
        toast.success(res.message);
        localStorage.setItem("role", "user");
        localStorage.setItem("user_id", res.data.user_id);
        router.push("/signup/verify");
      } else {
        toast.error(res.message);
      }
    },
  });

  async function handleGoogleLogin(){
    let res=await manageGoogleLogin();
    console.log(res);
    if(res.code==1){
      router.push(res.data.redirecturl);
    }else{
      toast.error("Some error occured paraammmmmm");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-100 to-blue-50">
      <div className="flex w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden bg-white/40 backdrop-blur-lg border border-white/30">
        {/* Illustration/Branding Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-600 to-blue-400 w-1/2 p-10 text-white">
          <svg className="w-20 h-20 mb-6" fill="none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="32" fill="#fff" fillOpacity="0.2" />
            <path d="M20 44l12-24 12 24H20z" fill="#fff" />
          </svg>
          <h2 className="text-3xl font-bold mb-2">ShopEase</h2>
          <p className="text-lg opacity-90">
            Create your account and start shopping today.
          </p>
        </div>

        {/* Register Form Side */}
        <div className="flex-1 p-8 sm:p-12 bg-white/70 backdrop-blur-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Create your account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Join us and enjoy exclusive deals!
          </p>
          <form onSubmit={formik.handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Enter your email"
                className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-400"
                    : ""
                }`}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <div className="w-1/3">
                <label
                  htmlFor="country_code"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country Code
                </label>
                <input
                  type="text"
                  name="country_code"
                  placeholder="+91"
                  className={`w-full pl-4 pr-2 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.country_code && formik.errors.country_code
                      ? "border-red-400"
                      : ""
                  }`}
                  value={formik.values.country_code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.country_code && formik.errors.country_code && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.country_code}
                  </p>
                )}
              </div>
              <div className="w-2/3">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.phone && formik.errors.phone
                      ? "border-red-400"
                      : ""
                  }`}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.phone}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="full_name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                name="full_name"
                placeholder="Enter your full name"
                className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                  formik.touched.full_name && formik.errors.full_name
                    ? "border-red-400"
                    : ""
                }`}
                value={formik.values.full_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={loading}
              />
              {formik.touched.full_name && formik.errors.full_name && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.full_name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  className={`w-full pl-4 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.password && formik.errors.password
                      ? "border-red-400"
                      : ""
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                  onClick={() => {
                    setShowPassword(true);
                    setTimeout(() => {
                      setShowPassword(false);
                    }, 1000);
                  }}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>
          {/* Social Login */}
          {/* Only Google Button */}
<div className="mt-6 flex justify-center">
  <button
    type="button"
    onClick={handleGoogleLogin}
    className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white shadow-md hover:shadow-lg transition border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  >
    <FcGoogle className="w-6 h-6" />
    <span className="text-gray-700 font-semibold text-base">Continue with Google</span>
  </button>
</div>

          {/* Link to Login */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account?</span>
            <Link
              href="/login"
              className="ml-2 text-blue-600 font-medium hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
