import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearAdminSessionCookie();
    return NextResponse.json({
      success: true,
      message: "Successfully signed out of temple admin console.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to sign out", error: String(error) },
      { status: 500 }
    );
  }
}
