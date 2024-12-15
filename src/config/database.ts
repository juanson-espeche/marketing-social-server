// src/config/database.ts
import { Client } from "../deps.ts";

// Helper function to retrieve environment variables with validation
const getEnvVar = (key: string): string => {
  const value = Deno.env.get(key);
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

// Database configuration
export const db: Client = new Client({
  user: getEnvVar("DB_USER"),
  password: getEnvVar("DB_PASSWORD"),
  database: getEnvVar("DB_NAME"),
  hostname: getEnvVar("DB_HOST"),
  port: Number(Deno.env.get("DB_PORT")) || 5432,
});

// Singleton pattern for database client
let clientInstance: Client | null = null;

export const getDBClient = (): Client => {
  if (!clientInstance) {
    clientInstance = new Client({
      user: getEnvVar("DB_USER"),
      password: getEnvVar("DB_PASSWORD"),
      database: getEnvVar("DB_NAME"),
      hostname: getEnvVar("DB_HOST"),
      port: Number(Deno.env.get("DB_PORT")) || 5432,
    });
  }
  return clientInstance;
};

// Connect to the database
export const connectDB = async (): Promise<void> => {
  const dbClient: Client = getDBClient();
  try {
    await dbClient.connect();
    console.log("Database connected successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Database connection failed: " + error.message);
    } else {
      throw new Error("Unknown error occurred during database connection.");
    }
  }
};

// Close database connection
export const disconnectDB = async (): Promise<void> => {
  const dbClient: Client = getDBClient();
  try {
    await dbClient.end();
    console.log("Database connection closed successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error closing database connection:", error.message);
    } else {
      console.error("Unknown error occurred while closing the database connection.");
    }
  }
};