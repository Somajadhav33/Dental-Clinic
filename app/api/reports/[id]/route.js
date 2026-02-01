import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    //GET report
    const reportResult = await db.query(
      "SELECT id, diagnosis, observations, treatment, next_visit, created_at FROM reports WHERE appointment_id = $1",
      [id],
    );
    if (reportResult.rows.length === 0) {
      return NextResponse.json(
        {
          error: "Report Not Found",
        },
        { status: 404 },
      );
    }
    const report = reportResult.rows[0];
    const reportId = report.id;

    const medicineResult = await db.query(
      "SELECT name, dosage FROM medicines WHERE report_id = $1 ORDER BY id ASC",
      [reportId],
    );

    const documentsResult = await db.query(
      "SELECT name, url, type FROM documents WHERE report_id = $1 ORDER BY id ASC",
      [reportId],
    );

    return NextResponse.json(
      {
        report: report,
        medicines: medicineResult.rows,
        documents: documentsResult.rows,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch",
      },
      { status: 500 },
    );
  }
}
