/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Schema }  from 'mongoose'

export const ProductSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: String
    },
    amount: {
        type: Number
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Vendor'
    }
}, {
    timestamps: true
})