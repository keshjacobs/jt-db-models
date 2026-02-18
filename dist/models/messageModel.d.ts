import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { IChat } from "./chatModel";
export declare const MESSAGE_EMOJIS: Record<number, string>;
export interface IPlayedBy {
    user: any;
    playedAt: Date;
}
export interface IMessage extends Document {
    user: IUser;
    chatRoom: IChat;
    content: string;
    listens: string[];
    duration: number;
    played: boolean;
    playedBy: IPlayedBy[];
    tempMessageId: string;
    status: string;
    isActive: boolean;
    currentEmoji: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage> & IMessage & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default Message;
