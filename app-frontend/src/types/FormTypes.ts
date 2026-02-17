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

type ProductType = {
    name: string,
    description: string,
    price: number,
    picture: string,
    category: string,
    availability: string,
    timeToDelivery: string
};

export type {
    ProductFormType,
    ProductFormProps,
    ProductType
}