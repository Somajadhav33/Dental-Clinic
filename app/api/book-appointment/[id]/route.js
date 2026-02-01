import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;

  const result = await db.query(
    "SELECT * FROM appointments WHERE appointment_id = $1",
    [id],
  );

  if (result.rows.length === 0) {
    return NextResponse.json(
      { error: "Appointment Not Found" },
      { status: 404 },
    );
  }

  const appointment = result.rows[0];

  return NextResponse.json(
    { success: true, data: appointment },
    { status: 200 },
  );
}
