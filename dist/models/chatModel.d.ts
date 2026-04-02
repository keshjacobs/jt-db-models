import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
export interface IChat extends Document {
    roomType: string;
    photo: string;
    members: [
        {
            user: IUser;
            admin: boolean;
            accepted: boolean;
        }
    ];
    idemKey: string;
    groupRequestId?: any;
    lastMessage: {
        content: string;
        sender: IUser;
        played: boolean;
        createdAt: Date;
    };
    last_modified: string;
}
declare const Chat: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat> & IChat & Required<{
    _id: unknown;
}>, any>;
export default Chat;
