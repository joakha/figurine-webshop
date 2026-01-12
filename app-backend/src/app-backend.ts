import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import type { Request, Response } from "express";

dotenv.config();

const appBackend = express();

appBackend.use(express.json());
appBackend.use(cors());

appBackend.get("/test", async (re: Request, res: Response) => {
    res.json({message: "hello!"})
})

export default appBackend