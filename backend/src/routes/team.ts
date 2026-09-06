import { Router } from "express";
import { listTeam, getTeamMember, createTeamMember, updateTeamMember, deleteTeamMember } from "../controllers/team";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { teamMemberSchema } from "../types/validation";

const router = Router();

// Public
router.get("/", listTeam);

// Admin
router.get("/:id", authenticateAdmin, getTeamMember);
router.post("/", authenticateAdmin, validate(teamMemberSchema), createTeamMember);
router.put("/:id", authenticateAdmin, updateTeamMember);
router.delete("/:id", authenticateAdmin, deleteTeamMember);

export default router;
