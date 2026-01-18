import { verifyWebhook } from '@clerk/express/webhooks'
import type { Request, Response } from 'express'
import { prisma } from '../app-backend.ts'

const saveClerkAccount = async (req: Request, res: Response) => {
    try {
        const evt = await verifyWebhook(req)

        const eventType = evt.type

        console.log(evt.data)

        if (eventType === 'user.created') {
            //clerk is setup so username and email are required
            await prisma.account.create({
                data: {
                    clerkId: evt.data.id,
                    username: evt.data.username as string,
                    email: evt.data.email_addresses[0]?.email_address as string,
                    picture: evt.data.image_url
                },
            });
        }

        if (evt.type === "user.deleted") {
            await prisma.account.delete({
                //id should be always defined
                where: {
                    clerkId: evt.data.id as string
                }
            })
        }

        return res.send('Webhook received')
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return res.status(400).send('Error verifying webhook')
    }
}

export {
    saveClerkAccount
}