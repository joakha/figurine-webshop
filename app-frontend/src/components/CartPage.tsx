import { Button, Typography } from "antd";
import useProductCart from "../hooks/useProductCart"
import CartProductDetails from "./CartProductDetails";

const CartPage = () => {
    const { sortedProductCart, productCount, orderPrice } = useProductCart();

    return (
        <div className='flex grow flex-col items-center mt-5'>
            <Typography.Title>Your Cart</Typography.Title>
            {sortedProductCart.map((cartProduct) => (
                <CartProductDetails key={cartProduct.id} cartProduct={cartProduct} />
            ))}
            <div className="flex flex-col items-center mt-5 mb-20 gap-5">
                <div className="font-bold text-2xl">Total Product Count: {productCount}</div>
                <div className="font-bold text-2xl">Order Price: {orderPrice}e</div>
                <Button>Go to checkout</Button>
            </div>
        </div>
    )
}

export default CartPage