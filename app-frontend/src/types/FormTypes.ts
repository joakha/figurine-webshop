import type { FormInstance, UploadFile } from 'antd';

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

type ProductCardProps = {
    product: ProductType
}

type PaginationBarProps = {
    current: number,
    total: number,
    onChange: (page: number) => void
}

type ProductType = {
    name: string,
    description: string,
    price: number,
    picture: string,
    category: string,
    availability: string,
    timeToDelivery: string
};

type ProductFindType = {
    products: ProductType[],
    totalProducts: number,
    currentPage: number,
}

export type {
    ProductFormType,
    ProductFormProps,
    ProductType,
    ProductFindType,
    ProductCardProps,
    PaginationBarProps
}