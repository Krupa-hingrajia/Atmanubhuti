import { NextResponse } from "next/server";
import { TEMPLES_DATA } from "@/data/pujas";

export async function GET() {
  return NextResponse.json({
    success: true,
    count: TEMPLES_DATA.length,
    data: TEMPLES_DATA,
  });
}
