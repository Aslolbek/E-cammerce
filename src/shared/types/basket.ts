/* eslint-disable prettier/prettier */

import { Document } from 'mongoose';
import { User } from './user';
import { Product } from './product';

export type BasketStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'canceled';
export interface Basket extends Document {
  userId: User; // Foydalanuvchi ID (User modelidan)
  productId: Product; // Mahsulot ID (Product modelidan)
  status: BasketStatus;
}