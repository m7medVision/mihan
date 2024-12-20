"use server"

import { applications, jobs } from "@/db/schema";
import { db } from "./db";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { users } from "@/db/schema"; // Your schema
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export const GetJobs = async () => {
    try {
        const allJobs = await db.select().from(jobs);
        return allJobs;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getUserFromToken = async () => {
    const cookies_ = await cookies();
    const token = cookies_.get("token")?.value;
    if (!token) {
        return { error: "Unauthorized. Token missing", status: 401 };
    }
    try {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!);
            const userId = (decoded as { userId: number }).userId;

            const user = await db
                .select()
                .from(users)
                .where(eq(users.id, userId))
                .limit(1);

            if (!user || user.length === 0) {
                return { error: "User not found", status: 404 };
            }

            return { id: user[0].id, email: user[0].email };
        } catch (error) {
            console.error("Error verifying JWT:", error);
            return { error: "Invalid or expired token", status: 401 }; // Unauthorized due to invalid token
        }
    } catch (error) {
        console.error("Error in getUserFromToken:", error);
        return { error: "Internal Server Error", status: 500 };
    }
}

export const getApplications = async () => {
    const user = await getUserFromToken();
    if ("error" in user) {
        return []
    }

    const userApplications = await db
        .select({
        id: applications.id,
        name: applications.name,
        email: applications.email,
        photo: applications.photo,
        cv: applications.cv,
        job_id: applications.jobId,
        appliedAt: applications.createdAt,
        job: {
            id: jobs.id,
            title: jobs.title,
            type: jobs.type,
            salary: jobs.salary,
            skills: jobs.skills,
        },
        })
        .from(applications)
        .innerJoin(jobs, eq(applications.jobId, jobs.id))
        .where(eq(jobs.userId, user.id));
    return userApplications;
}

export const getMyJobs = async () => {
    const user = await getUserFromToken();
    if ("error" in user) {
        return []
    }

    const userJobs = await db
        .select()
        .from(jobs)
        .where(eq(jobs.userId, user.id));
    return userJobs;
}

    