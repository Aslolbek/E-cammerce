/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';

export const CommentSchema = new Schema({

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
    comment:{
        type: String
    }
},{
    timestamps: true
})