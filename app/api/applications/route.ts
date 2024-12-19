import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { applications, jobs } from "@/db/schema";
import { verifyAuth } from "@/lib/utilities";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const userId = verifyAuth(req);
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const userApplications = await db
      .select({
        id: applications.id,
        name: applications.name,
        email: applications.email,
        photo: applications.photo,
        cv: applications.cv,
        job_id: applications.jobId,
        job: {
          id: jobs.id,
          title: jobs.title,
          type: jobs.type,
          salary: jobs.salary,
        },
      })
      .from(applications)
      .innerJoin(jobs, eq(applications.jobId, jobs.id))
      .where(eq(jobs.userId, userId));

    return NextResponse.json(userApplications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const { job_id, name, email, photo, cv } = await req.json();

    // Validate required fields
    if (!job_id || !name || !email || !cv) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify that the job exists
    const job = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, job_id))
      .limit(1);
    
    if (!job.length) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    // Insert new application
    const newApplication = await db
      .insert(applications)
      .values({
        jobId: job_id,
        name,
        email,
        photo: photo || null,
        cv,
      })
      .returning();

    return NextResponse.json(newApplication[0], { status: 201 });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}