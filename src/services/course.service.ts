import { getDBClient } from "../config/database.config.ts";

// Interfaz para el curso
export interface Course {
  id?: number;
  title: string;
  description: string;
  price: number;
  live: boolean;
  created_at?: string;
}

/**
 * Retrieve all courses from the database.
 */
export const getAllCourses = async (): Promise<Course[]> => {
  const db = getDBClient();
  try {
    const result = await db.queryObject<Course>(
      "SELECT id, title, description, price, live, created_at FROM courses",
    );
    return result.rows;
  } catch (error) {
    throw new Error(
      "Failed to retrieve courses: " +
        (error instanceof Error ? error.message : error),
    );
  }
};

/**
 * Insert a new course into the database.
 */
export const createCourse = async (course: Course): Promise<void> => {
  const db = getDBClient();
  const { title, description, price, live } = course;
  try {
    await db.queryObject(
      "INSERT INTO courses (title, description, price, live) VALUES ($1, $2, $3, $4)",
      [title, description, price, live],
    );
  } catch (error) {
    throw new Error(
      "Failed to create course: " +
        (error instanceof Error ? error.message : error),
    );
  }
};
