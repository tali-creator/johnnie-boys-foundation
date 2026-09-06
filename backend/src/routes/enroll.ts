import { Router } from "express";
import { submitEnrollment, listEnrollments, updateEnrollmentStatus } from "../controllers/enroll";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { enrollmentSchema } from "../types/validation";
import { formLimiter } from "../middleware/rateLimiter";

const router = Router();

// Public (rate limited)
router.post("/", formLimiter, validate(enrollmentSchema), submitEnrollment);

// Admin
router.get("/", authenticateAdmin, listEnrollments);
router.patch("/:id/status", authenticateAdmin, updateEnrollmentStatus);

export default router;
