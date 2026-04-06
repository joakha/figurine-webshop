import express from "express"
import { requireAuth } from "@clerk/express";
import { getAccountPurchases } from "../controllers/purchaseController.js";

const purchaseRouter = express.Router();

purchaseRouter.get("/", requireAuth(), getAccountPurchases);

export default purchaseRouter