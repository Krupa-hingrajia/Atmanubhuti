"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CalendarDays,
  Video,
  MapPin,
  CheckCircle2,
  Package,
  Sparkles,
  Play,
  Headphones,
  Truck,
  ExternalLink,
  Clock,
  Flame,
  Award
} from "lucide-react";
import { AdminBooking } from "@/utils/adminStore";

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings?: any[];
}

export default function MyBookingsModal({
  isOpen,
  onClose,
  bookings: initialBookings = [],
}: MyBookingsModalProps) {
  const [liveBookings, setLiveBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string | null>(null);

  // Fetch updated live bookings whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      fetch("/api/v1/bookings")
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.data && data.data.length > 0) {
            setLiveBookings(data.data);
          } else if (initialBookings.length > 0) {
            setLiveBookings(initialBookings);
          }
        })
        .catch(() => {
          if (initialBookings.length > 0) {
            setLiveBookings(initialBookings);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, initialBookings]);

  if (!isOpen) return null;

  const displayBookings = liveBookings.length > 0 ? liveBookings : initialBookings;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-orange-100 p-6 sm:p-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-orange-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-black text-xl text-neutral-900">
                My Booked Pujas (मेरी पूजाएं)
              </h3>
              <p className="text-xs text-neutral-500">
                Live status, Panditji assignment, holy video recordings & prasad tracking
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="overflow-y-auto py-4 space-y-4 flex-1 pr-1 text-xs">
          {loading ? (
            <div className="text-center py-12 space-y-2">
              <div className="w-7 h-7 mx-auto border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-neutral-500">Loading your sacred bookings...</p>
            </div>
          ) : displayBookings.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-orange-50 text-orange-400 flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-neutral-800 text-base">
                No Bookings Yet
              </h4>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                You haven't participated in any pujas yet. Explore upcoming auspicious muhurats on the homepage.
              </p>
            </div>
          ) : (
            displayBookings.map((b: any, idx: number) => {
              const hasVideo = Boolean(b.mediaProof?.videoUrl);
              const isDispatched = b.prasadTracking?.deliveryStatus === "DISPATCHED";

              return (
                <div
                  key={idx}
                  className="bg-orange-50/50 rounded-2xl p-5 border border-orange-200/80 space-y-3 relative overflow-hidden"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-semibold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                        ID: {b.bookingId}
                      </span>
                      <h4 className="font-serif font-bold text-base text-neutral-900 mt-1">
                        {b.pujaTitle || b.packageName || "Special Vedic Puja"}
                      </h4>
                      <span className="text-xs text-neutral-500">
                        {b.templeName ? `${b.templeName} • ` : ""}Package: {b.packageName} • ₹{b.amount}
                      </span>
                    </div>

                    {/* Dynamic Status Pill */}
                    {b.status === "PENDING" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-300">
                        <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
                        Awaiting Admin Confirmation
                      </span>
                    )}
                    {b.status === "ACCEPTED" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-100 px-2.5 py-1 rounded-full border border-blue-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                        Pandit Assigned
                      </span>
                    )}
                    {b.status === "PUJA_PERFORMED" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-100 px-2.5 py-1 rounded-full border border-purple-300">
                        <Flame className="w-3.5 h-3.5 text-purple-600" />
                        Puja Completed
                      </span>
                    )}
                    {b.status === "MEDIA_SENT" && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 shadow-xs">
                        <Play className="w-3 h-3 text-emerald-600 fill-current" />
                        Video Proof Ready!
                      </span>
                    )}
                  </div>

                  {/* Devotee Info Box */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-neutral-600 bg-white p-3 rounded-xl border border-orange-100">
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Devotee:</span>
                      <span className="font-semibold text-neutral-800">
                        {b.primaryName || b.devotees?.[0]}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[10px]">Gotra:</span>
                      <span className="font-semibold text-neutral-800">{b.gotra}</span>
                    </div>
                  </div>

                  {/* Pandit Details if assigned */}
                  {b.assignedPandit && (
                    <div className="text-[11px] text-neutral-600 bg-amber-50/70 p-2.5 rounded-xl border border-amber-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span>🪔</span>
                        <span>Vedic Purohit: <strong>{b.assignedPandit.name}</strong></span>
                      </div>
                      <span className="text-[10px] text-amber-800 font-medium">{b.assignedPandit.title}</span>
                    </div>
                  )}

                  {/* Holy Video & Audio Section */}
                  {hasVideo ? (
                    <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-3.5 rounded-2xl border border-emerald-300 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                          <Video className="w-4 h-4 text-emerald-600" />
                          <span>Holy Puja Video Proof Delivered! (पूजा वीडियो उपलब्ध)</span>
                        </div>
                      </div>

                      {b.mediaProof?.blessingsNote && (
                        <p className="text-[11px] text-neutral-700 italic bg-white/80 p-2 rounded-xl">
                          "{b.mediaProof.blessingsNote}"
                        </p>
                      )}

                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <a
                          href={b.mediaProof.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 hover:scale-105 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Watch Holy Puja Video</span>
                        </a>

                        {b.mediaProof?.audioUrl && (
                          <a
                            href={b.mediaProof.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                          >
                            <Headphones className="w-3.5 h-3.5 text-neutral-500" />
                            <span>Listen Sankalp Chanting</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between pt-2 border-t border-orange-200/50 text-xs">
                      <div className="flex items-center gap-1.5 text-neutral-500">
                        <Video className="w-4 h-4 text-orange-600" />
                        <span>
                          {b.status === "PENDING"
                            ? "Video status: Scheduling with Mandir Panditji"
                            : "Video status: Puja scheduled, proof within 24-48 hrs via WhatsApp"}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Prasad Dispatch Box */}
                  {b.includePrasadDelivery && (
                    <div className="text-[11px] bg-white p-2.5 rounded-xl border border-orange-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-neutral-700">
                        <Truck className="w-3.5 h-3.5 text-orange-600" />
                        <span>Consecrated Teerth Prasad:</span>
                        <span className="font-bold">
                          {isDispatched
                            ? `Dispatched via ${b.prasadTracking?.courier}`
                            : "Being packed at Temple"}
                        </span>
                      </div>
                      {isDispatched && b.prasadTracking?.trackingNumber && (
                        <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          AWB: {b.prasadTracking.trackingNumber}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
