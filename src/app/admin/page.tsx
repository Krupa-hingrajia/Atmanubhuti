"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  TrendingUp,
  Users,
  Clock,
  Video,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flame,
  Phone,
  Sparkles,
  ExternalLink,
  PlusCircle,
  FileText,
  Calendar,
  Eye,
  Check,
  Send,
  UserCheck,
  Package
} from "lucide-react";
import { AdminBooking } from "@/utils/adminStore";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalRevenue: 5452,
    totalBookings: 4,
    pendingCount: 1,
    acceptedCount: 1,
    mediaSentCount: 1,
    prasadPendingCount: 2,
    totalPujas: 6,
  });

  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ALL" | "PENDING" | "ACCEPTED" | "MEDIA_SENT">("ALL");
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  // Quick Pandit Assignment Modal state
  const [assignModalBooking, setAssignModalBooking] = useState<AdminBooking | null>(null);
  const [selectedPandit, setSelectedPandit] = useState("Pt. Radheshyam Shastri (Varanasi)");
  const [panditPhone, setPanditPhone] = useState("+91 94250 11223");

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, bookingsRes] = await Promise.all([
        fetch("/api/v1/admin/stats"),
        fetch("/api/v1/bookings"),
      ]);

      const statsData = await statsRes.json();
      const bookingsData = await bookingsRes.json();

      if (statsData.success) {
        setStats(statsData.data);
      }
      if (bookingsData.success) {
        setBookings(bookingsData.data);
      }
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 4500);
  };

  const handleAcceptBooking = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/v1/admin/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ACCEPT" }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`✅ Booking ${bookingId} Accepted! Devotee notified.`);
        loadData();
      }
    } catch (err) {
      alert("Error accepting booking: " + String(err));
    }
  };

  const handleConfirmPanditAssignment = async () => {
    if (!assignModalBooking) return;
    try {
      const res = await fetch(`/api/v1/admin/bookings/${assignModalBooking.bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ASSIGN_PANDIT",
          name: selectedPandit,
          phone: panditPhone,
          title: "Chief Purohit",
        }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`🪔 Pandit ${selectedPandit} assigned to ${assignModalBooking.bookingId}!`);
        setAssignModalBooking(null);
        loadData();
      }
    } catch (err) {
      alert("Error assigning Pandit: " + String(err));
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "ALL") return true;
    if (activeTab === "PENDING") return b.status === "PENDING";
    if (activeTab === "ACCEPTED") return b.status === "ACCEPTED" || b.status === "PANDIT_ASSIGNED";
    if (activeTab === "MEDIA_SENT") return b.status === "MEDIA_SENT" || b.status === "COMPLETED";
    return true;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Toast alert */}
      {actionSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-fade-in text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{actionSuccessMessage}</span>
        </div>
      )}

      {/* Top Banner Alert if Pending Bookings Exist */}
      {stats.pendingCount > 0 && (
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-5 md:p-6 text-white shadow-xl shadow-orange-500/15 border border-amber-300/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl border border-white/30 shrink-0">
              🔔
            </div>
            <div>
              <h3 className="font-serif font-black text-lg md:text-xl text-white">
                {stats.pendingCount} New Sankalp Booking Waiting For Acceptance!
              </h3>
              <p className="text-xs text-amber-100">
                Devotees have made payments and submitted Gotra details. Accept & assign Vedic Purohit now.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab("PENDING")}
            className="px-5 py-2.5 rounded-xl bg-white text-orange-700 text-xs font-bold hover:bg-orange-50 shadow-md transition-all shrink-0 hover:scale-105"
          >
            Review Pending ({stats.pendingCount})
          </button>
        </div>
      )}

      {/* Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Total Dakshina */}
        <div className="bg-white rounded-3xl p-5 border border-orange-100/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-orange-100/50 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Total Dakshina
            </span>
            <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
              ₹
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-serif font-black text-neutral-900">
              ₹{stats.totalRevenue.toLocaleString("en-IN")}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 100% Verified Online Collections
          </p>
        </div>

        {/* Total Bookings */}
        <div className="bg-white rounded-3xl p-5 border border-orange-100/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Sankalp Bookings
            </span>
            <span className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-serif font-black text-neutral-900">
              {stats.totalBookings}
            </span>
            <span className="text-xs text-neutral-400 font-medium">Devotees</span>
          </div>
          <p className="mt-1 text-[11px] text-neutral-500">
            Across 12 sacred Jyotirlingas & Peeths
          </p>
        </div>

        {/* Pending Approvals */}
        <div
          onClick={() => setActiveTab("PENDING")}
          className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Pending Approvals
            </span>
            <span
              className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                stats.pendingCount > 0
                  ? "bg-amber-500 text-white animate-pulse"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-2xl md:text-3xl font-serif font-black ${
                stats.pendingCount > 0 ? "text-amber-600" : "text-neutral-900"
              }`}
            >
              {stats.pendingCount}
            </span>
            <span className="text-xs text-amber-700 font-semibold">Needs Action</span>
          </div>
          <p className="mt-1 text-[11px] text-amber-600/80 font-medium">
            Click to review and accept
          </p>
        </div>

        {/* Video Proofs Delivered */}
        <div className="bg-white rounded-3xl p-5 border border-orange-100/80 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              Video Proofs Sent
            </span>
            <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Video className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-serif font-black text-emerald-700">
              {stats.mediaSentCount}
            </span>
            <span className="text-xs text-neutral-400">Delivered</span>
          </div>
          <p className="mt-1 text-[11px] text-emerald-600 font-medium">
            Direct to Devotee WhatsApp
          </p>
        </div>
      </div>

      {/* Main Operations Section: Live Bookings Pipeline */}
      <div className="bg-white rounded-3xl border border-orange-100/80 shadow-xs overflow-hidden">
        {/* Table Header Bar */}
        <div className="p-6 border-b border-orange-100 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-orange-50/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="font-serif font-black text-lg text-neutral-900">
                Live Devotee Bookings & Sankalps (संकल्प सूची)
              </h3>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Review new bookings, accept sankalp, assign priests, and track video dispatch.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-orange-100/60 p-1.5 rounded-2xl text-xs font-bold text-neutral-600">
            <button
              onClick={() => setActiveTab("ALL")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "ALL"
                  ? "bg-white text-orange-700 shadow-xs"
                  : "hover:text-neutral-900"
              }`}
            >
              All ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab("PENDING")}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
                activeTab === "PENDING"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-amber-800 hover:text-amber-900"
              }`}
            >
              Pending ({stats.pendingCount})
            </button>
            <button
              onClick={() => setActiveTab("ACCEPTED")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "ACCEPTED"
                  ? "bg-white text-orange-700 shadow-xs"
                  : "hover:text-neutral-900"
              }`}
            >
              Accepted ({stats.acceptedCount})
            </button>
            <button
              onClick={() => setActiveTab("MEDIA_SENT")}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                activeTab === "MEDIA_SENT"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "hover:text-neutral-900"
              }`}
            >
              Video Proof Sent ({stats.mediaSentCount})
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-neutral-400">
              <div className="w-8 h-8 mx-auto border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold">Loading live bookings...</p>
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-neutral-400">
              <Calendar className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
              <p className="text-sm font-bold text-neutral-700">No bookings in this tab</p>
              <p className="text-xs text-neutral-400 mt-1">
                New customer bookings will automatically appear here.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF7F2] text-neutral-500 font-bold uppercase tracking-wider border-b border-orange-100">
                <tr>
                  <th className="py-3.5 px-6">Devotee & Gotra</th>
                  <th className="py-3.5 px-4">Pooja & Temple</th>
                  <th className="py-3.5 px-4">Dakshina & Pkg</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Vedic Purohit</th>
                  <th className="py-3.5 px-6 text-right">Instant Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100/60 font-medium">
                {filteredBookings.map((b) => (
                  <tr
                    key={b.bookingId}
                    className="hover:bg-orange-50/30 transition-colors"
                  >
                    {/* Devotee Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {b.primaryName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 text-sm">
                            {b.primaryName}
                          </div>
                          <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                            <span className="font-mono text-orange-700 bg-orange-100/80 px-1.5 py-0.2 rounded text-[10px]">
                              {b.bookingId}
                            </span>
                            <span>• Gotra: {b.gotra}</span>
                          </div>
                          {b.devotees.length > 1 && (
                            <span className="text-[10px] text-neutral-400">
                              +{b.devotees.length - 1} family members
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Puja Title */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="font-serif font-bold text-neutral-800 line-clamp-1">
                        {b.pujaTitle}
                      </div>
                      <div className="text-[11px] text-neutral-500 truncate">
                        {b.templeName}
                      </div>
                    </td>

                    {/* Amount & Package */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-neutral-900">
                        ₹{b.amount.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[11px] text-neutral-500">{b.packageName}</div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-4 px-4">
                      {b.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          <AlertCircle className="w-3 h-3 text-amber-600 animate-spin-slow" />
                          Pending Review
                        </span>
                      )}
                      {b.status === "ACCEPTED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                          Accepted / Pandit Assigned
                        </span>
                      )}
                      {b.status === "PUJA_PERFORMED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                          <Flame className="w-3 h-3 text-purple-600" />
                          Puja Completed
                        </span>
                      )}
                      {b.status === "MEDIA_SENT" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <Check className="w-3 h-3 text-emerald-600" />
                          Video Proof Sent
                        </span>
                      )}
                      {b.status === "COMPLETED" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" />
                          Completed
                        </span>
                      )}
                    </td>

                    {/* Assigned Pandit */}
                    <td className="py-4 px-4">
                      {b.assignedPandit ? (
                        <div>
                          <div className="font-semibold text-neutral-800">
                            {b.assignedPandit.name}
                          </div>
                          <div className="text-[10px] text-neutral-400">
                            {b.assignedPandit.title}
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setAssignModalBooking(b)}
                          className="text-[11px] font-bold text-amber-700 hover:text-amber-800 underline flex items-center gap-1"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Assign Pandit
                        </button>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* If Pending, Show Accept Button */}
                        {b.status === "PENDING" && (
                          <button
                            onClick={() => handleAcceptBooking(b.bookingId)}
                            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-xs shadow-xs hover:scale-105 transition-all flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Accept
                          </button>
                        )}

                        {/* Video Proof Dispatch Button */}
                        {b.status !== "MEDIA_SENT" && b.status !== "COMPLETED" && (
                          <Link
                            href={`/admin/media?bookingId=${b.bookingId}`}
                            className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold text-xs transition-colors flex items-center gap-1"
                          >
                            <Video className="w-3.5 h-3.5" />
                            Upload Proof
                          </Link>
                        )}

                        {b.status === "MEDIA_SENT" && b.mediaProof?.videoUrl && (
                          <a
                            href={b.mediaProof.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs transition-colors flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Watch Video
                          </a>
                        )}

                        {/* WhatsApp Contact Devotee */}
                        <a
                          href={`https://wa.me/${b.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Pranam ${b.primaryName} ji! Main Atmanubhuti Temple Operations se sampark kar raha hu. Aapka ${b.pujaTitle} ka sankalp mandir me sweekar kar liya gaya hai.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-xl bg-neutral-100 hover:bg-emerald-50 text-neutral-600 hover:text-emerald-700 transition-colors"
                          title="Message on WhatsApp"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#FAF7F2] border-t border-orange-100 flex items-center justify-between text-xs text-neutral-500">
          <span>Showing {filteredBookings.length} devotee bookings</span>
          <Link
            href="/admin/bookings"
            className="font-bold text-orange-600 hover:underline flex items-center gap-1"
          >
            Go to Full Bookings Manager <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Create Puja card */}
        <Link
          href="/admin/pujas"
          className="bg-gradient-to-br from-[#201815] to-[#2D211C] text-white rounded-3xl p-6 border border-amber-500/20 shadow-md hover:border-amber-500/50 transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-black text-lg text-amber-200">
              Pooja & Price Setup
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Add upcoming festival pujas (Diwali, Chhath, Pradosh), set package prices (₹501, ₹1100, ₹2100) and publish live.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
            <span>Manage Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Video proof station */}
        <Link
          href="/admin/media"
          className="bg-white rounded-3xl p-6 border border-orange-100/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-black text-lg text-neutral-900">
              Video & Audio Dispatch Station
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Upload video recording links, personalized audio sankalps, and dispatch automatically to customer WhatsApp.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
            <span>Open Media Station</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>

        {/* Prasad dispatch */}
        <Link
          href="/admin/prasad"
          className="bg-white rounded-3xl p-6 border border-orange-100/80 shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-black text-lg text-neutral-900">
              Consecrated Prasad Dispatch
            </h4>
            <p className="text-xs text-neutral-500 mt-1">
              Manage physical parcel delivery via India Post & Delhivery. Enter tracking numbers for devotees.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
            <span>Dispatch Parcels ({stats.prasadPendingCount})</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </Link>
      </div>

      {/* Pandit Assignment Modal */}
      {assignModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-orange-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-orange-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🪔</span>
                <h3 className="font-serif font-bold text-base text-neutral-900">
                  Assign Vedic Panditji
                </h3>
              </div>
              <button
                onClick={() => setAssignModalBooking(null)}
                className="text-neutral-400 hover:text-neutral-700 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="bg-orange-50/70 p-3.5 rounded-2xl text-xs space-y-1">
              <div className="font-bold text-neutral-800">
                {assignModalBooking.pujaTitle}
              </div>
              <div className="text-neutral-500">
                Devotee: <span className="font-semibold text-neutral-800">{assignModalBooking.primaryName}</span> ({assignModalBooking.gotra} Gotra)
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Select Acharya / Panditji
                </label>
                <select
                  value={selectedPandit}
                  onChange={(e) => setSelectedPandit(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white focus:outline-hidden focus:border-orange-500 font-medium"
                >
                  <option value="Pt. Radheshyam Shastri (Varanasi)">
                    Pt. Radheshyam Shastri (Kashi Vishwanath, 22 yrs exp)
                  </option>
                  <option value="Pt. Bhaskaracharya Goswami (Guwahati)">
                    Pt. Bhaskaracharya Goswami (Kamakhya Peeth, 18 yrs exp)
                  </option>
                  <option value="Pt. Girish Chand Semwal (Uttarakhand)">
                    Pt. Girish Chand Semwal (Triyuginarayan, 15 yrs exp)
                  </option>
                  <option value="Pt. Rameshwar Dixit (Ujjain)">
                    Pt. Rameshwar Dixit (Mahakaleshwar, 25 yrs exp)
                  </option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Panditji WhatsApp Contact
                </label>
                <input
                  type="text"
                  value={panditPhone}
                  onChange={(e) => setPanditPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 focus:outline-hidden focus:border-orange-500 font-medium"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setAssignModalBooking(null)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmPanditAssignment}
                className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-600/20"
              >
                Confirm & Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
