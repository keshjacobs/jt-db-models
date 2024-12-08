import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
export interface IBlockedUser extends Document {
    user: IUser;
    blockedUser: IUser;
    reason?: string;
}
declare const BlockedUsers: mongoose.Model<IBlockedUser, {}, {}, {}, mongoose.Document<unknown, {}, IBlockedUser> & IBlockedUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default BlockedUsers;
