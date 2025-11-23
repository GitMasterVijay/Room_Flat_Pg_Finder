import express from "express";
import { addProperty, getProperties, getPropertyById, deleteProperty } from "../controllers/propertyController.js";
import { authenticate, authorizeRole } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getProperties);
router.get("/:id", getPropertyById);

// protected routes (OWNER ONLY)
router.post("/", authenticate, authorizeRole("owner"), addProperty);
router.delete("/:id", authenticate, authorizeRole("owner"), deleteProperty);

export default router;
