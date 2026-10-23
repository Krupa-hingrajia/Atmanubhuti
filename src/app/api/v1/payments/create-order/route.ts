import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, pujaTitle, primaryName, whatsappNumber } = body;

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid dakshina amount" },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, message: "Razorpay credentials not configured on server" },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const receiptId = `atma_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // amount in smallest currency unit (paise)
      currency: "INR",
      receipt: receiptId,
      notes: {
        platform: "Atmanubhuti Vedic Platform",
        pujaTitle: String(pujaTitle || "Vedic Puja"),
        devoteeName: String(primaryName || "Devotee"),
        contact: String(whatsappNumber || ""),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: keyId,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Failed to create Razorpay order",
      },
      { status: 500 }
    );
  }
}
