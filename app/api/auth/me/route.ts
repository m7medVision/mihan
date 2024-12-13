import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db"; // Your Drizzle db client
import { users } from "@/db/schema"; // Your schema
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = req.cookies;
    const token = cookieStore.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized. Token missing" },
        { status: 401 },
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      const userId = (decoded as { userId: number }).userId;

      const user = await db
        .select()
        .from(users)
        .where(eq(users.id, userId))
        .limit(1);

      if (!user || user.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json({ id: user[0].id, email: user[0].email });
    } catch (error) {
      console.error("Error verifying JWT:", error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 },
      ); // Unauthorized due to invalid token
    }
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
