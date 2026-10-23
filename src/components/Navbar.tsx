"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, 
  PhoneCall, 
  User, 
  Menu, 
  X, 
  Flame, 
  ShieldCheck, 
  CalendarDays, 
  ShoppingBag, 
  Compass, 
  Bell, 
  Search, 
  Globe, 
  Check, 
  Award
} from "lucide-react";
import { playTempleBell } from "@/utils/templeBell";

interface NavbarProps {
  onOpenAuth?: () => void;
  onOpenMyBookings?: () => void;
  onSearchClick?: () => void;
  bookingCount?: number;
}

export default function Navbar({
  onOpenAuth,
  onOpenMyBookings,
  onSearchClick,
  bookingCount = 0,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [bellBlessing, setBellBlessing] = useState<string | null>(null);
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll for elevated glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const blessings = [
    "ॐ नमः शिवाय 🔱",
    "जय श्री महाकाल 🔔",
    "हर हर महादेव 🚩",
    "जय माँ कामाख्या 🌸",
    "जय श्री राम 🚩"
  ];

  const handleRingBell = () => {
    setBellRinging(true);
    playTempleBell();

    // Pick random blessing
    const randomBlessing = blessings[Math.floor(Math.random() * blessings.length)];
    setBellBlessing(randomBlessing);

    setTimeout(() => {
      setBellRinging(false);
    }, 1200);

    setTimeout(() => {
      setBellBlessing(null);
    }, 2500);
  };

  return (
    <>
      {/* 1. Auspicious Royal Vedic Ribbon (Top Bar) */}
      <div className="bg-gradient-to-r from-red-950 via-amber-950 to-orange-950 text-amber-100 py-1.5 px-4 text-[11px] font-medium tracking-wide border-b border-amber-800/40 relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Sacred Vedic Shloka / Announcement */}
          <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="hidden lg:inline-flex items-center gap-1.5 text-amber-300 font-serif font-semibold tracking-wider border-r border-amber-700/50 pr-3">
              ॥ ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥
            </span>

            <span className="flex items-center gap-1.5 font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/30">
              <Flame className="w-3 h-3 text-orange-400 animate-diya" />
              <span>100% Vedic Rituals</span>
            </span>

            <span className="hidden sm:inline text-amber-200/90 font-medium">
              Personalized Name & Gotra Sankalp Video delivered via WhatsApp
            </span>
          </div>

          {/* Right Utilities: Helpline + Language Toggle */}
          <div className="flex items-center gap-4 text-[11px]">
            {/* Pandit Helpline */}
            <a 
              href="https://wa.me/919876543210" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1.5 hover:text-white transition-colors group"
            >
              <div className="w-4 h-4 rounded-full bg-emerald-700 flex items-center justify-center text-white">
                <PhoneCall className="w-2.5 h-2.5" />
              </div>
              <span className="hidden md:inline text-amber-200/80 group-hover:text-white">Priest Helpline:</span>
              <span className="font-bold text-amber-300 group-hover:text-white">+91 98765 43210</span>
            </a>

            {/* Language Switcher (EN | हिन्दी) */}
            <div className="flex items-center bg-black/40 rounded-full p-0.5 border border-amber-700/60">
              <button
                onClick={() => setLanguage("en")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                  language === "en"
                    ? "bg-gradient-saffron text-white shadow-xs"
                    : "text-amber-200/70 hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                  language === "hi"
                    ? "bg-gradient-saffron text-white shadow-xs"
                    : "text-amber-200/70 hover:text-white"
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Main Grand Appbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_6px_25px_-5px_rgba(234,88,12,0.12)] border-b border-orange-200/80 py-2.5"
            : "bg-[#FFFDF9]/95 backdrop-blur-sm border-b border-orange-100/80 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Left: Brand Identity */}
          <Link href="/" className="flex items-center gap-3.5 group shrink-0">
            {/* Logo Emblem with Radiant Gold Halo */}
            <div className="relative">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl p-0.5 bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 shadow-md shadow-orange-500/25 group-hover:scale-105 transition-all">
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-white">
                  <img
                    src="/logo.png"
                    alt="Atmanubhuti Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-600/30" title="Vedic Portal Active" />
            </div>

            {/* Typography */}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-serif font-black tracking-tight text-neutral-900 group-hover:text-orange-600 transition-colors">
                  Atmanubhuti
                </span>
                <span className="hidden sm:inline-block text-[10px] font-bold tracking-wider bg-gradient-to-r from-orange-100 to-amber-100 text-orange-950 px-2 py-0.5 rounded-md border border-orange-300/60 shadow-2xs font-serif">
                  आत्म अनुभूति
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-semibold text-neutral-500 tracking-wider flex items-center gap-1 mt-0.5">
                <span className="text-orange-600">AUTHENTIC VEDIC RITUALS</span>
                <span className="text-neutral-300">•</span>
                <span>TEMPLE SEVA</span>
              </p>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links with Sacred Icons */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link 
              href="#pujas" 
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-50/80 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flame className="w-3.5 h-3.5" />
              </div>
              <span>Book a Puja</span>
            </Link>

            <Link 
              href="#chadhavas" 
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:text-amber-600 hover:bg-amber-50/80 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span>Offer Chadhava</span>
            </Link>

            <Link 
              href="#temples" 
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:text-rose-600 hover:bg-rose-50/80 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <span>Sacred Temples</span>
            </Link>

            <Link 
              href="#prasad" 
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:text-orange-600 hover:bg-orange-50/80 transition-all group"
            >
              <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span>Prasad Seva</span>
            </Link>

            <Link 
              href="/panchang" 
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300/80 transition-all group shadow-2xs hover:scale-105"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-xs">
                <CalendarDays className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col text-left">
                <span className="leading-tight font-serif font-black text-amber-950">दैनिक पंचांग</span>
                <span className="text-[9px] font-semibold text-orange-700 leading-tight">चौघड़िया व मुहूर्त</span>
              </div>
            </Link>
          </nav>

          {/* Right Side: Temple Bell + My Bookings + Login + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Interactive Temple Hanging Bell (मंदिर घंटी) */}
            <div className="relative">
              <button
                onClick={handleRingBell}
                title="Ring the Sacred Temple Bell (मंदिर की घंटी बजाएं)"
                className="flex items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300/80 text-amber-900 shadow-2xs hover:shadow-sm transition-all hover:scale-105 cursor-pointer active:scale-95 group"
              >
                <div className="relative">
                  {/* Subtle golden chain hook above bell */}
                  <div className="w-0.5 h-1.5 bg-amber-600 mx-auto -mt-1 rounded-t-full" />
                  <Bell
                    className={`w-4 h-4 text-amber-700 transition-transform ${
                      bellRinging ? "animate-bell-ring text-orange-600" : "animate-bell-gentle"
                    }`}
                  />
                </div>
                <span className="hidden sm:inline text-[11px] font-black text-amber-900 font-serif">
                  {bellRinging ? "जय श्री राम" : "घंटी बजाएं"}
                </span>
              </button>

              {/* Floating Divine Blessing Toast */}
              {bellBlessing && (
                <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full shadow-lg border border-amber-400/50 animate-bounce z-50">
                  {bellBlessing}
                </div>
              )}
            </div>

            {/* My Bookings Button */}
            <button
              onClick={onOpenMyBookings}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-neutral-700 hover:text-orange-700 bg-orange-50/70 hover:bg-orange-100/80 rounded-xl border border-orange-200/70 transition-all relative"
            >
              <CalendarDays className="w-4 h-4 text-orange-600" />
              <span>My Pujas</span>
              {bookingCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookingCount}
                </span>
              )}
            </button>

            {/* Admin Console Link */}
            <Link
              href="/admin"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-900 bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300/80 rounded-xl transition-all shadow-2xs hover:scale-105"
              title="Temple Administration Console"
            >
              <span className="text-xs">🪔</span>
              <span>Admin Portal</span>
            </Link>

            {/* Devotee Login / Profile */}
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-50 border border-neutral-200/90 rounded-xl shadow-2xs transition-all hover:border-orange-300"
            >
              <User className="w-4 h-4 text-orange-600" />
              <span className="hidden sm:inline">Sign In</span>
            </button>

            {/* Primary CTA: Royal Saffron Shimmer Button */}
            <a
              href="#pujas"
              className="hidden sm:flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-serif font-black uppercase tracking-wider text-white bg-gradient-saffron hover:opacity-95 shadow-md shadow-orange-500/25 border border-amber-400/40 transition-all shimmer-btn hover:scale-105"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Book Puja</span>
            </a>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* 3. Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-orange-100 px-4 pt-3 pb-6 space-y-4 shadow-xl">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
              <Link
                href="/panchang"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 text-amber-950 border border-amber-300 font-bold shadow-2xs"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-xs">
                  🕉️
                </div>
                <div>
                  <div className="text-xs font-serif font-black">दैनिक पंचांग व चौघड़िया</div>
                  <div className="text-[10px] text-orange-700 font-medium">आज की तिथि, शुभ मुहूर्त व राहुकाल</div>
                </div>
              </Link>
              <Link
                href="#pujas"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-orange-50 text-orange-900 border border-orange-100"
              >
                <Flame className="w-4 h-4 text-orange-600" />
                <span>Book a Puja</span>
              </Link>
              <Link
                href="#chadhavas"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-100"
              >
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Chadhava</span>
              </Link>
              <Link
                href="#temples"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 text-rose-900 border border-rose-100"
              >
                <Compass className="w-4 h-4 text-rose-600" />
                <span>Sacred Temples</span>
              </Link>
              <Link
                href="#prasad"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-100"
              >
                <ShoppingBag className="w-4 h-4 text-orange-600" />
                <span>Prasad Seva</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-neutral-100 flex flex-col gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenMyBookings?.();
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-bold text-neutral-800 bg-neutral-100 rounded-xl"
                >
                  My Booked Pujas
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth?.();
                  }}
                  className="flex-1 py-2.5 text-center text-xs font-bold text-white bg-gradient-saffron rounded-xl shadow-sm"
                >
                  Devotee Sign In
                </button>
              </div>

              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-bold text-amber-900 bg-amber-100/90 rounded-xl border border-amber-300 flex items-center justify-center gap-1.5"
              >
                <span>🪔</span>
                <span>Temple Admin Console (/admin)</span>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
