import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;



export const signJWT = (payload: any ,JWT_SECRET: string) => {
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

export const verifyJWT  = (token: string) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
}

