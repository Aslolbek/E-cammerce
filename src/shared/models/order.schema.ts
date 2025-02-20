/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose'


export const OrderSchema = new Schema(
    {
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
        min: 0, 
      },
      products: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product', 
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default: 'pending',
      },
    },
    {
      timestamps: true,
    }
  );