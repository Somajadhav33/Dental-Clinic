import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const services = (await db.query("SELECT * FROM services")).rows;
  const categories = (await db.query("SELECT DISTINCT category FROM services"))
    .rows;

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
    "INSERT INTO services(name, category, description, image_url, is_active, display_order) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
    [name, category, description, image_url, is_active, display_order],
  );
  if (result.rowCount === 0) {
    throw new Error("Error while creating new service");
  }
  return NextResponse.json(result.rows[0], { status: 200 });
}

export async function PUT(request) {
  const { id, name, category, description, image_url, is_active } =
    await request.json();
  const result = await db.query(
    "UPDATE services SET name = $1, category = $2, description = $3, image_url = $4, is_active = $5 WHERE id = $6 RETURNING *",
    [name, category, description, image_url, is_active, id],
  );
  if (result.rowCount === 0) {
    throw new Error("Error while updating");
  }
  return NextResponse.json(result.rows[0], { status: 200 });
}

export async function DELETE(request) {
  const { id } = await request.json();
  const result = await db.query(
    "DELETE FROM services WHERE id = $1 RETURNING *",
    [id],
  );
  if (result.rowCount === 0) {
    throw new Error("Error while deleting service");
  }
  return NextResponse.json(
    {
      message: "Service deleted successfully",
      deleted: result.rows[0],
    },
    { status: 200 },
  );
}
