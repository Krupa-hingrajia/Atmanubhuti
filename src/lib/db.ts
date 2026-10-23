import fs from "fs";
import path from "path";
import crypto from "crypto";
import { PUJAS_DATA, Puja, PujaPackage } from "@/data/pujas";
import { AdminBooking } from "@/utils/adminStore";

export interface AdminUser {
  id: string;
  email: string;
  passwordHash: string;
  salt: string;
  name: string;
  role: "super_admin" | "temple_manager" | "pandit_coordinator";
  createdAt: string;
  lastLoginAt?: string;
}

export interface DatabaseSchema {
  pujas: Puja[];
  bookings: AdminBooking[];
  admins: AdminUser[];
  meta: {
    version: string;
    lastUpdated: string;
  };
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "atma_database.json");

// Helper to hash passwords using native PBKDF2
export function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const effectiveSalt = salt || crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, effectiveSalt, 1000, 64, "sha512").toString("hex");
  return { hash, salt: effectiveSalt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const computed = hashPassword(password, salt);
  return computed.hash === hash;
}

// Initial Admin seed (Password: Atma@1008)
const defaultAdminSalt = "a7f92b49c0e3d18256a49f81";
const defaultAdminHash = hashPassword("Atma@1008", defaultAdminSalt).hash;

const INITIAL_ADMINS: AdminUser[] = [
  {
    id: "admin-master-1",
    email: "admin@atmanubhuti.in",
    passwordHash: defaultAdminHash,
    salt: defaultAdminSalt,
    name: "Pt. Vidyadhar Shastri (Chief Temple Sevak)",
    role: "super_admin",
    createdAt: new Date().toISOString(),
  },
];

// Initial Bookings seed
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
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
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
    createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
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
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&auto=format&fit=crop&q=80",
      ],
      blessingsNote:
        "Pt. Bhaskaracharya Goswami performed 108 Ahutis of Lal Chandan and Rakta Pushpa with your specific Gotra & Name Sankalp. Maa Kamakhya's blessed sindoor and raksha sutra have been energized.",
      sentAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    },
    prasadTracking: {
      courier: "India Post Speed Post",
      trackingNumber: "EW892019482IN",
      dispatchedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
      deliveryStatus: "DISPATCHED",
    },
  },
];

class DatabaseEngine {
  private cache: DatabaseSchema | null = null;

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized() {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }

      if (!fs.existsSync(DB_FILE)) {
        const initialSchema: DatabaseSchema = {
          pujas: [...PUJAS_DATA],
          bookings: [...INITIAL_BOOKINGS],
          admins: [...INITIAL_ADMINS],
          meta: {
            version: "1.0.0",
            lastUpdated: new Date().toISOString(),
          },
        };
        fs.writeFileSync(DB_FILE, JSON.stringify(initialSchema, null, 2), "utf-8");
        this.cache = initialSchema;
      } else {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        this.cache = JSON.parse(raw);
      }
    } catch (err) {
      console.error("Database initialization error:", err);
      // Fallback in-memory
      this.cache = {
        pujas: [...PUJAS_DATA],
        bookings: [...INITIAL_BOOKINGS],
        admins: [...INITIAL_ADMINS],
        meta: {
          version: "1.0.0",
          lastUpdated: new Date().toISOString(),
        },
      };
    }
  }

  private async persist(): Promise<void> {
    if (!this.cache) return;
    this.cache.meta.lastUpdated = new Date().toISOString();
    const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
    try {
      await fs.promises.writeFile(tempFile, JSON.stringify(this.cache, null, 2), "utf-8");
      await fs.promises.rename(tempFile, DB_FILE);
    } catch (err) {
      console.error("Database persist error:", err);
      // Attempt direct write if rename fails
      try {
        fs.writeFileSync(DB_FILE, JSON.stringify(this.cache, null, 2), "utf-8");
      } catch (e) {
        console.error("Direct write failed:", e);
      }
    }
  }

  private lastMtime: number = 0;

  private getDB(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const stats = fs.statSync(DB_FILE);
        if (stats.mtimeMs !== this.lastMtime || !this.cache) {
          const raw = fs.readFileSync(DB_FILE, "utf-8");
          this.cache = JSON.parse(raw);
          this.lastMtime = stats.mtimeMs;
        }
      } else {
        this.ensureInitialized();
      }
    } catch (e) {
      if (!this.cache) {
        this.ensureInitialized();
      }
    }
    return this.cache!;
  }

  // --- PUJAS & PRICING CRUD ---
  async getPujas(filter?: { category?: string; temple?: string; search?: string }): Promise<Puja[]> {
    const db = this.getDB();
    let result = db.pujas;

    if (filter?.category && filter.category !== "all") {
      result = result.filter((p) => p.category === filter.category);
    }
    if (filter?.temple) {
      result = result.filter((p) =>
        p.templeName.toLowerCase().includes(filter.temple!.toLowerCase())
      );
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.templeName.toLowerCase().includes(q) ||
          p.deity.toLowerCase().includes(q)
      );
    }

    return result;
  }

  async getPujaByIdOrSlug(idOrSlug: string): Promise<Puja | undefined> {
    const db = this.getDB();
    const term = idOrSlug.toLowerCase();
    return db.pujas.find((p) => p.id.toLowerCase() === term || p.slug.toLowerCase() === term);
  }

  async createPuja(pujaData: Partial<Puja>): Promise<Puja> {
    const db = this.getDB();
    const id = pujaData.id || "puja-" + Date.now();
    const slug =
      pujaData.slug ||
      (pujaData.title || "vedic-puja")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    const newPuja: Puja = {
      id,
      slug,
      title: pujaData.title || "New Sacred Vedic Puja",
      subTitle: pujaData.subTitle || "Authentic Vedic rituals performed by verified temple priests",
      templeName: pujaData.templeName || "Shri Kashi Vishwanath Jyotirlinga, Varanasi",
      templeLocation: pujaData.templeLocation || "Varanasi, UP",
      deity: pujaData.deity || "Lord Shiva",
      date: pujaData.date || "Upcoming Auspicious Muhurat",
      eventDate:
        pujaData.eventDate ||
        new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      bookingClosesIn: pujaData.bookingClosesIn || "24h : 00m : 00s",
      category: pujaData.category || "puja",
      specialTag: pujaData.specialTag || "Most Auspicious",
      rating: 4.96,
      devoteesCount: 140,
      imageUrl:
        pujaData.imageUrl ||
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80",
      templeImageUrl:
        pujaData.templeImageUrl ||
        pujaData.imageUrl ||
        "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&auto=format&fit=crop&q=80",
      benefits: pujaData.benefits || [
        "Vedic chanting with individual Name and Gotra Sankalp",
        "Direct blessings from holy teerth sthal",
        "Personalized video recording delivered on WhatsApp",
        "Consecrated teerth prasad delivered to home",
      ],
      significance:
        pujaData.significance || "Authentic ritual performed following classical Vedic vidhi.",
      samagri: pujaData.samagri || [
        "Gangajal & Panchamrit",
        "Pure Ghee & Sandalwood",
        "Pushpa, Janeu & Bilva Patra",
      ],
      packages:
        pujaData.packages && pujaData.packages.length > 0
          ? pujaData.packages
          : [
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
                features: ["2 Devotees Sankalp", "Full Video Recording", "Prasad Included"],
              },
              {
                id: "pkg-3",
                name: "Sampoorna Parivar (Family)",
                price: 2100,
                originalPrice: 3100,
                devoteeCount: 5,
                features: ["Up to 5 Family Members", "Special Hawan Ahuti", "VIP Darshan & Prasad"],
              },
            ],
      panditInfo: pujaData.panditInfo || {
        title: "Vedic Acharya & Temple Purohit",
        experience: "15+ Years",
        credentials: "Varanasi Sanskrit Vishwavidyalaya Certified",
      },
    };

    db.pujas.unshift(newPuja);
    await this.persist();
    return newPuja;
  }

  async updatePuja(idOrSlug: string, updates: Partial<Puja>): Promise<Puja | null> {
    const db = this.getDB();
    const term = idOrSlug.toLowerCase();
    const index = db.pujas.findIndex(
      (p) => p.id.toLowerCase() === term || p.slug.toLowerCase() === term
    );
    if (index === -1) return null;

    db.pujas[index] = {
      ...db.pujas[index],
      ...updates,
    };
    await this.persist();
    return db.pujas[index];
  }

  async deletePuja(idOrSlug: string): Promise<boolean> {
    const db = this.getDB();
    const term = idOrSlug.toLowerCase();
    const index = db.pujas.findIndex(
      (p) => p.id.toLowerCase() === term || p.slug.toLowerCase() === term
    );
    if (index === -1) return false;

    db.pujas.splice(index, 1);
    await this.persist();
    return true;
  }

  // --- BOOKINGS CRUD ---
  async getBookings(filter?: { status?: string; phone?: string; bookingId?: string }): Promise<AdminBooking[]> {
    const db = this.getDB();
    let result = db.bookings;

    if (filter?.status && filter.status !== "ALL") {
      result = result.filter((b) => b.status === filter.status);
    }
    if (filter?.bookingId) {
      result = result.filter(
        (b) => b.bookingId.toLowerCase() === filter.bookingId!.toLowerCase()
      );
    }
    if (filter?.phone) {
      const clean = filter.phone.replace(/[^0-9]/g, "");
      result = result.filter((b) => b.whatsappNumber.replace(/[^0-9]/g, "").includes(clean));
    }

    return result;
  }

  async getBookingById(id: string): Promise<AdminBooking | undefined> {
    const db = this.getDB();
    return db.bookings.find((b) => b.bookingId.toLowerCase() === id.toLowerCase());
  }

  async createBooking(data: Partial<AdminBooking>): Promise<AdminBooking> {
    const db = this.getDB();
    const bookingId = data.bookingId || "ATMA-" + Math.floor(100000 + Math.random() * 900000);

    const newBooking: AdminBooking = {
      bookingId,
      pujaId: data.pujaId || "puja-1",
      pujaTitle: data.pujaTitle || "Special Vedic Puja",
      templeName: data.templeName || "Sacred Temple",
      packageId: data.packageId || "pkg-1",
      packageName: data.packageName || "Standard Sankalp",
      amount: Number(data.amount) || 501,
      devotees: data.devotees || ["Devotee"],
      primaryName: data.primaryName || data.devotees?.[0] || "Devotee",
      gotra: data.gotra || "Kashyap",
      rashi: data.rashi || "Not Specified",
      sankalpWish: data.sankalpWish || "Sarva Badha Nivaran & Parivar Kalyan",
      whatsappNumber: data.whatsappNumber || "+91 9876543210",
      includePrasadDelivery: Boolean(data.includePrasadDelivery),
      shippingAddress: data.shippingAddress || null,
      status: "PENDING",
      paymentStatus: "PAID",
      createdAt: new Date().toISOString(),
      sankalpDate: data.sankalpDate || "Upcoming Auspicious Muhurat",
      prasadTracking: data.includePrasadDelivery
        ? {
            courier: "India Post Speed Post",
            trackingNumber: "",
            deliveryStatus: "PENDING",
          }
        : undefined,
    };

    db.bookings.unshift(newBooking);
    await this.persist();
    return newBooking;
  }

  async updateBooking(id: string, updates: Partial<AdminBooking>): Promise<AdminBooking | null> {
    const db = this.getDB();
    const index = db.bookings.findIndex((b) => b.bookingId.toLowerCase() === id.toLowerCase());
    if (index === -1) return null;

    db.bookings[index] = {
      ...db.bookings[index],
      ...updates,
    };
    await this.persist();
    return db.bookings[index];
  }

  // --- AUTH / ADMINS ---
  async getAdminByEmail(email: string): Promise<AdminUser | undefined> {
    const db = this.getDB();
    return db.admins.find((a) => a.email.toLowerCase() === email.toLowerCase());
  }

  async updateAdminLastLogin(id: string): Promise<void> {
    const db = this.getDB();
    const admin = db.admins.find((a) => a.id === id);
    if (admin) {
      admin.lastLoginAt = new Date().toISOString();
      await this.persist();
    }
  }

  // --- STATS ---
  async getStats() {
    const db = this.getDB();
    const bookings = db.bookings;
    const totalRevenue = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const pendingCount = bookings.filter((b) => b.status === "PENDING").length;
    const acceptedCount = bookings.filter(
      (b) => b.status === "ACCEPTED" || b.status === "PANDIT_ASSIGNED"
    ).length;
    const mediaSentCount = bookings.filter(
      (b) => b.status === "MEDIA_SENT" || b.status === "COMPLETED"
    ).length;
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
      totalPujas: db.pujas.length,
    };
  }
}

export const db = new DatabaseEngine();
