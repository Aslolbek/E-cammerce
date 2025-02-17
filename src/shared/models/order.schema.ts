/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose'

export const OrderSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    totalPrice: {
        type: String
    },
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number
        }
    }]

},{
    timestamps: true
})