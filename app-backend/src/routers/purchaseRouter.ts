import express from "express"
import { requireAuth } from "@clerk/express";
import { getAccountPurchases, getPurchases } from "../controllers/purchaseController.js";

const purchaseRouter = express.Router();

purchaseRouter.get("/accountPurchases", requireAuth(), getAccountPurchases);
purchaseRouter.get("/", requireAuth(), getPurchases);

export default purchaseRouter