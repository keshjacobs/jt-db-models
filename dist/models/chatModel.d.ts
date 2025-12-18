import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
export interface IChat extends Document {
    title: string;
    photo: string;
    members: [
        {
            user: IUser;
            admin: boolean;
            accepted: boolean;
        }
    ];
    groupRequestId?: any;
    last_modified: string;
}
declare const Chat: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat> & IChat & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default Chat;
