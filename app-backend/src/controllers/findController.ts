import type { Request, Response } from "express"
import { myPrismaClient } from "../app-backend.js";

const findProducts = async (req: Request, res: Response) => {
    try {
        const { name, category, priceOption, pageNo } = req.query;

        const currentPage = Number(pageNo) || 1;
        const productsPerPage = 10

        let where: any = {};

        where.name = {
            contains: name,
            mode: "insensitive"
        }

        if (category) {
            where.category = category;
        }

        let orderBy: any = {};

        if (priceOption === "HIGHEST") {
            orderBy = { price: "desc" };
        } else if (priceOption === "LOWEST") {
            orderBy = { price: "asc" };
        }

        const products = await myPrismaClient.product.findMany({
            where,
            orderBy,
            skip: (currentPage - 1) * productsPerPage,
            take: productsPerPage,
        });

        const totalProducts = await myPrismaClient.product.count({ where });

        res.status(200).json({
            products,
            totalProducts,
            currentPage: products.length > 0 ? currentPage : 1,
            totalPages: products.length > 0 ? Math.ceil(totalProducts / productsPerPage) : 1,
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error finding products" })
    }
}

export {
    findProducts
}