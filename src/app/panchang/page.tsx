"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Sun,
  Moon,
  Clock,
  Compass,
  Calendar as CalendarIcon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Layers,
  ArrowRight,
  Share2,
  BookmarkCheck
} from "lucide-react";
import {
  getVedicPanchang,
  SACRED_CITIES,
  VedicPanchangData,
  ChoghadiyaSlot,
  PanchangCity
} from "@/utils/panchang";

export default function PanchangPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string>("varanasi");
  const [panchang, setPanchang] = useState<VedicPanchangData | null>(null);
  const [activeTab, setActiveTab] = useState<"choghadiya" | "panchang" | "muhurats" | "festivals">("choghadiya");
  const [choghadiyaView, setChoghadiyaView] = useState<"day" | "night">("day");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setPanchang(getVedicPanchang(today, selectedCityId));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const data = getVedicPanchang(selectedDate, selectedCityId);
      setPanchang(data);
    }
  }, [selectedDate, selectedCityId]);

  const handlePrevDay = () => {
    if (!selectedDate) return;
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const handleNextDay = () => {
    if (!selectedDate) return;
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (!panchang || !selectedDate) return null;

  const isToday =
    new Date().toDateString() === selectedDate.toDateString();

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] selection:bg-orange-500 selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Navbar />

      <main className="grow py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
              <Link href="/" className="hover:text-orange-600 transition-colors">
                होम
              </Link>
              <span>/</span>
              <span className="text-orange-600 font-bold">दैनिक पंचांग व चौघड़िया</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-neutral-900 tracking-tight mt-1 flex items-center gap-3">
              <span>दैनिक वैदिक पंचांग व चौघड़िया</span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 border border-orange-300">
                संवत {panchang.vikramSamvat}
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              शुद्ध वैदिक सिद्धांत एवं सूर्य सिद्धांत पर आधारित सटीक तिथि, मुहूर्त, चौघड़िया व राहुकाल
            </p>
          </div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 text-xs font-bold transition-all shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? "लिंक कॉपी हो गया!" : "पंचांग शेयर करें"}</span>
          </button>
        </div>

        {/* 1. Date & City Navigation Bar */}
        <div className="bg-gradient-to-r from-[#201511] via-[#2F1F17] to-[#201511] text-amber-50 rounded-3xl p-5 sm:p-6 border border-amber-500/30 shadow-xl mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          {/* Date Selector Controls */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handlePrevDay}
              className="p-2.5 rounded-xl bg-[#3E291F] hover:bg-[#4E3428] text-amber-200 border border-amber-500/20 transition-colors cursor-pointer"
              title="पिछला दिन"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleToday}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isToday
                  ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white border-amber-300/40 shadow-md shadow-orange-600/30"
                  : "bg-[#3E291F] text-amber-200 border-amber-500/20 hover:bg-[#4E3428]"
              }`}
            >
              आज (Today)
            </button>

            <button
              onClick={handleNextDay}
              className="p-2.5 rounded-xl bg-[#3E291F] hover:bg-[#4E3428] text-amber-200 border border-amber-500/20 transition-colors cursor-pointer"
              title="अगला दिन"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Native Date Picker */}
            <div className="relative flex items-center bg-[#3E291F] rounded-xl px-3 py-2 border border-amber-500/20 text-xs text-amber-200">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-400 mr-2 shrink-0" />
              <input
                type="date"
                value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setSelectedDate(new Date(e.target.value));
                  }
                }}
                className="bg-transparent text-amber-100 font-bold text-xs focus:outline-hidden cursor-pointer"
              />
            </div>
          </div>

          {/* Current Selected Date Display Banner */}
          <div className="text-center lg:text-right">
            <div className="text-lg sm:text-xl font-serif font-black text-amber-200">
              {panchang.dateHindi} ({panchang.vaar.hindiName})
            </div>
            <div className="text-xs text-amber-400/90 font-medium mt-0.5">
              {panchang.paksha} • {panchang.tithi.hindiName} • संवत {panchang.vikramSamvat}
            </div>
          </div>

          {/* City / Location Selector */}
          <div className="flex items-center gap-2 bg-[#3A261D] px-4 py-2.5 rounded-2xl border border-amber-500/30 text-xs shrink-0">
            <Compass className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] text-neutral-400 block font-semibold">स्थान / शहर:</span>
              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="bg-transparent text-amber-200 font-bold focus:outline-hidden cursor-pointer text-xs"
              >
                {SACRED_CITIES.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#2A1B14] text-neutral-100">
                    {c.hindiName} ({c.name})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* 2. Top Solar & Lunar Status Pill Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {/* Sunrise / Sunset */}
          <div className="bg-white rounded-3xl p-5 border border-orange-100 shadow-xs">
            <div className="flex items-center justify-between text-neutral-500 text-xs font-bold">
              <span>सूर्योदय व सूर्यास्त</span>
              <Sun className="w-4 h-4 text-orange-500" />
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">सूर्योदय:</span>
                <span className="font-mono font-bold text-neutral-900 text-sm">
                  {panchang.surya.sunrise}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block font-semibold">सूर्यास्त:</span>
                <span className="font-mono font-bold text-neutral-900 text-sm">
                  {panchang.surya.sunset}
                </span>
              </div>
            </div>
          </div>

          {/* Moonrise / Moonset */}
          <div className="bg-white rounded-3xl p-5 border border-orange-100 shadow-xs">
            <div className="flex items-center justify-between text-neutral-500 text-xs font-bold">
              <span>चन्द्रोदय व राशि</span>
              <Moon className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-neutral-400 block font-semibold">चन्द्रोदय:</span>
                <span className="font-mono font-bold text-neutral-900 text-sm">
                  {panchang.chandra.moonrise}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 block font-semibold">चंद्र राशि:</span>
                <span className="font-bold text-indigo-900 text-xs line-clamp-1">
                  {panchang.chandra.rashi}
                </span>
              </div>
            </div>
          </div>

          {/* Abhijit Muhurat */}
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-3xl p-5 border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between text-emerald-800 text-xs font-bold">
              <span>अभिजीत मुहूर्त</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2.5">
              <span className="font-mono font-black text-emerald-950 text-sm block">
                {panchang.muhurats.abhijit.startTime} - {panchang.muhurats.abhijit.endTime}
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
                दिन का सर्वोत्तम शुभ मुहूर्त
              </span>
            </div>
          </div>

          {/* Rahu Kaal Warning */}
          <div className="bg-gradient-to-br from-red-50 to-rose-100/60 rounded-3xl p-5 border border-red-200 shadow-xs">
            <div className="flex items-center justify-between text-red-800 text-xs font-bold">
              <span>राहुकाल (वर्जित)</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="mt-2.5">
              <span className="font-mono font-black text-red-950 text-sm block">
                {panchang.muhurats.rahuKaal.startTime} - {panchang.muhurats.rahuKaal.endTime}
              </span>
              <span className="text-[10px] font-semibold text-red-700 block mt-0.5">
                ⚠️ शुभ कार्य निषिद्ध हैं
              </span>
            </div>
          </div>
        </div>

        {/* 3. Section Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-orange-200 pb-3 mb-8">
          <button
            onClick={() => setActiveTab("choghadiya")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "choghadiya"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30"
                : "bg-white text-neutral-600 hover:text-neutral-900 hover:bg-orange-50 border border-neutral-200/80"
            }`}
          >
            <span>आज का चौघड़िया (Choghadiya)</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </button>

          <button
            onClick={() => setActiveTab("panchang")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "panchang"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30"
                : "bg-white text-neutral-600 hover:text-neutral-900 hover:bg-orange-50 border border-neutral-200/80"
            }`}
          >
            सम्पूर्ण पंचांग (5 अंग)
          </button>

          <button
            onClick={() => setActiveTab("muhurats")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === "muhurats"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30"
                : "bg-white text-neutral-600 hover:text-neutral-900 hover:bg-orange-50 border border-neutral-200/80"
            }`}
          >
            शुभ व अशुभ मुहूर्त
          </button>

          <button
            onClick={() => setActiveTab("festivals")}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "festivals"
                ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30"
                : "bg-white text-neutral-600 hover:text-neutral-900 hover:bg-orange-50 border border-neutral-200/80"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>आगामी व्रत व पर्व कैलेंडर</span>
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TAB 1: CHOGHADIYA (दिन व रात का चौघड़िया) */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "choghadiya" && (
          <div className="space-y-6">
            {/* Choghadiya Day/Night Toggle & Legend */}
            <div className="bg-white rounded-3xl p-5 border border-orange-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setChoghadiyaView("day")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    choghadiyaView === "day"
                      ? "bg-amber-500 text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span>दिन का चौघड़िया (Day)</span>
                </button>

                <button
                  onClick={() => setChoghadiyaView("night")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    choghadiyaView === "night"
                      ? "bg-indigo-900 text-white shadow-xs"
                      : "bg-neutral-100 text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>रात का चौघड़िया (Night)</span>
                </button>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span>शुभ / अमृत / लाभ (उत्तम)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span>चर (मध्यम)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500" />
                  <span>रोग / काल / उद्वेग (वर्जित)</span>
                </span>
              </div>
            </div>

            {/* Choghadiya Slots Table */}
            <div className="bg-white rounded-3xl border border-orange-100 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#FAF7F2] text-neutral-600 font-bold uppercase tracking-wider text-[11px] border-b border-orange-100">
                    <tr>
                      <th className="py-4 px-6">समय (Timings)</th>
                      <th className="py-4 px-4">चौघड़िया नाम</th>
                      <th className="py-4 px-4">ग्रह स्वामी</th>
                      <th className="py-4 px-4">फल एवं प्रभाव</th>
                      <th className="py-4 px-6">किस कार्य हेतु उपयुक्त</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-orange-100/60 font-medium">
                    {(choghadiyaView === "day"
                      ? panchang.choghadiya.daySlots
                      : panchang.choghadiya.nightSlots
                    ).map((slot, index) => {
                      const isGood = slot.nature === "AUSPICIOUS";
                      const isMid = slot.nature === "NEUTRAL";

                      return (
                        <tr
                          key={index}
                          className={`transition-colors ${
                            slot.isCurrent
                              ? "bg-amber-100/50 font-bold ring-2 ring-amber-400 inset-0"
                              : "hover:bg-orange-50/40"
                          }`}
                        >
                          {/* Time with current badge */}
                          <td className="py-4 px-6 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              {slot.isCurrent && (
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                              )}
                              <span className="font-mono font-bold text-neutral-900">
                                {slot.startTime} - {slot.endTime}
                              </span>
                            </div>
                            {slot.isCurrent && (
                              <span className="inline-block mt-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-full">
                                अभी चल रहा है
                              </span>
                            )}
                          </td>

                          {/* Choghadiya Name & Badge */}
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-serif font-black border ${
                                isGood
                                  ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                  : isMid
                                  ? "bg-amber-100 text-amber-900 border-amber-300"
                                  : "bg-red-100 text-red-900 border-red-300"
                              }`}
                            >
                              {slot.hindiName} ({slot.name})
                            </span>
                          </td>

                          {/* Ruling Planet */}
                          <td className="py-4 px-4 text-neutral-700 whitespace-nowrap">
                            {slot.planet}
                          </td>

                          {/* Meaning / Nature */}
                          <td className="py-4 px-4 text-neutral-800">
                            {slot.meaning}
                          </td>

                          {/* Best For */}
                          <td className="py-4 px-6 text-neutral-600 text-xs">
                            {slot.bestFor}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 2: COMPLETE VEDIC PANCHANG (5 LIMBS) */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "panchang" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The 5 Main Limbs of Panchang */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-orange-100 shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-orange-100">
                <span className="text-xl">🪔</span>
                <h3 className="font-serif font-black text-lg text-neutral-900">
                  पंचांग के पंच अंग (The 5 Sacred Limbs)
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                {/* 1. Tithi */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      1. तिथि (Tithi)
                    </span>
                    <span className="font-serif font-bold text-neutral-900 text-base">
                      {panchang.tithi.hindiName}
                    </span>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      अधिष्ठाता देवता: <span className="font-semibold text-orange-700">{panchang.tithi.deity}</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-semibold">
                    समाप्ति: {panchang.tithi.endTime}
                  </span>
                </div>

                {/* 2. Vaar */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      2. वार (Day of the Week)
                    </span>
                    <span className="font-serif font-bold text-neutral-900 text-base">
                      {panchang.vaar.hindiName} ({panchang.vaar.name})
                    </span>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      शासक ग्रह: <span className="font-semibold text-orange-700">{panchang.vaar.rulingPlanet}</span>
                    </div>
                  </div>
                </div>

                {/* 3. Nakshatra */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      3. नक्षत्र (Nakshatra)
                    </span>
                    <span className="font-serif font-bold text-neutral-900 text-base">
                      {panchang.nakshatra.hindiName} ({panchang.nakshatra.name})
                    </span>
                    <div className="text-[11px] text-neutral-500 mt-0.5">
                      स्वामी: <span className="font-semibold text-orange-700">{panchang.nakshatra.rulingPlanet}</span> • देवता: {panchang.nakshatra.deity}
                    </div>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-semibold">
                    समाप्ति: {panchang.nakshatra.endTime}
                  </span>
                </div>

                {/* 4. Yoga */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      4. योग (Yoga)
                    </span>
                    <span className="font-serif font-bold text-neutral-900 text-base">
                      {panchang.yoga.hindiName} ({panchang.yoga.type} योग)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-semibold">
                    समाप्ति: {panchang.yoga.endTime}
                  </span>
                </div>

                {/* 5. Karana */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/50 border border-orange-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-neutral-400 block">
                      5. करण (Karana)
                    </span>
                    <span className="font-serif font-bold text-neutral-900 text-base">
                      {panchang.karana.hindiName}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-500 font-semibold">
                    समाप्ति: {panchang.karana.endTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Vedic Calendar Epochs & Planetary details */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-orange-100 shadow-xs space-y-5">
              <div className="flex items-center gap-2 pb-3 border-b border-orange-100">
                <span className="text-xl">📜</span>
                <h3 className="font-serif font-black text-lg text-neutral-900">
                  संवत, मास एवं अयन विवरण
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">विक्रम संवत:</span>
                  <span className="font-bold text-neutral-900 font-mono">{panchang.vikramSamvat}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">शक संवत:</span>
                  <span className="font-bold text-neutral-900 font-mono">{panchang.shakaSamvat}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">संवत्सर:</span>
                  <span className="font-bold text-neutral-900">{panchang.samvatsara}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">अयन:</span>
                  <span className="font-bold text-neutral-900">{panchang.ayan}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">ऋतु:</span>
                  <span className="font-bold text-neutral-900">{panchang.ritu}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">मास (पूर्णिमान्त):</span>
                  <span className="font-bold text-neutral-900">{panchang.maas} मास</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">पक्ष:</span>
                  <span className="font-bold text-neutral-900">{panchang.paksha}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <span className="text-neutral-500">सूर्य राशि:</span>
                  <span className="font-bold text-neutral-900">{panchang.surya.rashi}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-neutral-500">चंद्र राशि:</span>
                  <span className="font-bold text-neutral-900">{panchang.chandra.rashi}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 3: MUHURAT TIMINGS (शुभ व अशुभ मुहूर्त) */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "muhurats" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Auspicious Muhurats */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm font-bold">
                  ✓
                </span>
                <h3 className="font-serif font-black text-lg text-emerald-950">
                  शुभ मुहूर्त (Auspicious Timings)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* Abhijit */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-emerald-950 text-sm">
                      {panchang.muhurats.abhijit.hindiName}
                    </span>
                    <span className="font-mono font-bold text-emerald-900 text-sm">
                      {panchang.muhurats.abhijit.startTime} - {panchang.muhurats.abhijit.endTime}
                    </span>
                  </div>
                  <p className="text-emerald-700 mt-1">{panchang.muhurats.abhijit.description}</p>
                </div>

                {/* Brahma */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-emerald-950 text-sm">
                      {panchang.muhurats.brahma.hindiName}
                    </span>
                    <span className="font-mono font-bold text-emerald-900 text-sm">
                      {panchang.muhurats.brahma.startTime} - {panchang.muhurats.brahma.endTime}
                    </span>
                  </div>
                  <p className="text-emerald-700 mt-1">{panchang.muhurats.brahma.description}</p>
                </div>

                {/* Amrit Kaal */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-emerald-950 text-sm">
                      {panchang.muhurats.amritKaal.hindiName}
                    </span>
                    <span className="font-mono font-bold text-emerald-900 text-sm">
                      {panchang.muhurats.amritKaal.startTime} - {panchang.muhurats.amritKaal.endTime}
                    </span>
                  </div>
                  <p className="text-emerald-700 mt-1">{panchang.muhurats.amritKaal.description}</p>
                </div>

                {/* Vijaya */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-emerald-950 text-sm">
                      {panchang.muhurats.vijaya.hindiName}
                    </span>
                    <span className="font-mono font-bold text-emerald-900 text-sm">
                      {panchang.muhurats.vijaya.startTime} - {panchang.muhurats.vijaya.endTime}
                    </span>
                  </div>
                  <p className="text-emerald-700 mt-1">{panchang.muhurats.vijaya.description}</p>
                </div>

                {/* Godhuli */}
                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-emerald-950 text-sm">
                      {panchang.muhurats.godhuli.hindiName}
                    </span>
                    <span className="font-mono font-bold text-emerald-900 text-sm">
                      {panchang.muhurats.godhuli.startTime} - {panchang.muhurats.godhuli.endTime}
                    </span>
                  </div>
                  <p className="text-emerald-700 mt-1">{panchang.muhurats.godhuli.description}</p>
                </div>
              </div>
            </div>

            {/* Inauspicious Timings (अशुभ समय) */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-red-200 shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-red-100">
                <span className="w-7 h-7 rounded-lg bg-red-100 text-red-700 flex items-center justify-center text-sm font-bold">
                  ✕
                </span>
                <h3 className="font-serif font-black text-lg text-red-950">
                  अशुभ मुहूर्त (Inauspicious Periods - त्याज्य)
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                {/* Rahu Kaal */}
                <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-red-950 text-sm">
                      {panchang.muhurats.rahuKaal.hindiName}
                    </span>
                    <span className="font-mono font-bold text-red-900 text-sm">
                      {panchang.muhurats.rahuKaal.startTime} - {panchang.muhurats.rahuKaal.endTime}
                    </span>
                  </div>
                  <p className="text-red-700 mt-1">{panchang.muhurats.rahuKaal.description}</p>
                </div>

                {/* Yamaganda */}
                <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-red-950 text-sm">
                      {panchang.muhurats.yamaganda.hindiName}
                    </span>
                    <span className="font-mono font-bold text-red-900 text-sm">
                      {panchang.muhurats.yamaganda.startTime} - {panchang.muhurats.yamaganda.endTime}
                    </span>
                  </div>
                  <p className="text-red-700 mt-1">{panchang.muhurats.yamaganda.description}</p>
                </div>

                {/* Gulika */}
                <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-red-950 text-sm">
                      {panchang.muhurats.gulikaKaal.hindiName}
                    </span>
                    <span className="font-mono font-bold text-red-900 text-sm">
                      {panchang.muhurats.gulikaKaal.startTime} - {panchang.muhurats.gulikaKaal.endTime}
                    </span>
                  </div>
                  <p className="text-red-700 mt-1">{panchang.muhurats.gulikaKaal.description}</p>
                </div>

                {/* Dur Muhurat */}
                <div className="p-3.5 rounded-2xl bg-red-50/70 border border-red-200">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-red-950 text-sm">
                      {panchang.muhurats.durMuhurat.hindiName}
                    </span>
                    <span className="font-mono font-bold text-red-900 text-sm">
                      {panchang.muhurats.durMuhurat.startTime} - {panchang.muhurats.durMuhurat.endTime}
                    </span>
                  </div>
                  <p className="text-red-700 mt-1">{panchang.muhurats.durMuhurat.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* TAB 4: VRATS & FESTIVALS CALENDAR (व्रत व पर्व) */}
        {/* ------------------------------------------------------------------ */}
        {activeTab === "festivals" && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl shadow-orange-500/15 border border-amber-300/40">
              <h3 className="font-serif font-black text-xl">
                आगामी पावन व्रत व हिंदू त्योहार (Sacred Hindu Festivals)
              </h3>
              <p className="text-xs text-amber-100 mt-1">
                हिंदू धर्म में हर तिथि का विशेष महत्व होता है। जानिए आगामी एकादशी, प्रदोष, पूर्णिमा व त्योहारों की तिथियां और कराएं पवित्र संकल्प पूजा।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Ekadashi */}
              <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg mb-3">
                    🌸
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    हर महीने दो बार
                  </span>
                  <h4 className="font-serif font-bold text-base text-neutral-900 mt-2">
                    पवित्र एकादशी महाव्रत (ग्यारस)
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    भगवान विष्णु का सबसे प्रिय दिन। इस दिन व्रत व तुलसी अर्चना से मोक्ष और सुख-शांति की प्राप्ति होती है।
                  </p>
                </div>
                <Link
                  href="/#pujas"
                  className="mt-5 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold transition-colors"
                >
                  <span>विष्णु पूजा संकल्प बुक करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Pradosh Vrat */}
              <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-lg mb-3">
                    🔱
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-200">
                    त्रयोदशी तिथि
                  </span>
                  <h4 className="font-serif font-bold text-base text-neutral-900 mt-2">
                    महा प्रदोष व्रत (शिव आराधना)
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    प्रदोष काल में भगवान शिव का रुद्राभिषेक समस्त पापों और कष्टों का अंत करता है।
                  </p>
                </div>
                <Link
                  href="/#pujas"
                  className="mt-5 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold transition-colors"
                >
                  <span>रुद्राभिषेक पूजा बुक करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sankashti Chaturthi */}
              <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg mb-3">
                    🐘
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                    चतुर्थी तिथि
                  </span>
                  <h4 className="font-serif font-bold text-base text-neutral-900 mt-2">
                    संकष्टी चतुर्थी (विघ्नहर्ता गणेश)
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    संकटों को हरने वाले श्री गणेश जी को दूर्वा व मोदक अर्पण और अथर्वशीर्ष पाठ।
                  </p>
                </div>
                <Link
                  href="/#pujas"
                  className="mt-5 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold transition-colors"
                >
                  <span>गणेश हवन व पूजा बुक करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Purnima */}
              <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg mb-3">
                    🌕
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    पूर्णिमा (पूनम)
                  </span>
                  <h4 className="font-serif font-bold text-base text-neutral-900 mt-2">
                    सत्यनारायण पूर्णिमा महापूजा
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    माँ लक्ष्मी और श्री हरि विष्णु जी की कृपा से घर में धन-धान्य और अखंड शांति का वास होता है।
                  </p>
                </div>
                <Link
                  href="/#pujas"
                  className="mt-5 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold transition-colors"
                >
                  <span>सत्यनारायण पूजा बुक करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Masik Shivratri */}
              <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-lg mb-3">
                    🌙
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    कृष्ण चतुर्दशी
                  </span>
                  <h4 className="font-serif font-bold text-base text-neutral-900 mt-2">
                    मासिक शिवरात्रि
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    महाकाल की विशेष रात्रि। महामृत्युंजय जाप और बिल्वपत्र अर्पण से अकाल मृत्यु का भय दूर होता है।
                  </p>
                </div>
                <Link
                  href="/#pujas"
                  className="mt-5 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold transition-colors"
                >
                  <span>महामृत्युंजय पूजा बुक करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Amavasya */}
              <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="w-9 h-9 rounded-xl bg-neutral-100 text-neutral-800 flex items-center justify-center font-bold text-lg mb-3">
                    🌑
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-md border border-neutral-300">
                    अमावस्या
                  </span>
                  <h4 className="font-serif font-bold text-base text-neutral-900 mt-2">
                    पितृ शांति व कालसर्प शांति
                  </h4>
                  <p className="text-xs text-neutral-500 mt-1">
                    पितरों के आशीर्वाद और शनि शांति हेतु त्र्यंबकेश्वर ज्योतिर्लिंग में विशेष तर्पण व पूजा।
                  </p>
                </div>
                <Link
                  href="/#pujas"
                  className="mt-5 inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 text-xs font-bold transition-colors"
                >
                  <span>पितृ शांति पूजा बुक करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
