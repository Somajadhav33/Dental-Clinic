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

export async function POST(request) {
  const { name, category, description, image_url, is_active, display_order } =
    await request.json();
  const result = await db.query(
    "INSERT INTO services(name , category, description, image_url, is_active, display_order ) VALUES($1, $2, $3, $4, $5, $6)",
    [name, category, description, image_url, is_active, display_order],
  );
  if (result.rowCount === 0) {
    throw new Error("Error while creatig new service");
  }
  return NextResponse.json(
    {
      services: result,
    },
    { status: 200 },
  );
}

export async function PUT(request) {
  const { id, name, category, description, image_url, is_active } =
    await request.json();
  const result = await db.query(
    "UPDATE services SET name = $1, category = $2, description = $3, image_url= $4, is_active=$5 WHERE id=$6",
    [name, category, description, image_url, is_active, id],
  );
  if (result.rowCount === 0) {
    throw new Error("Error While Updating");
  }
  return NextResponse.json(
    {
      services: result,
    },
    { status: 200 },
  );
}
