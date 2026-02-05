import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function sendEmail({ to, subject, text, html }) {
  await transporter.sendMail({
    from: `"Aabha Dental Clinic" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  });
}
