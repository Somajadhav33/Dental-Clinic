import db from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { name, username, password } = await request.json();

    if (!name || !username || !password) {
      return NextResponse.json(
        { error: "Name, username and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const existing = await db.query(
      "SELECT id FROM admin WHERE username = $1",
      [username],
    );
    if (existing.rows.length > 0) {
      return NextResponse.json(
        { error: "An admin with this username already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.query(
      "INSERT INTO admin (name, username, password, created_at) VALUES ($1, $2, $3, $4) RETURNING id, name, username, created_at",
      [name, username, hashedPassword, new Date().toISOString()],
    );

    return NextResponse.json(
      {
        success: true,
        message: "Admin added successfully",
        admin: result.rows[0],
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error adding admin:", error);
    return NextResponse.json({ error: "Failed to add admin" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { currentPassword, newPassword, adminId } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password and new password are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const query = adminId
      ? "SELECT id, password FROM admin WHERE id = $1"
      : "SELECT id, password FROM admin LIMIT 1";
    const params = adminId ? [adminId] : [];

    const result = await db.query(query, params);

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const admin = result.rows[0];

    const isMatch = await bcrypt.compare(currentPassword, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 401 },
      );
    }

    const hashedNew = await bcrypt.hash(newPassword, 10);

    await db.query("UPDATE admin SET password = $1 WHERE id = $2", [
      hashedNew,
      admin.id,
    ]);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const result = await db.query(
      "SELECT id, name, username, created_at FROM admin ORDER BY created_at DESC",
    );
    return NextResponse.json({ success: true, admin: result.rows });
  } catch (error) {
    console.error("Error fetching admin:", error);
    return NextResponse.json(
      { error: "Failed to fetch admin" },
      { status: 500 },
    );
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Admin ID is required" },
        { status: 400 },
      );
    }

    const result = await db.query(
      "DELETE FROM admin WHERE id = $1 RETURNING id",
      [id],
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting admin:", error);
    return NextResponse.json(
      { error: "Failed to delete admin" },
      { status: 500 },
    );
  }
}
