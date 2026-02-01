import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = params;
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

export async function POST(request) {
  try {
    const {
      appointment_id,
      diagnosis,
      observations,
      treatment,
      next_visit,
      medicines,
      documents,
    } = await request.json();

    if (!appointment_id || !diagnosis || !treatment) {
      return NextResponse.json(
        { error: "Appointment ID, Diagnosis, and Treatment are required" },
        { status: 400 },
      );
    }

    await db.query("BEGIN");

    try {
      //Report Insert
      const reportResult = await db.query(
        "INSERT INTO reports(appointment_id, diagnosis, observations, treatment, next_visit) VALUES($1, $2, $3, $4, $5) RETURNING id",
        [
          appointment_id,
          diagnosis,
          observations || null,
          treatment,
          next_visit || null,
        ],
      );
      const reportId = reportResult.rows[0].id;

      //Insert medicines
      if (medicines && medicines.length > 0) {
        for (const medicine of medicines) {
          if (medicine.name && medicine.dosage) {
            await db.query(
              "INSERT INTO medicines(report_id, name, dosage) VALUES($1, $2, $3)",
              [reportId, medicine.name, medicine.dosage],
            );
          }
        }
      }

      //Insert documents
      if (documents && documents.length > 0) {
        for (const document of documents) {
          if (document.name && document.url) {
            await db.query(
              "INSERT INTO documents(report_id, name, url, type) VALUES($1, $2, $3, $4)",
              [reportId, document.name, document.url, document.type || "image"],
            );
          }
        }
      }

      //Commit all operations
      await db.query("COMMIT");

      return NextResponse.json(
        {
          success: true,
          message: "Report uploaded successfully",
          reportId: reportId,
        },
        { status: 200 },
      );
    } catch (error) {
      await db.query("ROLLBACK");
      throw error;
    }
  } catch (error) {
    console.error("Error while uploading report:", error);
    return NextResponse.json(
      {
        error: "upload failed",
      },
      { status: 500 },
    );
  }
}
