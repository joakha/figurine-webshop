import express from "express"
import { upload } from "../middleware/pictureUpload";
import { addProduct, fetchProduct, putProduct } from "../controllers/productController.js";
import { validateAddProduct } from "../middleware/validationChains.js";
import { requireAuth } from "@clerk/express";

const productRouter = express.Router();

productRouter.post("/", requireAuth(), upload.single("picture"), validateAddProduct, addProduct)
productRouter.get("/:id", fetchProduct)
productRouter.put("/:id", requireAuth(), upload.single("picture"), validateAddProduct, putProduct)

export default productRouter