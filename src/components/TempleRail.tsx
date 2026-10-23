"use client";

import React from "react";
import { Temple } from "@/data/pujas";
import { MapPin, ChevronRight, Flame } from "lucide-react";

interface TempleRailProps {
  temples: Temple[];
  selectedTempleId?: string;
  onSelectTemple: (temple: Temple) => void;
}

export default function TempleRail({
  temples,
  selectedTempleId,
  onSelectTemple,
}: TempleRailProps) {
  return (
    <section id="temples" className="py-12 sm:py-16 bg-white border-b border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <span className="text-base">🛕</span>
              <span>Sanatan Siddhapeeth & Teerth Kshetras</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
              Sacred Temples & Shrines
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Participate in daily anushthans performed at ancient Jyotirlingas and Shaktipeeths across India
            </p>
          </div>

          <div className="text-xs font-semibold text-orange-700 hover:text-orange-800 flex items-center gap-1 cursor-pointer">
            <span>Explore all 24+ Temples</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Horizontal Temple Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {temples.map((temple) => {
            const isSelected = selectedTempleId === temple.id;
            return (
              <div
                key={temple.id}
                onClick={() => onSelectTemple(temple)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300 relative bg-neutral-900 flex flex-col justify-end aspect-3/4 ${
                  isSelected
                    ? "ring-3 ring-orange-500 border-transparent shadow-lg scale-[1.02]"
                    : "border-neutral-200/60 hover:shadow-spiritual hover:scale-[1.02]"
                }`}
              >
                <img
                  src={temple.imageUrl}
                  alt={temple.name}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 opacity-75"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-xs text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-amber-300/30">
                    <Flame className="w-2.5 h-2.5 text-orange-400" />
                    {temple.activePujasCount} Active Pujas
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-3 text-white">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    {temple.deity}
                  </span>
                  <h3 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-2 mt-0.5 group-hover:text-amber-200 transition-colors">
                    {temple.name}
                  </h3>
                  <p className="text-[10px] text-neutral-300 flex items-center gap-1 mt-1 truncate">
                    <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                    {temple.location}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
