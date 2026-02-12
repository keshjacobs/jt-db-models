import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { ChatRequestStatus } from "../enums/chatRequest";
export interface IChatRequests extends Document {
    receiver: IUser;
    sender: IUser;
    status: ChatRequestStatus;
}
declare const ChatRequests: mongoose.Model<IChatRequests, {}, {}, {}, mongoose.Document<unknown, {}, IChatRequests> & IChatRequests & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default ChatRequests;
