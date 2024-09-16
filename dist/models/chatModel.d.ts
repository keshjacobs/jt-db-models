import mongoose, { Document } from "mongoose";
import { IListener } from "./listenersModel";
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
    conversations: [
        {
            user: IUser;
            cast: string;
            cast_id: string;
            played: boolean;
            duration: number;
            listens: IListener[];
            expired: boolean;
            date_created: string;
            date_expired: string;
        }
    ];
    last_modified: string;
}
declare const Chat: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat> & IChat & Required<{
    _id: unknown;
}>, any>;
export default Chat;
