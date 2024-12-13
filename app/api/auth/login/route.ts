import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Your Drizzle db client
import { users } from "@/db/schema"; // Your schema
import { cookies } from "next/headers";
import { compare } from "@/lib/utilities";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 },
      );
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (!user || user.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      ); // Unauthorized
    }

    const passwordMatch = compare(password, user[0].password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      ); // Unauthorized
    }
    // TODO: appy jwt token instead of this cookie
    const cookiesStore = await cookies();
    cookiesStore.set("userId", user[0].id.toString(), {
      httpOnly: true, // Important for security
      secure: process.env.NODE_ENV === "production", // Secure in production, optional otherwise
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60, // expires after 30 days
      path: "/",
    });

    return NextResponse.json({ id: user[0].id, email: user[0].email });
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
