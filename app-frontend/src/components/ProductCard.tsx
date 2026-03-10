import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import type { ProductCardProps } from '../types/types';
import useProductCart from '../hooks/useProductCart';
import { useReducerActions } from '../context/ProductCartProvider';

const ProductCard = ({ product }: ProductCardProps) => {

    const { Meta } = Card;

    const { dispatch } = useProductCart();

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
                <ShoppingCartOutlined key="" onClick={() => dispatch({type : useReducerActions.addProduct, payload: product})} />,
                <span>{product.price}e</span>,
                <span>{product.category}</span>
            ]}
        >
            <Meta
                title={product.name}
                description={product.description}
            />
        </Card>
    )
}

export default ProductCard