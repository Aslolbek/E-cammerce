/* eslint-disable prettier/prettier */

import { Document } from "mongoose";


export interface Admin extends Document {
    username: string,
    role: string,
    readonly password: string,
}

