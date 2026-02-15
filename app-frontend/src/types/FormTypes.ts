import type { FormInstance, UploadFile } from 'antd';

type ItemFormType = {
    name: string,
    description: string,
    stock: number,
    price: number,
    picture: UploadFile<File>[],
    category: string,
    availability: string,
    estimatedDelivery: string
};

type ItemFormProps = {
    form: FormInstance<ItemFormType>,
    pictureRequired: boolean,
    onFinish: ((values: ItemFormType) => void)
}

type ItemType = {
    name: string,
    description: string,
    stock: number,
    price: number,
    picture: string,
    category: string,
    availability: string,
    estimatedDelivery: string
};

export type {
    ItemFormType,
    ItemFormProps,
    ItemType
}