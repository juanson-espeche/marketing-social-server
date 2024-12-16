export interface Environment {
  APP_ENV: AppEnvironments;
  APP_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  JWT_SECRET: string;
}

export type AppEnvironments = "dev" | "prod" | "stage";
