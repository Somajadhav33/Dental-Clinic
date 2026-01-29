import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const reviews = await db.query("SELECT * FROM reviews");

  return NextResponse.json(reviews.rows, { status: 200 });
}
