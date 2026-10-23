"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Sun,
  Moon,
  Clock,
  Compass,
  ChevronRight,
  AlertTriangle,
  Flame,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from "lucide-react";
import {
  getVedicPanchang,
  SACRED_CITIES,
  VedicPanchangData,
  ChoghadiyaSlot
} from "@/utils/panchang";

interface DailyPanchangWidgetProps {
  onSelectPuja?: (pujaSlug: string) => void;
}

export default function DailyPanchangWidget({ onSelectPuja }: DailyPanchangWidgetProps) {
  const [selectedCityId, setSelectedCityId] = useState<string>("varanasi");
  const [panchang, setPanchang] = useState<VedicPanchangData | null>(null);
  const [activeTab, setActiveTab] = useState<"choghadiya" | "muhurat">("choghadiya");

  useEffect(() => {
    const data = getVedicPanchang(new Date(), selectedCityId);
    setPanchang(data);

    // Refresh every minute to keep the live Choghadiya timer accurate
    const interval = setInterval(() => {
      setPanchang(getVedicPanchang(new Date(), selectedCityId));
    }, 60000);

    return () => clearInterval(interval);
  }, [selectedCityId]);

  if (!panchang) return null;

  const currentChoghadiya: ChoghadiyaSlot = panchang.choghadiya.currentSlot;

  // Color theme based on current Choghadiya
  const isAuspicious = currentChoghadiya.nature === "AUSPICIOUS";
  const isNeutral = currentChoghadiya.nature === "NEUTRAL";

  return (
    <section className="relative py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-2">
      {/* Container with Grand Vedic Royal Border & Glow */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#1C130E] via-[#2A1B14] to-[#1F140F] text-amber-50 p-6 sm:p-8 border border-amber-500/30 shadow-2xl shadow-orange-950/40 overflow-hidden">
        
        {/* Sacred Background Aura */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-radial from-amber-500/20 via-orange-600/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-radial from-red-600/15 via-amber-600/10 to-transparent blur-3xl pointer-events-none" />

        {/* 1. Header Row: Title, City Selector, and Full View CTA */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-500/20">
          
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/30 border border-amber-300/40 shrink-0">
              🕉️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-amber-400 uppercase bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  LIVE VEDIC MUHURAT & CALENDAR
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-black tracking-wide text-amber-100 mt-0.5">
                आज का दैनिक पंचांग व चौघड़िया
              </h2>
            </div>
          </div>

          {/* Right Controls: City Selector & Full Calendar Link */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* City Selector */}
            <div className="flex items-center gap-1.5 bg-[#38241B] px-3 py-1.5 rounded-xl border border-amber-500/30 text-xs">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="bg-transparent text-amber-200 font-semibold focus:outline-hidden cursor-pointer"
              >
                {SACRED_CITIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#2A1B14] text-neutral-100">
                    {c.hindiName} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Direct Link to full page */}
            <Link
              href="/panchang"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs shadow-md shadow-orange-600/30 border border-amber-300/30 transition-all hover:scale-105"
            >
              <span>सम्पूर्ण पंचांग</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 2. Key Daily Elements (Tithi, Vaar, Nakshatra, Surya/Chandra) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 my-6">
          
          {/* Tithi Card */}
          <div className="bg-[#241712]/90 rounded-2xl p-3.5 sm:p-4 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              आज की तिथि (Tithi)
            </span>
            <div className="text-sm sm:text-base font-serif font-black text-amber-200 mt-1 line-clamp-1">
              {panchang.tithi.hindiName}
            </div>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {panchang.paksha} • {panchang.maas}
            </span>
          </div>

          {/* Nakshatra Card */}
          <div className="bg-[#241712]/90 rounded-2xl p-3.5 sm:p-4 border border-amber-500/20 backdrop-blur-xs">
            <span className="text-[10px] uppercase font-bold text-neutral-400 block tracking-wider">
              नक्षत्र (Nakshatra)
            </span>
            <div className="text-sm sm:text-base font-serif font-black text-amber-200 mt-1">
              {panchang.nakshatra.hindiName}
            </div>
            <div className="text-[10px] text-neutral-400 mt-1">
              स्वामी: <span className="text-amber-300 font-semibold">{panchang.nakshatra.rulingPlanet}</span>
            </div>
          </div>

          {/* Abhijit Muhurat Card */}
          <div className="bg-[#241712]/90 rounded-2xl p-3.5 sm:p-4 border border-emerald-500/30 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                अभिजीत मुहूर्त (सर्वश्रेष्ठ)
              </span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xs sm:text-sm font-mono font-bold text-emerald-300 mt-1">
              {panchang.muhurats.abhijit.startTime} - {panchang.muhurats.abhijit.endTime}
            </div>
            <span className="text-[10px] text-emerald-400/80 block mt-1">
              शुभ कार्य व संकल्प समय
            </span>
          </div>

          {/* Rahu Kaal Card (Inauspicious Warning) */}
          <div className="bg-[#241712]/90 rounded-2xl p-3.5 sm:p-4 border border-red-500/30 backdrop-blur-xs">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider">
                राहुकाल (वर्जित समय)
              </span>
              <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            </div>
            <div className="text-xs sm:text-sm font-mono font-bold text-red-300 mt-1">
              {panchang.muhurats.rahuKaal.startTime} - {panchang.muhurats.rahuKaal.endTime}
            </div>
            <span className="text-[10px] text-red-400/80 block mt-1">
              ⚠️ कोई शुभ कार्य न करें
            </span>
          </div>
        </div>

        {/* 3. Live Active Choghadiya Banner */}
        <div
          className={`rounded-2xl p-4 sm:p-5 border transition-all ${
            isAuspicious
              ? "bg-gradient-to-r from-emerald-950/70 via-[#1C2C1D] to-emerald-950/50 border-emerald-500/40 text-emerald-100"
              : isNeutral
              ? "bg-gradient-to-r from-amber-950/70 via-[#2C2418] to-amber-950/50 border-amber-500/40 text-amber-100"
              : "bg-gradient-to-r from-rose-950/70 via-[#2F171A] to-rose-950/50 border-red-500/40 text-rose-100"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full shrink-0 ${
                  isAuspicious
                    ? "bg-emerald-400 animate-ping"
                    : isNeutral
                    ? "bg-amber-400 animate-pulse"
                    : "bg-red-400 animate-pulse"
                }`}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-extrabold tracking-wider">
                    अभी वर्तमान चौघड़िया:
                  </span>
                  <span
                    className={`text-sm sm:text-base font-serif font-black px-2.5 py-0.5 rounded-lg border ${
                      isAuspicious
                        ? "bg-emerald-500/30 text-emerald-200 border-emerald-400/40"
                        : isNeutral
                        ? "bg-amber-500/30 text-amber-200 border-amber-400/40"
                        : "bg-red-500/30 text-red-200 border-red-400/40"
                    }`}
                  >
                    {currentChoghadiya.hindiName} ({currentChoghadiya.name})
                  </span>
                  <span className="text-xs font-mono font-bold">
                    {currentChoghadiya.startTime} - {currentChoghadiya.endTime}
                  </span>
                </div>
                <p className="text-[11px] opacity-90 mt-0.5">
                  {currentChoghadiya.meaning} • {currentChoghadiya.bestFor}
                </p>
              </div>
            </div>

            {/* Quick action to view all Choghadiya slots */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/panchang"
                className="text-xs font-bold underline hover:no-underline flex items-center gap-1 opacity-90 hover:opacity-100"
              >
                <span>दिन व रात का चौघड़िया देखें</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4. Mini Day Choghadiya Rail (horizontal quick visual) */}
        <div className="mt-4 pt-4 border-t border-amber-500/15">
          <div className="flex items-center justify-between text-xs font-bold text-neutral-400 mb-2">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>आज का दिन चौघड़िया (Day Choghadiya Timeline)</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">
              सूर्योदय: {panchang.surya.sunrise} | सूर्यास्त: {panchang.surya.sunset}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {panchang.choghadiya.daySlots.map((slot, idx) => {
              const isGood = slot.nature === "AUSPICIOUS";
              const isMid = slot.nature === "NEUTRAL";
              return (
                <div
                  key={idx}
                  className={`rounded-xl p-2 text-center border transition-all ${
                    slot.isCurrent
                      ? "ring-2 ring-amber-400 shadow-md scale-102 bg-[#3A261D]"
                      : "bg-[#211510]/80"
                  } ${
                    isGood
                      ? "border-emerald-500/40 text-emerald-300"
                      : isMid
                      ? "border-amber-500/30 text-amber-300"
                      : "border-red-500/30 text-red-300"
                  }`}
                >
                  <div className="text-[10px] font-mono opacity-70 truncate">
                    {slot.startTime}
                  </div>
                  <div className="font-serif font-black text-xs sm:text-sm my-0.5">
                    {slot.hindiName}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-wider opacity-80">
                    {isGood ? "शुभ" : isMid ? "चल" : "अशुभ"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Special Festival of the Day & Puja Upsell Banner */}
        {panchang.todayFestival && (
          <div className="mt-5 bg-gradient-to-r from-amber-900/40 via-orange-950/50 to-red-950/40 rounded-2xl p-4 sm:p-5 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center text-xl shrink-0 border border-amber-500/30">
                🪔
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    विशेष पर्व व पावन अवसर
                  </span>
                </div>
                <h4 className="font-serif font-black text-sm sm:text-base text-amber-200">
                  {panchang.todayFestival.hindiTitle}
                </h4>
                <p className="text-xs text-neutral-300 line-clamp-1 mt-0.5">
                  {panchang.todayFestival.significance}
                </p>
              </div>
            </div>

            <Link
              href="/#pujas"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-serif font-black text-xs shadow-md shadow-orange-500/30 border border-amber-300/40 transition-all hover:scale-105 shrink-0"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>आज की विशेष पूजा संकल्प बुक करें</span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
