import { Router } from "../deps.ts";
import { getAllCourses, createCourse } from "../services/course.service.ts";
import { sendResponse } from "../utils/response.utils.ts";

const router = new Router();

router.get("/courses", async (ctx) => {
  const courses = await getAllCourses();
  sendResponse(ctx, 200, { success: true, data: courses });
});

router.post("/courses", async (ctx) => {
  const body = await ctx.request.body().value;
  await createCourse(body);
  sendResponse(ctx, 201, { success: true, message: "Course created" });
});

export default router;