import express from "express"
import { validateFindQuery } from "../middleware/validationChains.js";
import { findProducts } from "../controllers/findController.js";

const findRouter = express.Router();

findRouter.get("/", validateFindQuery, findProducts)

export default findRouter