"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  PlusCircle,
  Edit3,
  Trash2,
  ExternalLink,
  Search,
  Check,
  X,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Tag,
  DollarSign,
  Plus,
  Layers,
  ArrowRight
} from "lucide-react";
import { Puja, PujaPackage } from "@/data/pujas";

export default function AdminPujasPage() {
  const [pujas, setPujas] = useState<Puja[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [notification, setNotification] = useState<string | null>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPujaId, setEditingPujaId] = useState<string | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState("");
  const [formSubTitle, setFormSubTitle] = useState("");
  const [formTempleName, setFormTempleName] = useState("Shri Kashi Vishwanath Jyotirlinga, Varanasi");
  const [formTempleLocation, setFormTempleLocation] = useState("Varanasi, UP");
  const [formDeity, setFormDeity] = useState("Lord Shiva");
  const [formCategory, setFormCategory] = useState<"puja" | "chadhava" | "special">("puja");
  const [formDate, setFormDate] = useState("Every Monday / Auspicious Muhurat");
  const [formEventDate, setFormEventDate] = useState("2026-10-25");
  const [formBookingClosesIn, setFormBookingClosesIn] = useState("18h : 30m : 00s");
  const [formSpecialTag, setFormSpecialTag] = useState("Most Auspicious");
  const [formImageUrl, setFormImageUrl] = useState("https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80");
  const [formSignificance, setFormSignificance] = useState("Vedic ritual performed following classical Agamas for family welfare.");
  const [formBenefits, setFormBenefits] = useState<string[]>([
    "Individual Gotra & Name Sankalp chanted at holy sanctum",
    "2-3 Minute high quality personalized video proof on WhatsApp",
    "Prasad energized with holy chants delivered to your doorstep"
  ]);
  const [formSamagri, setFormSamagri] = useState<string[]>([
    "Gangajal, Panchamrit, Belpatra & Sugandhit Chandan",
    "Special Akhand Diya lit in your family's name"
  ]);

  // Packages (Prices & Tiers)
  const [formPackages, setFormPackages] = useState<PujaPackage[]>([
    {
      id: "pkg-1",
      name: "Individual Sankalp",
      price: 501,
      originalPrice: 751,
      devoteeCount: 1,
      features: ["1 Devotee Name & Gotra", "Sankalp Video via WhatsApp", "Digital Certificate"],
    },
    {
      id: "pkg-2",
      name: "Dampati (Couple) Seva",
      price: 1100,
      originalPrice: 1550,
      devoteeCount: 2,
      badge: "Most Popular",
      features: ["2 Devotees Sankalp", "Full Video Recording", "Consecrated Prasad Included"],
    },
    {
      id: "pkg-3",
      name: "Sampoorna Parivar (Family Seva)",
      price: 2100,
      originalPrice: 3100,
      devoteeCount: 5,
      features: ["Up to 5 Family Members", "Special Hawan Ahuti", "Full Video + Blessed Raksha Sutra"],
    },
  ]);

  const loadPujas = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/pujas");
      const data = await res.json();
      if (data.success && data.data) {
        setPujas(data.data);
      }
    } catch (err) {
      console.error("Error loading pujas:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPujas();
  }, []);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleOpenAddModal = () => {
    setEditingPujaId(null);
    setFormTitle("");
    setFormSubTitle("");
    setFormTempleName("Shri Kashi Vishwanath Jyotirlinga, Varanasi");
    setFormTempleLocation("Varanasi, UP");
    setFormDeity("Lord Shiva");
    setFormCategory("puja");
    setFormDate("Upcoming Auspicious Muhurat");
    setFormEventDate(new Date(Date.now() + 5 * 86400000).toISOString().split("T")[0]);
    setFormBookingClosesIn("24h : 00m : 00s");
    setFormSpecialTag("Most Auspicious");
    setFormImageUrl("https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80");
    setFormSignificance("Sacred Agamic vidhi performed by hereditary temple purohits.");
    setFormBenefits([
      "Personalized Sankalp with individual Name & Gotra",
      "Authentic video recording delivered to your WhatsApp",
      "Teerth Prasad with holy protective thread delivered home"
    ]);
    setFormPackages([
      {
        id: "pkg-1",
        name: "Individual Sankalp",
        price: 501,
        originalPrice: 751,
        devoteeCount: 1,
        features: ["1 Devotee Name & Gotra", "Sankalp Video via WhatsApp", "Digital Certificate"],
      },
      {
        id: "pkg-2",
        name: "Dampati (Couple) Seva",
        price: 1100,
        originalPrice: 1550,
        devoteeCount: 2,
        badge: "Most Popular",
        features: ["2 Devotees Sankalp", "Full Video Recording", "Consecrated Prasad Included"],
      },
      {
        id: "pkg-3",
        name: "Sampoorna Parivar Seva",
        price: 2100,
        originalPrice: 3100,
        devoteeCount: 5,
        features: ["Up to 5 Family Members", "Special Hawan Ahuti", "VIP Prasad Box"],
      },
    ]);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (puja: Puja) => {
    setEditingPujaId(puja.id);
    setFormTitle(puja.title);
    setFormSubTitle(puja.subTitle);
    setFormTempleName(puja.templeName);
    setFormTempleLocation(puja.templeLocation);
    setFormDeity(puja.deity);
    setFormCategory(puja.category || "puja");
    setFormDate(puja.date);
    setFormEventDate(puja.eventDate);
    setFormBookingClosesIn(puja.bookingClosesIn);
    setFormSpecialTag(puja.specialTag || "Special Puja");
    setFormImageUrl(puja.imageUrl);
    setFormSignificance(puja.significance);
    setFormBenefits(puja.benefits);
    setFormSamagri(puja.samagri);
    setFormPackages(puja.packages && puja.packages.length > 0 ? puja.packages : [
      {
        id: "pkg-1",
        name: "Individual Sankalp",
        price: 501,
        originalPrice: 751,
        devoteeCount: 1,
        features: ["1 Devotee Name & Gotra", "Video Recording"],
      }
    ]);
    setIsModalOpen(true);
  };

  const handleSavePuja = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formTempleName.trim()) {
      alert("Please provide Puja Title and Temple Name.");
      return;
    }

    const payload = {
      title: formTitle,
      subTitle: formSubTitle,
      templeName: formTempleName,
      templeLocation: formTempleLocation,
      deity: formDeity,
      category: formCategory,
      date: formDate,
      eventDate: formEventDate,
      bookingClosesIn: formBookingClosesIn,
      specialTag: formSpecialTag,
      imageUrl: formImageUrl,
      templeImageUrl: formImageUrl,
      significance: formSignificance,
      benefits: formBenefits,
      samagri: formSamagri,
      packages: formPackages,
    };

    try {
      if (editingPujaId) {
        // Update existing
        const res = await fetch(`/api/v1/admin/pujas/${editingPujaId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showNotification(`✨ Puja "${formTitle}" updated successfully!`);
          setIsModalOpen(false);
          loadPujas();
        } else {
          alert(data.message || "Failed to update puja");
        }
      } else {
        // Create new
        const res = await fetch("/api/v1/pujas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.success) {
          showNotification(`🪔 New Puja "${formTitle}" published live!`);
          setIsModalOpen(false);
          loadPujas();
        } else {
          alert(data.message || "Failed to create puja");
        }
      }
    } catch (err) {
      alert("Error saving puja: " + String(err));
    }
  };

  const handleDeletePuja = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return;
    try {
      const res = await fetch(`/api/v1/admin/pujas/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Removed "${title}" from catalog.`);
        loadPujas();
      }
    } catch (err) {
      alert("Error deleting puja: " + String(err));
    }
  };

  // Helper to update a specific package price
  const updatePackageField = (index: number, field: keyof PujaPackage, val: any) => {
    const updated = [...formPackages];
    updated[index] = { ...updated[index], [field]: val };
    setFormPackages(updated);
  };

  const handleAddPackageTier = () => {
    setFormPackages((prev) => [
      ...prev,
      {
        id: "pkg-" + Date.now(),
        name: "Special VIP Anushthan",
        price: 5100,
        originalPrice: 7500,
        devoteeCount: 1,
        badge: "VIP Exclusive",
        features: ["Special Dedicated Acharya", "1008 Sacred Mantras", "Complete Hawan Video + Blessed Yantra"],
      },
    ]);
  };

  const handleRemovePackageTier = (index: number) => {
    if (formPackages.length <= 1) {
      alert("A Puja must have at least one pricing package.");
      return;
    }
    setFormPackages(formPackages.filter((_, idx) => idx !== index));
  };

  const filteredPujas = pujas.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.templeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.deity.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ? true : p.category === selectedCategory;

    return matchesSearch && matchesCategory;
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

      {/* Header & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 md:p-6 rounded-3xl border border-orange-100/80 shadow-xs">
        <div>
          <h3 className="font-serif font-black text-xl text-neutral-900">
            Pooja Catalog & Pricing Management (पूजा एवं मूल्य सूची)
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Create new temple offerings, adjust packages & dakshina prices, and set upcoming muhurat dates.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 hover:opacity-95 shadow-md shadow-orange-500/20 border border-amber-400/40 transition-all hover:scale-105 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Pooja / Seva</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by puja title, temple name, or deity..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200/90 text-xs focus:outline-hidden focus:border-orange-500 font-medium"
          />
        </div>

        <div className="flex items-center gap-1.5 bg-orange-100/60 p-1 rounded-2xl text-xs font-bold text-neutral-600 w-full sm:w-auto">
          {["all", "puja", "chadhava", "special"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl capitalize transition-all ${
                selectedCategory === cat
                  ? "bg-white text-orange-700 shadow-xs"
                  : "hover:text-neutral-900"
              }`}
            >
              {cat === "all" ? "All Offerings" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pujas Grid */}
      {loading ? (
        <div className="p-16 text-center text-neutral-400">
          <div className="w-8 h-8 mx-auto border-3 border-orange-500 border-t-transparent rounded-full animate-spin mb-3" />
          <p className="text-xs font-semibold">Loading puja catalog...</p>
        </div>
      ) : filteredPujas.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-orange-100">
          <Flame className="w-10 h-10 mx-auto text-neutral-300 mb-2" />
          <h4 className="font-serif font-bold text-neutral-800 text-base">
            No Pujas Found
          </h4>
          <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query or click "Add New Pooja" to create your first offering.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPujas.map((p) => {
            const minPrice = p.packages?.length
              ? Math.min(...p.packages.map((pkg) => pkg.price))
              : 501;

            return (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-orange-100/90 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Image banner */}
                  <div className="relative h-44 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Tag */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white shadow-sm">
                        {p.specialTag || p.category}
                      </span>
                    </div>

                    {/* Deity Pill */}
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-black/60 backdrop-blur-md text-amber-200 border border-white/20">
                        {p.deity}
                      </span>
                    </div>

                    {/* Temple name over image bottom */}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1 text-[11px] text-amber-300 font-semibold truncate">
                        <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                        <span className="truncate">{p.templeName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h4 className="font-serif font-black text-base text-neutral-900 leading-snug line-clamp-2">
                      {p.title}
                    </h4>
                    <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                      {p.subTitle}
                    </p>

                    {/* Muhurat info */}
                    <div className="flex items-center justify-between text-[11px] text-neutral-600 bg-orange-50/60 p-2.5 rounded-xl border border-orange-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-orange-600" />
                        <span className="font-medium truncate">{p.date}</span>
                      </div>
                      <span className="font-mono text-neutral-400 text-[10px]">
                        Closes: {p.bookingClosesIn}
                      </span>
                    </div>

                    {/* Package Price Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                        Available Packages ({p.packages?.length || 0}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {p.packages?.map((pkg) => (
                          <span
                            key={pkg.id}
                            className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-lg bg-neutral-100 text-neutral-800 border border-neutral-200"
                          >
                            <span>{pkg.name}:</span>
                            <span className="text-orange-700 font-mono">₹{pkg.price}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-4 bg-[#FAF7F2] border-t border-orange-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Starts from</span>
                    <span className="text-base font-serif font-black text-orange-700">
                      ₹{minPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditModal(p)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 font-bold text-xs flex items-center gap-1 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-neutral-500" />
                      Edit & Prices
                    </button>

                    <button
                      onClick={() => handleDeletePuja(p.id, p.title)}
                      className="p-1.5 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete Puja"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Pooja Modal & Package Configurator */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl border border-orange-100 max-h-[92vh] flex flex-col my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-orange-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-black text-lg text-neutral-900">
                    {editingPujaId ? "Edit Pooja & Dakshina Packages" : "Create New Pooja / Chadhava Offering"}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    Set rituals, muhurat timing, deity, and tiered pricing packages.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <form onSubmit={handleSavePuja} className="overflow-y-auto py-5 space-y-6 flex-1 pr-1 text-xs">
              {/* Basic Details */}
              <div className="space-y-3">
                <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5 text-orange-700">
                  <Tag className="w-4 h-4" /> 1. Pooja Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Pooja Title (पूजा का नाम) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                      placeholder="e.g. Shani Pradosh Maha Rudrabhishek"
                      className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Deity (भगवान / देवी) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formDeity}
                      onChange={(e) => setFormDeity(e.target.value)}
                      placeholder="e.g. Lord Shiva, Maa Kamakhya, Lord Hanuman"
                      className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Subtitle / Short Devotional Benefit *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSubTitle}
                    onChange={(e) => setFormSubTitle(e.target.value)}
                    placeholder="e.g. For peace, liberation from Shani Dosha, and good health"
                    className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Temple Name (मंदिर का नाम) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formTempleName}
                      onChange={(e) => setFormTempleName(e.target.value)}
                      placeholder="e.g. Shri Kashi Vishwanath Jyotirlinga"
                      className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl border border-neutral-200 bg-white font-medium focus:border-orange-500 focus:outline-hidden"
                    >
                      <option value="puja">Vedic Puja (वैदिक पूजा)</option>
                      <option value="chadhava">Chadhava Seva (चढ़ावा सेवा)</option>
                      <option value="special">Special Anushthan (विशेष अनुष्ठान)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Muhurat Tithi / Date String
                    </label>
                    <input
                      type="text"
                      value={formDate}
                      onChange={(e) => setFormDate(e.target.value)}
                      placeholder="e.g. Saturday, Shukla Paksha"
                      className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Event Calendar Date
                    </label>
                    <input
                      type="date"
                      value={formEventDate}
                      onChange={(e) => setFormEventDate(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-neutral-700 mb-1">
                      Booking Deadline Countdown
                    </label>
                    <input
                      type="text"
                      value={formBookingClosesIn}
                      onChange={(e) => setFormBookingClosesIn(e.target.value)}
                      placeholder="e.g. 12h : 45m : 00s"
                      className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-neutral-700 mb-1">
                    Image Banner URL
                  </label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-neutral-200 font-medium focus:border-orange-500 focus:outline-hidden"
                  />
                  {formImageUrl && (
                    <div className="mt-2 h-20 w-40 rounded-xl overflow-hidden border border-neutral-200">
                      <img src={formImageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Package & Pricing Builder */}
              <div className="space-y-4 pt-4 border-t border-orange-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-1.5 text-orange-700">
                      <DollarSign className="w-4 h-4" /> 2. Dakshina Packages & Pricing (मूल्य निर्धारण)
                    </h4>
                    <p className="text-[11px] text-neutral-500">
                      Devotees can choose from these tiers when booking. You can set individual, couple, or family rates.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddPackageTier}
                    className="px-3 py-1.5 rounded-xl bg-orange-100 text-orange-800 font-bold text-xs hover:bg-orange-200 flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Tier
                  </button>
                </div>

                <div className="space-y-3">
                  {formPackages.map((pkg, idx) => (
                    <div
                      key={pkg.id || idx}
                      className="bg-orange-50/50 rounded-2xl p-4 border border-orange-200/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          Package Tier #{idx + 1}
                        </span>

                        {formPackages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemovePackageTier(idx)}
                            className="text-neutral-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                            Package Name
                          </label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => updatePackageField(idx, "name", e.target.value)}
                            className="w-full p-2 rounded-xl border border-neutral-200 bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                            Offer Price (₹ Dakshina) *
                          </label>
                          <input
                            type="number"
                            value={pkg.price}
                            onChange={(e) => updatePackageField(idx, "price", Number(e.target.value))}
                            className="w-full p-2 rounded-xl border border-neutral-200 bg-white font-bold text-orange-700"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                            Original / Cut Price (₹)
                          </label>
                          <input
                            type="number"
                            value={pkg.originalPrice}
                            onChange={(e) => updatePackageField(idx, "originalPrice", Number(e.target.value))}
                            className="w-full p-2 rounded-xl border border-neutral-200 bg-white font-medium text-neutral-400"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                            Max Devotees Allowed (Gotra/Names)
                          </label>
                          <input
                            type="number"
                            value={pkg.devoteeCount}
                            onChange={(e) => updatePackageField(idx, "devoteeCount", Number(e.target.value))}
                            className="w-full p-2 rounded-xl border border-neutral-200 bg-white font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-neutral-600 mb-1">
                            Badge (Optional)
                          </label>
                          <input
                            type="text"
                            value={pkg.badge || ""}
                            placeholder="e.g. Most Popular, Recommended"
                            onChange={(e) => updatePackageField(idx, "badge", e.target.value)}
                            className="w-full p-2 rounded-xl border border-neutral-200 bg-white font-medium"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-orange-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-200 font-bold text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold shadow-md shadow-orange-600/20"
                >
                  {editingPujaId ? "Save Changes" : "Publish Pooja Live"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
