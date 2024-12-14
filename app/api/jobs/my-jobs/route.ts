import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyAuth } from "@/lib/utilities";

export async function GET(req: NextRequest) {
  try {
    const userId = verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userJobs = await db
      .select()
      .from(jobs)
      .where(eq(jobs.userId, userId));

    return NextResponse.json(userJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const userId = verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { job_id } = await req.json();
    if (!job_id) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    // Verify job ownership
    const job = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, job_id))
      .limit(1);

    if (!job.length || job[0].userId !== userId) {
      return NextResponse.json(
        { error: "Job not found or unauthorized" },
        { status: 404 }
      );
    }

    // Delete the job
    await db
      .delete(jobs)
      .where(eq(jobs.id, job_id));

    return NextResponse.json({ message: "Job successfully deleted" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}