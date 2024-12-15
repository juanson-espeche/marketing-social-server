import { Context } from "../deps.ts";

export const logger = async (ctx: Context, next: () => Promise<void>) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${ms}ms`);
};