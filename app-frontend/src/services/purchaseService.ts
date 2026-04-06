import { BACKEND_ADDRESS } from "../constants";
import type { AccountPurchase } from "../types/types";
import axios from "axios"

const getAccountPurchases = async (token: string | null): Promise<AccountPurchase[]> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${BACKEND_ADDRESS}/api/accountPurchases`, config)
    return response.data
}

export default {
    getAccountPurchases
}