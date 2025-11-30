import express from "express";
import { addFeedback, listFeedback } from "../controllers/feedbackController.js";

const router = express.Router();

router.get("/", listFeedback);
router.post("/", addFeedback);

export default router;
