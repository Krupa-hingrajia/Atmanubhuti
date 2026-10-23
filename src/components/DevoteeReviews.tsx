"use client";

import React from "react";
import { TESTIMONIALS } from "@/data/pujas";
import { Star, Quote, CheckCircle2 } from "lucide-react";

export default function DevoteeReviews() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 mb-2">
            <span className="text-amber-600">★ ★ ★ ★ ★</span>
            <span>Real Devotee Experiences</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
            Hear From Our Blessed Devotees
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Thousands of families have experienced the divine grace through Atmanubhuti Vedic rituals
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFDF9] rounded-2xl p-6 border border-orange-100/90 shadow-xs hover:shadow-spiritual transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-orange-200" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-orange-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={review.avatar}
                    alt={review.devoteeName}
                    className="w-10 h-10 rounded-full object-cover border-2 border-orange-300"
                  />
                  <div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-neutral-900 flex items-center gap-1">
                      <span>{review.devoteeName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 inline" />
                    </h4>
                    <span className="text-[11px] text-neutral-500 block">
                      {review.city}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60 block">
                    Verified Sankalp
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
