import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Button } from 'antd';
import type { ProductCardProps } from '../types/types';
import useProductCart from '../hooks/useProductCart';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, isAdmin }: ProductCardProps) => {

    const { Meta } = Card;

    const { dispatch, useReducerActions } = useProductCart();

    const navigate = useNavigate();

    return (
        <Card
            cover={
                <img
                    draggable={false}
                    alt={product.description}
                    src={product.picture}
                />
            }
            actions={[
                isAdmin ? (
                    <Button onClick={() => navigate(`/edit-product/${product.id}`)}>Edit</Button>
                ) : (
                    <ShoppingCartOutlined
                        key=""
                        onClick={() => dispatch({ type: useReducerActions.addProduct, payload: product })}
                    />
                ),
                <span>{product.price}e</span>,
                <span>{product.category}</span>
            ]}
        >
            <Meta
                title={product.name}
                description={product.description}
            />
        </Card >
    )
}

export default ProductCard