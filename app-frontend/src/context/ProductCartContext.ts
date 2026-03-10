import { createContext } from "react";
import type { ProductCartContextType } from "../types/types";

const initProductCartContextState: ProductCartContextType = {
    dispatch: () => { },
    sortedProductCart: [],
    purchaseCount: 0,
    orderPrice: 0,
}

export const ProductCartContext = createContext<ProductCartContextType>(initProductCartContextState);