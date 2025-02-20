/* eslint-disable prettier/prettier */

import { Document, ObjectId } from 'mongoose'

export interface User extends Document {
    _id: ObjectId,
    username: string,
    role: string,
    email: string
    readonly password: string,
    region: string,
    district: string,
}