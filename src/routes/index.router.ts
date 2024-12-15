import { Router } from "../deps.ts";
import courseRoutes from "./courses.routes.ts";
import authRoutes from "./auth.routes.ts";

const router = new Router();

router.use("/courses", courseRoutes.routes(), courseRoutes.allowedMethods());
router.use("/auth", authRoutes.routes(), authRoutes.allowedMethods());

export default router;