import { sendEmail } from "@/lib/email";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { to, subject, text, html } = await request.json();

    await sendEmail({
      to,
      subject,
      text,
      html,
    });

    return NextResponse.json(
      { success: true, message: "Reminder sent successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Email error:", error);

    return NextResponse.json(
      { success: false, message: "Failed to send reminder" },
      { status: 500 },
    );
  }
}
