"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroBanner from "@/components/HeroBanner";
import QuickCategories from "@/components/QuickCategories";
import TempleRail from "@/components/TempleRail";
import PujaRail from "@/components/PujaRail";
import ChadhavaSection from "@/components/ChadhavaSection";
import PrasadDeliverySection from "@/components/PrasadDeliverySection";
import TrustBadges from "@/components/TrustBadges";
import DevoteeReviews from "@/components/DevoteeReviews";
import Footer from "@/components/Footer";
import PujaDetailModal from "@/components/PujaDetailModal";
import AuthModal from "@/components/AuthModal";
import MyBookingsModal from "@/components/MyBookingsModal";
import LiveDevoteeTicker from "@/components/LiveDevoteeTicker";
import DailyPanchangWidget from "@/components/DailyPanchangWidget";
import { PUJAS_DATA, TEMPLES_DATA, Puja, Temple } from "@/data/pujas";

export default function Home() {
  const [pujas, setPujas] = useState<Puja[]>(PUJAS_DATA);
  const [selectedPuja, setSelectedPuja] = useState<Puja | null>(null);
  const [selectedTemple, setSelectedTemple] = useState<Temple | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [bookingsModalOpen, setBookingsModalOpen] = useState(false);
  const [userPhone, setUserPhone] = useState<string | null>(null);
  const [myBookings, setMyBookings] = useState<any[]>([]);

  // Load real dynamic pujas and pricing from database
  useEffect(() => {
    fetch("/api/v1/pujas")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.length > 0) {
          setPujas(data.data);
        }
      })
      .catch((err) => console.log("Dynamic pujas load:", err));
  }, []);

  // When a temple is clicked, open the first active puja from that temple or filter
  const handleSelectTemple = (temple: Temple) => {
    setSelectedTemple(temple);
    const matchingPuja = pujas.find((p) =>
      p.templeName.toLowerCase().includes(temple.name.toLowerCase().slice(0, 10))
    );
    if (matchingPuja) {
      setSelectedPuja(matchingPuja);
    }
  };

  const handleBookingComplete = (bookingRecord: any) => {
    setMyBookings((prev) => [bookingRecord, ...prev]);
  };

  const handleSelectChadhava = (title: string, mandir: string, price: number) => {
    // Create a temporary puja object for Chadhava flow
    const chadhavaPuja: Puja = {
      id: "chadhava-" + Date.now(),
      slug: "chadhava-" + title.toLowerCase().replace(/\s+/g, "-"),
      title: `Chadhava Seva: ${title}`,
      subTitle: `Sacred offering at ${mandir} in your Name and Gotra`,
      templeName: mandir,
      templeLocation: mandir,
      deity: "Sacred Deity",
      date: "Daily Auspicious Muhurat",
      eventDate: "Today",
      bookingClosesIn: "04h : 15m : 00s",
      category: "chadhava",
      specialTag: "Chadhava Seva",
      rating: 4.95,
      devoteesCount: 15400,
      imageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
      templeImageUrl: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
      benefits: [
        "Special offering made directly inside the sanctum sanctorum",
        "Priest chants your Name & Gotra during Arpan",
        "Photo proof of the offering sent to your WhatsApp",
        "Brings peace, removal of hurdles, and divine grace"
      ],
      significance: `Offering chadhava at ${mandir} is an ancient tradition to invoke immediate divine protection and blessings for your family.`,
      samagri: [
        "Sacred Chunri & Shringar items",
        "Pure Ghee Deepam",
        "Shreefal (Coconut) with Mauli",
        "Sugandhit Chandan & Pushp"
      ],
      packages: [
        {
          id: "pkg-chadhava-std",
          name: "Standard Chadhava Seva",
          price: price,
          originalPrice: Math.round(price * 1.4),
          devoteeCount: 1,
          features: [
            "Offering in your Name & Gotra",
            "Photo proof on WhatsApp",
            "Digital Prasad Certificate"
          ]
        },
        {
          id: "pkg-chadhava-special",
          name: "Vishesh Chadhava + Prasad Kit",
          price: price + 500,
          originalPrice: price + 800,
          devoteeCount: 3,
          badge: "Includes Prasad",
          features: [
            "Offering in up to 3 Family Names",
            "Photo & Video proof on WhatsApp",
            "Consecrated temple prasad delivered home"
          ]
        }
      ],
      panditInfo: {
        title: "Authorized Temple Seva Archak",
        experience: "15+ Years",
        credentials: "Sanctum Hereditary Priest"
      }
    };

    setSelectedPuja(chadhavaPuja);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        onOpenAuth={() => setAuthModalOpen(true)}
        onOpenMyBookings={() => setBookingsModalOpen(true)}
        bookingCount={myBookings.length}
      />

      <main className="grow">
        {/* Hero Banner Carousel with Upcoming Pujas */}
        <HeroBanner
          pujas={pujas}
          onSelectPuja={(puja) => setSelectedPuja(puja)}
        />

        {/* Live Vedic Panchang & Choghadiya Widget */}
        <DailyPanchangWidget
          onSelectPuja={(slug) => {
            const p = pujas.find((item) => item.slug === slug);
            if (p) setSelectedPuja(p);
          }}
        />

        {/* Quick Categories Section */}
        <QuickCategories
          onCategorySelect={(cat) => {
            if (cat === "puja") {
              document.getElementById("pujas")?.scrollIntoView({ behavior: "smooth" });
            } else if (cat === "chadhava") {
              document.getElementById("chadhavas")?.scrollIntoView({ behavior: "smooth" });
            } else if (cat === "prasad") {
              document.getElementById("prasad")?.scrollIntoView({ behavior: "smooth" });
            } else if (cat === "astrologer") {
              alert("Vedic Astrologer Consultation line is connecting to verified Acharyas: +91 98765 43210");
            }
          }}
        />

        {/* Sacred Temples & Shrines Rail */}
        <TempleRail
          temples={TEMPLES_DATA}
          selectedTempleId={selectedTemple?.id}
          onSelectTemple={handleSelectTemple}
        />

        {/* Recommended Vedic Pujas with Filters & Starting Prices */}
        <PujaRail
          pujas={pujas}
          onSelectPuja={(puja) => setSelectedPuja(puja)}
        />

        {/* Offer a Chadhava Section */}
        <ChadhavaSection onSelectChadhava={handleSelectChadhava} />

        {/* Consecrated Temple Prasad Delivery */}
        <PrasadDeliverySection />

        {/* 100% Authentic Vedic Rituals Trust Badges */}
        <TrustBadges />

        {/* Devotee Reviews & Testimonials */}
        <DevoteeReviews />
      </main>

      {/* Global Footer with atmanubhuti.in branding */}
      <Footer />

      {/* Interactive Puja Detail & Sankalp Modal */}
      <PujaDetailModal
        puja={selectedPuja}
        onClose={() => setSelectedPuja(null)}
        onBookingComplete={handleBookingComplete}
      />

      {/* Devotee Phone OTP Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(phone) => setUserPhone(phone)}
      />

      {/* Devotee My Booked Pujas Modal */}
      <MyBookingsModal
        isOpen={bookingsModalOpen}
        onClose={() => setBookingsModalOpen(false)}
        bookings={myBookings}
      />

      {/* Animated Live Devotee Activity Ticker */}
      <LiveDevoteeTicker />
    </div>
  );
}
