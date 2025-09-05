// backend/lib/auth.js
import jwt from "jsonwebtoken";
import { User } from "@/backend/models"; // from your models/index.js export
const { JWT_SECRET } = process.env;

// Create a JWT (add expiry!)
export const signToken = (user) => {
  const payload = { id: user.id, name: user.name };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h" }); // "2h" not "2 hr"
}

// Read/verify the token string (throws if invalid)
export const verifyTokenString = (token) => {
  if (!token || typeof token !== "string") 
    throw new Error("No token");
  
  const raw = token.split(" ").pop().trim(); // supports "Bearer xxx" or just "xxx"
  return jwt.verify(raw, JWT_SECRET); // returns payload { id, name, iat, exp }
}

// Helper to verify + fetch the user (common in APIs)
export async function initialize(request) {
  const header = request.headers.get("authorization"); // Next Request
  const data = verifyTokenString(header);
  const user = await User.findByPk(data.id);
  if (!user) throw new Error("Invalid or expired session");
  return { user, payload: data };
}
