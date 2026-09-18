import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
export const SESSION_COOKIE = "portfolio_admin_session";

export function checkCredentials(username, password) {
  const validUser = process.env.ADMIN_USERNAME;
  const validPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validUser || !validPasswordHash) {
    throw new Error(
      "ADMIN_USERNAME / ADMIN_PASSWORD_HASH not configured on the server."
    );
  }

  if (username !== validUser) return false;
  return bcrypt.compareSync(password, validPasswordHash);
}

export function createSessionToken(username) {
  return jwt.sign({ username, role: "admin" }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifySessionToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
