import type { Request, Response } from "express"
import { myPrismaClient } from "../app-backend.js"
import { getAuth } from "@clerk/express"
import { UserMetaData } from "../../types/types.js"

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

        return res.status(200).json(accountPurchases)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error getting customer's purchases" })
    }
}

const getPurchases = async (req: Request, res: Response) => {
    try {
        const authObject = getAuth(req);

        const metadata = authObject.sessionClaims?.metadata as UserMetaData;

        if (metadata.userRole !== "admin") return res.status(403).json({ error: "Not authorized" });

        const purchases = await myPrismaClient.purchase.findMany({
            include: {
                products: true,
                deliveryDetails: true
            }
        });

        res.status(200).json(purchases)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error getting purchases" })
    }
}

const updatePurchaseStatus = async (req: Request, res: Response) => {
    try {
        const authObject = getAuth(req);

        const metadata = authObject.sessionClaims?.metadata as UserMetaData;

        if (metadata.userRole !== "admin") return res.status(403).json({ error: "Not authorized" });

        const id = req.params.id as string;

        const updatedPurchase = await myPrismaClient.purchase.update({
            where: {
                id: id,
            },
            data: {
                status: req.body.status
            },
            include: {
                products: true,
                deliveryDetails: true
            }
        });

        res.json(updatedPurchase)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Error updating purchase status" })
    }
}

export {
    getAccountPurchases,
    getPurchases,
    updatePurchaseStatus
}
