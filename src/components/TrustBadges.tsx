"use client";

import React from "react";
import { ShieldCheck, Video, Package, Users, Award, HeartHandshake } from "lucide-react";

export default function TrustBadges() {
  const guarantees = [
    {
      icon: Award,
      title: "100% Authentic Vedic Rituals",
      desc: "Conducted strictly per Shastras by verified Acharyas from Sampurnanand & BHU Sanskrit Parishad.",
      badge: "Vedic Certified"
    },
    {
      icon: Video,
      title: "Personalized Video Proof",
      desc: "Receive clear video footage of Acharya chanting your specific Name, Gotra & wishes within 24-48 hrs.",
      badge: "WhatsApp Delivery"
    },
    {
      icon: Package,
      title: "Sanctum Blessed Prasad",
      desc: "Consecrated dry fruits, sacred Bhasma & energized Raksha Sutra safely delivered to your doorstep.",
      badge: "Free Speed Post"
    },
    {
      icon: Users,
      title: "Trusted by 50,000+ Devotees",
      desc: "Serving families across India, USA, UK, and 45+ countries with unmatched devotion & transparency.",
      badge: "4.96 ★ Rated"
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#FAF5EE] border-y border-orange-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-900 mb-2">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>The Atmanubhuti Divine Trust Promise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
            Connecting Your Devotion Directly with Sacred Shrines
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-2">
            We ensure complete spiritual sanctity, authentic Vedic traditions, and crystal-clear transparency at every step.
          </p>
        </div>

        {/* 4 Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {guarantees.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-orange-200/60 shadow-xs hover:shadow-spiritual transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-saffron flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold text-orange-800 bg-orange-50 border border-orange-200/80 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-base text-neutral-900 group-hover:text-orange-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Authenticity</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
