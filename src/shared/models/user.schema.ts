/* eslint-disable prettier/prettier */
 
import { Schema } from 'mongoose';


export const UserSchema = new Schema({
    username: {
        type: String
    },
    role: {
        type: String,
    },
    email: {
        type: String,
        unique: true,  
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
