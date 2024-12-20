import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications, jobs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { verifyAuth } from "@/lib/utilities";
import { z } from "zod";

const DeleteJobSchema = z.object({
  job_id: z.coerce.number(),
});

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

    // delete schema
    const result = DeleteJobSchema.safeParse(req.body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { job_id } = result.data;

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

    // Delete all applications for the job
    await db
      .delete(applications)
      .where(eq(applications.jobId, job_id));

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