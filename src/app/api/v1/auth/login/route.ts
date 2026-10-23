import { NextResponse } from "next/server";
import { db, verifyPassword } from "@/lib/db";
import { setAdminSessionCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please provide both email and password." },
        { status: 400 }
      );
    }

    const admin = await db.getAdminByEmail(email.trim());
    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const isValid = verifyPassword(password, admin.passwordHash, admin.salt);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Set secure cookie and return token
    const token = await setAdminSessionCookie(admin);
    await db.updateAdminLastLogin(admin.id);

    return NextResponse.json({
      success: true,
      token,
      message: `Pranam ${admin.name}! Successfully authenticated.`,
      data: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Authentication server error", error: String(error) },
      { status: 500 }
    );
  }
}
