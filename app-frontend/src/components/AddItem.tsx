import { Typography, Input, Button, Form, InputNumber, Select, Upload } from "antd"
import type { FormProps, UploadFile } from 'antd';
import { itemAvailabilities, itemCategories, itemEstimatedDeliveries } from "../lib/item";
import { UploadOutlined } from '@ant-design/icons';
import type { RcFile } from "antd/es/upload";
import itemService from "../services/itemService";
import { useAuth } from "@clerk/clerk-react";
import type { AxiosError } from "axios";

const AddItem = () => {

    //add loading, toast, link, return type for api request here

    const { getToken } = useAuth()

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

    const onFinish: FormProps<ItemFormType>['onFinish'] = async (values) => {
        try {
            const token = await getToken() as string

            const itemFormData = new FormData();
            itemFormData.append("name", values.name);
            itemFormData.append("description", values.description);
            itemFormData.append("stock", values.stock.toString());
            itemFormData.append("price", values.price.toString());
            //the picture wont be undefined because the form validates that it must exist
            itemFormData.append("picture", values.picture[0].originFileObj as RcFile);
            itemFormData.append("category", values.category)
            itemFormData.append("availability", values.availability)
            itemFormData.append("estimatedDelivery", values.estimatedDelivery)

            const data =itemService.postItem(token, itemFormData)
            console.log(data)
        } catch (err) {
            const error = err as AxiosError;
            console.log(error.response)
        }
    };

    const onFinishFailed: FormProps<ItemFormType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const normFile = (e: { fileList: UploadFile<File>[] } | UploadFile<File>[]) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <div className='flex flex-1 flex-col items-center my-20'>
            <Typography.Title>Add a new item</Typography.Title>
            <Form
                name="addItem"
                layout="vertical"
                style={{ minWidth: 250, maxWidth: 600, width: "100%", padding: "10px" }}
                initialValues={{ stock: 0, price: 0 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<ItemFormType>
                    label="Name"
                    name="name"
                    rules={[{
                        whitespace: true,
                        required: true,
                        message: 'Input item name!'
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<ItemFormType>
                    label="Description"
                    name="description"
                    rules={[{
                        whitespace: true,
                        required: true,
                        message: 'Input item description!'
                    }]}
                >
                    <Input.TextArea rows={6} />
                </Form.Item>

                <Form.Item<ItemFormType>
                    label="Stock"
                    name="stock"
                    rules={[{
                        required: true,
                        message: 'Input item stock!'
                    }]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item<ItemFormType>
                    label="Price"
                    name="price"
                    rules={[{
                        required: true,
                        message: 'Input item price!'
                    }]}
                >
                    <InputNumber min={0} />
                </Form.Item>

                <Form.Item<ItemFormType>
                    label="Picture"
                    name="picture"
                    rules={[{
                        required: true,
                        message: "Upload an image!"
                    }]}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload
                        listType="picture"
                        beforeUpload={() => false}
                        maxCount={1}
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Select Image</Button>
                    </Upload>
                </Form.Item>

                <Form.Item<ItemFormType>
                    label="Category"
                    name="category"
                    rules={[{
                        required: true,
                        message: 'Select category!'
                    }]}
                >
                    <Select placeholder="Select category" options={itemCategories} />
                </Form.Item>

                <Form.Item<ItemFormType>
                    label="Availability"
                    name="availability"
                    rules={[{
                        required: true,
                        message: 'Select availability!'
                    }]}
                >
                    <Select placeholder="Select availability" options={itemAvailabilities} />
                </Form.Item>


                <Form.Item<ItemFormType>
                    label="Estimated Delivery"
                    name="estimatedDelivery"
                    rules={[{
                        required: true,
                        message: 'Select estimated delivery'
                    }]}
                >
                    <Select placeholder="Select estimated delivery" options={itemEstimatedDeliveries} />
                </Form.Item>

                <Form.Item<ItemFormType> label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddItem