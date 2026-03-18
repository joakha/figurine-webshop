//types for auth requests
type UserMetaData = {
    userRole: "admin" | "user"
}

//types for stripe
type StripeSession = {
  cartProducts: ProductInCart[],
  deliveryDetails: DeliveryDetailsInput,
  totalPrice: number,
  productCount : number
}

type ProductInCart = {
    id: string,
    name: string,
    description: string,
    price: number,
    picture: string,
    category: string,
    availability: string,
    timeToDelivery: string,
    qty: number
}

type DeliveryDetailsInput = {
  email: string;
  name?: string;
  addressLine1?: string;
  city?: string;
}

export type {
    UserMetaData,
    StripeSession,
    ProductInCart,
    DeliveryDetailsInput
}