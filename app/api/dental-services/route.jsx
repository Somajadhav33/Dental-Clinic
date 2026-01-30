import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const services = (await db.query("SELECT * FROM services")).rows;
  const categories = (await db.query("SELECT id, name FROM services")).rows;

  return NextResponse.json(
    {
      services: services,
      categories: categories,
    },
    { status: 200 },
  );
}

export async function POST(request) {}
