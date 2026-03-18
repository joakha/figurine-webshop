import axios from "axios"
import { BACKEND_ADDRESS } from "../constants"
import type { StripeSession } from "../types/types"

type sessionReturnType = {
    url: string
}

const postPurchase = async (token: string | null, purchaseData: StripeSession): Promise<sessionReturnType> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    
    const response = await axios.post(`${BACKEND_ADDRESS}/api/stripe/checkout`, purchaseData, config);

    console.log(response)
    
    return response.data
}

export default {
    postPurchase
}