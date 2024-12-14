import { Context } from "../deps.ts";

export const errorHandler = async (ctx: Context, next: () => Promise<unknown>) => {
  try {
    await next();
  } catch (error) {
    console.error("Error encountered:", error);
    ctx.response.status = 500;
    ctx.response.body = { success: false, message: "Internal Server Error" };
  }
};