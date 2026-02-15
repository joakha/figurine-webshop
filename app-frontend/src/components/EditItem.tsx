import { Form, Typography } from 'antd';
import type { FormProps } from 'antd';
import type { RcFile } from "antd/es/upload";
import itemService from "../services/itemService";
import type { AxiosError } from "axios";
import ItemForm from './ItemForm'
import type { ItemFormType } from '../types/FormTypes';
import { useAuth } from "@clerk/clerk-react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditItem = () => {

    const { itemId } = useParams();
    const { getToken } = useAuth();

    const [loadingItem, setLoadingItem] = useState<boolean>(true);
    const [form] = Form.useForm<ItemFormType>();

    const fetchItem = async () => {
        try {
            setLoadingItem(true);

            const data = await itemService.fetchItem(itemId);

            form.setFieldsValue({
                name: data.name,
                description: data.description,
                stock: data.stock,
                price: data.price,
                category: data.category,
                availability: data.availability,
                estimatedDelivery: data.estimatedDelivery,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingItem(false)
        }
    };

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

    useEffect(() => {
        fetchItem();
    }, [itemId, form])

    return (
        <div className='flex flex-1 flex-col items-center my-20'>
            {loadingItem ? (
                <div>Loading item...</div>
            ) : (
                <>
                    <Typography.Title>Edit Item</Typography.Title>
                    <ItemForm
                        form={form}
                        pictureRequired={false}
                        onFinish={onFinish}
                    />
                </>
            )}

        </div>
    )
}

export default EditItem