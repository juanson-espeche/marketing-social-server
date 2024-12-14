import { Client, config } from "../deps.ts";

const env = config();

export const db = new Client({
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  hostname: env.DB_HOST,
  port: Number(env.DB_PORT),
});

export const connectDB = async () => {
  try {
    await db.connect();
    console.log("✅ Database connected");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    Deno.exit(1);
  }
};