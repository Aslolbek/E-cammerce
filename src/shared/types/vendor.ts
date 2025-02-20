/* eslint-disable prettier/prettier */
import { Document, ObjectId } from "mongoose";

export interface Vendor extends Document {
    _id: ObjectId,
    storeName: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    city: string;
    balance: number;
    role?: string;
    status: 'pending' | 'approved' | 'blocked'; 
}
