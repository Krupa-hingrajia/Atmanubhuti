"use client";

import React, { useState, useEffect } from "react";
import { Puja } from "@/data/pujas";
import { 
  Flame, 
  Clock, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Video, 
  ChevronRight, 
  ChevronLeft,
  Users
} from "lucide-react";
import SacredParticles from "@/components/SacredParticles";

interface HeroBannerProps {
  pujas: Puja[];
  onSelectPuja: (puja: Puja) => void;
}

export default function HeroBanner({ pujas, onSelectPuja }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto rotate banner every 6 seconds
  useEffect(() => {
    if (pujas.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pujas.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [pujas.length]);

  const current = pujas[currentIndex] || pujas[0];
  if (!current) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-hero border-b border-orange-100/70 pt-6 pb-12 sm:pb-16">
      {/* Sacred Golden Hawan Floating Embers Canvas */}
      <SacredParticles />

      {/* Decorative Traditional Temple Motifs in background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-200/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tagline */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200/80 px-3.5 py-1 rounded-full text-xs font-semibold text-orange-900 shadow-xs animate-float">
            <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-ping" />
            <span>Upcoming Auspicious Muhurats & Special Pujas</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-neutral-600">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Certified Vedic Rituals
            </span>
            <span className="flex items-center gap-1">
              <Video className="w-4 h-4 text-orange-600" />
              Sankalp Video on WhatsApp
            </span>
          </div>
        </div>

        {/* Featured Hero Card with Banner Slide */}
        <div className="relative bg-white rounded-3xl border border-orange-100/90 shadow-spiritual overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                {/* Temple & Tag info */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-orange-600 text-white shadow-xs">
                    <Flame className="w-3.5 h-3.5" />
                    {current.specialTag || "Special Puja"}
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-900 border border-amber-200/60">
                    <MapPin className="w-3.5 h-3.5 text-amber-700" />
                    {current.templeName}
                  </span>
                </div>

                {/* Puja Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-neutral-900 mb-3 leading-snug">
                  {current.title}
                </h1>

                {/* Subtitle / Promise */}
                <p className="text-sm sm:text-base text-neutral-600 font-normal mb-6 line-clamp-2">
                  {current.subTitle}
                </p>

                {/* Key Highlights / Benefits Pills */}
                <div className="space-y-2 mb-6">
                  {current.benefits.slice(0, 3).map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-700">
                      <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Urgency Counter */}
              <div className="pt-4 border-t border-orange-100/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-rose-700 mb-1">
                    <Clock className="w-4 h-4 animate-spin text-rose-600" style={{ animationDuration: '6s' }} />
                    <span>Sankalp Booking closes in:</span>
                    <span className="px-2 py-0.5 bg-rose-50 border border-rose-200 rounded font-mono font-bold text-rose-800">
                      {current.bookingClosesIn}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{current.devoteesCount.toLocaleString('en-IN')} devotees already participated</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[11px] text-neutral-500 block">Starting from</span>
                    <span className="text-2xl font-black text-neutral-900 font-serif">
                      ₹{current.packages[0].price}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => onSelectPuja(current)}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-saffron hover:opacity-95 text-white text-sm font-bold shadow-md shadow-orange-500/30 transition-all hover:scale-[1.02] cursor-pointer shimmer-btn"
                  >
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    Participate Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Media Column */}
            <div className="lg:col-span-5 relative bg-neutral-900 min-h-[260px] sm:min-h-[340px] lg:min-h-full">
              <img
                src={current.imageUrl}
                alt={current.title}
                className="w-full h-full object-cover object-center opacity-90 transition-all duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-amber-500/90 text-white font-bold px-2.5 py-0.5 rounded shadow-xs">
                    ★ {current.rating} Rating
                  </span>
                  <span className="text-xs text-neutral-300">
                    Verified Sacred Shrines
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white">
                  {current.deity}
                </h3>
                <p className="text-xs text-neutral-300 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {current.templeLocation}
                </p>
              </div>

              {/* Slider indicators */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {pujas.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex ? "w-6 bg-orange-500" : "w-2 bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Slider Arrows */}
              <button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + pujas.length) % pujas.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                aria-label="Previous Puja"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % pujas.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                aria-label="Next Puja"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
