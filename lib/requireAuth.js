import { verifySessionToken, SESSION_COOKIE } from "@/lib/auth";

// Returns true if the incoming request has a valid admin session cookie.
export function isAuthenticated(request) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  const payload = verifySessionToken(token);
  return !!payload;
}
