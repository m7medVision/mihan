import crypto from "crypto";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function hashPassword(password: string) {
  const hash = crypto.createHash("sha256"); // You can use 'sha256', 'sha512', etc.
  hash.update(password);
  return hash.digest("hex"); // Convert to hexadecimal format
}

export function compare(password: string, hash: string) {
  return hashPassword(password) === hash;
}

export const verifyAuth = (req: NextRequest): number | false => {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) return false;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    return decoded.userId;
  } catch (error) {
    return false;
  }
};