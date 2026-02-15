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

export type {
    ItemFormType,
    ItemFormProps
}