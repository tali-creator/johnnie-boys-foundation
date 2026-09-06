import { Router } from "express";
import { initializeDonation, verifyDonation, handleWebhook, listDonations } from "../controllers/donations";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { donationSchema } from "../types/validation";
import { donationLimiter } from "../middleware/rateLimiter";

const router = Router();

// Public
router.post("/initialize", donationLimiter, validate(donationSchema), initializeDonation);
router.get("/verify/:reference", verifyDonation);
router.post("/webhook", handleWebhook);

// Admin
router.get("/", authenticateAdmin, listDonations);

export default router;
