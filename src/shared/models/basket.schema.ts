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
        default: 1,  // Agar miqdor berilmasa, 1 bo‘lsin
        min: 1        // 0 yoki manfiy qiymatlar bo‘lmasligi uchun
    }
},{
    timestamps: true
})