/* eslint-disable prettier/prettier */
 
import { Schema } from 'mongoose';


export const UserSchema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    region: {
        type: String
    },
    district: {
        type: String
    },
},
{
    timestamps: true
})
