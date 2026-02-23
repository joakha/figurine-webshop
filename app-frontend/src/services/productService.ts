import axios from "axios"
import { BACKEND_ADDRESS } from "../constants"
import type { ProductType, ProductFindType } from "../types/FormTypes"

const postProduct = async (token: string | null, newProduct: FormData): Promise<ProductType> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BACKEND_ADDRESS}/api/product`, newProduct, config)
    return response.data
}

const putProduct = async (token: string | null, id: string | undefined,  productUpdate: FormData): Promise<ProductType> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${BACKEND_ADDRESS}/api/product/${id}`, productUpdate, config)
    return response.data
}

const fetchProduct = async (id: string | undefined): Promise<ProductType> => {
    const response = await axios.get(`${BACKEND_ADDRESS}/api/product/${id}`)
    return response.data
}

const fetchProducts = async (name: string, category: string, priceOption: string, pageNo: string): Promise<ProductFindType> => {
    const paramsPairs: string[][] = [];

    if (name) paramsPairs.push(["name", name || ""])
    if (category) paramsPairs.push(["category", category || ""])
    if (priceOption) paramsPairs.push(["priceOption", priceOption || ""])
    if (pageNo) paramsPairs.push(["pageNo", pageNo || ""])

    const params = new URLSearchParams(paramsPairs);

    const response = await axios.get(`${BACKEND_ADDRESS}/api/findProducts?${params}`)
    return response.data
}

export default {
    postProduct,
    fetchProduct,
    putProduct,
    fetchProducts
}