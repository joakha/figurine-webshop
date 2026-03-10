import { createContext } from "react";
import type { ProductCartContextType } from "../types/types";

export const ProductCartContext = createContext<ProductCartContextType | undefined>(undefined);