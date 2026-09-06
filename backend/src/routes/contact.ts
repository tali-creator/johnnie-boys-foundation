import { Router } from "express";
import { submitContact, listSubmissions, updateSubmissionStatus } from "../controllers/contact";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { contactSchema } from "../types/validation";
import { formLimiter } from "../middleware/rateLimiter";

const router = Router();

// Public (rate limited)
router.post("/", formLimiter, validate(contactSchema), submitContact);

// Admin
router.get("/", authenticateAdmin, listSubmissions);
router.patch("/:id/status", authenticateAdmin, updateSubmissionStatus);

export default router;
