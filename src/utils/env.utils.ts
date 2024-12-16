import "https://deno.land/x/dotenv@v3.2.2/load.ts";
import { AppEnvironments } from "../interfaces/env.interfaces.ts";

export const VALID_APP_ENVS = new Set<AppEnvironments>([
  "dev",
  "prod",
  "stage",
]);

export const loadEnvVar = <T extends string | number | AppEnvironments>(
  key: string,
  type: "string" | "number" | "environment",
): T => {
  const value = Deno.env.get(key);
  if (!value) {
    throw new Error(`Environment variable "${key}" is missing or undefined.`);
  }

  if (type === "number") {
    const numValue = Number(value);
    if (isNaN(numValue)) {
      throw new Error(`Environment variable "${key}" must be a valid number.`);
    }
    return numValue as T;
  }

  if (type === "environment" && !VALID_APP_ENVS.has(value as AppEnvironments)) {
    throw new Error(
      `Invalid environment variable "${key}". Expected one of: ${
        Array.from(VALID_APP_ENVS).join(", ")
      }.`,
    );
  }

  return value as T;
};
