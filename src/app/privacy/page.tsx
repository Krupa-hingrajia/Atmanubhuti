import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Privacy Policy – Atmanubhuti (आत्म अनुभूति)",
  description: "Privacy policy and data protection for devotees on Atmanubhuti.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-orange-100 shadow-sm space-y-6">
          <div className="border-b border-orange-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
              Devotee Protection
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900">
              Privacy Policy (गोपनीयता नीति)
            </h1>
            <p className="text-xs text-neutral-500 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="text-sm text-neutral-700 leading-relaxed space-y-4">
            <h2 className="text-base font-bold text-neutral-900">1. Information We Collect</h2>
            <p>
              To perform sacred Vedic Sankalp rituals and deliver consecrated prasad, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Devotee full name, Gotra, and Zodiac/Rashi</li>
              <li>WhatsApp contact number for ritual video proof transmission</li>
              <li>Shipping address (for prasad delivery, where opted)</li>
              <li>Email address (for booking receipts and invoices)</li>
            </ul>

            <h2 className="text-base font-bold text-neutral-900">2. How Your Sacred Data is Handled</h2>
            <p>
              Your Gotra and family names are shared exclusively with the assigned head Vedic Acharya at the holy shrine solely for the purpose of reciting individual Sankalp during the ritual. We never sell, rent, or commercialize your personal information.
            </p>

            <h2 className="text-base font-bold text-neutral-900">3. Payment Security via Razorpay</h2>
            <p>
              All financial transactions and dakshina payments are securely processed by <strong>Razorpay Payment Solutions</strong> using 256-bit bank-grade encryption and PCI-DSS compliance. We do not store your credit card numbers, debit card details, or UPI PINs on our servers.
            </p>

            <h2 className="text-base font-bold text-neutral-900">4. Contact Grievance Officer</h2>
            <p>
              If you have any questions or data requests, please reach out to us at <strong>seva@atmanubhuti.in</strong> or call <strong>+91 98765 43210</strong>.
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
