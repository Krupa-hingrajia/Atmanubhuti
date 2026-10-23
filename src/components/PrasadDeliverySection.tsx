"use client";

import React from "react";
import { Package, ShieldCheck, Truck, Sparkles, CheckCircle2 } from "lucide-react";

export default function PrasadDeliverySection() {
  const prasadItems = [
    {
      temple: "Kashi Vishwanath Jyotirlinga, Varanasi",
      title: "Maha Rudra Sanctum Prasad Kit",
      includes: "Original Kashi Bhasma, Energized Rudraksha Bead, Panchmeva Prasad & Kashi Raksha Sutra",
      price: 451,
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80",
    },
    {
      temple: "Maa Kamakhya Shaktipeeth, Assam",
      title: "Devi Kamakhya Siddha Sindoor & Vastra",
      includes: "Sanctum Blessed Red Sindoor, Kamakhya Raksha Sutra, Dry Fruit Bhog & Temple Yantra Coin",
      price: 501,
      image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=800&auto=format&fit=crop&q=80",
    },
    {
      temple: "Mahakaleshwar Jyotirlinga, Ujjain",
      title: "Bhasma Aarti Consecrated Mahaprasad",
      includes: "Original Bhasma from Morning Bhasma Aarti, Mahakal Ladoo Prasad & Energized Kavach",
      price: 499,
      image: "https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=800&auto=format&fit=crop&q=80",
    }
  ];

  return (
    <section id="prasad" className="py-12 sm:py-16 bg-[#FAF5EE] border-b border-orange-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-orange-600 mb-1">
              <Package className="w-3.5 h-3.5 text-orange-600" />
              <span>Doorstep Sacred Blessings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-neutral-900 tracking-tight">
              Temple Prasad Seva (घर पर मंगवाएं मंदिर का प्रसाद)
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Pure sanctified prasad packed in vacuum-sealed hygienic boxes and delivered via India Speed Post
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-neutral-600">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-orange-600" />
              Pan-India Delivery in 3-5 Days
            </span>
          </div>
        </div>

        {/* Prasad Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {prasadItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-orange-200/60 shadow-xs hover:shadow-spiritual transition-all p-5 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-16/9 rounded-xl overflow-hidden mb-4 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-0.5 rounded shadow">
                    Pure & Untouched
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-orange-700 block mb-1">
                  {item.temple}
                </span>
                <h3 className="font-serif font-bold text-base text-neutral-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed mb-4 bg-orange-50/50 p-2.5 rounded-lg border border-orange-100">
                  <span className="font-semibold text-neutral-800 block mb-0.5">Includes in Kit:</span>
                  {item.includes}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-400 block font-semibold">Offering Price</span>
                  <span className="text-xl font-serif font-black text-neutral-900">₹{item.price}</span>
                </div>

                <button
                  onClick={() => alert(`Prasad Seva for ${item.title} added! You can complete order on Sankalp checkout.`)}
                  className="px-4 py-2 rounded-xl bg-gradient-saffron hover:opacity-95 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Order Prasad Kit
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
