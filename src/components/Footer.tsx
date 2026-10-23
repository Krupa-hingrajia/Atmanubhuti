"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Mail, MapPin, Heart, ShieldCheck, Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-10 border-t-4 border-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md border border-amber-400/40 shrink-0">
                <img
                  src="/logo.png"
                  alt="Atmanubhuti Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-serif font-extrabold text-white tracking-tight">
                  Atmanubhuti
                </span>
                <span className="text-xs text-orange-400 block font-semibold">
                  आत्म अनुभूति • Authentic Vedic Rituals
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              India's trusted spiritual portal connecting millions of devotees directly to ancient Jyotirlingas, Shaktipeeths, and sacred Teerth Kshetras with complete Vedic sanctity and personalized video proof.
            </p>

            <div className="space-y-1.5 text-xs text-neutral-400 pt-2">
              <div className="flex items-center gap-2">
                <GlobeIcon className="w-3.5 h-3.5 text-orange-500" />
                <span>Official Domains: </span>
                <span className="text-amber-400 font-mono">atmanubhuti.in</span>
                <span>•</span>
                <span className="text-amber-400 font-mono">atmanubhuti.org</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-orange-500" />
                <span>Priest & Booking Helpline: +91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-orange-500" />
                <span>seva@atmanubhuti.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
              Sacred Seva
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="#pujas" className="hover:text-orange-400 transition-colors">
                  Special Shani Pradosh Puja
                </Link>
              </li>
              <li>
                <Link href="#pujas" className="hover:text-orange-400 transition-colors">
                  Kashi Vishwanath Rudrabhishek
                </Link>
              </li>
              <li>
                <Link href="#pujas" className="hover:text-orange-400 transition-colors">
                  Mahalakshmi Kuber Vyapar Puja
                </Link>
              </li>
              <li>
                <Link href="#pujas" className="hover:text-orange-400 transition-colors">
                  Maa Kamakhya Shatru Raksha
                </Link>
              </li>
              <li>
                <Link href="#pujas" className="hover:text-orange-400 transition-colors">
                  Triyuginarayan Vivaah Sukh
                </Link>
              </li>
            </ul>
          </div>

          {/* Teerth Kshetras */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
              Holy Shrines
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link href="#temples" className="hover:text-orange-400 transition-colors">
                  Kashi Vishwanath, Varanasi
                </Link>
              </li>
              <li>
                <Link href="#temples" className="hover:text-orange-400 transition-colors">
                  Mahakaleshwar, Ujjain
                </Link>
              </li>
              <li>
                <Link href="#temples" className="hover:text-orange-400 transition-colors">
                  Kamakhya Shaktipeeth, Assam
                </Link>
              </li>
              <li>
                <Link href="#temples" className="hover:text-orange-400 transition-colors">
                  Triyuginarayan, Uttarakhand
                </Link>
              </li>
              <li>
                <Link href="#temples" className="hover:text-orange-400 transition-colors">
                  Maa Mahalakshmi, Kolhapur
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div>
            <h4 className="font-serif font-bold text-sm text-white uppercase tracking-wider mb-4 border-l-2 border-orange-500 pl-2">
              Trust & Legal
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  About Atmanubhuti
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Vedic Priests Network
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Sankalp Video Process
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Terms of Devotional Seva
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Privacy & Dakshina Policy
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Atmanubhuti Foundation. All rights reserved.</p>
          <div className="flex items-center gap-1 text-neutral-400 text-xs">
            <span>Built with purity & devotion</span>
            <span className="text-orange-500">🚩</span>
            <span>for Sanatan Dharma</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx={12} cy={12} r={10} />
      <line x1={2} y1={12} x2={22} y2={12} />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
