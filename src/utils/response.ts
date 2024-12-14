import { Context } from "../deps.ts";

export const sendResponse = (
  ctx: Context,
  status: number,
  body: Record<string, unknown>,
) => {
  ctx.response.status = status;
  ctx.response.body = body;
};