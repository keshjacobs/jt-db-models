import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { ICast } from "./castModel";
import { NotificationEvents } from "../enums/notification";
export interface INotification extends Document {
    title: string;
    message: string;
    cast: ICast;
    user: IUser;
    subscriber: IUser;
    event: NotificationEvents;
    hasBeenRead: boolean;
    date_created: string;
}
declare const Notifications: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default Notifications;
