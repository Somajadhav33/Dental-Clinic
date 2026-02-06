import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const faq = (await db.query("SELECT * FROM faq")).rows;

  return NextResponse.json(faq, { status: 200 });
}
