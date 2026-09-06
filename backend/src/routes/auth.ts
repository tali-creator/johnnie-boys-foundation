import { Router } from "express";
import { login, register, getProfile } from "../controllers/auth";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { loginSchema } from "../types/validation";

const router = Router();

router.post("/login", validate(loginSchema), login);
router.post("/register", register); // Protected in production
router.get("/profile", authenticateAdmin, getProfile);

export default router;
