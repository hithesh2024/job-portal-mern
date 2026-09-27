import { Router } from "express";
import {
  applyToJob,
  getMyApplications,
  getAllApplications,
  getApplication,
  updateApplicationStatus
} from "../controllers/applicationController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", protect, applyToJob);
router.get("/my", protect, getMyApplications);
router.get("/", protect, adminOnly, getAllApplications);
router.get("/:id", protect, adminOnly, getApplication);
router.put("/:id/status", protect, adminOnly, updateApplicationStatus);

export default router;
