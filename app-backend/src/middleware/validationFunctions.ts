import type { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator";

const checkValidationResult = async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ result: result.array() });
    }

    next();
}

export {
    checkValidationResult
}