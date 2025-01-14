import { Router } from "express";

const router = Router();

import { userLogin } from "../../modules/user/user.controller.js";
router.post("/login", userLogin);

export default router;
