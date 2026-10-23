"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Clock,
  Compass,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Flame,
  ArrowRight,
  UserCheck,
  Video,
  ShieldCheck,
  Sparkles,
  RefreshCw
} from "lucide-react";
import {
  getVedicPanchang,
  SACRED_CITIES,
  VedicPanchangData,
  ChoghadiyaSlot
} from "@/utils/panchang";
import { AdminBooking } from "@/utils/adminStore";

export default function AdminPanchangPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<string>("varanasi");
  const [panchang, setPanchang] = useState<VedicPanchangData | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [choghadiyaTab, setChoghadiyaTab] = useState<"day" | "night">("day");

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today);
    setPanchang(getVedicPanchang(today, selectedCityId));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      setPanchang(getVedicPanchang(selectedDate, selectedCityId));
    }
  }, [selectedDate, selectedCityId]);

  useEffect(() => {
    // Fetch live bookings to map them to today's Muhurat
    setLoadingBookings(true);
    fetch("/api/v1/bookings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setBookings(data.data);
        }
      })
      .catch((err) => console.log("Bookings load:", err))
      .finally(() => setLoadingBookings(false));
  }, []);

  if (!panchang) return null;

  const currentChoghadiya = panchang.choghadiya.currentSlot;
  const isAuspicious = currentChoghadiya.nature === "AUSPICIOUS";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 1. Header with City & Date Controls for Temple Ops */}
      <div className="bg-gradient-to-r from-[#1E1410] via-[#2D1C15] to-[#1E1410] text-amber-50 rounded-3xl p-6 sm:p-7 border border-amber-500/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              MANDIR PUROHIT & SANKALP OPS STATION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-amber-100 mt-1">
            दैनिक पंचांग, चौघड़िया एवं संकल्प मुहूर्त नियंत्रण
          </h2>
          <p className="text-xs text-neutral-300 mt-1">
            पुजारियों द्वारा भक्तों के नाम-गोत्र संकल्प पूजन हेतु शुभ व वर्जित समय निर्धारण
          </p>
        </div>

        {/* City and Date Pickers */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-[#3A261D] rounded-xl px-3 py-2 border border-amber-500/20 text-xs">
            <Calendar className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
            <input
              type="date"
              value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
              onChange={(e) => {
                if (e.target.value) {
                  setSelectedDate(new Date(e.target.value));
                }
              }}
              className="bg-transparent text-amber-100 font-bold focus:outline-hidden cursor-pointer"
            />
          </div>

          <div className="flex items-center bg-[#3A261D] rounded-xl px-3 py-2 border border-amber-500/20 text-xs">
            <Compass className="w-4 h-4 text-amber-400 mr-2 shrink-0" />
            <select
              value={selectedCityId}
              onChange={(e) => setSelectedCityId(e.target.value)}
              className="bg-transparent text-amber-100 font-bold focus:outline-hidden cursor-pointer"
            >
              {SACRED_CITIES.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#2A1B14] text-neutral-100">
                  {c.hindiName} ({c.name})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setSelectedDate(new Date())}
            className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Reset to Today
          </button>
        </div>
      </div>

      {/* 2. Key Mandir Ops Cards (Live Active Window + Rahu Alert) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Active Choghadiya Status */}
        <div className="bg-white rounded-3xl p-6 border border-orange-100 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-neutral-500">
              <span>वर्तमान चौघड़िया स्थिति</span>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`text-2xl font-serif font-black px-3 py-1 rounded-xl border ${
                  isAuspicious
                    ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                    : "bg-red-100 text-red-900 border-red-300"
                }`}
              >
                {currentChoghadiya.hindiName} ({currentChoghadiya.name})
              </span>
            </div>
            <div className="mt-2 text-xs font-mono font-bold text-neutral-700">
              {currentChoghadiya.startTime} - {currentChoghadiya.endTime}
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              {currentChoghadiya.meaning}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>पुजारी संकल्प हेतु: {isAuspicious ? "उत्तम फलदायी" : "सावधानी अपेक्षित"}</span>
          </div>
        </div>

        {/* Abhijit Sankalp Window */}
        <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
              <span>अभिजीत मुहूर्त (स्वर्ण काल)</span>
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-4 text-2xl font-serif font-black text-emerald-950">
              {panchang.muhurats.abhijit.startTime} - {panchang.muhurats.abhijit.endTime}
            </div>
            <p className="mt-2 text-xs text-emerald-800">
              दिन का सर्वश्रेष्ठ मुहूर्त। आज की मुख्य रुद्राभिषेक व विशेष संकल्प पूजा इसी अवधि में प्रारंभ कराएं।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-100 text-[11px] font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% सर्वकार्य सिद्धि योग</span>
          </div>
        </div>

        {/* Rahu Kaal Inauspicious Alert */}
        <div className="bg-white rounded-3xl p-6 border border-red-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-red-700">
              <span>राहुकाल (वर्जित समय - Caution)</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="mt-4 text-2xl font-serif font-black text-red-950">
              {panchang.muhurats.rahuKaal.startTime} - {panchang.muhurats.rahuKaal.endTime}
            </div>
            <p className="mt-2 text-xs text-red-700">
              ⚠️ इस समय में किसी भी भक्त का नया संकल्प या नवीन पूजा अनुष्ठान प्रारंभ न कराएं।
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-red-100 text-[11px] font-bold text-red-700 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>शुभ कार्य निषिद्ध समय</span>
          </div>
        </div>
      </div>

      {/* 3. Choghadiya Schedule Table for Priests */}
      <div className="bg-white rounded-3xl border border-orange-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-orange-50/20">
          <div>
            <h3 className="font-serif font-black text-lg text-neutral-900">
              चौघड़िया समय सारिणी (Priest Duty & Ritual Schedule)
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              स्थान: {panchang.city.hindiName} • सूर्योदय: {panchang.surya.sunrise} • सूर्यास्त: {panchang.surya.sunset}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setChoghadiyaTab("day")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                choghadiyaTab === "day"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600"
              }`}
            >
              दिन चौघड़िया (Day)
            </button>
            <button
              onClick={() => setChoghadiyaTab("night")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                choghadiyaTab === "night"
                  ? "bg-indigo-900 text-white shadow-xs"
                  : "bg-neutral-100 text-neutral-600"
              }`}
            >
              रात चौघड़िया (Night)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF7F2] text-neutral-500 font-bold uppercase tracking-wider border-b border-orange-100">
              <tr>
                <th className="py-3.5 px-6">समय (Time Window)</th>
                <th className="py-3.5 px-4">चौघड़िया नाम</th>
                <th className="py-3.5 px-4">प्रकृति</th>
                <th className="py-3.5 px-4">ग्रह स्वामी</th>
                <th className="py-3.5 px-6">मंदिर व पूजा निर्देश</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100/60 font-medium">
              {(choghadiyaTab === "day"
                ? panchang.choghadiya.daySlots
                : panchang.choghadiya.nightSlots
              ).map((slot, index) => {
                const isGood = slot.nature === "AUSPICIOUS";
                const isMid = slot.nature === "NEUTRAL";

                return (
                  <tr
                    key={index}
                    className={`transition-colors ${
                      slot.isCurrent ? "bg-amber-100/60 font-bold" : "hover:bg-orange-50/30"
                    }`}
                  >
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2">
                        {slot.isCurrent && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        )}
                        <span className="font-mono font-bold text-neutral-900">
                          {slot.startTime} - {slot.endTime}
                        </span>
                        {slot.isCurrent && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.2 rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-serif font-black text-sm">
                      {slot.hindiName} ({slot.name})
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          isGood
                            ? "bg-emerald-100 text-emerald-800"
                            : isMid
                            ? "bg-amber-100 text-amber-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isGood ? "शुभ फलदायी" : isMid ? "सामान्य / चल" : "अशुभ / वर्जित"}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-600">{slot.planet}</td>

                    <td className="py-3.5 px-6 text-neutral-700">
                      {slot.bestFor}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Active Devotee Sankalp Queue to perform during today's auspicious Muhurat */}
      <div className="bg-white rounded-3xl border border-orange-100 shadow-xs p-6">
        <div className="flex items-center justify-between pb-4 border-b border-orange-100">
          <div>
            <h3 className="font-serif font-black text-lg text-neutral-900 flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-600" />
              <span>आज के शुभ मुहूर्त में संपन्न होने वाले संकल्प (Pending Sankalps)</span>
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              अभिजीत व अमृत काल में इन भक्तों के नाम-गोत्र संकल्प का वीडियो रिकॉर्ड करें
            </p>
          </div>
          <Link
            href="/admin/bookings"
            className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            <span>सभी बुकिंग्स देखें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="divide-y divide-orange-100/60 mt-2">
          {bookings.slice(0, 3).map((b) => (
            <div key={b.bookingId} className="py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center shrink-0">
                  {b.primaryName.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-neutral-900 text-xs sm:text-sm">
                    {b.primaryName} • <span className="font-normal text-neutral-500">गोत्र: {b.gotra}</span>
                  </div>
                  <div className="text-[11px] text-neutral-500">{b.pujaTitle}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/media?bookingId=${b.bookingId}`}
                  className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Upload Proof</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
