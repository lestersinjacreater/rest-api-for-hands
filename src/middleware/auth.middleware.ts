import { Context, Next } from "hono";
import { AuthTable } from "../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";

export const adminGuard = async (c: Context, next: Next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader) {
    return c.json({ error: "No authorization header" }, 401);
  }

  // Get token from header
  const token = authHeader.split(" ")[1];
  
  // Verify admin role
  const user = await db.query.AuthTable.findFirst({
    where: eq(AuthTable.username, token),
    columns: {
      role: true
    }
  });

  if (!user || user.role !== "admin") {
    return c.json({ error: "Unauthorized" }, 403);
  }

  await next();
}; 