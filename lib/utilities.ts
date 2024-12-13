import crypto from "crypto";
export function hashPassword(password: string) {
  const hash = crypto.createHash("sha256"); // You can use 'sha256', 'sha512', etc.
  hash.update(password);
  return hash.digest("hex"); // Convert to hexadecimal format
}

export function compare(password: string, hash: string) {
  return hashPassword(password) === hash;
}
