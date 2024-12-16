import { Client } from "../deps.ts";
import { ENV } from "./env.config.ts";

let clientInstance: Client | null = null;

/**
 * Create and initialize the database client.
 */
const createDBClient = (): Client => {
  return new Client({
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_NAME,
    hostname: ENV.DB_HOST,
    port: ENV.DB_PORT,
  });
};

/**
 * Connect to the database.
 */
export const connectDB = async (): Promise<Client> => {
  if (!clientInstance) {
    try {
      clientInstance = createDBClient();
      await clientInstance.connect();
      console.log("Database connected successfully.");
    } catch (error) {
      throw new Error(
        "Database connection failed: " +
          (error instanceof Error ? error.message : error),
      );
    }
  }
  return clientInstance;
};

/**
 * Disconnect from the database.
 */
export const disconnectDB = async (): Promise<void> => {
  if (clientInstance) {
    try {
      await clientInstance.end();
      clientInstance = null;
      console.log("Database connection closed successfully.");
    } catch (error) {
      console.error("Error while closing the database connection:", error);
    }
  }
};

/**
 * Get the active database client instance.
 */
export const getDBClient = (): Client => {
  if (!clientInstance) {
    throw new Error(
      "Database client is not connected. Did you forget to call connectDB?",
    );
  }
  return clientInstance;
};
