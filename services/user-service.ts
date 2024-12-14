import { db } from "../database/config.ts";
import { hashPassword } from "../utils/hash.ts";

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await hashPassword(password);
  try {
    const result = await db.queryObject(`
      INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3) RETURNING id, name, email, created_at
    `, [name, email, hashedPassword]);

    return result.rows[0];
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

export const findUserByEmail = async (email: string) => {
  try {
    const result = await db.queryObject(`
      SELECT id, name, email, password, created_at
      FROM users
      WHERE email = $1
    `, [email]);

    return result.rows[0];
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};