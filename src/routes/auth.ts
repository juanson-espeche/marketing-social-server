import { Router } from "../deps.ts";
import { createToken } from "../utils/jwt.ts";
import { compare } from "../deps.ts";
import { db } from "../database/config.ts";
import { AuthCredentials } from "../interfaces/auth-interfaces.ts";

const router = new Router();

router.post("/auth/login", async (ctx) => {
  try {
    // Parse JSON body
    const body = await ctx.request.body({ type: "json" });
    const value = await body.value;

    // Ensure the object conforms to AuthCredentials
    const { email, password } = value as AuthCredentials;

    // Validate presence of email and password
    if (!email || !password) {
      ctx.response.status = 400;
      ctx.response.body = {
        success: false,
        message: "Email and password are required.",
      };
      return;
    }

    // Query user from database
    const result = await db.queryObject<{ id: number; email: string; password: string }>(
      "SELECT id, email, password FROM users WHERE email = $1",
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      ctx.response.status = 404;
      ctx.response.body = {
        success: false,
        message: "Invalid email or password.",
      };
      return;
    }

    // Verify password
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      ctx.response.status = 401;
      ctx.response.body = {
        success: false,
        message: "Invalid email or password.",
      };
      return;
    }

    // Generate token
    const token = await createToken({ id: user.id, email: user.email });

    ctx.response.status = 200;
    ctx.response.body = {
      success: true,
      token,
    };
  } catch (error) {
    console.error("Error during login:", error);
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: "An error occurred during login.",
    };
  }
});

export default router;