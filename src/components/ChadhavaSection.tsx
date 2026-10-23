"use client";

import React from "react";
import { Sparkles, MapPin, ChevronRight, Check } from "lucide-react";

interface ChadhavaSectionProps {
  onSelectChadhava: (chadhavaTitle: string, temple: string, price: number) => void;
}

export default function ChadhavaSection({ onSelectChadhava }: ChadhavaSectionProps) {
  const chadhavas = [
    {
      id: "ch-1",
      title: "Shiv-Parvati Akhand Prem Chadhava",
      mandir: "Triyuginarayan Temple, Rudraprayag",
      deity: "Lord Shiva & Parvati",
      offering: "Red Chunri, Akhand Dhuni Samidha & Sugandhit Chandan",
      price: 251,
      devotees: 18450,
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
      tag: "For Relationship Bliss"
    },
    {
      id: "ch-2",
      title: "Maa Kamakhya Shatru-Raksha Chadhava",
      mandir: "Shaktipeeth Maa Kamakhya, Assam",
      deity: "Maa Kamakhya",
      offering: "Sacred Kamakhya Sindoor, Roli & Mustard Deepam",
      price: 501,
      devotees: 29800,
      image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=800&auto=format&fit=crop&q=80",
      tag: "Shatru & Nazar Raksha"
    },
    {
      id: "ch-3",
      title: "Shree Mahalakshmi Anant Dhanprapti Chadhava",
      mandir: "Shakti Peeth Maa Mahalakshmi, Kolhapur",
      deity: "Goddess Mahalakshmi",
      offering: "Lotus Seeds (Kamal Gatta), Haldi-Kumkum & Shreefal",
      price: 351,
      devotees: 22100,
      image: "https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=800&auto=format&fit=crop&q=80",
      tag: "Vyapar & Dhan Labh"
    }
  ];

  return (
    <section id="chadhavas" className="py-12 sm:py-16 bg-[#FFFDF9] border-b border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Devotional Sacred Offerings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
              Offer a Chadhava (चढ़ावा सेवा)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Offer sacred items at holy shrines in your name & gotra when visiting in person is not possible
            </p>
          </div>

          <div className="text-xs font-semibold text-orange-700 hover:text-orange-800 flex items-center gap-1 cursor-pointer">
            <span>View All Chadhavas</span>
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Chadhava Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chadhavas.map((ch) => (
            <div
              key={ch.id}
              className="bg-white rounded-2xl border border-orange-100/90 shadow-sm hover:shadow-spiritual transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/9 bg-neutral-900">
                  <img
                    src={ch.image}
                    alt={ch.title}
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                    {ch.tag}
                  </span>

                  <div className="absolute bottom-2.5 left-3 text-white text-xs font-semibold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>{ch.mandir}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif font-bold text-base text-neutral-900 mb-2 leading-snug">
                    {ch.title}
                  </h3>
                  
                  <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50 text-xs text-neutral-700 mb-4">
                    <span className="font-semibold text-amber-900 block mb-0.5">Sacred Samagri Offered:</span>
                    <span>{ch.offering}</span>
                  </div>

                  <div className="text-xs text-neutral-500 flex items-center justify-between">
                    <span>{ch.devotees.toLocaleString('en-IN')} Devotees offered</span>
                    <span className="text-emerald-700 font-medium">✓ Photo Proof Sent</span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Seva Dakshina</span>
                  <span className="text-xl font-serif font-black text-neutral-900">₹{ch.price}</span>
                </div>

                <button
                  onClick={() => onSelectChadhava(ch.title, ch.mandir, ch.price)}
                  className="px-4 py-2 rounded-xl bg-gradient-sacred-gold hover:opacity-95 text-white text-xs font-bold shadow-xs cursor-pointer transition-transform hover:scale-105"
                >
                  Offer Chadhava
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
