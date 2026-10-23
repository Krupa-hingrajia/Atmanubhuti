"use client";

import React, { useState, useEffect } from "react";
import { Flame, CheckCircle2, X } from "lucide-react";

export default function LiveDevoteeTicker() {
  const activities = [
    {
      name: "Smt. Sunita & Rajesh G.",
      city: "New Delhi",
      action: "booked",
      puja: "Shani Pradosh Rudrabhishek, Kashi",
      time: "2 mins ago",
      icon: "🪔"
    },
    {
      name: "Devotee Amit Varma",
      city: "Varanasi",
      action: "offered Chadhava at",
      puja: "Maa Kamakhya Shaktipeeth",
      time: "Just now",
      icon: "🚩"
    },
    {
      name: "Pooja & Family",
      city: "Pune",
      action: "booked Mahapuja for",
      puja: "Maha Lakshmi Kuber Vyapar Puja",
      time: "4 mins ago",
      icon: "🪙"
    },
    {
      name: "Dr. Anand Swaminathan",
      city: "Bengaluru",
      action: "ordered Temple Prasad from",
      puja: "Mahakaleshwar Bhasma Aarti",
      time: "7 mins ago",
      icon: "📦"
    },
    {
      name: "Vikram & Neha R.",
      city: "Ahmedabad",
      action: "participated in",
      puja: "Triyuginarayan Akhand Dhuni Seva",
      time: "11 mins ago",
      icon: "🌸"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      // Fade out
      setIsVisible(false);

      // Change content and fade in
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length);
        setIsVisible(true);
      }, 500);
    }, 7000);

    return () => clearInterval(interval);
  }, [activities.length, isDismissed]);

  if (isDismissed) return null;

  const current = activities[currentIndex];

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 transition-all duration-500 transform ${
        isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3.5 pr-8 border border-orange-200/90 shadow-spiritual flex items-center gap-3 relative max-w-sm sm:max-w-md group hover:border-orange-400 transition-colors">
        
        {/* Pulsing Diya / Icon */}
        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 text-lg shadow-xs animate-diya">
          {current.icon}
        </div>

        {/* Content */}
        <div className="text-xs">
          <div className="flex items-center gap-1.5 font-bold text-neutral-900">
            <span>{current.name}</span>
            <span className="text-[10px] font-normal text-neutral-500">({current.city})</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>

          <p className="text-[11px] text-neutral-600 line-clamp-1 mt-0.5">
            {current.action} <span className="font-semibold text-orange-700">{current.puja}</span>
          </p>

          <span className="text-[10px] text-neutral-400 font-medium block mt-0.5">
            {current.time} • 100% Video Proof
          </span>
        </div>

        {/* Close button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute top-2 right-2 p-1 text-neutral-300 hover:text-neutral-600 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
