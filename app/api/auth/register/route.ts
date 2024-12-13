import { users } from "@/db/schema";
import { hashPassword } from "@/lib/utilities";
import { drizzle } from "drizzle-orm/node-postgres";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const db = drizzle(process.env.DATABASE_URL!);

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 },
      );
    }

    const hashedPassword = hashPassword(password);
    const newUser = await db
      .insert(users)
      .values({
        email: email,
        password: hashedPassword,
      })
      .returning();

    return NextResponse.json(
      { id: newUser[0].id, email: newUser[0].email },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);

    // Handle potential unique constraint error from database.
    if (
      error instanceof Error &&
      error.message.includes("duplicate key value violates unique constraint")
    ) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      ); // Conflict status code
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
