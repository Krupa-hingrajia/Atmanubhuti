import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { BookingStatus } from "@/utils/adminStore";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const booking = await db.getBookingById(id);

    if (!booking) {
      return NextResponse.json(
        { success: false, message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error retrieving booking", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { action } = body;

    let updated = null;

    if (action === "ACCEPT") {
      updated = await db.updateBooking(id, { status: "ACCEPTED" });
    } else if (action === "ASSIGN_PANDIT") {
      const { name, phone, title } = body;
      const current = await db.getBookingById(id);
      const newStatus = current?.status === "PENDING" ? "ACCEPTED" : current?.status;
      updated = await db.updateBooking(id, {
        status: newStatus,
        assignedPandit: { name, phone, title },
      });
    } else if (action === "UPLOAD_MEDIA") {
      const { videoUrl, audioUrl, photos, blessingsNote } = body;
      updated = await db.updateBooking(id, {
        status: "MEDIA_SENT",
        mediaProof: {
          videoUrl,
          audioUrl,
          photos,
          blessingsNote,
          sentAt: new Date().toISOString(),
        },
      });
    } else if (action === "UPDATE_PRASAD") {
      const { courier, trackingNumber, deliveryStatus } = body;
      const current = await db.getBookingById(id);
      const newStatus =
        deliveryStatus === "DISPATCHED" && current?.status === "MEDIA_SENT"
          ? "COMPLETED"
          : current?.status;

      updated = await db.updateBooking(id, {
        status: newStatus,
        prasadTracking: {
          courier,
          trackingNumber,
          dispatchedAt: deliveryStatus === "DISPATCHED" ? new Date().toISOString() : undefined,
          deliveryStatus: deliveryStatus || "DISPATCHED",
        },
      });
    } else if (action === "UPDATE_STATUS") {
      const { status } = body as { status: BookingStatus };
      updated = await db.updateBooking(id, { status });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid action specified" },
        { status: 400 }
      );
    }

    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Booking not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Action ${action} executed successfully in database!`,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update booking", error: String(error) },
      { status: 500 }
    );
  }
}
