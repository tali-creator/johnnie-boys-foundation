import { Router } from "express";
import { trackPageView } from "../controllers/analytics";

const router = Router();

router.post("/", trackPageView);

export default router;
