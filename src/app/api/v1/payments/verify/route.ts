import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingData,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Missing Razorpay payment verification parameters." },
        { status: 400 }
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { success: false, message: "Server misconfiguration: Key Secret missing." },
        { status: 500 }
      );
    }

    // Verify cryptographic signature
    const hmac = crypto.createHmac("sha256", keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      console.error("Signature mismatch:", { generatedSignature, razorpay_signature });
      return NextResponse.json(
        { success: false, message: "Payment verification failed. Signature mismatch." },
        { status: 400 }
      );
    }

    // Payment Verified! Now create the confirmed booking record in the database
    const booking = await db.createBooking({
      pujaId: bookingData.pujaId,
      pujaTitle: bookingData.pujaTitle || "Special Vedic Puja",
      templeName: bookingData.templeName || "Sacred Temple",
      packageId: bookingData.packageId,
      packageName: bookingData.packageName,
      amount: Number(bookingData.amount) || 501,
      devotees: bookingData.devotees || [bookingData.primaryName],
      primaryName: bookingData.primaryName,
      gotra: bookingData.gotra || "Kashyap",
      rashi: bookingData.rashi || "Not Specified",
      sankalpWish: bookingData.sankalpWish || "Sarva Badha Nivaran & Parivar Kalyan",
      whatsappNumber: bookingData.whatsappNumber,
      includePrasadDelivery: Boolean(bookingData.includePrasadDelivery),
      shippingAddress: bookingData.includePrasadDelivery ? bookingData.shippingAddress : null,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      sankalpDate: bookingData.sankalpDate || "Upcoming Auspicious Muhurat",
    });

    return NextResponse.json({
      success: true,
      message: "Payment successfully verified and Puja booked!",
      data: booking,
    });
  } catch (error: any) {
    console.error("Payment verification route error:", error);
    return NextResponse.json(
      { success: false, message: "Server error during payment verification", error: String(error) },
      { status: 500 }
    );
  }
}
