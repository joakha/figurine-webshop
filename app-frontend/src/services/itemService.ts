import axios from "axios"
import { API_BASE_URL } from "../constants"

const postItem = async (token: string, newItem: FormData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(`${API_BASE_URL}/api/item`, newItem, config)
    return response.data
}

export default {
    postItem
}