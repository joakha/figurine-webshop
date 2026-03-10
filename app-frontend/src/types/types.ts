import type { FormInstance, UploadFile } from 'antd';
import type { ReactNode } from 'react';

//types for forms
type ProductFormType = {
    name: string,
    description: string,
    price: number,
    picture: UploadFile<File>[],
    category: string,
    availability: string,
    timeToDelivery: string
};

type ProductFormProps = {
    form: FormInstance<ProductFormType>,
    onFinish: ((values: ProductFormType) => void)
}

//product types
type ProductType = {
    id: string,
    name: string,
    description: string,
    price: number,
    picture: string,
    category: string,
    availability: string,
    timeToDelivery: string
};

type ProductInCart = {
    id: string,
    name: string,
    description: string,
    price: number,
    picture: string,
    category: string,
    availability: string,
    timeToDelivery: string,
    qty: number
}

type ProductFindType = {
    products: ProductType[],
    totalProducts: number,
    currentPage: number,
}

//component prop types
type ProductCardProps = {
    product: ProductType
}

type PaginationBarProps = {
    current: number,
    total: number,
    onChange: (page: number) => void
}

type ComponentChildrenProps = {
    children: ReactNode;
};

type CartProductDetailsProps = {
    cartProduct: ProductInCart
}

//types for productcartcontext and it's provider component
type useReducerActionsType = {
    addProduct: string,
    removeProduct: string,
    clearProducts: string
}

type ProductCartStateActionType = {
    type: string,
    payload: ProductType | ProductInCart
}

type ProductCartContextType = {
    dispatch: React.Dispatch<ProductCartStateActionType>,
    sortedProductCart: ProductInCart[],
    productCount: number,
    orderPrice: number,
}

type ProductCartStateType = {
    productCart: ProductInCart[],
}

export type {
    ProductFormType,
    ProductFormProps,
    ProductType,
    ProductFindType,
    ProductCardProps,
    PaginationBarProps,
    ComponentChildrenProps,
    useReducerActionsType,
    ProductCartStateType,
    ProductCartStateActionType,
    ProductInCart,
    ProductCartContextType,
    CartProductDetailsProps
}