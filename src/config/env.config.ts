import { AppEnvironments, Environment } from "../interfaces/env.interfaces.ts";
import { loadEnvVar } from "../utils/env.utils.ts";

const ENV: Environment = {
  APP_ENV: loadEnvVar<AppEnvironments>("APP_ENV", "environment"),
  APP_PORT: loadEnvVar<number>("APP_PORT", "number"),
  DB_USER: loadEnvVar<string>("DB_USER", "string"),
  DB_PASSWORD: loadEnvVar<string>("DB_PASSWORD", "string"),
  DB_NAME: loadEnvVar<string>("DB_NAME", "string"),
  DB_HOST: loadEnvVar<string>("DB_HOST", "string"),
  DB_PORT: loadEnvVar<number>("DB_PORT", "number"),
  JWT_SECRET: loadEnvVar<string>("JWT_SECRET", "string"),
};

export { ENV };
