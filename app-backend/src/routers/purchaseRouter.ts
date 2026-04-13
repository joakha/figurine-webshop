import express from "express"
import { requireAuth } from "@clerk/express";
import {
    getAccountPurchases,
    getPurchases,
    updatePurchaseStatus
} from "../controllers/purchaseController.js";

const purchaseRouter = express.Router();

purchaseRouter.get("/accountPurchases", requireAuth(), getAccountPurchases);
purchaseRouter.get("/", requireAuth(), getPurchases);
purchaseRouter.patch("/updatePurchaseStatus/:id", requireAuth(), updatePurchaseStatus);

export default purchaseRouter