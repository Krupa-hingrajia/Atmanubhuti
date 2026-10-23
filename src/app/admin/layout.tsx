"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Flame,
  CalendarCheck,
  Video,
  Package,
  ArrowUpRight,
  Bell,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Menu,
  X,
  Clock,
  PlusCircle,
  ExternalLink,
  Layers,
  Headphones,
  CheckCircle2,
  LogOut,
  UserCheck,
  Compass
} from "lucide-react";
import { getVedicPanchang } from "@/utils/panchang";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // If on /admin/login, bypass the admin sidebar & header
  const isLoginPage = pathname === "/admin/login" || pathname?.startsWith("/admin/login");

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentAdmin, setCurrentAdmin] = useState<any>({
    id: "admin-master-1",
    email: "admin@atmanubhuti.in",
    name: "Pt. Vidyadhar Shastri (Chief Temple Sevak)",
    role: "super_admin",
  });
  const [authChecking, setAuthChecking] = useState(false);

  useEffect(() => {
    if (isLoginPage) return;

    // Verify session with credentials and Bearer header fallback
    const token = typeof window !== "undefined" ? localStorage.getItem("atma_admin_token") : null;
    const isAuthed = typeof window !== "undefined" && localStorage.getItem("atma_admin_authenticated") === "true";
    const headers: Record<string, string> = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    fetch("/api/v1/auth/me", { credentials: "include", headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.authenticated) {
          setCurrentAdmin(data.data);
        } else if (!isAuthed && !token) {
          if (typeof window !== "undefined" && !window.location.pathname.includes("/admin/login")) {
            window.location.href = "/admin/login";
          }
        }
      })
      .catch(() => {
        // On network fluctuation, don't kick out an already authenticated admin
      });

    // Fetch stats for live pending badge
    fetch("/api/v1/admin/stats", { headers })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPendingCount(data.data.pendingCount);
        }
      })
      .catch((err) => console.log("Stats fetch:", err));

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("atma_admin_token");
          localStorage.removeItem("atma_admin_authenticated");
        } catch (e) {}
      }
      await fetch("/api/v1/auth/logout", { method: "POST" });
      window.location.href = "/admin/login";
    } catch (err) {
      window.location.href = "/admin/login";
    }
  };

  // If rendering the login page, render cleanly without dashboard frame
  if (isLoginPage) {
    return <>{children}</>;
  }

  const navLinks = [
    {
      name: "Dashboard Overview",
      hindi: "डैशबोर्ड अवलोकन",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Pooja & Pricing",
      hindi: "पूजा एवं मूल्य प्रबंधन",
      href: "/admin/pujas",
      icon: Flame,
      badge: null,
    },
    {
      name: "Devotee Bookings",
      hindi: "संकल्प व बुकिंग्स",
      href: "/admin/bookings",
      icon: CalendarCheck,
      badge: pendingCount > 0 ? `${pendingCount} Pending` : null,
      badgeColor: "bg-amber-500 text-white animate-pulse",
    },
    {
      name: "Video & Audio Proof",
      hindi: "पूजा वीडियो व प्रमाण",
      href: "/admin/media",
      icon: Video,
      badge: "Fulfillment",
      badgeColor: "bg-emerald-100 text-emerald-800",
    },
    {
      name: "Prasad Dispatch",
      hindi: "प्रसाद वितरण ट्रैकिंग",
      href: "/admin/prasad",
      icon: Package,
      badge: null,
    },
    {
      name: "Panchang & Muhurats",
      hindi: "दैनिक पंचांग व मुहूर्त",
      href: "/admin/panchang",
      icon: Compass,
      badge: "Vedic",
      badgeColor: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-neutral-900 flex flex-col md:flex-row antialiased font-sans">
      {/* Session Verification Overlay - keeps children mounted to avoid dropped segment error */}
      {authChecking && (
        <div className="fixed inset-0 z-[100] bg-[#140E0C] flex flex-col items-center justify-center text-white space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-2xl animate-aura shadow-lg">
            🪔
          </div>
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-serif text-amber-200">Verifying Temple Administrator Session...</p>
        </div>
      )}
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-neutral-900 text-white border-b border-neutral-800 sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg bg-neutral-800 text-neutral-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-sm font-bold shadow-xs">
              🕉️
            </span>
            <span className="font-serif font-black tracking-wide text-amber-300 text-sm">
              Atmanubhuti Ops
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-[11px] font-medium text-amber-300 hover:underline flex items-center gap-1 bg-neutral-800 px-2.5 py-1 rounded-md"
          >
            Customer View <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-72 bg-[#1A1412] text-neutral-200 border-r border-[#2C221E] flex flex-col justify-between z-50 transition-transform duration-300 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand & Mandir Header */}
        <div>
          <div className="p-6 border-b border-[#2C221E]/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 flex items-center justify-center text-xl shadow-lg shadow-orange-500/20 border border-amber-300/30">
                  🪔
                </div>
                <div>
                  <h1 className="font-serif font-black text-lg tracking-wider text-amber-200">
                    ATMANUBHUTI
                  </h1>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-orange-400">
                    Temple Ops & Admin
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 px-3 py-2 rounded-xl bg-[#261C18] border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-neutral-300 font-medium">Mandir Network:</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400">
                12 Active Peeths
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 overflow-y-auto max-h-[calc(100vh-320px)]">
            <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 px-3 py-2">
              Management Portals
            </div>

            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                link.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? "bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-600/30 border border-amber-400/40"
                      : "text-neutral-400 hover:text-amber-200 hover:bg-[#251D19]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-white" : "text-amber-500/80"
                      }`}
                    />
                    <div>
                      <div className="leading-tight">{link.name}</div>
                      <div
                        className={`text-[10px] font-normal opacity-70 ${
                          isActive ? "text-amber-100" : "text-neutral-500"
                        }`}
                      >
                        {link.hindi}
                      </div>
                    </div>
                  </div>

                  {link.badge && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        link.badgeColor || "bg-neutral-800 text-neutral-300"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Status & Switcher */}
        <div className="p-4 border-t border-[#2C221E] space-y-2.5 bg-[#15100E]">
          {/* Admin Profile Card */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#211815] border border-amber-500/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-amber-600/30 text-amber-300 font-bold flex items-center justify-center text-xs border border-amber-500/40 shrink-0">
                {currentAdmin?.name ? currentAdmin.name.charAt(0) : "A"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-neutral-200 truncate">
                  {currentAdmin?.name || "Admin Sevak"}
                </div>
                <div className="text-[10px] text-amber-400/80 truncate">
                  {currentAdmin?.email || "admin@atmanubhuti.in"}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-neutral-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all text-center"
          >
            <span>Live Devotee Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Administrative Work Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="bg-white/95 backdrop-blur-md border-b border-orange-100 px-6 py-4 sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-neutral-500">
                <span>Temple Operations Console</span>
                <ChevronRight className="w-3 h-3 text-neutral-400" />
                <span className="font-semibold text-orange-600 capitalize">
                  {pathname === "/admin"
                    ? "Overview Dashboard"
                    : pathname.replace("/admin/", "").replace(/-/g, " ")}
                </span>
              </div>
              <h2 className="text-xl font-serif font-black text-neutral-900 mt-0.5">
                {pathname === "/admin" && "Sanatan Puja Operations & Control"}
                {pathname.includes("/pujas") && "Pooja Catalog & Pricing Setup"}
                {pathname.includes("/bookings") && "Devotee Sankalps & Live Bookings"}
                {pathname.includes("/media") && "Video & Audio Proof Fulfillment Station"}
                {pathname.includes("/prasad") && "Consecrated Prasad Parcel Dispatch"}
                {pathname.includes("/panchang") && "Temple Panchang, Choghadiya & Sankalp Muhurats"}
              </h2>
            </div>
          </div>

          {/* Quick Actions & Live Panchang Clock */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/panchang"
              className="hidden lg:flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-xl border border-amber-200/80 text-xs font-semibold transition-colors"
              title="पंचांग व चौघड़िया देखें"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
              <span>{currentTime || "Live Vedic Muhurat"}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </Link>

            <Link
              href="/admin/pujas"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 shadow-md shadow-orange-500/20 border border-amber-400/40 transition-all hover:scale-[1.02]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Pooja / Seva</span>
            </Link>

            <Link
              href="/admin/bookings"
              className="relative p-2 rounded-xl bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200 transition-colors"
              title="Pending Bookings"
            >
              <Bell className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[9px] font-bold flex items-center justify-center animate-pulse">
                  {pendingCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-neutral-600 hover:text-red-600 hover:bg-red-50 border border-neutral-200 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
