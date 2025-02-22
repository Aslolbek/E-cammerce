/* eslint-disable prettier/prettier */
import { Document } from 'mongoose'
import { User } from './user';

export interface Product extends Document {
    title: string,
    description: string,
    image: string,
    price: number,
    amount: number,
    owner: User,
}