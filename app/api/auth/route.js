import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { username, password } = await request.json();

  const result = await db.query(
    "SELECT password_hash FROM admin WHERE username = $1",
    [username],
  );

  if (result.rows.length === 0) {
    return NextResponse.json({ valid: false, message: "User Not Found" });
  }

  const hash = result.rows[0].password_hash;
  const isValid = await bcrypt.compare(password, hash);

  if (!isValid) {
    return NextResponse.json({
      valid: false,
      message: "Invalid Password or Username",
    });
  }
  const now = new Date();
  const lastLogin = now.toISOString();
  await db.query("UPDATE admin SET last_login = $1 WHERE username = $2", [
    lastLogin,
    username,
  ]);

  return NextResponse.json(
    { valid: true, message: "User Verified" },
    { status: 200 },
  );
}
