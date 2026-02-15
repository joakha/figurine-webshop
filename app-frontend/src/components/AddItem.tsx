import { Form, Typography } from 'antd';
import type { FormProps } from 'antd';
import type { RcFile } from "antd/es/upload";
import itemService from "../services/itemService";
import type { AxiosError } from "axios";
import ItemForm from './ItemForm'
import type { ItemFormType } from '../types/FormTypes';
import { useAuth } from "@clerk/clerk-react";

const AddItem = () => {

    const { getToken } = useAuth();

    const [form] = Form.useForm<ItemFormType>();

    const onFinish: FormProps<ItemFormType>['onFinish'] = async (values) => {
        try {
            const token = await getToken();

            const itemFormData = new FormData();
            itemFormData.append("name", values.name);
            itemFormData.append("description", values.description);
            itemFormData.append("stock", values.stock.toString());
            itemFormData.append("price", values.price.toString());

            //the picture wont be undefined because the form validates that it must exist
            if (values.picture[0]) {
                itemFormData.append("picture", values.picture[0].originFileObj as RcFile);
            }

            itemFormData.append("category", values.category)
            itemFormData.append("availability", values.availability)
            itemFormData.append("estimatedDelivery", values.estimatedDelivery)

            const data = await itemService.postItem(token, itemFormData)
            console.log(data)
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.response)
        }
    };

    return (
        <div className='flex flex-1 flex-col items-center my-20'>
            <Typography.Title>Add a new item</Typography.Title>
            <ItemForm
                form={form}
                pictureRequired={true}
                onFinish={onFinish}
            />
        </div>
    )
}

export default AddItem