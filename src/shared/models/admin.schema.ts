/* eslint-disable prettier/prettier */
import { Schema } from 'mongoose';


export const AdminSchema = new Schema({
    username: {
        type: String
    },
    role: {
        type: String
    },
    password: {
        type: String
    }
},{
    timestamps: true
})
