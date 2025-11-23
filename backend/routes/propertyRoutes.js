import express from "express";
import { addProperty } from "../controllers/propertyController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/add", upload.array("images", 5), addProperty);

export default router;
