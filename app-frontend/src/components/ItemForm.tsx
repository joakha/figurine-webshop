import { Input, Button, Form, InputNumber, Select, Upload } from "antd"
import type { UploadFile } from 'antd';
import { itemAvailabilities, itemCategories, itemEstimatedDeliveries } from "../lib/item";
import { UploadOutlined } from '@ant-design/icons';
import type { ItemFormProps, ItemFormType } from "../types/FormTypes";

const ItemForm = ({ form, pictureRequired, onFinish }: ItemFormProps) => {

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
            name="addItem"
            layout="vertical"
            style={{ minWidth: 250, maxWidth: 600, width: "100%", padding: "10px" }}
            initialValues={{ stock: 0, price: 0 }}
            onFinish={onFinish}
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
    )
}

export default ItemForm