"use server"

import { jobs } from "@/db/schema";
import { db } from "./db";

export const GetJobs = async () => {
    try {
        const allJobs = await db.select().from(jobs);
        return allJobs;
    } catch (error) {
        console.error(error);
        return [];
    }
}