"use client";

import React, { useState, useEffect } from "react";
import {
  Package,
  Truck,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Send,
  ExternalLink,
  Phone,
  AlertCircle
} from "lucide-react";
import { AdminBooking } from "@/utils/adminStore";

export default function AdminPrasadPage() {
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  // Dispatch Modal
  const [dispatchBooking, setDispatchBooking] = useState<AdminBooking | null>(null);
  const [courier, setCourier] = useState("India Post Speed Post");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/bookings");
      const data = await res.json();
      if (data.success && data.data) {
        // Filter those who opted for Prasad delivery
        const prasadBookings = data.data.filter(
          (b: AdminBooking) => b.includePrasadDelivery
        );
        setBookings(prasadBookings);
      }
    } catch (err) {
      console.error("Error loading prasad bookings:", err);
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

  const handleOpenDispatchModal = (b: AdminBooking) => {
    setDispatchBooking(b);
    setCourier(b.prasadTracking?.courier || "India Post Speed Post");
    setTrackingNumber(b.prasadTracking?.trackingNumber || "EW" + Math.floor(100000000 + Math.random() * 900000000) + "IN");
  };

  const handleSaveDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchBooking) return;

    if (!trackingNumber.trim()) {
      alert("Please provide courier tracking / AWB number.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/v1/admin/bookings/${dispatchBooking.bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "UPDATE_PRASAD",
          courier,
          trackingNumber,
          deliveryStatus: "DISPATCHED",
        }),
      });

      const data = await res.json();
      if (data.success) {
        showNotification(
          `🚚 Prasad parcel for ${dispatchBooking.primaryName} marked as DISPATCHED!`
        );
        setDispatchBooking(null);
        loadBookings();
      } else {
        alert(data.message || "Failed to update prasad dispatch");
      }
    } catch (err) {
      alert("Error: " + String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = bookings.filter((b) => {
    return (
      b.primaryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.shippingAddress?.city || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (b.shippingAddress?.pincode || "").includes(searchQuery)
    );
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

      {/* Header */}
      <div className="bg-white p-5 md:p-6 rounded-3xl border border-orange-100/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-black text-xl text-neutral-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-600" />
            <span>Consecrated Prasad Parcel Dispatch (प्रसाद वितरण)</span>
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Dispatch holy teerth bhasma, belpatra, and consecrated dry fruits via India Post & Delhivery.
          </p>
        </div>

        <div className="px-4 py-2 bg-orange-50 border border-orange-200 rounded-2xl text-xs font-bold text-orange-800">
          📦 {bookings.length} Total Devotee Prasad Parcels
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by devotee name, city, pincode, or booking ID..."
          className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200/90 text-xs focus:outline-hidden focus:border-orange-500 font-medium"
        />
      </div>

      {/* Prasad Parcels Grid */}
      {loading ? (
        <div className="p-16 text-center text-neutral-400">
          <div className="w-8 h-8 mx-auto border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-semibold">Loading prasad parcels...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-orange-100">
          <Package className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
          <h4 className="font-serif font-bold text-neutral-800 text-base">
            No Prasad Deliveries Found
          </h4>
          <p className="text-xs text-neutral-500 mt-1">
            Bookings that opt for physical Prasad home delivery will appear here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((b) => {
            const isDispatched =
              b.prasadTracking?.deliveryStatus === "DISPATCHED" ||
              b.prasadTracking?.deliveryStatus === "DELIVERED";

            return (
              <div
                key={b.bookingId}
                className="bg-white rounded-3xl p-5 md:p-6 border border-orange-100/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                    <span className="font-mono text-xs font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded">
                      {b.bookingId}
                    </span>

                    {isDispatched ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Dispatched
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Packing in Mandir
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className="font-serif font-bold text-base text-neutral-900">
                      {b.primaryName}
                    </div>
                    <div className="text-neutral-500 font-medium">{b.pujaTitle}</div>

                    {/* Shipping Address Box */}
                    <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-orange-100/80 space-y-1 mt-2">
                      <div className="flex items-center gap-1 text-orange-700 font-bold text-[11px]">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Delivery Address:</span>
                      </div>
                      <div className="text-neutral-700 font-medium leading-relaxed">
                        {b.shippingAddress ? (
                          <>
                            {b.shippingAddress.addressLine}, {b.shippingAddress.city},{" "}
                            {b.shippingAddress.state} –{" "}
                            <span className="font-bold">{b.shippingAddress.pincode}</span>
                          </>
                        ) : (
                          "Address specified by devotee on file"
                        )}
                      </div>
                      <div className="text-neutral-500 text-[11px]">
                        Contact: {b.whatsappNumber}
                      </div>
                    </div>

                    {/* Tracking Info if already dispatched */}
                    {isDispatched && b.prasadTracking && (
                      <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-200 text-xs space-y-1 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-900">
                            {b.prasadTracking.courier}
                          </span>
                          <span className="font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                            AWB: {b.prasadTracking.trackingNumber}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-orange-100 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400">
                    Sankalp Date: {b.sankalpDate}
                  </span>

                  <button
                    onClick={() => handleOpenDispatchModal(b)}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center gap-1.5 transition-all"
                  >
                    <Truck className="w-3.5 h-3.5" />
                    <span>{isDispatched ? "Update Tracking" : "Mark Dispatched"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Dispatch Parcel Modal */}
      {dispatchBooking && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-7 shadow-2xl border border-orange-100 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-orange-100">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚚</span>
                <h3 className="font-serif font-bold text-base text-neutral-900">
                  Prasad Dispatch Details
                </h3>
              </div>
              <button
                onClick={() => setDispatchBooking(null)}
                className="text-neutral-400 hover:text-neutral-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-orange-50/70 p-3 rounded-2xl space-y-1">
              <div className="font-bold text-neutral-800">
                {dispatchBooking.primaryName} ({dispatchBooking.bookingId})
              </div>
              <div className="text-[11px] text-neutral-600">
                {dispatchBooking.shippingAddress?.city}, {dispatchBooking.shippingAddress?.pincode}
              </div>
            </div>

            <form onSubmit={handleSaveDispatch} className="space-y-3">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Courier Service Partner
                </label>
                <select
                  value={courier}
                  onChange={(e) => setCourier(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white font-medium"
                >
                  <option value="India Post Speed Post">India Post Speed Post</option>
                  <option value="Delhivery Surface">Delhivery Surface Express</option>
                  <option value="Blue Dart Express">Blue Dart Express</option>
                  <option value="DTDC Air Courier">DTDC Air Courier</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">
                  Tracking / Consignment AWB Number *
                </label>
                <input
                  type="text"
                  required
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="e.g. EW982183921IN"
                  className="w-full p-2.5 rounded-xl border border-neutral-200 font-mono font-bold text-neutral-900"
                />
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setDispatchBooking(null)}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 font-bold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-md shadow-orange-600/20 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : "Confirm Dispatch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
