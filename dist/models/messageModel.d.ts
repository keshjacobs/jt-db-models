import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { IChat } from "./chatModel";
export interface IMessage extends Document {
    user: IUser;
    chatRoom: IChat;
    content: string;
    listens: string[];
    duration: number;
    played: boolean;
    isOptimistic: boolean;
    tempMessageId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage> & IMessage & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default Message;
