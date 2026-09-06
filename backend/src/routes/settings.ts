import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings";
import { authenticateAdmin } from "../middleware/auth";

const router = Router();

// Public - read only
router.get("/", getSettings);

// Admin - write
router.put("/", authenticateAdmin, updateSettings);

export default router;
