import { Form, Typography } from 'antd';
import type { FormProps } from 'antd';
import type { RcFile } from "antd/es/upload";
import productService from "../services/productService";
import type { AxiosError } from "axios";
import ProductForm from './ProductForm';
import type { ProductFormType } from '../types/FormTypes';
import { useAuth } from "@clerk/clerk-react";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditProduct = () => {

    const { productId } = useParams();
    const { getToken } = useAuth();

    const [loadingProduct, setLoadingProduct] = useState<boolean>(true);
    const [form] = Form.useForm<ProductFormType>();

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
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingProduct(false)
        }
    };

    const onFinish: FormProps<ProductFormType>['onFinish'] = async (values) => {
        try {
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

            const data = await productService.postProduct(token, productFormData)
            console.log(data)
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.response)
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [productId, form])

    return (
        <div className='flex flex-1 flex-col items-center my-20'>
            {loadingProduct ? (
                <div>Loading product...</div>
            ) : (
                <>
                    <Typography.Title>Edit Product</Typography.Title>
                    <ProductForm
                        form={form}
                        pictureRequired={false}
                        onFinish={onFinish}
                    />
                </>
            )}

        </div>
    )
}

export default EditProduct