import db from "@/lib/db";
import { NextResponse } from "next/server";

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
