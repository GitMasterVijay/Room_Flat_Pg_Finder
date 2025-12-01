import express from "express";
import { addFeedback, listFeedback } from "../controllers/feedbackController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listFeedback);
router.post("/", auth, addFeedback);

export default router;
