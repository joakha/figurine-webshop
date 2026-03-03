import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import type { ProductCardProps } from '../types/FormTypes';

const ProductCard = ({ product } : ProductCardProps) => {

    const { Meta } = Card;

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
                <ShoppingCartOutlined key="" />,
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