import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Terms and Conditions – Atmanubhuti (आत्म अनुभूति)",
  description: "Terms and conditions for online Vedic pujas, temple seva, and sacred offerings on Atmanubhuti.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF9] flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-orange-100 shadow-sm space-y-6">
          <div className="border-b border-orange-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 block mb-1">
              Legal & Compliance
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900">
              Terms & Conditions (सेवा नियम एवं शर्तें)
            </h1>
            <p className="text-xs text-neutral-500 mt-1">Last Updated: October 2026</p>
          </div>

          <div className="text-sm text-neutral-700 leading-relaxed space-y-4">
            <h2 className="text-base font-bold text-neutral-900">1. Introduction & Spiritual Mission</h2>
            <p>
              Welcome to <strong>Atmanubhuti</strong> (operated under <strong>atmanubhuti.org</strong> & <strong>atmanubhuti.in</strong>). We facilitate authentic Vedic pujas, consecrated teerth prasad delivery, and personalized Name and Gotra Sankalp ceremonies performed by verified Vedic priests at ancient temples.
            </p>

            <h2 className="text-base font-bold text-neutral-900">2. Seva Bookings & Dakshina</h2>
            <p>
              All bookings made on Atmanubhuti represent religious voluntary dakshina and service contributions for Vedic rituals, priest dakshina, and ritual samagri. Once a booking is confirmed, our temple desk assigns Vedic priests according to auspicious Panchang muhurats.
            </p>

            <h2 className="text-base font-bold text-neutral-900">3. Video Proof & Delivery</h2>
            <p>
              For every individual puja with personalized Sankalp, a digital video/audio recording of the Sankalp recitation will be sent to the devotee&apos;s registered WhatsApp mobile number within 24 to 48 hours of ritual completion.
            </p>

            <h2 className="text-base font-bold text-neutral-900">4. Prasad Dispatch & Delivery</h2>
            <p>
              Where the devotee opts for consecrated Prasad delivery, the sacred Prasad box is dispatched via India Post Speed Post or reputed courier partners within 48 to 72 hours following the ritual.
            </p>

            <h2 className="text-base font-bold text-neutral-900">5. Contact Information</h2>
            <p>
              For any questions regarding our terms, devotee assistance, or temple seva, please contact our priest helpline at <strong>+91 98765 43210</strong> or write to <strong>seva@atmanubhuti.in</strong>.
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
