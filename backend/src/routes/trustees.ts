import { Router } from "express";
import { listTrustees, createTrustee, updateTrustee, deleteTrustee } from "../controllers/trustees";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { trusteeSchema } from "../types/validation";

const router = Router();

// Public
router.get("/", listTrustees);

// Admin
router.post("/", authenticateAdmin, validate(trusteeSchema), createTrustee);
router.put("/:id", authenticateAdmin, updateTrustee);
router.delete("/:id", authenticateAdmin, deleteTrustee);

export default router;
