import crypto from "crypto";
import { cookies } from "next/headers";
import { db, AdminUser } from "@/lib/db";

const AUTH_SECRET = process.env.AUTH_SECRET || "atmanubhuti_sacred_secret_key_89218931289";
const SESSION_COOKIE_NAME = "atma_admin_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionPayload {
  adminId: string;
  email: string;
  name: string;
  role: string;
  exp: number;
}

// Generate HMAC signed token
export function signToken(payload: SessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(data)
    .digest("base64url");
  return `${data}.${signature}`;
}

// Verify token
export function verifyToken(token: string): SessionPayload | null {
  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return null;

    const expectedSignature = crypto
      .createHmac("sha256", AUTH_SECRET)
      .update(data)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(expectedSignature)
      )
    ) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(
      Buffer.from(data, "base64url").toString("utf-8")
    );

    if (Date.now() > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch (err) {
    return null;
  }
}

// Set session in HttpOnly cookie
export async function setAdminSessionCookie(admin: AdminUser): Promise<string> {
  const payload: SessionPayload = {
    adminId: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    exp: Date.now() + SESSION_DURATION_MS,
  };

  const token = signToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });

  return token;
}

// Clear session cookie on logout
export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

// Get currently authenticated admin from Bearer header or cookie
export async function getCurrentAdmin(req?: Request): Promise<SessionPayload | null> {
  try {
    // 1. Check Authorization header first (Bearer token)
    if (req) {
      const authHeader = req.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7).trim();
        const verified = verifyToken(token);
        if (verified) return verified;
      }
    }

    // 2. Check Cookie
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (token) {
      const verified = verifyToken(token);
      if (verified) return verified;
    }

    return null;
  } catch (err) {
    return null;
  }
}
