import { Button, Typography } from "antd";
import useProductCart from "../hooks/useProductCart"
import CartProductDetails from "./CartProductDetails";
import stripeService from "../services/stripeService";
import type { StripeSession } from "../types/types";
import { useAuth } from "@clerk/clerk-react";

const CartPage = () => {
    const { getToken } = useAuth();

    const { sortedProductCart, productCount, orderPrice } = useProductCart();

    const makePurchase = async () => {
        const purchaseData: StripeSession = {
            cartProducts: sortedProductCart,
            productCount: productCount,
            deliveryDetails: {
                email: "testemail@test.com",
                addressLine1: "testAddress 62a"
            },
            totalPrice: orderPrice
        }

        try {
            const token = await getToken();

            const data = await stripeService.postPurchase(token, purchaseData);

            window.location.href = data.url;
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex grow flex-col items-center mt-5'>
            <Typography.Title>Your Cart</Typography.Title>
            {sortedProductCart.map((cartProduct) => (
                <CartProductDetails key={cartProduct.id} cartProduct={cartProduct} />
            ))}
            <div className="flex flex-col items-center mt-5 mb-20 gap-5">
                <div className="font-bold text-2xl">Total Product Count: {productCount}</div>
                <div className="font-bold text-2xl">Total Price: {orderPrice}e</div>
                <Button onClick={makePurchase}>Go to checkout</Button>
            </div>
        </div>
    )
}

export default CartPage