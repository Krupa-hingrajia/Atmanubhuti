import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Refund & Cancellation Policy – Atmanubhuti (आत्म अनुभूति)",
  description: "Cancellation, rescheduling and refund guidelines for Vedic pujas on Atmanubhuti.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-orange-100 shadow-sm space-y-6">
          <div className="border-b border-orange-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
              Devotee Satisfaction
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900">
              Refund & Cancellation Policy (वापसी एवं निरस्तीकरण नीति)
            </h1>
            <p className="text-xs text-neutral-500 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="text-sm text-neutral-700 leading-relaxed space-y-4">
            <h2 className="text-base font-bold text-neutral-900">1. Cancellation Window</h2>
            <p>
              Devotees may request cancellation or rescheduling of their seva package up to <strong>24 hours prior</strong> to the scheduled ritual muhurat by notifying our helpline or WhatsApp desk.
            </p>

            <h2 className="text-base font-bold text-neutral-900">2. Refund Processing</h2>
            <p>
              In eligible cancellation scenarios (before priest assignment and samagri procurement), refunds are initiated within <strong>24 to 48 hours</strong> and credited back to the original payment source (UPI, Card, NetBanking) via Razorpay within <strong>5 to 7 working days</strong>.
            </p>

            <h2 className="text-base font-bold text-neutral-900">3. Non-Refundable Circumstances</h2>
            <p>
              Once a sacred Sankalp has been solemnly chanted by the Vedic priest in the sanctum sanctorum or samagri has been consecrated, dakshina offerings cannot be cancelled. However, if any technical issue prevents video transmission, the ritual will be performed anew or full dakshina refunded without dispute.
            </p>

            <h2 className="text-base font-bold text-neutral-900">4. Prasad Delivery Issues</h2>
            <p>
              If a consecrated Prasad box arrives damaged or lost in transit by India Post/courier, our team will dispatch a fresh consecrated teerth prasad box free of cost.
            </p>

            <h2 className="text-base font-bold text-neutral-900">5. How to Request a Refund</h2>
            <p>
              To request a refund or cancellation, please email your Booking ID to <strong>seva@atmanubhuti.in</strong> or WhatsApp us at <strong>+91 98765 43210</strong>.
            </p>
          </div>

          <div className="pt-6 border-t border-orange-100 flex items-center justify-between">
            <Link href="/" className="text-xs font-bold text-orange-600 hover:text-orange-700">
              ← Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
