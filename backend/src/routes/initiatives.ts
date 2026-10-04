import { Router } from "express";
import {
  listInitiatives,
  getInitiativeBySlug,
  createInitiative,
  updateInitiative,
  deleteInitiative,
} from "../controllers/initiatives";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { initiativeSchema } from "../types/validation";

const router = Router();

// Public
router.get("/", listInitiatives);
router.get("/:slug", getInitiativeBySlug);

// Admin
router.post(
  "/",
  authenticateAdmin,
  validate(initiativeSchema),
  createInitiative
);
router.put("/:id", authenticateAdmin, updateInitiative);
router.delete("/:id", authenticateAdmin, deleteInitiative);

export default router;
