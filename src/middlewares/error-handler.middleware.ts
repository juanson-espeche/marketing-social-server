import { Context } from "../deps.ts";

export const errorHandler = async (ctx: Context, next: () => Promise<void>) => {
  try {
    await next();
  } catch (err) {
    console.error("Error caught by middleware:", err);
    ctx.response.status = 500;
    ctx.response.body = { success: false, message: "Internal Server Error" };
  }
};