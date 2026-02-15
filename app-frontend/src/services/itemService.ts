import axios from "axios"
import { BACKEND_ADDRESS } from "../constants"

const postItem = async (token: string | null, newItem: FormData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${BACKEND_ADDRESS}/api/item`, newItem, config)
    return response.data
}

export default {
    postItem
}