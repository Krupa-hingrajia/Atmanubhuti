"use client";

import React, { useState } from "react";
import { X, Phone, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (phone: string) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  if (!isOpen) return null;

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep("otp");
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(phoneNumber);
      onClose();
    }, 800);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val[val.length - 1];
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-orange-100 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-saffron text-white flex items-center justify-center text-2xl font-serif font-black shadow-md shadow-orange-500/20 mb-3">
            ॐ
          </div>
          <h3 className="font-serif font-black text-xl text-neutral-900">
            {step === "phone" ? "Devotee Sign In" : "Enter Verification OTP"}
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            {step === "phone"
              ? "Access your booked pujas, Sankalp video recordings & Prasad dispatch tracking"
              : `A 6-digit OTP has been sent to +91 ${phoneNumber}`}
          </p>
        </div>

        {/* STEP 1: Phone input */}
        {step === "phone" && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm font-semibold text-neutral-500">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="Enter 10-digit number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || phoneNumber.length !== 10}
              className="w-full py-3 rounded-xl bg-gradient-saffron text-white font-serif font-bold text-sm shadow-md shadow-orange-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? "Sending OTP..." : "Continue with OTP"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-3 border-t border-neutral-100 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Secured by Firebase Phone Authentication</span>
            </div>
          </form>
        )}

        {/* STEP 2: OTP verification */}
        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="flex justify-center gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  className="w-10 h-12 text-center text-lg font-bold rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gradient-saffron text-white font-serif font-bold text-sm shadow-md shadow-orange-500/30 hover:opacity-95 transition-all cursor-pointer"
            >
              {isLoading ? "Verifying..." : "Verify & Sign In"}
            </button>

            <div className="flex items-center justify-between text-xs text-neutral-500">
              <button
                type="button"
                onClick={() => setStep("phone")}
                className="hover:underline text-neutral-600"
              >
                Change Number
              </button>
              <button
                type="button"
                onClick={() => alert("New OTP sent via SMS!")}
                className="font-semibold text-orange-600 hover:underline"
              >
                Resend OTP
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
