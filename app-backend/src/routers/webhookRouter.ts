import express from "express"
import { stripeUpdateEvent } from "../controllers/stripeController.js";
import { saveClerkAccount } from "../controllers/clerkController.js";

const webhookRouter = express.Router();

webhookRouter.post(
    "/saveClerkAccount",
    express.raw({ type: 'application/json' }),
    saveClerkAccount
);

webhookRouter.post("/stripeUpdate",
    express.raw({ type: '*/*' }),
    stripeUpdateEvent
);

export default webhookRouter