/* eslint-disable prettier/prettier */
import { Document } from "mongoose";

export interface Vendor extends Document {
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
