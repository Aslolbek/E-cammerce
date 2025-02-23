/* eslint-disable prettier/prettier */
import { Document } from 'mongoose'
import { User } from './user';
import { Category } from './category';

export interface Product extends Document {
    title: string,
    description: string,
    image: string,
    price: string,
    amount: string,
    owner: User,
    categoryId: Category
}