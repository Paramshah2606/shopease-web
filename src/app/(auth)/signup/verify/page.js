"use client";
import React, { useRef, useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import { signupVerification,resendCode } from "@/api/apiHandler";
import { toast } from 'react-toastify';

export default function PinVerification() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const router = useRouter();

  useEffect(() => {
    const lastResendTime = localStorage.getItem("lastResendTime");
    if (lastResendTime) {
      const elapsed = Math.floor((Date.now() - Number(lastResendTime)) / 1000);
      if (elapsed < 60) {
        setTimer(60 - elapsed);
        setCanResend(false);
      } else {
        setTimer(0);
        setCanResend(true);
      }
    } else {
      // First-time visit
      localStorage.setItem("lastResendTime", Date.now().toString());
      setTimer(60);
      setCanResend(false);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  // Handle input change
  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newPin = [...pin];
    newPin[idx] = value[0];
    setPin(newPin);

    // Move to next input if not last
    if (idx < 3 && value) {
      inputRefs[idx + 1].current.focus();
    }
  };

  // Handle backspace and navigation
  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      if (pin[idx]) {
        // Clear current box
        const newPin = [...pin];
        newPin[idx] = "";
        setPin(newPin);
      } else if (idx > 0) {
        // Move to previous box and clear it
        inputRefs[idx - 1].current.focus();
        const newPin = [...pin];
        newPin[idx - 1] = "";
        setPin(newPin);
      }
      // Prevent default to avoid browser navigation
      e.preventDefault();
    }
  };

  // Handle verify
  const handleVerify = async () => {
    setLoading(true);
    setError("");
    const enteredPin = pin.join("");
    let user_id=localStorage.getItem("user_id")
    let data={
        code:enteredPin,
        user_id:user_id
    }
    let res=await signupVerification(data);
    if (res.code == 1) {
        toast.success(res.message);
        router.replace('/signup/uploadPhoto');
    } else {
        setError(res.message);
        toast.error(res.message);
    }
    setLoading(false);
  };

  const handleResend = async () => {
     if (!canResend) return;
     let user_id=localStorage.getItem("user_id");
    let res=await resendCode({user_id});
    if(res.code==1){
      toast.success(res.message);
      localStorage.setItem("lastResendTime", Date.now().toString());
      setTimer(60);
      setCanResend(false);
    }else{
      toast.error(res.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="bg-white/70 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-10 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Verify Your Account</h2>
        <p className="text-gray-600 mb-8">
          Please enter the 4-digit code sent to your email or phone.
        </p>
        <div className="flex justify-center gap-4 mb-6">
          {pin.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              ref={inputRefs[idx]}
              value={digit}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-14 h-14 text-2xl text-center border border-blue-300 rounded-xl bg-white text-black shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              disabled={loading}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <button
          onClick={handleVerify}
          disabled={loading || pin.some((d) => d === "")}
          className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
        <button
          onClick={handleResend}
          className="mt-6 text-blue-600 font-medium"
          disabled={!canResend}
        >
          {canResend ? "Resend Code" : `Resend in ${timer}s`}
        </button>
      </div>
    </div>
  );
}
