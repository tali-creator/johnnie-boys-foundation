import { Router } from "express";
import { listPrograms, getProgramBySlug, createProgram, updateProgram, deleteProgram } from "../controllers/programs";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { programSchema } from "../types/validation";

const router = Router();

// Public
router.get("/", listPrograms);
router.get("/:slug", getProgramBySlug);

// Admin
router.post("/", authenticateAdmin, validate(programSchema), createProgram);
router.put("/:id", authenticateAdmin, updateProgram);
router.delete("/:id", authenticateAdmin, deleteProgram);

export default router;
