/* eslint-disable prettier/prettier */

import { Document } from 'mongoose'

export interface User extends Document {
    username: string,
    email: string
    readonly password: string,
    region: string,
    district: string,
}