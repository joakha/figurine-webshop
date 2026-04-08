import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import type { Request, Response } from "express";
import webhookRouter from "./routers/webhookRouter.js";
import productRouter from "./routers/productRouter.js";
import findRouter from "./routers/findRouter.js";
import stripeRouter from "./routers/stripeRouter.js";
import purchaseRouter from "./routers/purchaseRouter.js";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../prisma/generated/client.js";
import { clerkMiddleware } from '@clerk/express'
import { v2 as cloudinarySDK } from "cloudinary";
import path from "path";
import Stripe from "stripe";

//setup env variables
dotenv.config();

//connect to db
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const myPrismaClient = new PrismaClient({ adapter });

//cloudinary
cloudinarySDK.config({
    api_key: process.env.CLOUDINARY_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_SECRET
})

//Stripe
const stripeConnection = new Stripe(process.env.STRIPE_KEY as string);

//express server
const appBackend = express();

//middleware
appBackend.use(clerkMiddleware())
appBackend.use(cors());

//webhook expects raw request body, not parsed JSON
appBackend.use("/api/webhook", webhookRouter)
//parse json for other routes
appBackend.use(express.json());

//routes
appBackend.use("/api/product", productRouter);
appBackend.use("/api/findProducts", findRouter);
appBackend.use("/api/purchases", purchaseRouter)
appBackend.use("/api/stripe", stripeRouter);

appBackend.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "backend is running!" })
})

//serve built frontend static files
appBackend.use(express.static(path.join(process.cwd(), "../app-frontend/dist")));

//route all unmatched requests
appBackend.get('/{*any}', (req: Request, res: Response) => {
    res.sendFile(path.join(process.cwd(), "../app-frontend/dist/index.html"))
})

export {
    appBackend,
    myPrismaClient,
    stripeConnection
}
