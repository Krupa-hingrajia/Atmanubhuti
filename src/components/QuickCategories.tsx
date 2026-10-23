"use client";

import React from "react";
import { Flame, Sparkles, ShoppingBag, Compass, ShieldAlert, Award } from "lucide-react";

interface QuickCategoriesProps {
  onCategorySelect?: (category: string) => void;
}

export default function QuickCategories({ onCategorySelect }: QuickCategoriesProps) {
  const categories = [
    {
      id: "puja",
      title: "Book a Puja",
      subTitle: "Vedic rituals & Hawan with Gotra Sankalp",
      icon: Flame,
      color: "from-orange-500 to-amber-600",
      bgLight: "bg-orange-50/80",
      border: "border-orange-200/70",
      tag: "50+ Pujas",
      tagColor: "bg-orange-600",
      count: "100% Video Proof"
    },
    {
      id: "chadhava",
      title: "Offer Chadhava",
      subTitle: "Chunri, Coconut & Flowers at Siddhapeeths",
      icon: Sparkles,
      color: "from-amber-500 to-yellow-600",
      bgLight: "bg-amber-50/80",
      border: "border-amber-200/70",
      tag: "Sacred Seva",
      tagColor: "bg-amber-600",
      count: "From ₹251"
    },
    {
      id: "prasad",
      title: "Prasad Seva",
      subTitle: "Consecrated Temple Prasad delivered home",
      icon: ShoppingBag,
      color: "from-rose-500 to-orange-600",
      bgLight: "bg-rose-50/80",
      border: "border-rose-200/70",
      tag: "Free Shipping",
      tagColor: "bg-rose-600",
      count: "Speed Post"
    },
    {
      id: "astrologer",
      title: "Vedic Astrologer",
      subTitle: "Kundli matching, Dosh analysis & Remedies",
      icon: Award,
      color: "from-indigo-600 to-purple-600",
      bgLight: "bg-indigo-50/80",
      border: "border-indigo-200/70",
      tag: "Top Acharyas",
      tagColor: "bg-indigo-600",
      count: "Call & Chat"
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              onClick={() => onCategorySelect?.(cat.id)}
              className={`group cursor-pointer bg-white rounded-2xl p-4 sm:p-5 border ${cat.border} shadow-sm hover:shadow-spiritual hover:-translate-y-1 transition-all duration-300 relative overflow-hidden`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${cat.tagColor}`}>
                  {cat.tag}
                </span>
              </div>

              <h3 className="font-serif font-bold text-base sm:text-lg text-neutral-900 group-hover:text-orange-600 transition-colors">
                {cat.title}
              </h3>
              <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed">
                {cat.subTitle}
              </p>

              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-[11px] font-semibold text-orange-700">
                <span>{cat.count}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
