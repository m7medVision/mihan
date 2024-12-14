import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/db/schema";
import { verifyAuth } from "@/lib/utilities";

// GET handler to fetch all jobs
export async function GET() {
  try {
    const allJobs = await db.select().from(jobs);
    return NextResponse.json(allJobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST handler to create a new job
export async function POST(req: NextRequest) {
  try {
    const userId = verifyAuth(req);
    if (userId === false) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { title, type, salary, description, skills, picture, date } = await req.json();

    if (!title || !type || !salary || !description || !skills || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Insert new job
    const newJob = await db
      .insert(jobs)
      .values({
        title,
        type,
        salary,
        description,
        skills,
        picture,
        date,
        userId
      })
      .returning();

    return NextResponse.json(newJob[0], { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}