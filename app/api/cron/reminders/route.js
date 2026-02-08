import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function GET(request) {
  try {
    // Security check
    const authHeader = request.headers.get("authorization");
    const expectedSecret = process.env.CRON_SECRET?.replace(/['"]/g, "").trim();
    const providedSecret = authHeader?.replace("Bearer ", "").trim();

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let sent24h = 0;
    let sent4h = 0;

    // SEND 24-HOUR REMINDERS (Tomorrow)

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowDate = tomorrow.toISOString().split("T")[0]; // YYYY-MM-DD format

    const appointments24h = await db.query(
      `SELECT 
        id, 
        appointment_id, 
        name, 
        email, 
        service_name, 
        preferred_date, 
        preferred_time, 
        at,
        status
       FROM appointments 
       WHERE preferred_date = $1 
       AND status = 'Confirmed'
       AND reminder24h = false 
       AND email IS NOT NULL 
       AND email != ''
       ORDER BY preferred_time ASC`,
      [tomorrowDate],
    );

    for (const apt of appointments24h.rows) {
      try {
        // Format date for display
        const displayDate = new Date(apt.preferred_date).toLocaleDateString(
          "en-IN",
          {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        );

        // Format time for display (from TIME type)
        const displayTime = apt.preferred_time.substring(0, 5); // Get HH:MM from HH:MM:SS

        await sendEmail({
          to: apt.email,
          subject: `⏰ Reminder: Appointment Tomorrow at ${displayTime}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #667eea;">Appointment Reminder</h2>
              <p>Dear <strong>${apt.name}</strong>,</p>
              <p>This is a reminder about your appointment <strong>tomorrow</strong>:</p>
              <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>📅 Date:</strong> ${displayDate}</p>
                <p><strong>⏰ Time:</strong> ${displayTime}</p>
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
        console.log(
          `✅ 24h reminder sent: ${apt.appointment_id} to ${apt.email}`,
        );
      } catch (error) {
        console.error(
          "Failed to send 24h reminder:",
          apt.appointment_id,
          error,
        );
      }
    }

    //SEND 4-HOUR REMINDERS (Sliding Window)

    const now = new Date();
    const in4Hours = new Date(now.getTime() + 4 * 60 * 60 * 1000);

    const nowTimestamp = now.toISOString();
    const in4HoursTimestamp = in4Hours.toISOString();

    console.log(
      `🔍 Checking 4h reminders from ${nowTimestamp} to ${in4HoursTimestamp}`,
    );

    const appointments4h = await db.query(
      `SELECT 
        id, 
        appointment_id, 
        name, 
        email, 
        service_name, 
        preferred_date, 
        preferred_time, 
        at,
        status,
        (preferred_date || ' ' || preferred_time)::timestamp as appointment_timestamp
       FROM appointments 
       WHERE status = 'Confirmed'
       AND reminder4h = false 
       AND email IS NOT NULL 
       AND email != ''
       AND (preferred_date || ' ' || preferred_time)::timestamp > $1::timestamp
       AND (preferred_date || ' ' || preferred_time)::timestamp <= $2::timestamp
       ORDER BY appointment_timestamp ASC`,
      [nowTimestamp, in4HoursTimestamp],
    );

    console.log(
      ` Found ${appointments4h.rows.length} appointments for 4h reminders`,
    );

    for (const apt of appointments4h.rows) {
      try {
        const displayTime = apt.preferred_time.substring(0, 5); // Get HH:MM from HH:MM:SS

        const appointmentTime = new Date(apt.appointment_timestamp);
        const hoursUntil = Math.round(
          (appointmentTime - now) / (1000 * 60 * 60),
        );
        const minutesUntil = Math.round((appointmentTime - now) / (1000 * 60));

        await sendEmail({
          to: apt.email,
          subject: `🔔 Today: Appointment at ${displayTime}`,
          html: `
            <div style="font-family: Arial; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #f5576c;">Appointment Today!</h2>
              <p>Dear <strong>${apt.name}</strong>,</p>
              <p>Your appointment is in approximately ${hoursUntil} ${hoursUntil === 1 ? "hour" : "hours"}:</p>
              <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <h1 style="color: #856404; margin: 0;">${displayTime}</h1>
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
        console.log(
          `✅ 4h reminder sent: ${apt.appointment_id} to ${apt.email} (${hoursUntil}h ${minutesUntil % 60}m until appointment)`,
        );
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
      window: {
        now: nowTimestamp,
        until: in4HoursTimestamp,
      },
    });
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      {
        error: "Failed",
        message: error.message,
      },
      { status: 500 },
    );
  }
}
