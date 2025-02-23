/* eslint-disable prettier/prettier */
import { Document  } from "mongoose";
import { User } from "./user";
import { Product } from "./product";

export interface Comment extends Document {
    userId: User;
    productId: Product;
    comment: string;
}