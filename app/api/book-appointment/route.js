import db from "@/lib/db";
import { NextResponse } from "next/server";
import { success } from "zod";

export async function GET(request) {
  const result = await db.query("SELECT * FROM appointments");
  return NextResponse.json({ success: true, data: result });
}

export async function POST(request) {
  try {
    const {
      patient_name,
      phone,
      email,
      service,
      appointment_date,
      appointment_time,
      clinic,
      notes,
    } = await request.json();

    if (
      !patient_name ||
      !phone ||
      !service ||
      !appointment_date ||
      !appointment_time ||
      !clinic
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();

    const uniqueId =
      "AABHA-" +
      clinic.slice(0, 2).toUpperCase() +
      phone.slice(-3) +
      "-" +
      rand;
    const now = new Date();
    const createdAt = now.toISOString();

    const result = await db.query(
      "INSERT INTO appointments(name, phone, email, service_name, preferred_date, preferred_time, status, notes, created_at, appointment_id, at) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        patient_name,
        phone,
        email || null,
        service,
        appointment_date,
        appointment_time,
        "pending",
        notes || null,
        createdAt,
        uniqueId,
        clinic,
      ],
    );

    return NextResponse.json(
      {
        success: true,
        appointment: result.rows[0],
        message: "Appointment booked successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  const { id, newStatus } = await request.json();
  try {
    const result = await db.query(
      "UPDATE appointments SET status=$1 WHERE id = $2",
      [newStatus, id],
    );
    if (result.rowCount === 0) {
      throw new Error("Appointment Not Found!!");
    }
    return NextResponse.json({
      status: "success",
      message: "Status Changed Successfully",
    });
  } catch (error) {
    console.error(error);
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  const result = await db.query("DELETE FROM appointments where id=$1", [id]);
  if (result.rowCount === 0) {
    throw new Error("Error while deleting ");
  }
  return NextResponse.json({
    status: "success",
    message: "Appointment deleted successfully",
  });
}
