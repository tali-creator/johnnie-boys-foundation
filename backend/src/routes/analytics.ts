import { Router } from "express";
import {
  analyticsOverview,
  analyticsPages,
  analyticsTimeline,
  analyticsReferrers,
} from "../controllers/analytics";
import { authenticateAdmin } from "../middleware/auth";

const router = Router();

router.use(authenticateAdmin);

router.get("/overview", analyticsOverview);
router.get("/pages", analyticsPages);
router.get("/timeline", analyticsTimeline);
router.get("/referrers", analyticsReferrers);

export default router;
