import express from "express";
import {
  addProperty,
  listProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  listMyProperties,
} from "../controllers/propertyController.js";
import upload from "../middlewares/multer.js";
import { auth, ownerOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public listings
router.get("/list", listProperties);

// Owner protected routes (place /my BEFORE /:id so it isn't captured by :id)
router.get("/my", auth, ownerOnly, listMyProperties);
router.post("/add", auth, ownerOnly, upload.array("images", 5), addProperty);
router.put("/:id", auth, ownerOnly, upload.array("images", 5), updateProperty);
router.delete("/:id", auth, ownerOnly, deleteProperty);

// Public property by id
router.get("/:id", getPropertyById);

export default router;
