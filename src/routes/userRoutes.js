import { Router } from "express";
import userService from "../service/userService.js";

const router = Router();
router.post("/user/signin", userService.signIn);
router.post("/user/signup", userService.signUp);

export default router;
