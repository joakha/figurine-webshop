import { Form, type FormProps } from 'antd';
import type { RcFile } from "antd/es/upload";
import productService from "../services/productService";
import type { AxiosError } from "axios";
import ProductForm from './ProductForm'
import type { ProductFormType } from '../types/types';
import { useAuth } from "@clerk/clerk-react";

const AddProduct = () => {

    const { getToken } = useAuth();

    const [form] = Form.useForm<ProductFormType>();

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

    return (
        <div className='flex flex-1 flex-col items-center p-10'>
            <h2 className='text-2xl font-bold p-10 text-gray-600'>Add a new product</h2>
            <div className="mb-5 w-full min-w-62.5 max-w-150 bg-slate-300 p-10 rounded-2xl">
                <ProductForm
                    form={form}
                    onFinish={onFinish}
                />
            </div>

        </div>
    )
}

export default AddProduct