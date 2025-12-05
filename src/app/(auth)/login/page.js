"use client";
import { manageGoogleLogin, signin } from "@/api/apiHandler";
import { FcGoogle } from "react-icons/fc";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from "react-icons/fi";

const validationSchema = Yup.object({
  emailphone: Yup.string().required("Email or phone is required"),
  password: Yup.string().required("Password is required")
});

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      emailphone: "",
      password: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log(values);
      let data={
        login_type:'N',
        email_phone:values.emailphone,
        password:values.password
      }
      console.log(data);
      let res = await signin(data);
      setLoading(false);
      if (res.code == 1) {
        toast.success(res.message);
        localStorage.setItem("signup_step",res.data.signup_step);
        router.push('/user/home');
      } else {
        toast.error(res.message);
        if(res.data.signup_step){
          toast.warn(res.message);
          localStorage.setItem("user_id",res.data.user_id);
          localStorage.setItem("signup_step",res.data.signup_step);
          console.log(res.data.signup_step=='1');
          if(res.data.signup_step=='1'){
            router.push('/signup/verify');
          }else{
            router.push('/signup/uploadPhoto');
          }
        }else{
          toast.error(res.message);
        }
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
          <p className="text-lg opacity-90">Your favorite products, just a click away.</p>
        </div>

        {/* Login Form Side */}
        <div className="flex-1 p-8 sm:p-12 bg-white/70 backdrop-blur-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Sign in to your account</h2>
          <p className="text-center text-gray-500 mb-6">
            Welcome back! Please enter your details to continue shopping.
          </p>
          <form onSubmit={formik.handleSubmit} noValidate className="space-y-6">
            <div>
              <label htmlFor="emailphone" className="block text-sm font-medium text-gray-700 mb-1">
                Email or Phone
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M16 12a4 4 0 01-8 0V8a4 4 0 018 0v4z"></path>
                    <path d="M12 16v2m0 0h-2m2 0h2"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  name="emailphone"
                  autoComplete="username"
                  placeholder="Enter your email or phone"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.emailphone && formik.errors.emailphone ? "border-red-400" : ""
                  }`}
                  value={formik.values.emailphone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
              </div>
              {formik.touched.emailphone && formik.errors.emailphone && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.emailphone}</p>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6-6v6a2 2 0 002 2h8a2 2 0 002-2v-6"></path>
                    <path d="M16 11V7a4 4 0 00-8 0v4"></path>
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition bg-white/80 text-black placeholder-gray-400 ${
                    formik.touched.password && formik.errors.password ? "border-red-400" : ""
                  }`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled={loading}
                />
                <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 focus:outline-none"
                onClick={() => {setShowPassword(true)
                  setTimeout(()=>{
                      setShowPassword(false);
                  },1000)
                }}
              >{showPassword ? <FiEyeOff /> : <FiEye />}</button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
              )}
            </div>
            <div className="text-right">
              <Link
              href="/forgot-password"
              className="ml-2 text-blue-600 font-medium hover:underline"
            >
              Forgot Password?
            </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg shadow-blue-100 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>
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
          <div className="mt-6 text-center">
            <span className="text-gray-600">Don&rsquo;t have an account?</span>
            <Link
              href="/signup"
              className="ml-2 text-blue-600 font-medium hover:underline"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
