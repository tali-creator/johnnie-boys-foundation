import { Router } from "express";
import { listPosts, getPostBySlug, createPost, updatePost, deletePost } from "../controllers/posts";
import { authenticateAdmin } from "../middleware/auth";
import { validate } from "../middleware/validate";
import { postSchema } from "../types/validation";

const router = Router();

// Public
router.get("/", listPosts);
router.get("/:slug", getPostBySlug);

// Admin
router.post("/", authenticateAdmin, validate(postSchema), createPost);
router.put("/:id", authenticateAdmin, updatePost);
router.delete("/:id", authenticateAdmin, deletePost);

export default router;
