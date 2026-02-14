import express from "express"
import { upload } from "../middleware/pictureUpload";
import { addItem } from "../controllers/itemController.js";
import { validateAddItem } from "../middleware/validationChains.js";
import { requireAuth } from "@clerk/express";

const itemRouter = express.Router();

itemRouter.post("/", requireAuth(), upload.single("picture"), validateAddItem, addItem)

export default itemRouter