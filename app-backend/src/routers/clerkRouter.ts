import express from "express"
import { saveClerkAccount } from "../controllers/clerkController.ts";

const clerkRouter = express.Router();

clerkRouter.post(
    "/saveClerkAccount",
    express.raw({ type: 'application/json' }),
    saveClerkAccount
)

export default clerkRouter