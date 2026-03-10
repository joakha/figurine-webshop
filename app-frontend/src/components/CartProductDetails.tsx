import type { DescriptionsProps } from "antd";
import { Image, Button, Descriptions } from "antd"
import type { CartProductDetailsProps } from "../types/types";
import useProductCart from "../hooks/useProductCart";
import { useReducerActions } from "../context/ProductCartProvider";

const CartProductDetails = ({ cartProduct }: CartProductDetailsProps) => {
    const { dispatch } = useProductCart();

    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Name',
            children: cartProduct.name,
            span: 2
        },
        {
            key: '2',
            label: 'Category',
            children: cartProduct.category,
            span: 1
        },
        {
            key: '3',
            label: 'Picture',
            children: <Image width={200} src={cartProduct.picture} />,
            span: 3
        },
        {
            key: '4',
            label: 'Description',
            children: cartProduct.description,
            span: 3
        },
        {
            key: '5',
            label: 'Price',
            children: `${cartProduct.price}e`,
            span: 2
        },
        {
            key: '6',
            label: 'Total',
            children: `${cartProduct.qty} * ${cartProduct.price} = ${cartProduct.price * cartProduct.qty}e`,
            span: 1
        },
        {
            key: '7',
            label: 'Increase quantity',
            children: (
                <Button onClick={() => dispatch({ type: useReducerActions.addProduct, payload: cartProduct })}>
                    Add Product
                </Button>
            ),
            span: 2
        },
        {
            key: '9',
            label: 'Remove from cart',
            children: (
                <Button onClick={() => dispatch({ type: useReducerActions.removeProduct, payload: cartProduct })}>
                    Remove Product
                </Button>
            ),
            span: 1
        }
    ];

    return (
        <div key={cartProduct.id} className="mb-5 w-full min-w-62.5 max-w-175">
            <Descriptions title="Product Details" bordered items={items} />
        </div>
    )
}

export default CartProductDetails