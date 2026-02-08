import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendEmail } from "@/lib/email";

export async function GET(request) {
  try {
    // SECURITY CHECK
    const authHeader = request.headers.get("authorization");
    const expectedSecret = process.env.CRON_SECRET?.replace(/['"]/g, "").trim();
    const providedSecret = authHeader?.replace("Bearer ", "").trim();

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let sent24h = 0;
    let sent4h = 0;
    const errors = [];

    const now = new Date();
    // 24-hour reminder: between 23.5h and 24.5h from now
    const window24hStart = new Date(now.getTime() + 23.5 * 60 * 60 * 1000);
    const window24hEnd = new Date(now.getTime() + 24.5 * 60 * 60 * 1000);

    // 4-hour reminder: between 3.5h and 4.5h from now
    const window4hStart = new Date(now.getTime() + 3.5 * 60 * 60 * 1000);
    const window4hEnd = new Date(now.getTime() + 4.5 * 60 * 60 * 1000);

    console.log("Cron job started:", now.toISOString());
    console.log(
      "4h window:",
      window24hStart.toISOString(),
      "to",
      window24hEnd.toISOString(),
    );
    console.log(
      " 4h window:",
      window4hStart.toISOString(),
      "to",
      window4hEnd.toISOString(),
    );

    // SEND 24-HOUR REMINDERS

    try {
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
          status,
          (preferred_date + preferred_time)::timestamp as appointment_timestamp
         FROM appointments 
         WHERE status = 'Confirmed'
         AND reminder24h = false 
         AND email IS NOT NULL 
         AND email != ''
         AND (preferred_date + preferred_time)::timestamp >= $1::timestamp
         AND (preferred_date + preferred_time)::timestamp < $2::timestamp
         ORDER BY appointment_timestamp ASC`,
        [window24hStart.toISOString(), window24hEnd.toISOString()],
      );

      console.log(
        `Found ${appointments24h.rows.length} appointments for 24h reminders`,
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

          const displayTime = apt.preferred_time.substring(0, 5); // HH:MM from HH:MM:SS

          const appointmentTime = new Date(apt.appointment_timestamp);
          const hoursUntil = Math.round(
            (appointmentTime - now) / (1000 * 60 * 60),
          );

          await sendEmail({
            to: apt.email,
            subject: `⏰ Reminder: Appointment Tomorrow at ${displayTime}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">🔔 Appointment Reminder</h1>
                </div>
                
                <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                  <p style="color: #333333; font-size: 16px; margin: 0 0 20px 0;">
                    Dear <strong>${apt.name}</strong>,
                  </p>
                  
                  <p style="color: #555555; font-size: 15px; margin: 0 0 30px 0;">
                    This is a reminder about your appointment in approximately <strong>${hoursUntil} hours</strong>:
                  </p>

                  <div style="background: #f9fafb; padding: 25px; border-radius: 8px; margin: 20px 0;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>📅 Date:</strong></td>
                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${displayDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>⏰ Time:</strong></td>
                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${displayTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>🏥 Location:</strong></td>
                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${apt.at}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; font-size: 14px;"><strong>🦷 Service:</strong></td>
                        <td style="padding: 8px 0; color: #1f2937; font-size: 14px;">${apt.service_name}</td>
                      </tr>
                    </table>
                  </div>

                  <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
                    <p style="color: #92400e; font-size: 14px; margin: 0;">
                      <strong>⚠️ Important:</strong> Please arrive 10 minutes before your appointment time.
                    </p>
                  </div>

                  <p style="color: #6b7280; font-size: 12px; margin: 20px 0 0 0;">
                    Appointment ID: <strong>${apt.appointment_id}</strong>
                  </p>
                </div>

                <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 13px;">
                  <p style="margin: 0;"><strong>Aabha Dental Clinic</strong></p>
                  <p style="margin: 5px 0;">📞 XXX XXXX XXXXX</p>
                  <p style="margin: 5px 0;">Need to reschedule? Contact us at least 24 hours in advance.</p>
                </div>
              </div>
            `,
          });

          await db.query(
            "UPDATE appointments SET reminder24h = true WHERE id = $1 AND reminder24h = false",
            [apt.id],
          );

          sent24h++;
          console.log(
            `24h reminder sent: ${apt.appointment_id} → ${apt.email} (${hoursUntil}h until appointment)`,
          );
        } catch (error) {
          console.error(
            `Failed to send 24h reminder for ${apt.appointment_id}:`,
            error,
          );
          errors.push({
            type: "24h",
            appointment_id: apt.appointment_id,
            error: error.message,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching 24h appointments:", error);
      errors.push({
        type: "24h_query",
        error: error.message,
      });
    }

    // SEND 4-HOUR REMINDERS
    try {
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
          (preferred_date + preferred_time)::timestamp as appointment_timestamp
         FROM appointments 
         WHERE status = 'Confirmed'
         AND reminder4h = false 
         AND email IS NOT NULL 
         AND email != ''
         AND (preferred_date + preferred_time)::timestamp >= $1::timestamp
         AND (preferred_date + preferred_time)::timestamp < $2::timestamp
         ORDER BY appointment_timestamp ASC`,
        [window4hStart.toISOString(), window4hEnd.toISOString()],
      );

      console.log(
        `Found ${appointments4h.rows.length} appointments for 4h reminders`,
      );

      for (const apt of appointments4h.rows) {
        try {
          // Format time for display (from TIME type)
          const displayTime = apt.preferred_time.substring(0, 5); // HH:MM from HH:MM:SS

          // Calculate exact time until appointment
          const appointmentTime = new Date(apt.appointment_timestamp);
          const hoursUntil = Math.round(
            (appointmentTime - now) / (1000 * 60 * 60),
          );
          const minutesUntil = Math.round(
            (appointmentTime - now) / (1000 * 60),
          );

          await sendEmail({
            to: apt.email,
            subject: `🔔 Urgent: Appointment Today at ${displayTime}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                  <div style="font-size: 48px; margin-bottom: 10px;">⏰</div>
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Appointment Today!</h1>
                </div>
                
                <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
                  <p style="color: #333333; font-size: 16px; margin: 0 0 20px 0;">
                    Dear <strong>${apt.name}</strong>,
                  </p>
                  
                  <p style="color: #555555; font-size: 15px; margin: 0 0 30px 0;">
                    Your appointment is in approximately <strong>${hoursUntil} ${hoursUntil === 1 ? "hour" : "hours"}</strong>:
                  </p>

                  <div style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); padding: 30px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <p style="color: #7c2d12; font-size: 14px; margin: 0 0 10px 0; font-weight: 600; text-transform: uppercase;">
                      Today at
                    </p>
                    <h2 style="color: #431407; font-size: 42px; margin: 0; font-weight: 700;">
                      ${displayTime}
                    </h2>
                    <p style="color: #78350f; font-size: 16px; margin: 15px 0 0 0;">
                      📍 ${apt.at}
                    </p>
                  </div>

                  <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 15px; margin: 20px 0; border-radius: 4px;">
                    <p style="color: #991b1b; font-size: 14px; margin: 0;">
                      <strong>🚨 Important:</strong> Please arrive 10 minutes early. If you need to reschedule, call us immediately at <strong>XXX XXXX XXXXX</strong>.
                    </p>
                  </div>

                  <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p style="color: #4b5563; font-size: 14px; margin: 0 0 5px 0;"><strong>Service:</strong> ${apt.service_name}</p>
                    <p style="color: #6b7280; font-size: 12px; margin: 0;">Appointment ID: ${apt.appointment_id}</p>
                  </div>
                </div>

                <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 13px;">
                  <p style="margin: 0;"><strong>Aabha Dental Clinic</strong></p>
                  <p style="margin: 5px 0;">📞 XXX XXXX XXXXX</p>
                  <p style="margin: 5px 0;">We look forward to seeing you soon!</p>
                </div>
              </div>
            `,
          });

          await db.query(
            "UPDATE appointments SET reminder4h = true WHERE id = $1 AND reminder4h = false",
            [apt.id],
          );

          sent4h++;
          console.log(
            `4h reminder sent: ${apt.appointment_id} → ${apt.email} (${hoursUntil}h ${minutesUntil % 60}m until appointment)`,
          );
        } catch (error) {
          console.error(
            `Failed to send 4h reminder for ${apt.appointment_id}:`,
            error,
          );
          errors.push({
            type: "4h",
            appointment_id: apt.appointment_id,
            error: error.message,
          });
        }
      }
    } catch (error) {
      console.error("Error fetching 4h appointments:", error);
      errors.push({
        type: "4h_query",
        error: error.message,
      });
    }

    const summary = {
      success: true,
      timestamp: now.toISOString(),
      reminders_24h: {
        sent: sent24h,
        window: {
          start: window24hStart.toISOString(),
          end: window24hEnd.toISOString(),
        },
      },
      reminders_4h: {
        sent: sent4h,
        window: {
          start: window4hStart.toISOString(),
          end: window4hEnd.toISOString(),
        },
      },
      totals: {
        sent: sent24h + sent4h,
        errors: errors.length,
      },
      errors: errors.length > 0 ? errors : undefined,
    };

    console.log(" Cron job completed:", JSON.stringify(summary, null, 2));

    return NextResponse.json(summary, { status: 200 });
  } catch (error) {
    console.error("Critical cron job error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Critical failure",
        message: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
