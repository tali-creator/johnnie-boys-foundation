import { Router } from "express";
import { submitVolunteer, listVolunteers, updateVolunteerStatus } from "../controllers/volunteer";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { volunteerSchema } from "../types/validation";
import { formLimiter } from "../middleware/rateLimiter";

const router = Router();

// Public (rate limited)
router.post("/", formLimiter, validate(volunteerSchema), submitVolunteer);

// Admin
router.get("/", authenticateAdmin, listVolunteers);
router.patch("/:id/status", authenticateAdmin, updateVolunteerStatus);

export default router;
