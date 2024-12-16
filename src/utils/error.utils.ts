import { ENV } from "../config/env.config.ts";

export const handleError = (error: unknown, context?: string): void => {
  const timestamp = new Date().toISOString();
  const isDev = ENV.APP_ENV === "dev";
  const prefix = `[${timestamp}]${context ? ` [${context}]` : ""}`;

  if (error instanceof Error) {
    console.error(`${prefix} ${error.message}`);
    if (isDev && error.stack) {
      console.error(`${prefix} Stack Trace:\n${error.stack}`);
    }
  } else {
    console.error(`${prefix} Unknown error:`, error);
  }
};
