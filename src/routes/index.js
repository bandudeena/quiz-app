import { Router } from "express";

import quizRoutes from "./quizRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use(quizRoutes);
router.use(userRoutes);

export default router;
