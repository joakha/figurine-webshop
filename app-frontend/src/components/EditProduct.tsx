import { Form, notification, type FormProps } from 'antd';
import productService from "../services/productService";
import ProductForm from './ProductForm';
import type { ProductFormType } from '../types/types';
import { useAuth } from "@clerk/clerk-react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const EditProduct = () => {

    const { productId } = useParams();
    const { getToken } = useAuth();

    const [loadingProduct, setLoadingProduct] = useState<boolean>(true);
    const [fetchError, setFetchError] = useState<string | null>();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [form] = Form.useForm<ProductFormType>();

    const [notificationApi, notificationContextHolder] = notification.useNotification();

    const fetchProduct = async () => {
        try {
            setLoadingProduct(true);

            const data = await productService.fetchProduct(productId);

            form.setFieldsValue({
                name: data.name,
                description: data.description,
                price: data.price,
                category: data.category,
                availability: data.availability,
                timeToDelivery: data.timeToDelivery,

                picture: [
                    {
                        uid: '-1',
                        name: 'Current Image',
                        status: 'done',
                        url: data.picture,
                    }
                ]
            });
        } catch (err: any) {
            console.log(err);
            notificationApi.error({
                title: "Failed to fetch product",
                description: err.response?.data?.message || "Something went wrong",
                placement: "bottomRight",
                duration: 8,
                icon: <CloseCircleOutlined />
            });
            setFetchError("Product could not be loaded for editing!");
        } finally {
            setLoadingProduct(false)
        }
    };

    const onFinish: FormProps<ProductFormType>['onFinish'] = async (values) => {
        try {
            setIsSubmitting(true);
            const token = await getToken();

            const productFormData = new FormData();
            productFormData.append("name", values.name);
            productFormData.append("description", values.description);
            productFormData.append("price", values.price.toString());

            //originFileObj property exists only if a new picture is selected
            //otherwise can be skipped
            if (values.picture[0].originFileObj) {
                productFormData.append("picture", values.picture[0].originFileObj);
            }

            productFormData.append("category", values.category)
            productFormData.append("availability", values.availability)
            productFormData.append("timeToDelivery", values.timeToDelivery)

            const data = await productService.putProduct(token, productId, productFormData)
            fetchProduct();

            notificationApi.success({
                title: "Product added",
                description: `${data.name} was successfully added.`,
                placement: "bottomRight",
                duration: 8,
                icon: <CheckCircleOutlined />
            });
        } catch (err: any) {
            console.log(err);
            notificationApi.error({
                title: "Failed to edit product",
                description: err.response?.data?.message || "Something went wrong",
                placement: "bottomRight",
                duration: 8,
                icon: <CloseCircleOutlined />
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId, form])

    return (
        <div className='flex flex-1 flex-col items-center p-10'>
            {notificationContextHolder}
            <h2 className='text-2xl font-bold p-10 text-gray-600'>
                Edit Product
            </h2>
            {loadingProduct ? (
                <>
                    <div>Loading product...</div>
                </>
            ) : fetchError ? (
                <div>{fetchError}</div>
            ) : (
                <>
                    <div className="mb-5 w-full min-w-62.5 max-w-150 bg-slate-300 p-10 rounded-2xl">
                        <ProductForm
                            form={form}
                            onFinish={onFinish}
                            isSubmitting={isSubmitting}
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default EditProduct