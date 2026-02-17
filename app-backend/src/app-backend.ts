import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import type { Request, Response } from "express";
import clerkRouter from "./routers/clerkRouter.js";
import productRouter from "./routers/productRouter.js";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient, Prisma } from "../prisma/generated/client.js";
import { clerkMiddleware } from '@clerk/express'
import { v2 as cloudinarySDK } from "cloudinary";

//setup env variables
dotenv.config();

//connect to db
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const myPrismaClient = new PrismaClient({ adapter })

//cloudinary
cloudinarySDK.config({
    api_key: process.env.CLOUDINARY_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_SECRET
})

//express server
const appBackend = express();

//middleware
appBackend.use(clerkMiddleware())
//webhook expects raw request body, not parsed JSON
appBackend.use("/api/clerk", clerkRouter)
//parse json for other routes
appBackend.use(express.json());
appBackend.use(cors());

//routes
appBackend.use("/api/product", productRouter)

appBackend.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "backend is running!" })
})

export {
    appBackend,
    myPrismaClient,
    Prisma
}