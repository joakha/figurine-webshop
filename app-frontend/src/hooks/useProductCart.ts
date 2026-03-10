import { useContext } from "react";
import type { ProductCartContextType } from "../types/types";
import { ProductCartContext } from "../context/ProductCartContext";

const useProductCart = (): ProductCartContextType => {
  const context = useContext(ProductCartContext);

  if (!context) {
    throw new Error("useProductCart must be used inside ProductCardProvider!");
  }

  return context;
};

export default useProductCart