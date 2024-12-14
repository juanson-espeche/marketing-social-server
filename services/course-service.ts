import { db } from "../database/config.ts";

export const getAllCourses = async () => {
  const result = await db.queryObject<{
    id: number;
    title: string;
    description: string;
    price: number;
    live: boolean;
    created_at: string;
  }>("SELECT id, title, description, price, live, created_at FROM courses");
  return result.rows;
};

export const createCourse = async (course: {
  title: string;
  description: string;
  price: number;
  live: boolean;
}) => {
  const { title, description, price, live } = course;
  await db.queryObject(
    "INSERT INTO courses (title, description, price, live) VALUES ($1, $2, $3, $4)",
    [title, description, price, live],
  );
};