/* eslint-disable prettier/prettier */

import { Document } from 'mongoose';
import { User } from './user';
import { Product } from './product';

export interface Basket extends Document {
  userId: User; // Foydalanuvchi ID (User modelidan)
  productId: Product; // Mahsulot ID (Product modelidan)
}