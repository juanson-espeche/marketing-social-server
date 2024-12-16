import { Context } from "../deps.ts";

// Middleware for logging request details.
export const logger = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  const startTime = Date.now();
  await next();
  const duration = Date.now() - startTime;

  // Build log details
  const logDetails = {
    method: ctx.request.method,
    url: ctx.request.url.href,
    status: ctx.response.status,
    duration: `${duration}ms`,
  };

  // Log details (consider structured logs for monitoring systems)
  if (Deno.env.get("ENV") !== "production") {
    console.log("Request Log:", logDetails);
  }
};