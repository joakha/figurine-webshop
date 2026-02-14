import type { Request, Response } from 'express'
import { myPrismaClient } from '../app-backend.js'
import cloudinary from "cloudinary"
import { getDataURI } from '../middleware/pictureUpload.js'

const addItem = async (req: Request, res: Response) => {
    try {
        const itemInDB = await myPrismaClient.item.findUnique({
            where: {
                name: req.body.name
            }
        })

        if (itemInDB) {
            return res.status(409).json({
                error: "Item with same name already exists!"
            })
        }

        //realistically if multer hasnt thrown an error before this function return value should be string
        const pictureURI = getDataURI(req.file as Express.Multer.File) as string
        const uploadResponse = await cloudinary.v2.uploader.upload(pictureURI);

        const newItem = {
            name: req.body.name,
            description: req.body.description,
            stock: parseInt(req.body.stock) || 0,
            price: parseInt(req.body.price) || 0,
            picture: uploadResponse.url,
            category: req.body.category,
            availability: req.body.availability,
            estimatedDelivery: req.body.estimatedDelivery
        }

        await myPrismaClient.item.create({
            data: newItem
        });

        res.status(201).send(newItem)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error adding item" })
    }
}

export {
    addItem
}