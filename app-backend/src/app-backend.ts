import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import type { Request, Response } from "express";
import clerkRouter from "./routers/clerkRouter.js";
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from "../prisma/generated/client.js";
import { clerkMiddleware, getAuth } from '@clerk/express'

//setup env variables
dotenv.config();

//connect to db
const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

//express server
const appBackend = express();

appBackend.use(clerkMiddleware())
//webhook expects raw request body, not parsed JSON
appBackend.use("/api/clerk", clerkRouter)

//middleware
appBackend.use(express.json());
appBackend.use(cors());

//routes
appBackend.get("/test", async (req: Request, res: Response) => {
    res.json({ message: "hello!" })
})

appBackend.get("/auth-state", (req, res) => {
    res.json(req.auth())
})

appBackend.get("/protect", (req, res) => {
    const { userId } = getAuth(req)

    if (!userId) {
        return res.status(401).json("unauthorized")
    }

    return res.json("success")
})


appBackend.get('/users', async (req, res) => {
    const users = await prisma.account.findMany()
    res.json(users)
})

export {
    appBackend,
    prisma
}