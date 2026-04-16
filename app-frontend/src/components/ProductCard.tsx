import { CheckCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import type { ProductCardProps } from '../types/types';
import useProductCart from '../hooks/useProductCart';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, isAdmin, notificationApi }: ProductCardProps) => {

    const { Meta } = Card;

    const { dispatch, useReducerActions } = useProductCart();

    const navigate = useNavigate();

    const AddProductToCart = () => {
        dispatch({ type: useReducerActions.addProduct, payload: product });
        notificationApi.success({
            title: "Cart Updated",
            description: `Product was added to cart!.`,
            placement: "bottomRight",
            duration: 1,
            icon: <CheckCircleOutlined />
        });
    }

    return (
        <Card
            cover={
                <div style={{ maxHeight: 300, overflow: "hidden" }}>
                    <img
                        draggable={false}
                        alt={product.description}
                        src={product.picture}
                    />
                </div>
            }
            actions={[
                isAdmin ? (
                    <Button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</Button>
                ) : (
                    <ShoppingCartOutlined
                        key=""
                        onClick={AddProductToCart}
                    />
                ),
                <span>{product.price}e</span>,
                <span>{product.category}</span>
            ]}
        >
            <Meta
                title={product.name}
                description={product.description}
                style={{ minHeight: 120 }}
            />
        </Card >
    )
}

export default ProductCard