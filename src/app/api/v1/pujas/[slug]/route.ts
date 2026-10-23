import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const puja = await db.getPujaByIdOrSlug(slug);

    if (!puja) {
      return NextResponse.json(
        { success: false, message: "Puja not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: puja,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching puja", error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const body = await request.json();

    const updated = await db.updatePuja(slug, body);
    if (!updated) {
      return NextResponse.json(
        { success: false, message: "Puja not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Puja updated successfully in persistent database!",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update puja", error: String(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const success = await db.deletePuja(slug);

    if (!success) {
      return NextResponse.json(
        { success: false, message: "Puja not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Puja deleted successfully from database!",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete puja", error: String(error) },
      { status: 500 }
    );
  }
}
