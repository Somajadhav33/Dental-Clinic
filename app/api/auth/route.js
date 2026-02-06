import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

if (!process.env.JWT_SECRET && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET is not defined in production environment!");
}

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { valid: false, message: "Username and password are required" },
        { status: 400 },
      );
    }

    const result = await db.query(
      "SELECT id, username, password_hash FROM admin WHERE username = $1",
      [username],
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { valid: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const user = result.rows[0];
    const hash = user.password_hash;

    const isValid = await bcrypt.compare(password, hash);

    if (!isValid) {
      return NextResponse.json(
        { valid: false, message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const now = new Date();
    const lastLogin = now.toISOString();
    await db.query("UPDATE admin SET last_login = $1 WHERE username = $2", [
      lastLogin,
      username,
    ]);

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username,
        role: "admin",
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    return NextResponse.json(
      {
        valid: true,
        token: token,
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          role: "admin",
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { valid: false, message: "An error occurred during authentication" },
      { status: 500 },
    );
  }
}
