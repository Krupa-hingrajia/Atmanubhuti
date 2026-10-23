import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const phone = searchParams.get("phone");
    const bookingId = searchParams.get("bookingId");
    const status = searchParams.get("status");

    const bookings = await db.getBookings({
      phone: phone || undefined,
      bookingId: bookingId || undefined,
      status: status || undefined,
    });

    return NextResponse.json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      pujaId,
      pujaTitle,
      templeName,
      packageId,
      packageName,
      amount,
      devotees,
      primaryName,
      gotra,
      rashi,
      sankalpWish,
      whatsappNumber,
      includePrasadDelivery,
      shippingAddress,
    } = body;

    if (!pujaId || !packageId || !devotees || devotees.length === 0 || !whatsappNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required fields (Puja, Package, Devotee Name, WhatsApp Number).",
        },
        { status: 400 }
      );
    }

    // Save into persistent database
    const bookingRecord = await db.createBooking({
      pujaId,
      pujaTitle: pujaTitle || "Special Vedic Puja",
      templeName: templeName || "Sacred Temple",
      packageId,
      packageName,
      amount: Number(amount) || 501,
      devotees,
      primaryName: primaryName || devotees[0],
      gotra: gotra || "Kashyap",
      rashi: rashi || "Not Specified",
      sankalpWish: sankalpWish || "Sarva Badha Nivaran & Parivar Kalyan",
      whatsappNumber,
      includePrasadDelivery: Boolean(includePrasadDelivery),
      shippingAddress: includePrasadDelivery ? shippingAddress : null,
      status: "PENDING",
      paymentStatus: "PAID",
      sankalpDate: "Upcoming Auspicious Muhurat",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Sankalp & Puja booking confirmed successfully! Our temple admin will review and assign Panditji shortly.",
        data: bookingRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to process booking",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
