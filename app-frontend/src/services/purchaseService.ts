import { BACKEND_ADDRESS } from "../constants";
import type { Purchase } from "../types/types";
import axios from "axios"

const getAccountPurchases = async (token: string | null): Promise<Purchase[]> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BACKEND_ADDRESS}/api/purchases/accountPurchases`, config)
    return response.data
}

const getPurchases = async (token: string | null): Promise<Purchase[]> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BACKEND_ADDRESS}/api/purchases`, config)
    return response.data
}

export default {
    getAccountPurchases,
    getPurchases
}