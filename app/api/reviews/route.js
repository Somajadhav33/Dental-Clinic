import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  const result = await db.query(
    "SELECT * FROM reviews ORDER BY created_at DESC",
  );
  const reviews = result.rows;
  return NextResponse.json(
    {
      reviews: reviews,
      success: true,
    },
    { status: 200 },
  );
}
