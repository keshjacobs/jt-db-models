import mongoose, { Document } from "mongoose";
export interface IUser extends Document {
    t_id: string;
    photo: string;
    photo_header: string;
    full_name: string;
    user_name: string;
    email: string;
    verified: boolean;
    admin: boolean;
    phone?: string;
    bio?: string;
    password: string;
    pushtoken: string;
    coord: {
        lat: number;
        long: number;
    };
    ratings: number;
    email_code?: {
        code: string;
        expiresIn: string;
    };
    badge?: {
        level: string;
        points: number;
        dateOfLastClick: Date;
    };
    wallet?: {
        points: number;
    };
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    date_created: Date;
    status: number;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default User;
