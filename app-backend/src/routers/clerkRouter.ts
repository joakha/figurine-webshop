import express from "express"
import { saveClerkAccount } from "../controllers/clerkController.js";

const clerkRouter = express.Router();

clerkRouter.post(
    "/saveClerkAccount",
    express.raw({ type: 'application/json' }),
    saveClerkAccount
)

export default clerkRouter