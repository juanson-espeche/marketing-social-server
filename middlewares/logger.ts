import { Context } from "../deps.ts";

export const logger = async (ctx: Context, next: () => Promise<unknown>) => {
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  console.log(`${ctx.request.method} ${ctx.request.url} - ${duration.toFixed(2)}ms`);
};