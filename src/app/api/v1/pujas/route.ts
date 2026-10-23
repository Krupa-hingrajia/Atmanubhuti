import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const temple = searchParams.get("temple");
    const search = searchParams.get("search");

    const pujas = await db.getPujas({
      category: category || undefined,
      temple: temple || undefined,
      search: search || undefined,
    });

    return NextResponse.json({
      success: true,
      count: pujas.length,
      data: pujas,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch pujas", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.templeName) {
      return NextResponse.json(
        { success: false, message: "Puja title and temple name are required." },
        { status: 400 }
      );
    }

    const createdPuja = await db.createPuja(body);
    return NextResponse.json(
      {
        success: true,
        message: "Puja created successfully and saved permanently in database!",
        data: createdPuja,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create puja",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
