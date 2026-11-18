import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { IChat } from "./chatModel";
import { IMessage } from "./messageModel";
export interface IPointTransfer extends Document {
    sender: IUser;
    recipient: IUser;
    amount: number;
    chatRoom: IChat;
    message: IMessage;
    createdAt: Date;
    updatedAt: Date;
}
declare const PointTransfer: mongoose.Model<IPointTransfer, {}, {}, {}, mongoose.Document<unknown, {}, IPointTransfer> & IPointTransfer & Required<{
    _id: unknown;
}>, any>;
export default PointTransfer;
