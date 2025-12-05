"use client";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FiPhone, FiKey } from "react-icons/fi";
import { toast } from "react-toastify";
import { updatePhoneEmail } from "@/api/apiHandler";
import { useRouter } from "next/navigation";

export default function UpdatePhonePage() {
  const [step, setStep] = useState("input"); // "input" | "verify"
  const [generating, setGenerating] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const router=useRouter();

  // Initial formik for phone
  const phoneFormik = useFormik({
    initialValues: { newPhone: "" },
    validationSchema: Yup.object({
      newPhone: Yup.string()
        .matches(/^[+\d][\d\s-]{8,}$/, "Enter a valid phone number")
        .required("New phone is required"),
    }),
    onSubmit: async (values) => {
      setGenerating(true);
    let res=await updatePhoneEmail({action:"G"});
    setGenerating(false);
    if(res.code==1){
        toast.success(res.message);
        setStep("verify");
    }else{
        toast.error(res.message);
    }
    },
  });

  // Second formik for code
  const otpFormik = useFormik({
    initialValues: { code: "" },
    validationSchema: Yup.object({
      code: Yup.string()
        .min(4, "Code must be at least 4 digits")
        .required("OTP is required"),
    }),
    onSubmit: async (values) => {
      setVerifying(true);
      let data={
        phone:phoneFormik.values.newPhone,
        code:values.code,
        action:"V"
      }
      let res=await updatePhoneEmail(data);
      setVerifying(false);
    if(res.code==1){
        toast.success(res.message);
        router.push("/user/edit-profile");
    }else{
        toast.error(res.message);
    }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl border border-blue-100 rounded-3xl p-8 flex flex-col">
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow">
            <FiPhone className="text-blue-600 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-center text-blue-800 mb-2 mt-3">
            Update Phone Number
          </h2>
          <p className="text-sm text-center text-gray-500">
            Please verify your new phone number to update your profile security.
          </p>
        </div>

        {step === "input" ? (
          <form onSubmit={phoneFormik.handleSubmit} className="space-y-6">
            {/* Phone input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-gray-700 ${
                    phoneFormik.touched.newPhone && phoneFormik.errors.newPhone
                      ? "border-red-400"
                      : "border-gray-200"
                  } focus:ring-2 focus:ring-blue-400 bg-white/90 placeholder-gray-400 transition`}
                  type="text"
                  name="newPhone"
                  placeholder="Enter new phone"
                  onChange={phoneFormik.handleChange}
                  onBlur={phoneFormik.handleBlur}
                  value={phoneFormik.values.newPhone}
                  disabled={generating}
                />
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
              {phoneFormik.touched.newPhone && phoneFormik.errors.newPhone && (
                <p className="text-red-500 text-xs mt-1">{phoneFormik.errors.newPhone}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={generating}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {generating ? "Sending OTP..." : "Generate OTP"}
            </button>
          </form>
        ) : (
          // OTP Verification step
          <form onSubmit={otpFormik.handleSubmit} className="space-y-6">
            {/* Phone still visible, but readonly */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Phone Number
              </label>
              <div className="relative flex items-center">
                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                  value={phoneFormik.values.newPhone}
                  type="text"
                  disabled
                  readOnly
                />
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" />
              </div>
            </div>
            {/* OTP input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                OTP Code
              </label>
              <div className="relative flex items-center">
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-gray-700 ${
                    otpFormik.touched.code && otpFormik.errors.code
                      ? "border-red-400"
                      : "border-gray-200"
                  } focus:ring-2 focus:ring-blue-400 bg-white/90 placeholder-gray-400 transition`}
                  type="text"
                  name="code"
                  placeholder="Enter OTP"
                  onChange={otpFormik.handleChange}
                  onBlur={otpFormik.handleBlur}
                  value={otpFormik.values.code}
                  disabled={verifying}
                  autoFocus
                />
                <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              </div>
              {otpFormik.touched.code && otpFormik.errors.code && (
                <p className="text-red-500 text-xs mt-1">{otpFormik.errors.code}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={verifying}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            >
              {verifying ? "Verifying..." : "Verify"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
