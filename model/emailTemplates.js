// 1. APPOINTMENT BOOKING CONFIRMATION
export const BOOKING_CONFIRMATION_EMAIL = ({
  patientName,
  appointmentId,
  date,
  time,
  service,
  clinic,
  doctorName = "Our Dental Team",
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Booked</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                ✨ Appointment Booked Successfully!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${patientName}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                Thank you for choosing Aabha Dental Clinic! Your appointment has been successfully booked.
              </p>

              <!-- Appointment Details Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 2px solid #e9ecef;">
                    <h2 style="color: #667eea; margin: 0; font-size: 20px; font-weight: 600;">
                      📋 Appointment Details
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #666666; font-size: 14px; width: 140px;">
                          <strong>Appointment ID:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px; font-weight: 600;">
                          ${appointmentId}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px;">
                          <strong>📅 Date:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          ${date}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px;">
                          <strong>⏰ Time:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          ${time}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px;">
                          <strong>🦷 Service:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          ${service}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px;">
                          <strong>🏥 Location:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          ${clinic}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px;">
                          <strong>👨‍⚕️ Doctor:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          ${doctorName}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Important Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                <tr>
                  <td>
                    <p style="color: #856404; font-size: 14px; line-height: 1.6; margin: 0;">
                      <strong>⚠️ Important:</strong><br>
                      • Please arrive 10 minutes before your appointment time<br>
                      • Save your Appointment ID for future reference<br>
                      • You'll receive a reminder 24 hours before your appointment
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Action Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="https://aabhadentalclinic.com/appointments/${appointmentId}" 
                       style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: 600; font-size: 15px;">
                      View Appointment Details
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #777777; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                Need to reschedule? Contact us at <strong>XXX XXXX XXXXX</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0;">
                📍 ${clinic}
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 15px 0;">
                📞 XXX XXXX XXXXX | 📧 info@aabhadentalclinic.com
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                © 2025 Aabha Dental Clinic. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ------------------------------------------------------------
// 2. APPOINTMENT CONFIRMED (Status Changed to Confirmed)
// ------------------------------------------------------------
export const APPOINTMENT_CONFIRMED_EMAIL = ({
  patientName,
  appointmentId,
  date,
  time,
  clinic,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); padding: 40px 30px; text-align: center;">
              <div style="background-color: #ffffff; width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <h1 style="color: #11998e; margin: 0; font-size: 48px;">✓</h1>
              </div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                Appointment Confirmed!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${patientName}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                Great news! Your appointment has been <strong style="color: #11998e;">confirmed</strong> by our team.
              </p>

              <!-- Appointment Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%); border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <p style="color: #2d5016; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">
                      YOUR CONFIRMED APPOINTMENT
                    </p>
                    <p style="color: #1a3409; font-size: 24px; margin: 0; font-weight: 700;">
                      ${date}
                    </p>
                    <p style="color: #1a3409; font-size: 20px; margin: 5px 0 0 0; font-weight: 600;">
                      ${time}
                    </p>
                    <p style="color: #2d5016; font-size: 14px; margin: 15px 0 0 0;">
                      📍 ${clinic}
                    </p>
                    <p style="color: #4a5568; font-size: 12px; margin: 10px 0 0 0;">
                      Appointment ID: <strong>${appointmentId}</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Preparation Tips -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e3f2fd; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="color: #1565c0; margin: 0 0 15px 0; font-size: 16px;">
                      📝 How to Prepare:
                    </h3>
                    <ul style="color: #424242; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                      <li>Arrive 10 minutes early for check-in</li>
                      <li>Bring your ID and previous dental records (if any)</li>
                      <li>List any medications you're currently taking</li>
                      <li>Note any dental concerns you'd like to discuss</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <p style="color: #777777; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                Need to make changes? Call us at <strong>XXX XXXX XXXXX</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0;">
                📞 XXX XXXX XXXXX | 📧 info@aabhadentalclinic.com
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                We look forward to seeing you!
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ------------------------------------------------------------
// 3. REPORT UPLOADED & READY
// ------------------------------------------------------------
export const REPORT_READY_EMAIL = ({
  patientName,
  appointmentId,
  reportUrl,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Report is Ready</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 64px; margin-bottom: 15px;">📄</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                Your Medical Report is Ready!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${patientName}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                Your dental report has been uploaded by our team and is now available for viewing.
              </p>

              <!-- Report Access Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); border-radius: 8px; padding: 30px; margin-bottom: 30px; text-align: center;">
                <tr>
                  <td>
                    <p style="color: #7c2d12; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">
                      APPOINTMENT ID
                    </p>
                    <p style="color: #431407; font-size: 28px; margin: 0 0 20px 0; font-weight: 700; letter-spacing: 2px;">
                      ${appointmentId}
                    </p>
                    <a href="${reportUrl}" 
                       style="display: inline-block; background-color: #dc2626; color: #ffffff; text-decoration: none; padding: 14px 35px; border-radius: 6px; font-weight: 600; font-size: 15px; margin-top: 10px;">
                      📥 View Your Report
                    </a>
                  </td>
                </tr>
              </table>

              <!-- What's Included -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">
                      📋 Your Report Includes:
                    </h3>
                    <ul style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                      <li>Detailed diagnosis and observations</li>
                      <li>Treatment recommendations</li>
                      <li>Prescribed medications (if any)</li>
                      <li>Next visit date and care instructions</li>
                      <li>Medical documents and X-rays</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Important Note -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                <tr>
                  <td>
                    <p style="color: #1e40af; font-size: 14px; line-height: 1.6; margin: 0;">
                      <strong>💡 Tip:</strong> Save your Appointment ID (${appointmentId}) to access your report anytime in the future.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #777777; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                Questions about your report? Call us at <strong>XXX XXXX XXXXX</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0;">
                📞 XXX XXXX XXXXX | 📧 info@aabhadentalclinic.com
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                Your smile is our priority
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ------------------------------------------------------------
// 4. APPOINTMENT RESCHEDULED
// ------------------------------------------------------------
export const APPOINTMENT_RESCHEDULED_EMAIL = ({
  patientName,
  appointmentId,
  oldDate,
  oldTime,
  newDate,
  newTime,
  clinic,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Appointment Rescheduled</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #fa709a 0%, #fee140 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 64px; margin-bottom: 15px;">🔄</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                Appointment Rescheduled
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${patientName}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                Your appointment has been successfully rescheduled. Here are your updated details:
              </p>

              <!-- Old vs New Comparison -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td width="48%" valign="top">
                    <!-- Old Appointment -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fee; border: 2px solid #fcc; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td>
                          <p style="color: #991b1b; font-size: 12px; margin: 0 0 10px 0; font-weight: 600; text-align: center;">
                            PREVIOUS SCHEDULE
                          </p>
                          <p style="color: #7f1d1d; font-size: 16px; margin: 0; text-align: center; text-decoration: line-through;">
                            ${oldDate}
                          </p>
                          <p style="color: #7f1d1d; font-size: 14px; margin: 5px 0 0 0; text-align: center; text-decoration: line-through;">
                            ${oldTime}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="4%" align="center" valign="middle">
                    <p style="font-size: 24px; margin: 0;">→</p>
                  </td>
                  <td width="48%" valign="top">
                    <!-- New Appointment -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #d1fae5; border: 2px solid #6ee7b7; border-radius: 8px; padding: 20px;">
                      <tr>
                        <td>
                          <p style="color: #065f46; font-size: 12px; margin: 0 0 10px 0; font-weight: 600; text-align: center;">
                            NEW SCHEDULE ✓
                          </p>
                          <p style="color: #064e3b; font-size: 18px; margin: 0; text-align: center; font-weight: 700;">
                            ${newDate}
                          </p>
                          <p style="color: #064e3b; font-size: 16px; margin: 5px 0 0 0; text-align: center; font-weight: 600;">
                            ${newTime}
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Location Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="color: #374151; font-size: 14px; margin: 0 0 5px 0;">
                      <strong>📍 Location:</strong>
                    </p>
                    <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px 0;">
                      ${clinic}
                    </p>
                    <p style="color: #374151; font-size: 14px; margin: 0 0 5px 0;">
                      <strong>🆔 Appointment ID:</strong>
                    </p>
                    <p style="color: #6b7280; font-size: 14px; margin: 0;">
                      ${appointmentId}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Reminder -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                <tr>
                  <td>
                    <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0;">
                      <strong>⏰ Reminder:</strong> Please arrive 10 minutes before your appointment time.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #777777; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                Need to reschedule again? Contact us at <strong>XXX XXXX XXXXX</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0;">
                📞 XXX XXXX XXXXX | 📧 info@aabhadentalclinic.com
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                See you at your new appointment time!
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ------------------------------------------------------------
// 5. APPOINTMENT CANCELLED
// ------------------------------------------------------------
export const APPOINTMENT_CANCELLED_EMAIL = ({
  patientName,
  appointmentId,
  date,
  time,
  reason = "as per your request",
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Appointment Cancelled</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 64px; margin-bottom: 15px;">❌</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                Appointment Cancelled
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${patientName}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                This email confirms that your appointment has been cancelled ${reason}.
              </p>

              <!-- Cancelled Appointment Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fee2e2; border: 2px solid #fecaca; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="color: #991b1b; font-size: 14px; margin: 0 0 15px 0; font-weight: 600; text-align: center;">
                      CANCELLED APPOINTMENT
                    </p>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #7f1d1d; font-size: 14px; width: 140px;">
                          <strong>Appointment ID:</strong>
                        </td>
                        <td style="color: #991b1b; font-size: 14px; text-decoration: line-through;">
                          ${appointmentId}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #7f1d1d; font-size: 14px;">
                          <strong>Date:</strong>
                        </td>
                        <td style="color: #991b1b; font-size: 14px; text-decoration: line-through;">
                          ${date}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #7f1d1d; font-size: 14px;">
                          <strong>Time:</strong>
                        </td>
                        <td style="color: #991b1b; font-size: 14px; text-decoration: line-through;">
                          ${time}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Book Again -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbeafe; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
                <tr>
                  <td>
                    <p style="color: #1e40af; font-size: 16px; margin: 0 0 15px 0; font-weight: 600;">
                      We'd Love to See You Again!
                    </p>
                    <p style="color: #1e3a8a; font-size: 14px; margin: 0 0 20px 0; line-height: 1.6;">
                      Your dental health is important to us. Book your next appointment whenever you're ready.
                    </p>
                    <a href="https://aabhadentalclinic.com/book-appointment" 
                       style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: 600; font-size: 15px;">
                      Book New Appointment
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #777777; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                Questions? Contact us at <strong>XXX XXXX XXXXX</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0;">
                📞 XXX XXXX XXXXX | 📧 info@aabhadentalclinic.com
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                We hope to serve you again soon
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ------------------------------------------------------------
// 6. CONTACT US MESSAGE RECEIVED (Admin Notification)
// ------------------------------------------------------------
export const CONTACT_MESSAGE_RECEIVED_EMAIL = ({
  name,
  email,
  phone,
  message,
  submittedAt,
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 64px; margin-bottom: 15px;">💬</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                New Contact Message
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 30px 0;">
                You have received a new message through your website contact form.
              </p>

              <!-- Message Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="10" cellspacing="0">
                      <tr>
                        <td style="color: #666666; font-size: 14px; width: 120px; vertical-align: top;">
                          <strong>From:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          ${name}
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; vertical-align: top;">
                          <strong>Email:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">
                            ${email}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; vertical-align: top;">
                          <strong>Phone:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">
                            ${phone}
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #666666; font-size: 14px; vertical-align: top;">
                          <strong>Received:</strong>
                        </td>
                        <td style="color: #333333; font-size: 14px;">
                          ${submittedAt}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message Content -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="color: #374151; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">
                      Message:
                    </p>
                    <p style="color: #4b5563; font-size: 14px; line-height: 1.8; margin: 0; white-space: pre-wrap;">
${message}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Action Buttons -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 10px 0;">
                    <a href="mailto:${email}" 
                       style="display: inline-block; background-color: #667eea; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; margin: 0 5px;">
                      📧 Reply via Email
                    </a>
                    <a href="tel:${phone}" 
                       style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 6px; font-weight: 600; font-size: 14px; margin: 0 5px;">
                      📞 Call Now
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic - Admin Notification
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                This is an automated notification from your website
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ------------------------------------------------------------
// 7. CONTACT US AUTO-REPLY (To Customer)
// ------------------------------------------------------------
export const CONTACT_AUTOREPLY_EMAIL = ({ name }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Message Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 64px; margin-bottom: 15px;">✉️</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                We Received Your Message!
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${name}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                Thank you for reaching out to Aabha Dental Clinic! We have received your message and our team will get back to you as soon as possible.
              </p>

              <!-- Response Time -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #dbeafe; border-radius: 8px; padding: 20px; margin-bottom: 30px; text-align: center;">
                <tr>
                  <td>
                    <p style="color: #1e40af; font-size: 16px; margin: 0 0 10px 0; font-weight: 600;">
                      ⏱️ Expected Response Time
                    </p>
                    <p style="color: #1e3a8a; font-size: 24px; margin: 0; font-weight: 700;">
                      24-48 Hours
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Emergency Contact -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 30px; border-radius: 4px;">
                <tr>
                  <td>
                    <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0;">
                      <strong>🚨 Emergency?</strong> For urgent dental issues, please call us directly at <strong>XXX XXXX XXXXX</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                <tr>
                  <td>
                    <p style="color: #374151; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">
                      📞 Contact Information:
                    </p>
                    <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.8;">
                      Phone: XXX XXXX XXXXX<br>
                      Email: info@aabhadentalclinic.com<br>
                      Working Hours: Mon-Sat, 9:00 AM - 8:00 PM
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0;">
                📞 XXX XXXX XXXXX | 📧 info@aabhadentalclinic.com
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                Your smile is our priority
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

// ------------------------------------------------------------
// 8. APPOINTMENT REMINDER (24 hours before)
// ------------------------------------------------------------
export const APPOINTMENT_REMINDER_EMAIL = ({
  patientName,
  appointmentId,
  date,
  time,
  service,
  clinic,
  doctorName = "Our Dental Team",
}) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0;">
  <title>Appointment Reminder</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f7fa;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f7fa; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 40px 30px; text-align: center;">
              <div style="font-size: 64px; margin-bottom: 15px;">⏰</div>
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 600;">
                Appointment Reminder
              </h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
                Tomorrow at ${time}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="color: #333333; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Dear <strong>${patientName}</strong>,
              </p>
              
              <p style="color: #555555; font-size: 15px; line-height: 1.6; margin: 0 0 30px 0;">
                This is a friendly reminder about your dental appointment <strong style="color: #f5576c;">tomorrow</strong>.
              </p>

              <!-- Appointment Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%); border-radius: 8px; padding: 30px; margin-bottom: 30px; text-align: center;">
                <tr>
                  <td>
                    <p style="color: #7c2d12; font-size: 14px; margin: 0 0 10px 0; font-weight: 600;">
                      YOUR APPOINTMENT
                    </p>
                    <p style="color: #431407; font-size: 28px; margin: 0; font-weight: 700;">
                      ${date}
                    </p>
                    <p style="color: #431407; font-size: 22px; margin: 5px 0 0 0; font-weight: 600;">
                      ${time}
                    </p>
                    <div style="margin: 20px 0; padding-top: 20px; border-top: 2px solid rgba(120, 53, 15, 0.2);">
                      <p style="color: #78350f; font-size: 14px; margin: 0 0 5px 0;">
                        <strong>Service:</strong> ${service}
                      </p>
                      <p style="color: #78350f; font-size: 14px; margin: 0 0 5px 0;">
                        <strong>Doctor:</strong> ${doctorName}
                      </p>
                      <p style="color: #78350f; font-size: 14px; margin: 0;">
                        <strong>Location:</strong> ${clinic}
                      </p>
                    </div>
                    <p style="color: #57534e; font-size: 12px; margin: 15px 0 0 0;">
                      Appointment ID: <strong>${appointmentId}</strong>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Checklist -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #e0f2fe; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <tr>
                  <td>
                    <p style="color: #0c4a6e; font-size: 16px; margin: 0 0 15px 0; font-weight: 600;">
                      ✅ Before You Come:
                    </p>
                    <ul style="color: #075985; font-size: 14px; line-height: 1.8; margin: 0; padding-left: 20px;">
                      <li>Please arrive 10 minutes early</li>
                      <li>Bring your ID and insurance card (if applicable)</li>
                      <li>List any current medications</li>
                      <li>Note any concerns you'd like to discuss</li>
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Reschedule Option -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
                <tr>
                  <td>
                    <p style="color: #92400e; font-size: 14px; line-height: 1.6; margin: 0;">
                      <strong>Need to Reschedule?</strong><br>
                      Please call us at <strong>XXX XXXX XXXXX</strong> at least 24 hours in advance.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="color: #777777; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0; text-align: center;">
                We look forward to seeing you tomorrow!
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 25px 30px; text-align: center; border-top: 1px solid #e9ecef;">
              <p style="color: #333333; font-size: 16px; font-weight: 600; margin: 0 0 10px 0;">
                Aabha Dental Clinic
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 5px 0;">
                📍 ${clinic}
              </p>
              <p style="color: #666666; font-size: 13px; margin: 0 0 15px 0;">
                📞 XXX XXXX XXXXX | 📧 info@aabhadentalclinic.com
              </p>
              <p style="color: #999999; font-size: 12px; margin: 0;">
                Your smile is our priority
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
