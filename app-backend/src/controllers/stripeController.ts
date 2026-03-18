import { Request, Response } from "express";
import { myPrismaClient, stripeConnection } from '../app-backend.js'
import type { StripeSession } from "../../types/types.js";
import { getAuth } from "@clerk/express";
import Stripe from "stripe"
import dotenv from "dotenv"

dotenv.config();

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: StripeSession = req.body;

        const AuthObject = getAuth(req);
        
        const currentUser = await myPrismaClient.account.findUnique({
            where: {
                clerkId: AuthObject.userId as string
            }
        })

        if (!currentUser) {
            throw new Error("No user!");
        }

        const newPurchase = await myPrismaClient.purchase.create({
            data: {
                accountId: currentUser.id,
                status: "PLACED",
                totalCount: checkoutSessionRequest.productCount,
                deliveryDetails: {
                    create: checkoutSessionRequest.deliveryDetails,
                },
                products: {
                    create: checkoutSessionRequest.cartProducts.map((cartProduct) => {
                        return {
                            productId: cartProduct.id,
                            qty: cartProduct.qty,
                            name: cartProduct.name,
                        };
                    }),
                },
            },
        });

        const stripeItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        checkoutSessionRequest.cartProducts.forEach((cartProduct) => {
            const stripeLineItem = {
                price_data: {
                    currency: "eur",
                    unit_amount: cartProduct.price * 100,
                    product_data: {
                        name: cartProduct.name,
                    },
                },
                quantity: cartProduct.qty,
            };

            stripeItems.push(stripeLineItem);
        })

        const StripeCheckout = await stripeConnection.checkout.sessions.create({
            line_items: stripeItems,
            shipping_options: [
                {
                    shipping_rate_data: {
                        display_name: "Delivery",
                        type: "fixed_amount",
                        fixed_amount: {
                            amount: 5 * 100,
                            currency: "eur",
                        },
                    },
                },
            ],
            mode: "payment",
            metadata: {
                purchaseId: newPurchase.id,
            },
            success_url: `${process.env.FRONTEND_ADDRESS}/order-status?success=true`,
            cancel_url: `${
                process.env.FRONTEND_ADDRESS}/checkout?cancelled=true`,
        });

        if (!StripeCheckout.url) {
            return res.status(500).json({ message: "Error creating stripe session" });
        }

        res.json({ url: StripeCheckout.url });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: error?.raw?.message || error.message });
    }
};

export {
    createCheckoutSession
}