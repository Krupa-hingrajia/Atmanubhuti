import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const admin = await getCurrentAdmin(request);
    if (!admin) {
      return NextResponse.json(
        { success: false, authenticated: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      data: admin,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, authenticated: false, error: String(error) },
      { status: 500 }
    );
  }
}
