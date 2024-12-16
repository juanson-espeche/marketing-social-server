import { Router, compare, z } from "../deps.ts";
import { createToken } from "../utils/jwt.utils.ts";
import { getDBClient } from "../config/database.config.ts";

const router = new Router();

/**
 * Schema for validating login credentials.
 */
const loginSchema = z.object({
  email: z.string().email("Invalid email format."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

/**
 * Query a user by email from the database.
 * @param email
 * @returns The user object or null if not found.
 */
const findUserByEmail = async (
  email: string
): Promise<{ id: number; email: string; password: string } | null> => {
  try {
    const dbClient = getDBClient();
    const result = await dbClient.queryObject<{ id: number; email: string; password: string }>(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email],
    );
    return result.rows[0] || null;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Database query error:", error.message);
      throw new Error("Failed to query user from database.");
    } else {
      console.error("Unknown database error:", error);
      throw new Error("An unexpected database error occurred.");
    }
  }
};

/**
 * Middleware to handle the login route.
 */
router.post("/auth/login", async (ctx) => {
  try {
    // Parse JSON body and validate against schema
    const body = await ctx.request.body({ type: "json" });
    const value = await body.value;
    const credentials = loginSchema.parse(value);

    // Query user from the database
    const user = await findUserByEmail(credentials.email);

    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Invalid email or password.",
      };
      return;
    }

    // Verify password
    const passwordMatch = await compare(credentials.password, user.password);

    if (!passwordMatch) {
      ctx.response.status = 401;
      ctx.response.body = {
        success: false,
        message: "Invalid email or password.",
      };
      return;
    }

    // Generate JWT token
    const token = await createToken({ id: user.id, email: user.email });

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      message: "Login successful.",
      data: { token },
    };
  } catch (error: unknown) {
    // Check if error is an instance of z.ZodError
    if (error instanceof z.ZodError) {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "Validation error.",
        errors: error.errors.map((e) => e.message),
      };
    } else if (error instanceof Error) {
      // Handle known errors
      console.error("Error during login:", error.message);
      ctx.response.status = 500;
      ctx.response.body = {
        success: false,
        message: "An internal error occurred.",
      };
    } else {
      // Handle unknown errors
      console.error("Unknown error during login:", error);
      ctx.response.status = 500;
      ctx.response.body = {
        success: false,
        message: "An unexpected error occurred.",
      };
    }
  }
});

export default router;