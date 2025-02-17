/* eslint-disable prettier/prettier */
import { Product } from "./product"
import { User } from "./user";

interface ProductOrder {
    product: Product,
    quantity: number
}


export interface Order extends Document {
    owner: User,
    totalPrice: string,
    product: ProductOrder[]
}