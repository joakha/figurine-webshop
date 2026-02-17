import { Input, Button, Form, InputNumber, Select, Upload } from "antd"
import type { UploadFile } from 'antd';
import { productAvailabilities, productCategories, productTimeToDeliveryValues } from "../lib/product";
import { UploadOutlined } from '@ant-design/icons';
import type { ProductFormProps, ProductFormType } from "../types/FormTypes";

const ProductForm = ({ form, pictureRequired, onFinish }: ProductFormProps) => {

    //add loading, toast, link, return type for api request here

    const normFile = (e: { fileList: UploadFile<File>[] } | UploadFile<File>[]) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Form
            form={form}
            name="productForm"
            layout="vertical"
            style={{ minWidth: 250, maxWidth: 600, width: "100%", padding: "10px" }}
            initialValues={{ stock: 0, price: 0 }}
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item<ProductFormType>
                label="Name"
                name="name"
                rules={[{
                    whitespace: true,
                    required: true,
                    message: 'Input name!'
                }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<ProductFormType>
                label="Description"
                name="description"
                rules={[{
                    whitespace: true,
                    required: true,
                    message: 'Input description!'
                }]}
            >
                <Input.TextArea rows={6} />
            </Form.Item>

            <Form.Item<ProductFormType>
                label="Price"
                name="price"
                rules={[{
                    required: true,
                    message: 'Input price!'
                }]}
            >
                <InputNumber min={0} />
            </Form.Item>

            <Form.Item<ProductFormType>
                label="Picture"
                name="picture"
                rules={[{
                    required: pictureRequired,
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

            <Form.Item<ProductFormType>
                label="Category"
                name="category"
                rules={[{
                    required: true,
                    message: 'Select category!'
                }]}
            >
                <Select placeholder="Select category" options={productCategories} />
            </Form.Item>

            <Form.Item<ProductFormType>
                label="Availability"
                name="availability"
                rules={[{
                    required: true,
                    message: 'Select availability!'
                }]}
            >
                <Select placeholder="Select availability" options={productAvailabilities} />
            </Form.Item>


            <Form.Item<ProductFormType>
                label="Time to Delivery"
                name="timeToDelivery"
                rules={[{
                    required: true,
                    message: 'Select time to delivery'
                }]}
            >
                <Select placeholder="Select time to delivery" options={productTimeToDeliveryValues} />
            </Form.Item>

            <Form.Item<ProductFormType> label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ProductForm