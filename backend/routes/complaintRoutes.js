import express from "express";
import { addComplaint, listMyComplaints, listOwnerComplaints, resolveComplaint } from "../controllers/complaintController.js";
import { auth, ownerOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", auth, addComplaint);
router.get("/my", auth, listMyComplaints);
router.get("/owner", auth, ownerOnly, listOwnerComplaints);
router.put("/:id/resolve", auth, ownerOnly, resolveComplaint);

export default router;

