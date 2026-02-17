import express from "express"
import { upload } from "../middleware/pictureUpload";
import { addProduct, fetchProduct } from "../controllers/productController.js";
import { validateAddProduct } from "../middleware/validationChains.js";
import { requireAuth } from "@clerk/express";

const productRouter = express.Router();

productRouter.post("/", requireAuth(), upload.single("picture"), validateAddProduct, addProduct)
productRouter.get("/:id", fetchProduct)

export default productRouter