import type { Request, Response } from "express"
import { myPrismaClient } from "../app-backend.js"
import { getAuth } from "@clerk/express"

const getAccountPurchases = async (req: Request, res: Response) => {
    try {
        const authObject = getAuth(req);

        const account = await myPrismaClient.account.findUnique({
            where: {
                clerkId: authObject.userId as string
            }
        })

        const accountPurchases = await myPrismaClient.purchase.findMany({
            where: {
                accountId: account?.id
            },
            include: {
                products: true,
                deliveryDetails: true
            }
        })

        return res.json(accountPurchases)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error getting customer's purchases" })
    }
}

export {
    getAccountPurchases
}