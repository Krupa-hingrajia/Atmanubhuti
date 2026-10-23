"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Video,
  Package,
  Phone,
  Printer,
  FileText,
  User,
  Sparkles,
  AlertCircle,
  Eye,
  Check,
  Flame,
  ArrowRight,
  ExternalLink,
  MapPin,
  X
} from "lucide-react";
import { AdminBooking } from "@/utils/adminStore";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [notification, setNotification] = useState<string | null>(null);

  // Selected Booking Drawer for Details / Print Sankalp Patra
  const [activeBooking, setActiveBooking] = useState<AdminBooking | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/bookings");
      const data = await res.json();
      if (data.success && data.data) {
        setBookings(data.data);
      }
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleUpdateStatus = async (bookingId: string, action: string, extraBody = {}) => {
    try {
      const res = await fetch(`/api/v1/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...extraBody }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`✅ Action completed for ${bookingId}!`);
        loadBookings();
        if (activeBooking && activeBooking.bookingId === bookingId) {
          setActiveBooking(data.data);
        }
      }
    } catch (err) {
      alert("Failed to update status: " + String(err));
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.primaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.gotra.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.whatsappNumber.includes(searchQuery) ||
      b.pujaTitle.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" ? true : b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-fade-in text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header & Controls */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-orange-100/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-serif font-black text-xl text-neutral-900">
              Devotee Sankalps & Bookings Pipeline (संकल्प प्रबंधन)
            </h3>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Accept online bookings, print Sankalp sheets for Vedic priests, and manage the ritual lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (filteredBookings.length > 0) {
                setActiveBooking(filteredBookings[0]);
                setIsPrintModalOpen(true);
              } else {
                alert("No bookings available to print.");
              }
            }}
            className="px-4 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-4 h-4 text-neutral-500" />
            <span>Print Panditji Sheet</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by devotee name, booking ID (ATMA-...), Gotra, or phone..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200/90 text-xs focus:outline-hidden focus:border-orange-500 font-medium"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-1 bg-orange-100/60 p-1.5 rounded-2xl text-xs font-bold text-neutral-600 w-full md:w-auto">
          {[
            { id: "ALL", label: "All" },
            { id: "PENDING", label: "Pending Review" },
            { id: "ACCEPTED", label: "Accepted" },
            { id: "PUJA_PERFORMED", label: "Performed" },
            { id: "MEDIA_SENT", label: "Video Sent" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                statusFilter === tab.id
                  ? "bg-white text-orange-700 shadow-xs"
                  : "hover:text-neutral-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Card List */}
      {loading ? (
        <div className="p-16 text-center text-neutral-400">
          <div className="w-8 h-8 mx-auto border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-semibold">Loading bookings pipeline...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-orange-100">
          <CalendarCheck className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
          <h4 className="font-serif font-bold text-neutral-800 text-base">
            No Bookings Found
          </h4>
          <p className="text-xs text-neutral-500 mt-1">
            Devotees who book a puja on the website will instantly appear in this queue.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredBookings.map((b) => (
            <div
              key={b.bookingId}
              className="bg-white rounded-3xl p-5 md:p-6 border border-orange-100/80 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group"
            >
              {/* Left Column: Devotee & Sankalp details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-orange-800 bg-orange-100 px-2.5 py-0.5 rounded-lg">
                    {b.bookingId}
                  </span>

                  {/* Status Badges */}
                  {b.status === "PENDING" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                      <Clock className="w-3 h-3 text-amber-600 animate-spin-slow" />
                      Pending Admin Acceptance
                    </span>
                  )}
                  {b.status === "ACCEPTED" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-300">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      Accepted & Pandit Assigned
                    </span>
                  )}
                  {b.status === "PUJA_PERFORMED" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full border border-purple-300">
                      <Flame className="w-3 h-3 text-purple-600" />
                      Puja Performed in Mandir
                    </span>
                  )}
                  {b.status === "MEDIA_SENT" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      <Check className="w-3 h-3 text-emerald-600" />
                      Video Proof Dispatched to Devotee
                    </span>
                  )}
                  {b.status === "COMPLETED" && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Completed
                    </span>
                  )}

                  <span className="text-xs text-neutral-400">
                    • {new Date(b.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>

                {/* Puja Title & Temple */}
                <div>
                  <h4 className="font-serif font-black text-base text-neutral-900">
                    {b.pujaTitle}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-neutral-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>{b.templeName}</span>
                    <span>• {b.packageName} (₹{b.amount})</span>
                  </div>
                </div>

                {/* Devotee Names & Sankalp Wish Card */}
                <div className="bg-orange-50/40 rounded-2xl p-3 border border-orange-100 text-xs space-y-1.5">
                  <div className="flex flex-wrap items-center gap-3">
                    <div>
                      <span className="text-neutral-400 text-[11px]">Primary Devotee:</span>{" "}
                      <span className="font-bold text-neutral-800">{b.primaryName}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 text-[11px]">Gotra:</span>{" "}
                      <span className="font-bold text-neutral-800">{b.gotra}</span>
                    </div>
                    {b.rashi && (
                      <div>
                        <span className="text-neutral-400 text-[11px]">Rashi:</span>{" "}
                        <span className="font-bold text-neutral-800">{b.rashi}</span>
                      </div>
                    )}
                  </div>

                  {b.devotees.length > 1 && (
                    <div className="text-[11px] text-neutral-600">
                      <span className="text-neutral-400">All Family Devotees:</span>{" "}
                      <span className="font-medium">{b.devotees.join(", ")}</span>
                    </div>
                  )}

                  <div className="text-[11px] text-neutral-700 bg-white p-2 rounded-xl border border-orange-100/80">
                    <span className="font-bold text-orange-700">Sankalp Wish: </span>
                    <span className="italic font-serif">"{b.sankalpWish}"</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end justify-center gap-2 shrink-0 border-t lg:border-t-0 pt-3 lg:pt-0 border-orange-100">
                {/* Accept Button for Pending */}
                {b.status === "PENDING" && (
                  <button
                    onClick={() => handleUpdateStatus(b.bookingId, "ACCEPT")}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5 hover:scale-105 transition-all"
                  >
                    <Check className="w-4 h-4" />
                    <span>Accept Booking</span>
                  </button>
                )}

                {/* Mark Puja Performed */}
                {b.status === "ACCEPTED" && (
                  <button
                    onClick={() => handleUpdateStatus(b.bookingId, "UPDATE_STATUS", { status: "PUJA_PERFORMED" })}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/20 flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Mark Puja Performed</span>
                  </button>
                )}

                {/* Video Proof Dispatch Button */}
                <Link
                  href={`/admin/media?bookingId=${b.bookingId}`}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Video className="w-4 h-4" />
                  <span>
                    {b.status === "MEDIA_SENT" ? "Update Video Proof" : "Upload Video & Audio"}
                  </span>
                </Link>

                <div className="flex items-center gap-2">
                  {/* View Details / Printable slip */}
                  <button
                    onClick={() => {
                      setActiveBooking(b);
                      setIsPrintModalOpen(true);
                    }}
                    className="flex-1 lg:flex-none px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Sankalp Slip</span>
                  </button>

                  {/* WhatsApp devotee link */}
                  <a
                    href={`https://wa.me/${b.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Pranam ${b.primaryName} ji! Aapka ${b.pujaTitle} (Booking ID: ${b.bookingId}) ka sankalp swayam Panditji dwara purna hone ja raha hai.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors"
                    title="Send WhatsApp Update"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Printable Panditji Sankalp Patra Modal */}
      {isPrintModalOpen && activeBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-orange-200 max-h-[92vh] flex flex-col my-auto text-xs">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-orange-100 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📜</span>
                <div>
                  <h3 className="font-serif font-black text-lg text-neutral-900">
                    Vedic Sankalp Patra (वैदिक संकल्प पत्र)
                  </h3>
                  <p className="text-[11px] text-neutral-500">
                    Printable ritual slip for Temple Purohit chanting
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold flex items-center gap-1 shadow-xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Now
                </button>
                <button
                  onClick={() => setIsPrintModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sacred Printable Slip Content */}
            <div className="overflow-y-auto py-5 space-y-4">
              <div className="border-2 border-orange-300 rounded-3xl p-6 bg-[#FFFDF9] space-y-4 text-center relative overflow-hidden">
                <div className="text-2xl font-serif font-bold text-orange-700">
                  ॥ ॐ नमः शिवाय ॥
                </div>
                <div className="text-sm font-serif font-bold text-neutral-900 uppercase tracking-widest border-b border-orange-200 pb-2">
                  श्री आत्मानुभूति तीर्थ सेवा संकल्प
                </div>

                <div className="grid grid-cols-2 gap-4 text-left bg-orange-50/50 p-4 rounded-2xl border border-orange-100 text-xs">
                  <div>
                    <span className="text-neutral-500 block text-[11px]">संकल्प संदर्भ (ID):</span>
                    <span className="font-mono font-bold text-neutral-900 text-sm">
                      {activeBooking.bookingId}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">तीर्थ क्षेत्र / मन्दिर:</span>
                    <span className="font-bold text-neutral-900">
                      {activeBooking.templeName}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">अनुष्ठान / पूजा:</span>
                    <span className="font-bold text-neutral-900">
                      {activeBooking.pujaTitle}
                    </span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[11px]">तिथि / मुहूर्त:</span>
                    <span className="font-bold text-neutral-900">
                      {activeBooking.sankalpDate}
                    </span>
                  </div>
                </div>

                {/* Devotees List */}
                <div className="text-left space-y-2 bg-white p-4 rounded-2xl border border-orange-100">
                  <div className="text-xs font-bold text-orange-800 uppercase tracking-wider">
                    यजमान एवं परिवार नाम विवरण:
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">मुख्य यजमान:</span>
                      <span className="font-bold text-base text-neutral-900">
                        {activeBooking.primaryName}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">गोत्र:</span>
                      <span className="font-bold text-base text-neutral-900">
                        {activeBooking.gotra}
                      </span>
                    </div>
                  </div>

                  {activeBooking.devotees.length > 1 && (
                    <div className="pt-2 border-t border-neutral-100">
                      <span className="text-neutral-400 block text-[10px]">समस्त परिवार सदस्य:</span>
                      <span className="font-semibold text-neutral-800">
                        {activeBooking.devotees.join(" • ")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Sankalp Prayer */}
                <div className="text-left bg-orange-50/70 p-4 rounded-2xl border border-orange-200">
                  <span className="text-orange-800 font-bold block text-xs mb-1">
                    यजमान की मनोकामना व प्रार्थना (Sankalp Wish):
                  </span>
                  <p className="font-serif italic text-neutral-800 text-sm leading-relaxed">
                    "{activeBooking.sankalpWish}"
                  </p>
                </div>

                <div className="text-[11px] text-neutral-400 italic pt-2">
                  पंडितजी द्वारा वेद मन्त्रोच्चारण के साथ यह संकल्प मन्दिर गर्भगृह में लिया जाना है।
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
