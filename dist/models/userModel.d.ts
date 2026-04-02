import mongoose, { Document, Types } from "mongoose";
export declare enum TTP_GENDERS {
    male = "male",
    female = "female"
}
export declare enum TTP_VOICE_NAMES {
    male = "en-GB-Neural2-O",
    female = "en-GB-Neural2-N"
}
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
    ttp: {
        gender: string;
        voiceName: string;
    };
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    date_created: Date;
    status: number;
    referralCode?: string;
    referredBy?: Types.ObjectId;
}
declare const User: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}>, any>;
export default User;
