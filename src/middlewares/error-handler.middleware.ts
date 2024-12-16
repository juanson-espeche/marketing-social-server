import { Context } from "../deps.ts";

/**
 * Custom error class for known/controlled errors.
 */
export class AppError extends Error {
  public readonly status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
    this.name = "AppError";
    Object.setPrototypeOf(this, AppError.prototype); // Ensure correct prototype chain
  }
}

/**
 * Type guard to determine if a value is an instance of Error.
 */
const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};

/**
 * Middleware to handle errors in the application.
 */
export const errorHandler = async (ctx: Context, next: () => Promise<void>): Promise<void> => {
  try {
    await next();
  } catch (err: unknown) {
    const isProduction = Deno.env.get("ENV") === "production";
    let status = 500;
    let message = "Internal Server Error";

    // Check if the error is an instance of Error or AppError
    if (err instanceof AppError) {
      status = err.status;
      message = err.message;
    } else if (isError(err)) {
      message = err.message;
    }

    // Log the error details
    console.error({
      message,
      stack: isError(err) ? err.stack : undefined,
      url: ctx.request.url.href,
      method: ctx.request.method,
      rawError: isError(err) ? undefined : err,
    });

    // Respond to the client with a standardized error response
    ctx.response.status = status;
    ctx.response.body = {
      success: false,
      message,
      ...(isProduction
        ? {}
        : {
            error: isError(err) ? err.stack || err.message : "Unknown error",
          }),
      timestamp: new Date().toISOString(),
    };
  }
};