import express from "express"
import { upload } from "../middleware/pictureUpload";
import { addItem, fetchItem } from "../controllers/itemController.js";
import { validateAddItem } from "../middleware/validationChains.js";
import { requireAuth } from "@clerk/express";

const itemRouter = express.Router();

itemRouter.post("/", requireAuth(), upload.single("picture"), validateAddItem, addItem)
itemRouter.get("/:id", fetchItem)

export default itemRouter