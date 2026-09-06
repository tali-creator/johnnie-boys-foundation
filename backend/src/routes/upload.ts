import { Router } from "express";
import { uploadFile, deleteFile } from "../controllers/upload";
import { authenticateAdmin } from "../middleware/auth";
import { upload } from "../services/upload";

const router = Router();

// All upload routes are admin-only
router.post(
  "/",
  authenticateAdmin,
  upload.single("file"),
  uploadFile
);
router.delete("/", authenticateAdmin, deleteFile);

export default router;
