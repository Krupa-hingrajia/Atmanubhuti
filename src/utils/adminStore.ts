import { PUJAS_DATA, TEMPLES_DATA, Puja, Temple, PujaPackage } from "@/data/pujas";

export type BookingStatus =
  | "PENDING"
  | "ACCEPTED"
  | "CONFIRMED"
  | "PANDIT_ASSIGNED"
  | "PUJA_PERFORMED"
  | "MEDIA_SENT"
  | "COMPLETED"
  | "CANCELLED";

export interface AdminBooking {
  bookingId: string;
  pujaId: string;
  pujaTitle: string;
  templeName: string;
  packageId: string;
  packageName: string;
  amount: number;
  devotees: string[];
  primaryName: string;
  gotra: string;
  rashi?: string;
  sankalpWish: string;
  whatsappNumber: string;
  includePrasadDelivery: boolean;
  shippingAddress?: {
    addressLine: string;
    city: string;
    state: string;
    pincode: string;
  } | null;
  status: BookingStatus;
  paymentStatus: "PAID" | "PENDING" | "REFUNDED";
  paymentId?: string;
  orderId?: string;
  createdAt: string;
  sankalpDate: string;
  assignedPandit?: {
    name: string;
    phone: string;
    title: string;
  };
  mediaProof?: {
    videoUrl?: string;
    audioUrl?: string;
    photos?: string[];
    blessingsNote?: string;
    sentAt?: string;
  };
  prasadTracking?: {
    courier: string;
    trackingNumber: string;
    dispatchedAt?: string;
    deliveryStatus: "PENDING" | "DISPATCHED" | "DELIVERED";
  };
}

// Initial realistic devotee bookings data
const INITIAL_BOOKINGS: AdminBooking[] = [
  {
    bookingId: "ATMA-942183",
    pujaId: "shani-pradosh-rudrabhishek",
    pujaTitle: "Shani Pradosh Special: Maha Rudrabhishek & 1008 Bilvapatra Arpan",
    templeName: "Shri Kashi Vishwanath Jyotirlinga, Varanasi",
    packageId: "pkg-couple",
    packageName: "Dampati (Couple) Seva",
    amount: 1100,
    primaryName: "Rahul Sharma",
    devotees: ["Rahul Sharma", "Sunita Sharma"],
    gotra: "Kashyap",
    rashi: "Makar (Capricorn)",
    sankalpWish: "For health recovery of family and Shani Dosh shanti in new business enterprise.",
    whatsappNumber: "+91 98765 43210",
    includePrasadDelivery: true,
    shippingAddress: {
      addressLine: "B-402, Royal Palms, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
    },
    status: "PENDING",
    paymentStatus: "PAID",
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 mins ago
    sankalpDate: "2026-10-24 (Upcoming Shani Pradosh)",
    prasadTracking: {
      courier: "India Post Speed Post",
      trackingNumber: "",
      deliveryStatus: "PENDING",
    },
  },
  {
    bookingId: "ATMA-831920",
    pujaId: "mahakal-bhasma-aarti",
    pujaTitle: "Maha Shivratri Mahakaleshwar Bhasma Aarti & Maha Mrityunjaya Anushthan",
    templeName: "Shree Mahakaleshwar Jyotirlinga, Ujjain",
    packageId: "pkg-individual",
    packageName: "Individual Sankalp",
    amount: 751,
    primaryName: "Amitabh Verma",
    devotees: ["Amitabh Verma"],
    gotra: "Bharadwaj",
    rashi: "Kumbha (Aquarius)",
    sankalpWish: "Long life, protection from accidental hazards, and divine peace.",
    whatsappNumber: "+91 99887 76655",
    includePrasadDelivery: false,
    status: "ACCEPTED",
    paymentStatus: "PAID",
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(), // 3 hours ago
    sankalpDate: "2026-10-22 (Brahma Muhurat)",
    assignedPandit: {
      name: "Pt. Radheshyam Shastri",
      phone: "+91 94250 11223",
      title: "Senior Purohit, Mahakal Peeth",
    },
  },
  {
    bookingId: "ATMA-712390",
    pujaId: "kamakhya-devi-sarva-badha",
    pujaTitle: "Maa Kamakhya Sarva Badha Nivaran Tantra Puja",
    templeName: "Maa Kamakhya Shaktipeeth, Guwahati",
    packageId: "pkg-family",
    packageName: "Sampoorna Parivar Seva (4 Devotees)",
    amount: 2100,
    primaryName: "Meenakshi Iyer",
    devotees: ["Meenakshi Iyer", "S. Venkatachalam", "Aditya Iyer", "Kavya Iyer"],
    gotra: "Vashistha",
    rashi: "Vrishabha (Taurus)",
    sankalpWish: "Removal of chronic negative vibrations, planetary obstacles, and child's higher education success.",
    whatsappNumber: "+91 97112 34567",
    includePrasadDelivery: true,
    shippingAddress: {
      addressLine: "Flat 12B, Skylark Apartments, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
    },
    status: "MEDIA_SENT",
    paymentStatus: "PAID",
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    sankalpDate: "2026-10-18 (Ashwin Shukla Ashtami)",
    assignedPandit: {
      name: "Pt. Bhaskaracharya Goswami",
      phone: "+91 98640 99881",
      title: "Tantracharya, Kamakhya Peeth",
    },
    mediaProof: {
      videoUrl: "https://www.youtube.com/watch?v=kYJvB0K97a4",
      audioUrl: "https://atmanubhuti.in/audio/sankalp-kamakhya-712390.mp3",
      photos: [
        "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=800&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80"
      ],
      blessingsNote: "Pt. Bhaskaracharya Goswami performed 108 Ahutis of Lal Chandan and Rakta Pushpa with your specific Gotra & Name Sankalp. Maa Kamakhya's blessed sindoor and raksha sutra have been energized.",
      sentAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    },
    prasadTracking: {
      courier: "India Post Speed Post",
      trackingNumber: "EW892019482IN",
      dispatchedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      deliveryStatus: "DISPATCHED",
    },
  },
  {
    bookingId: "ATMA-651209",
    pujaId: "triyuginarayan-vivah",
    pujaTitle: "Triyuginarayan Akhand Dhuni Vivah & Sambandh Kalyankari Hawan",
    templeName: "Triyuginarayan Temple, Rudraprayag",
    packageId: "pkg-couple",
    packageName: "Dampati (Couple) Seva",
    amount: 1501,
    primaryName: "Vikramaditya Joshi",
    devotees: ["Vikramaditya Joshi", "Priyanka Joshi"],
    gotra: "Kashyap",
    rashi: "Simha (Leo)",
    sankalpWish: "Marital harmony, happy family life, and eternal blessings of Shiva-Parvati.",
    whatsappNumber: "+91 98200 44556",
    includePrasadDelivery: true,
    shippingAddress: {
      addressLine: "Row House #7, Green Meadows, Baner",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411045",
    },
    status: "PUJA_PERFORMED",
    paymentStatus: "PAID",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    sankalpDate: "2026-10-19 (Shukla Dashami)",
    assignedPandit: {
      name: "Pt. Girish Chand Semwal",
      phone: "+91 94120 77665",
      title: "Mukhya Pujari, Triyuginarayan",
    },
    prasadTracking: {
      courier: "Delhivery Surface",
      trackingNumber: "DLH9928103847",
      deliveryStatus: "PENDING",
    },
  },
];

// Global in-memory singleton to persist during server runtime
declare global {
  // eslint-disable-next-line no-var
  var __atma_admin_bookings: AdminBooking[] | undefined;
  // eslint-disable-next-line no-var
  var __atma_admin_pujas: Puja[] | undefined;
}

if (!globalThis.__atma_admin_bookings) {
  globalThis.__atma_admin_bookings = [...INITIAL_BOOKINGS];
}

if (!globalThis.__atma_admin_pujas) {
  globalThis.__atma_admin_pujas = [...PUJAS_DATA];
}

export const adminStore = {
  // Bookings Methods
  getBookings: (): AdminBooking[] => {
    return globalThis.__atma_admin_bookings || [];
  },

  getBookingById: (id: string): AdminBooking | undefined => {
    return (globalThis.__atma_admin_bookings || []).find(
      (b) => b.bookingId.toLowerCase() === id.toLowerCase()
    );
  },

  addBooking: (booking: Partial<AdminBooking>): AdminBooking => {
    const bookingId = booking.bookingId || "ATMA-" + Math.floor(100000 + Math.random() * 900000);
    const newBooking: AdminBooking = {
      bookingId,
      pujaId: booking.pujaId || "shani-pradosh-rudrabhishek",
      pujaTitle: booking.pujaTitle || "Special Vedic Puja",
      templeName: booking.templeName || "Sacred Teerth Kshetra",
      packageId: booking.packageId || "pkg-individual",
      packageName: booking.packageName || "Standard Sankalp",
      amount: booking.amount || 501,
      devotees: booking.devotees || ["Devotee"],
      primaryName: booking.primaryName || booking.devotees?.[0] || "Devotee",
      gotra: booking.gotra || "Kashyap",
      rashi: booking.rashi || "Not Specified",
      sankalpWish: booking.sankalpWish || "Sarva Badha Nivaran & Parivar Kalyan",
      whatsappNumber: booking.whatsappNumber || "+91 9876543210",
      includePrasadDelivery: Boolean(booking.includePrasadDelivery),
      shippingAddress: booking.shippingAddress || null,
      status: "PENDING",
      paymentStatus: "PAID",
      createdAt: new Date().toISOString(),
      sankalpDate: booking.sankalpDate || "Upcoming Auspicious Muhurat",
      prasadTracking: booking.includePrasadDelivery
        ? {
            courier: "India Post Speed Post",
            trackingNumber: "",
            deliveryStatus: "PENDING",
          }
        : undefined,
    };

    if (!globalThis.__atma_admin_bookings) {
      globalThis.__atma_admin_bookings = [];
    }
    globalThis.__atma_admin_bookings.unshift(newBooking);
    return newBooking;
  },

  updateBookingStatus: (id: string, status: BookingStatus): AdminBooking | null => {
    const list = globalThis.__atma_admin_bookings || [];
    const index = list.findIndex((b) => b.bookingId.toLowerCase() === id.toLowerCase());
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      status,
    };
    return list[index];
  },

  assignPandit: (
    bookingId: string,
    panditInfo: { name: string; phone: string; title: string }
  ): AdminBooking | null => {
    const list = globalThis.__atma_admin_bookings || [];
    const index = list.findIndex((b) => b.bookingId.toLowerCase() === bookingId.toLowerCase());
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      status: list[index].status === "PENDING" ? "ACCEPTED" : list[index].status,
      assignedPandit: panditInfo,
    };
    return list[index];
  },

  uploadMediaProof: (
    bookingId: string,
    media: { videoUrl?: string; audioUrl?: string; photos?: string[]; blessingsNote?: string }
  ): AdminBooking | null => {
    const list = globalThis.__atma_admin_bookings || [];
    const index = list.findIndex((b) => b.bookingId.toLowerCase() === bookingId.toLowerCase());
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      status: "MEDIA_SENT",
      mediaProof: {
        ...media,
        sentAt: new Date().toISOString(),
      },
    };
    return list[index];
  },

  updatePrasadTracking: (
    bookingId: string,
    tracking: { courier: string; trackingNumber: string; deliveryStatus: "PENDING" | "DISPATCHED" | "DELIVERED" }
  ): AdminBooking | null => {
    const list = globalThis.__atma_admin_bookings || [];
    const index = list.findIndex((b) => b.bookingId.toLowerCase() === bookingId.toLowerCase());
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      prasadTracking: {
        ...tracking,
        dispatchedAt: tracking.deliveryStatus === "DISPATCHED" ? new Date().toISOString() : undefined,
      },
      status: tracking.deliveryStatus === "DISPATCHED" && list[index].status === "MEDIA_SENT" ? "COMPLETED" : list[index].status,
    };
    return list[index];
  },

  // Pujas Methods
  getPujas: (): Puja[] => {
    return globalThis.__atma_admin_pujas || [];
  },

  getPujaById: (id: string): Puja | undefined => {
    return (globalThis.__atma_admin_pujas || []).find((p) => p.id === id || p.slug === id);
  },

  addPuja: (puja: Partial<Puja>): Puja => {
    const id = puja.id || "puja-" + Date.now();
    const slug = puja.slug || (puja.title || "puja").toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    const newPuja: Puja = {
      id,
      slug,
      title: puja.title || "New Sacred Vedic Puja",
      subTitle: puja.subTitle || "Authentic Vedic rituals performed by verified temple priests",
      templeName: puja.templeName || "Shri Kashi Vishwanath, Varanasi",
      templeLocation: puja.templeLocation || "Varanasi, UP",
      deity: puja.deity || "Lord Shiva",
      date: puja.date || "Upcoming Auspicious Muhurat",
      eventDate: puja.eventDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      bookingClosesIn: puja.bookingClosesIn || "24h : 00m : 00s",
      category: puja.category || "puja",
      specialTag: puja.specialTag || "Newly Added",
      rating: 4.95,
      devoteesCount: 120,
      imageUrl: puja.imageUrl || "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80",
      templeImageUrl: puja.templeImageUrl || "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80",
      benefits: puja.benefits || [
        "Vedic chanting with individual Name and Gotra Sankalp",
        "Direct blessings from holy teerth sthal",
        "Personalized video recording delivered on WhatsApp",
        "Consecrated teerth prasad delivered to home"
      ],
      significance: puja.significance || "Authentic ritual performed following classical Vedic vidhi.",
      samagri: puja.samagri || [
        "Gangajal & Panchamrit",
        "Pure Ghee & Sandalwood",
        "Pushpa, Janeu & Bilva Patra"
      ],
      packages: puja.packages && puja.packages.length > 0 ? puja.packages : [
        {
          id: "pkg-1",
          name: "Individual Sankalp",
          price: 501,
          originalPrice: 751,
          devoteeCount: 1,
          features: ["1 Devotee Name & Gotra", "Sankalp Video via WhatsApp", "Digital Certificate"]
        },
        {
          id: "pkg-2",
          name: "Dampati (Couple) Seva",
          price: 1100,
          originalPrice: 1550,
          devoteeCount: 2,
          badge: "Popular",
          features: ["2 Devotees Sankalp", "Full Video Recording", "Prasad Included"]
        },
        {
          id: "pkg-3",
          name: "Sampoorna Parivar (Family)",
          price: 2100,
          originalPrice: 3100,
          devoteeCount: 5,
          features: ["Up to 5 Family Members", "Special Hawan Ahuti", "VIP Darshan & Prasad"]
        }
      ],
      panditInfo: puja.panditInfo || {
        title: "Vedic Acharya & Temple Purohit",
        experience: "15+ Years",
        credentials: "Varanasi Sanskrit Vishwavidyalaya Certified"
      }
    };

    if (!globalThis.__atma_admin_pujas) {
      globalThis.__atma_admin_pujas = [];
    }
    globalThis.__atma_admin_pujas.unshift(newPuja);
    return newPuja;
  },

  updatePuja: (id: string, updates: Partial<Puja>): Puja | null => {
    const list = globalThis.__atma_admin_pujas || [];
    const index = list.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates,
    };
    return list[index];
  },

  deletePuja: (id: string): boolean => {
    const list = globalThis.__atma_admin_pujas || [];
    const index = list.findIndex((p) => p.id === id || p.slug === id);
    if (index === -1) return false;
    list.splice(index, 1);
    return true;
  },

  getStats: () => {
    const bookings = globalThis.__atma_admin_bookings || [];
    const pujas = globalThis.__atma_admin_pujas || [];

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
    const acceptedCount = bookings.filter((b) => b.status === "ACCEPTED" || b.status === "PANDIT_ASSIGNED").length;
    const mediaSentCount = bookings.filter((b) => b.status === "MEDIA_SENT" || b.status === "COMPLETED").length;
    const prasadPendingCount = bookings.filter(
      (b) => b.includePrasadDelivery && b.prasadTracking?.deliveryStatus !== "DELIVERED"
    ).length;

    return {
      totalRevenue,
      totalBookings: bookings.length,
      pendingCount,
      acceptedCount,
      mediaSentCount,
      prasadPendingCount,
      totalPujas: pujas.length,
    };
  },
};
