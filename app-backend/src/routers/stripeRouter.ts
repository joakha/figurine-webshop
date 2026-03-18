import express from "express"
import { requireAuth } from "@clerk/express";
import { createCheckoutSession } from "../controllers/stripeController";

const stripeRouter = express.Router();

stripeRouter.post("/checkout", requireAuth(), createCheckoutSession);

export default stripeRouter