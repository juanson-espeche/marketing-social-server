import { Application } from "./deps.ts";
import { connectDB } from "./database/config.ts";
import courseRoutes from "./routes/courses.ts";
import authRoutes from "./routes/auth.ts";

const app = new Application();

// Global middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = { success: false, message: "Internal Server Error" };
  }
});

// Logger middleware
app.use(async (ctx, next) => {
  console.log(`${ctx.request.method} ${ctx.request.url}`);
  await next();
});

// Connect to the database
await connectDB();

// Routes
app.use(courseRoutes.routes());
app.use(courseRoutes.allowedMethods());

app.use(authRoutes.routes());
app.use(authRoutes.allowedMethods());

// Start server
const PORT = Deno.env.get("PORT") ? Number(Deno.env.get("PORT")) : 8000;
console.log(`Server running on http://localhost:${PORT}`);
await app.listen({ port: PORT });