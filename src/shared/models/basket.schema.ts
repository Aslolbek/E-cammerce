/* eslint-disable prettier/prettier */

import { Schema } from "mongoose";

export const BasketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        require: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1, 
        min: 1        
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'canceled'],
        default: 'pending'  
    }
},{
    timestamps: true
})