import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await db.query("SELECT * FROM contactmessages");
  return NextResponse.json({
    data: data.rows,
    status: "Success",
  });
}

export async function POST(request) {
  const { name, phone, email, message } = await request.json();
  const status = "pending";
  const now = new Date();
  const createdAt = now.toISOString();
  try {
    const cnMessage = await db.query(
      "INSERT INTO contactmessages(name, phone, email, status, created_at, messages) VALUES($1,$2,$3,$4,$5,$6)",
      [name, phone, email, status, createdAt, message],
    );

    if (cnMessage) {
      return NextResponse.json({
        status: "Success",
        message: "We got Your Message",
      });
    }
  } catch (error) {
    console.log(error);
  }
  return NextResponse.json({
    status: "Success",
    message: "We got Your Message",
  });
}
