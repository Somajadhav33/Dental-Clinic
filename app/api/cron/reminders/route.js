import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function GET(request) {
  try {
    // security
    const secret = request.headers.get("authorization");
    if (secret !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let sent24h = 0;
    let sent4h = 0;

    // 24 hour wala reminder

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0];

    const appointments24h = await db.query(
      `SELECT * FROM appointments 
       WHERE DATE(preferred_date) = $1 
       AND status IN ('Pending', 'Confirmed')
       AND reminder24h = false 
       AND email IS NOT NULL`,
      [tomorrowDate],
    );

    for (const apt of appointments24h.rows) {
      try {
        await sendEmail({
          to: apt.email,
          subject: `⏰ Reminder: Appointment Tomorrow at ${apt.preferred_time}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #667eea;">Appointment Reminder</h2>
              <p>Dear <strong>${apt.name}</strong>,</p>
              <p>This is a reminder about your appointment <strong>tomorrow</strong>:</p>
              <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>📅 Date:</strong> ${apt.preferred_date}</p>
                <p><strong>⏰ Time:</strong> ${apt.preferred_time}</p>
                <p><strong>🏥 Location:</strong> ${apt.at}</p>
                <p><strong>🦷 Service:</strong> ${apt.service_name}</p>
              </div>
              <p>Please arrive 10 minutes early.</p>
              <p>Appointment ID: ${apt.appointment_id}</p>
              <hr>
              <p style="color: #666; font-size: 12px;">
                Aabha Dental Clinic<br>
                📞 XXX XXXX XXXXX
              </p>
            </div>
          `,
        });

        await db.query(
          "UPDATE appointments SET reminder24h = true WHERE id = $1",
          [apt.id],
        );
        sent24h++;
      } catch (error) {
        console.error(
          "Failed to send 24h reminder:",
          apt.appointment_id,
          error,
        );
      }
    }

    // 4 hour wala reminder

    const now = new Date();
    const in4Hours = new Date(now.getTime() + 4 * 60 * 60 * 1000);
    const todayDate = now.toISOString().split("T")[0];
    const targetTime = in4Hours.toTimeString().split(" ")[0].substring(0, 5);

    const appointments4h = await db.query(
      `SELECT * FROM appointments 
       WHERE DATE(preferred_date) = $1 
       AND preferred_time >= $2
       AND status IN ('Pending', 'Confirmed')
       AND reminder4h = false 
       AND email IS NOT NULL`,
      [todayDate, targetTime],
    );

    for (const apt of appointments4h.rows) {
      try {
        await sendEmail({
          to: apt.email,
          subject: `🔔 Today: Appointment at ${apt.preferred_time}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #f5576c;">Appointment Today!</h2>
              <p>Dear <strong>${apt.name}</strong>,</p>
              <p>Your appointment is in approximately 4 hours:</p>
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <h1 style="color: #856404; margin: 0;">${apt.preferred_time}</h1>
                <p style="color: #856404;">📍 ${apt.at}</p>
              </div>
              <p style="background: #f0f0f0; padding: 15px; border-radius: 5px;">
                <strong>⏰ Please arrive 10 minutes early</strong>
              </p>
              <hr>
              <p style="color: #666; font-size: 12px;">
                Aabha Dental Clinic<br>
                📞 XXX XXXX XXXXX
              </p>
            </div>
          `,
        });

        await db.query(
          "UPDATE appointments SET reminder4h = true WHERE id = $1",
          [apt.id],
        );
        sent4h++;
      } catch (error) {
        console.error("Failed to send 4h reminder:", apt.appointment_id, error);
      }
    }

    return NextResponse.json({
      success: true,
      sent_24h: sent24h,
      sent_4h: sent4h,
      total: sent24h + sent4h,
      time: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
