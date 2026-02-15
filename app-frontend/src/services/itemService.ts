import axios from "axios"
import { BACKEND_ADDRESS } from "../constants"
import type { ItemType } from "../types/FormTypes"

const postItem = async (token: string | null, newItem: FormData): Promise<ItemType> => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BACKEND_ADDRESS}/api/item`, newItem, config)
    return response.data
}

const fetchItem = async (id: string | undefined): Promise<ItemType> => {
    const response = await axios.get(`${BACKEND_ADDRESS}/api/item/${id}`)
    return response.data
}


export default {
    postItem,
    fetchItem
}