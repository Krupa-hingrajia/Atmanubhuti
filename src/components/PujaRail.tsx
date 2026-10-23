"use client";

import React, { useState } from "react";
import { Puja } from "@/data/pujas";
import { 
  Flame, 
  MapPin, 
  Clock, 
  Sparkles, 
  Video, 
  Users, 
  Star,
  CheckCircle2,
  ChevronRight
} from "lucide-react";

interface PujaRailProps {
  pujas: Puja[];
  onSelectPuja: (puja: Puja) => void;
  selectedCategory?: string;
}

export default function PujaRail({ pujas, onSelectPuja }: PujaRailProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Sacred Pujas" },
    { id: "wealth", label: "Wealth & Prosperity" },
    { id: "protection", label: "Protection & Legal Victory" },
    { id: "marriage", label: "Marriage & Relationships" },
    { id: "health", label: "Health & Shani Nivaran" },
  ];

  const filteredPujas = pujas.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "wealth") {
      return (
        p.title.toLowerCase().includes("kuber") ||
        p.title.toLowerCase().includes("lakshmi")
      );
    }
    if (activeFilter === "protection") {
      return (
        p.title.toLowerCase().includes("shatru") ||
        p.title.toLowerCase().includes("kamakhya") ||
        p.title.toLowerCase().includes("raksha")
      );
    }
    if (activeFilter === "marriage") {
      return (
        p.title.toLowerCase().includes("prem") ||
        p.title.toLowerCase().includes("vivaah") ||
        p.title.toLowerCase().includes("parvati")
      );
    }
    if (activeFilter === "health") {
      return (
        p.title.toLowerCase().includes("rudrabhishek") ||
        p.title.toLowerCase().includes("shani")
      );
    }
    return true;
  });

  return (
    <section id="pujas" className="py-12 sm:py-16 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <Flame className="w-3.5 h-3.5 text-orange-600 animate-diya" />
              <span>Participate in Holy Rituals</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
              Recommended Pujas & Anushthans
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Performed by certified Vedic Acharyas with personalized Name and Gotra Sankalp
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-gradient-saffron text-white shadow-xs"
                    : "bg-white text-neutral-600 border border-neutral-200/80 hover:border-orange-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Puja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPujas.map((puja) => {
            const lowestPrice = puja.packages[0]?.price || 501;

            return (
              <div
                key={puja.id}
                className="group bg-white rounded-2xl border border-orange-100/90 shadow-sm hover:shadow-spiritual transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Card Image Banner */}
                  <div className="relative aspect-16/9 bg-neutral-900 overflow-hidden">
                    <img
                      src={puja.imageUrl}
                      alt={puja.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Auspicious Tag */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-600 text-white shadow-xs">
                        {puja.specialTag || "Special Puja"}
                      </span>
                    </div>

                    {/* Booking Closes Badge */}
                    <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-white text-xs font-semibold drop-shadow-md">
                      <Clock className="w-3.5 h-3.5 text-amber-300" />
                      <span>Closes in:</span>
                      <span className="bg-black/60 px-2 py-0.5 rounded font-mono text-amber-300 text-[11px]">
                        {puja.bookingClosesIn}
                      </span>
                    </div>

                    {/* Video Proof Guarantee pill */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-xs text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                        <Video className="w-3 h-3 text-emerald-400" />
                        Video Proof
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5">
                    {/* Temple Location */}
                    <div className="flex items-center gap-1.5 text-xs text-amber-800 font-semibold mb-2">
                      <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                      <span className="truncate">{puja.templeName}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif font-black text-lg text-neutral-900 leading-snug group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                      {puja.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs text-neutral-600 line-clamp-2 mb-4 leading-relaxed">
                      {puja.subTitle}
                    </p>

                    {/* Benefits Preview */}
                    <div className="space-y-1.5 mb-4">
                      {puja.benefits.slice(0, 2).map((b, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-neutral-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </div>
                      ))}
                    </div>

                    {/* Devotees count and rating */}
                    <div className="flex items-center justify-between text-xs text-neutral-500 py-2 border-t border-neutral-100">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        {puja.devoteesCount.toLocaleString('en-IN')} Devotees
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-neutral-700">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        {puja.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer with Price & CTA */}
                <div className="px-5 pb-5 pt-2 border-t border-orange-50 bg-orange-50/20 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-500 uppercase font-semibold block">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-serif font-black text-neutral-900">
                        ₹{lowestPrice}
                      </span>
                      <span className="text-xs text-neutral-400 line-through">
                        ₹{Math.round(lowestPrice * 1.5)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPuja(puja)}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-saffron hover:opacity-95 text-white text-xs font-bold shadow-sm shadow-orange-500/20 transition-all hover:scale-105 cursor-pointer"
                  >
                    <span>Book Puja</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
