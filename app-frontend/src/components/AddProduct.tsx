import { Form, notification } from 'antd';
import type { RcFile } from "antd/es/upload";
import productService from "../services/productService";
import ProductForm from './ProductForm'
import type { ProductFormType } from '../types/types';
import { useAuth } from "@clerk/clerk-react";
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { useState } from 'react';

const AddProduct = () => {

    const { getToken } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [form] = Form.useForm<ProductFormType>();

    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const onFinish: FormProps<ProductFormType>['onFinish'] = async (values) => {
        try {
            setIsSubmitting(true);
            const token = await getToken();

            const productFormData = new FormData();
            productFormData.append("name", values.name);
            productFormData.append("description", values.description);
            productFormData.append("price", values.price.toString());

            //the picture wont be undefined because the form validates that it must exist
            if (values.picture[0]) {
                productFormData.append("picture", values.picture[0].originFileObj as RcFile);
            }

            productFormData.append("category", values.category)
            productFormData.append("availability", values.availability)
            productFormData.append("timeToDelivery", values.timeToDelivery)

            await productService.postProduct(token, productFormData);

            form.resetFields();

            notificationApi.success({
                title: "Product added",
                description: `Product was successfully added.`,
                placement: "bottomRight",
                duration: 8,
                icon: <CheckCircleOutlined />
            });
        } catch (err: any) {
            console.log(err);
            notificationApi.error({
                title: "Failed to add product",
                description: err.response?.data?.message || "Something went wrong",
                placement: "bottomRight",
                duration: 8,
                icon: <CloseCircleOutlined />
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='flex flex-1 flex-col items-center p-10'>
            {notificationContextHolder}
            <h2 className='text-2xl font-bold p-10 text-gray-600'>
                Add a new product
            </h2>

            <div className="mb-5 w-full min-w-62.5 max-w-150 bg-slate-300 p-10 rounded-2xl">
                <ProductForm
                    form={form}
                    onFinish={onFinish}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    )
}

export default AddProduct