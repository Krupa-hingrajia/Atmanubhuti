"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Video,
  Headphones,
  Upload,
  CheckCircle2,
  Sparkles,
  Phone,
  Send,
  ExternalLink,
  Play,
  FileText,
  Clock,
  User,
  Image as ImageIcon,
  AlertCircle
} from "lucide-react";
import { AdminBooking } from "@/utils/adminStore";

function AdminMediaContent() {
  const searchParams = useSearchParams();
  const preselectedBookingId = searchParams.get("bookingId");

  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<AdminBooking | null>(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  // Fulfillment Form
  const [videoUrl, setVideoUrl] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [blessingsNote, setBlessingsNote] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/bookings");
      const data = await res.json();
      if (data.success && data.data) {
        setBookings(data.data);
        if (preselectedBookingId) {
          const match = data.data.find(
            (b: AdminBooking) =>
              b.bookingId.toLowerCase() === preselectedBookingId.toLowerCase()
          );
          if (match) {
            handleSelectBooking(match);
          } else if (data.data.length > 0) {
            handleSelectBooking(data.data[0]);
          }
        } else if (data.data.length > 0) {
          handleSelectBooking(data.data[0]);
        }
      }
    } catch (err) {
      console.error("Error loading bookings for media:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, [preselectedBookingId]);

  const handleSelectBooking = (booking: AdminBooking) => {
    setSelectedBooking(booking);
    setVideoUrl(
      booking.mediaProof?.videoUrl ||
        "https://www.youtube.com/watch?v=kYJvB0K97a4"
    );
    setAudioUrl(
      booking.mediaProof?.audioUrl ||
        "https://atmanubhuti.in/audio/sankalp-kashi.mp3"
    );
    setBlessingsNote(
      booking.mediaProof?.blessingsNote ||
        `Pranam ${booking.primaryName} ji! Aapka ${booking.pujaTitle} ka pavitra sankalp evam hawan mandir me Panditji dwara purna kiya gaya hai. Shani dosh mukti aur arogya ka aashirvaad prapt ho.`
    );
    setPhotoUrl(
      booking.mediaProof?.photos?.[0] ||
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80"
    );
  };

  const handleDispatchProof = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    if (!videoUrl.trim()) {
      alert("Please provide at least a video URL link for the devotee.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/admin/bookings/${selectedBooking.bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPLOAD_MEDIA",
          videoUrl,
          audioUrl,
          photos: photoUrl ? [photoUrl] : [],
          blessingsNote,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setNotification(
          `🎉 Holy Video & Audio Proof dispatched to ${selectedBooking.primaryName} (${selectedBooking.bookingId})!`
        );
        loadBookings();
      } else {
        alert(data.message || "Failed to dispatch media proof");
      }
    } catch (err) {
      alert("Error uploading media proof: " + String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-neutral-900 text-amber-300 px-5 py-3.5 rounded-2xl shadow-2xl border border-amber-500/40 flex items-center gap-3 animate-fade-in text-xs font-bold">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-orange-100/80 shadow-xs">
        <h3 className="font-serif font-black text-xl text-neutral-900 flex items-center gap-2">
          <Video className="w-5 h-5 text-orange-600" />
          <span>Video & Audio Proof Fulfillment Station (पूजा प्रमाण प्रेषण)</span>
        </h3>
        <p className="text-xs text-neutral-500 mt-1">
          Upload or link recorded Sankalp video, chanting audio, and send personalized WhatsApp updates to devotees.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Bookings Queue List (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-orange-100/80 shadow-xs p-4 flex flex-col h-[750px]">
          <div className="pb-3 border-b border-orange-100 flex items-center justify-between">
            <h4 className="font-serif font-bold text-sm text-neutral-900">
              Select Devotee Booking
            </h4>
            <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
              {bookings.length} Available
            </span>
          </div>

          <div className="overflow-y-auto py-3 space-y-2.5 flex-1 pr-1">
            {loading ? (
              <div className="p-8 text-center text-neutral-400 text-xs">
                Loading queue...
              </div>
            ) : bookings.length === 0 ? (
              <div className="p-8 text-center text-neutral-400 text-xs">
                No bookings found.
              </div>
            ) : (
              bookings.map((b) => {
                const isSelected = selectedBooking?.bookingId === b.bookingId;
                const hasMedia = b.status === "MEDIA_SENT" || b.status === "COMPLETED";

                return (
                  <button
                    key={b.bookingId}
                    type="button"
                    onClick={() => handleSelectBooking(b)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all border ${
                      isSelected
                        ? "bg-orange-50 border-orange-300 shadow-xs"
                        : "bg-white hover:bg-neutral-50 border-neutral-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded">
                        {b.bookingId}
                      </span>
                      {hasMedia ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3" />
                          Pending Proof
                        </span>
                      )}
                    </div>

                    <div className="font-bold text-neutral-900 text-xs mt-1.5 truncate">
                      {b.primaryName} ({b.gotra})
                    </div>
                    <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                      {b.pujaTitle}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Fulfillment Form & Live WhatsApp Preview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {selectedBooking ? (
            <div className="bg-white rounded-3xl border border-orange-100/80 shadow-xs p-6 space-y-6">
              {/* Selected Booking Summary */}
              <div className="bg-gradient-to-r from-orange-50 to-amber-50/50 p-4 rounded-2xl border border-orange-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-orange-800 bg-orange-200/80 px-2 py-0.5 rounded">
                      {selectedBooking.bookingId}
                    </span>
                    <span className="font-bold text-neutral-900 text-sm">
                      {selectedBooking.primaryName}
                    </span>
                    <span className="text-neutral-500">• {selectedBooking.gotra} Gotra</span>
                  </div>
                  <div className="text-neutral-600 mt-1">
                    {selectedBooking.pujaTitle} ({selectedBooking.packageName})
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-neutral-400 block text-[10px]">WhatsApp:</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    {selectedBooking.whatsappNumber}
                  </span>
                </div>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleDispatchProof} className="space-y-4 text-xs">
                {/* Video Link Input */}
                <div>
                  <label className="block font-bold text-neutral-800 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Video className="w-4 h-4 text-orange-600" />
                      Pooja & Sankalp Video Link (YouTube / Drive / MP4) *
                    </span>
                    <span className="text-[11px] text-neutral-400 font-normal">
                      Unlisted YouTube, Cloudinary, AWS S3, or Google Drive link
                    </span>
                  </label>
                  <input
                    type="url"
                    required
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=... or https://storage...mp4"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                {/* Audio Recording Link */}
                <div>
                  <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-orange-600" />
                    Sankalp Audio Recording Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={audioUrl}
                    onChange={(e) => setAudioUrl(e.target.value)}
                    placeholder="https://atmanubhuti.in/audio/sankalp-recording.mp3"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                {/* Darshan Photo */}
                <div>
                  <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-orange-600" />
                    Live Mandir Darshan Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                {/* Blessings Note */}
                <div>
                  <label className="block font-bold text-neutral-800 mb-1 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-orange-600" />
                    Panditji Blessings & Ritual Description (Devotee Message)
                  </label>
                  <textarea
                    rows={3}
                    value={blessingsNote}
                    onChange={(e) => setBlessingsNote(e.target.value)}
                    placeholder="Personalized blessings message that will be shown to the devotee..."
                    className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden leading-relaxed"
                  />
                </div>

                {/* WhatsApp Message Simulation Preview */}
                <div className="bg-[#EFEAE2] p-4 rounded-2xl border border-emerald-300/60 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900 border-b border-emerald-600/20 pb-1.5">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-700" />
                      Automated WhatsApp Devotee Preview
                    </span>
                    <span className="font-mono text-emerald-800">
                      To: {selectedBooking.whatsappNumber}
                    </span>
                  </div>

                  <div className="bg-white rounded-xl p-3 text-neutral-800 text-xs shadow-xs space-y-2 font-sans border-l-4 border-emerald-500 max-w-lg">
                    <p className="font-bold text-neutral-900">
                      ॥ ॐ नमः शिवाय ॥
                    </p>
                    <p>
                      प्रणाम <strong>{selectedBooking.primaryName} जी</strong>! 🙏
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      आपके व आपके परिवार ({selectedBooking.gotra} गोत्र) के नाम से <strong>{selectedBooking.pujaTitle}</strong> का पवित्र वैदिक संकल्प मन्दिर में पूर्ण कर लिया गया है।
                    </p>
                    <p className="text-neutral-600 leading-relaxed">
                      {blessingsNote}
                    </p>
                    <div className="bg-orange-50 p-2.5 rounded-lg border border-orange-200 text-xs">
                      <span className="font-bold text-orange-800 block">🎥 पूजा वीडियो व संकल्प रिकॉर्डिंग:</span>
                      <a
                        href={videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline font-mono break-all text-[11px]"
                      >
                        {videoUrl || "https://atmanubhuti.in/watch/ATMA-..."}
                      </a>
                    </div>
                    <p className="text-[10px] text-neutral-400 italic">
                      श्री आत्मानुभूति मन्दिर सेवा • जय श्री महाकाल 🪔
                    </p>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:opacity-95 text-white font-bold text-xs shadow-md shadow-orange-600/25 flex items-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmitting
                        ? "Dispatching..."
                        : "Send Holy Video & Proof to Devotee"}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-orange-100">
              <AlertCircle className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
              <p className="text-sm font-bold text-neutral-700">No Booking Selected</p>
              <p className="text-xs text-neutral-400 mt-1">
                Select a devotee booking from the left list to upload video proof.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AdminMediaPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs">Loading media fulfillment...</div>}>
      <AdminMediaContent />
    </Suspense>
  );
}
