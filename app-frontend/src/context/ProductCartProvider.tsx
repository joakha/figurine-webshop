import { useReducer } from "react"
import type { ReactElement } from "react"
import { ProductCartContext } from "./ProductCartContext"
import type {
    ComponentChildrenProps,
    useReducerActionsType,
    ProductCartStateActionType,
    ProductInCart,
    ProductCartStateType,
} from "../types/types"

export const useReducerActions: useReducerActionsType = {
    addProduct: "addProduct",
    removeProduct: "removeProduct",
    clearProducts: "clearProducts"
}

const ProductCartProvider = ({ children }: ComponentChildrenProps): ReactElement => {
    const reducer = (state: ProductCartStateType, action: ProductCartStateActionType): ProductCartStateType => {
        switch (action.type) {
            case useReducerActions.addProduct:
                const payloadProduct = action.payload;
                const productInCart = state.productCart.find(productInCart => productInCart.id === payloadProduct.id);
                const filteredCart: ProductInCart[] = state.productCart.filter(productInCart => productInCart.id !== payloadProduct.id);
                const newProductQuantity: number = productInCart ? productInCart.qty + 1 : 1;
                localStorage.setItem("productCart", JSON.stringify([...filteredCart, { ...payloadProduct, qty: newProductQuantity }]));
                return { ...state, productCart: [...filteredCart, { ...payloadProduct, qty: newProductQuantity }] };

            case useReducerActions.removeProduct:
                const { id } = action.payload;
                localStorage.setItem("productCart", JSON.stringify(state.productCart.filter(productInCart => productInCart.id !== id)));
                return { ...state, productCart: state.productCart.filter(productInCart => productInCart.id !== id) };

            case useReducerActions.clearProducts:
                localStorage.removeItem("productCart");
                return { ...state, productCart: [] };

            default:
                throw new Error();
        }
    }

    const initCartState: ProductCartStateType = {
        productCart: JSON.parse(localStorage.getItem("productCart") || "[]")
    }

    const [state, dispatch] = useReducer(reducer, initCartState);

    const sortedProductCart: ProductInCart[] = state.productCart.sort((a: ProductInCart, b: ProductInCart) => a.name.localeCompare(b.name));
    const productCount = sortedProductCart.reduce((prev, curr) => prev + curr.qty, 0);
    const orderPrice = sortedProductCart.reduce((prev, curr) => prev + curr.qty * curr.price, 0);

    const productCartContextProviderValue = {
        dispatch,
        sortedProductCart,
        productCount,
        orderPrice,
    }

    return (
        <ProductCartContext.Provider value={productCartContextProviderValue}>
            {children}
        </ProductCartContext.Provider>
    )
}

export default ProductCartProvider