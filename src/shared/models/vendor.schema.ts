/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';


export const VendorSchema = new Schema({
    storeName:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,  
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    balance: { 
        type: Number,
         default: 2000000 
    },
    role: {
        type: String,
        default: 'vendor',
    },
    status:{ 
        type: String,
        enum: ['pending', 'approved', 'blocked'], 
        default: 'pending' 
    },
},{
    timestamps: true
})