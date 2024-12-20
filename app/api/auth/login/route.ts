import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Your Drizzle db client
import { users } from "@/db/schema"; // Your schema
import { cookies } from "next/headers";
import { compare } from "@/lib/utilities";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";
import { z } from "zod";

// Input validation schema
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    // Ensure JWT_SECRET exists
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const body = await req.json();
    
    // Validate input
    const result = loginSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation error", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email, password } = result.data;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase().trim()))
      .limit(1);

    if (!user?.[0]) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordMatch = await compare(password, user[0].password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { 
        userId: user[0].id,
        email: user[0].email,
        version: 1 // For future token invalidation
      }, 
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
        algorithm: "HS256"
      }
    );

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/"
    };

    const cookiesStore = await cookies();
    cookiesStore.set("token", token, cookieOptions);

    return NextResponse.json({
      success: true,
      data: {
        id: user[0].id,
        email: user[0].email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Internal Server Error",
        message: process.env.NODE_ENV === "development" ? `${error}` : undefined
      },
      { status: 500 }
    );
  }
}
