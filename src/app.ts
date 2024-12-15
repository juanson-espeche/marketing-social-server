import { Application } from "./deps.ts";
import { connectDB } from "./config/database.config.ts";
import courseRoutes from "./routes/courses.routes.ts";
import authRoutes from "./routes/auth.routes.ts";

export const app = new Application();

/**
 * Global error handling middleware
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Error:`, err);
    ctx.response.status = 500;
    ctx.response.body = {
      success: false,
      message: "Internal Server Error",
    };
  }
});

/**
 * Logger middleware
 */
app.use(async (ctx, next) => {
  const start = performance.now();
  console.log(
    `[${new Date().toISOString()}] ${ctx.request.method} ${ctx.request.url}`,
  );
  await next();
  const ms = performance.now() - start;
  console.log(
    `[${new Date().toISOString()}] ${ctx.request.method} ${ctx.request.url} - ${
      ms.toFixed(2)
    }ms`,
  );
});

/**
 * Connect to the database
 */
await connectDB();

/**
 * Register routes
 */
const routes = [courseRoutes, authRoutes];
routes.forEach((route) => {
  app.use(route.routes());
  app.use(route.allowedMethods());
});
