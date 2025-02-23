/* eslint-disable prettier/prettier */
import { Document } from "mongoose";

export interface Category extends Document {
    name: string
}