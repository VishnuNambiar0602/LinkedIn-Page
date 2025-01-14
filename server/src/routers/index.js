import { Router } from "express";
const router = Router();

import authRouter from "./auth/auth.router.js";

router.use("/auth", authRouter);

export default router;
