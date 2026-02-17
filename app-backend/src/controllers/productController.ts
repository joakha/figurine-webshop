import type { Request, Response } from 'express'
import { myPrismaClient } from '../app-backend.js'
import cloudinary from "cloudinary"
import { getDataURI } from '../middleware/pictureUpload.js'

const fetchProduct = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const product = await myPrismaClient.product.findUnique({
            where: {
                id: id
            }
        })

        if (!product) {
            return res.status(404).json({ error: "resource doesn't exist!" })
        }

        res.json(product)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error getting product" })
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const productInDB = await myPrismaClient.product.findUnique({
            where: {
                name: req.body.name
            }
        })

        if (productInDB) {
            return res.status(409).json({
                error: "Product with same name already exists!"
            })
        }

        //realistically if multer hasnt thrown an error before this function return value should be string
        const pictureURI = getDataURI(req.file as Express.Multer.File) as string
        const uploadResponse = await cloudinary.v2.uploader.upload(pictureURI);

        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: parseInt(req.body.price) || 0,
            picture: uploadResponse.url,
            category: req.body.category,
            availability: req.body.availability,
            timeToDelivery: req.body.timeToDelivery
        }

        await myPrismaClient.product.create({
            data: newProduct
        });

        res.status(201).send(newProduct)

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Error adding product" })
    }
}

export {
    addProduct,
    fetchProduct
}