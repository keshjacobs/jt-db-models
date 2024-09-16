import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { ICast } from "./castModel";
export interface INotification extends Document {
    title: string;
    message: string;
    cast: ICast;
    user: IUser;
    subscription: boolean;
    date_created: string;
}
declare const Notifications: mongoose.Model<INotification, {}, {}, {}, mongoose.Document<unknown, {}, INotification> & INotification & Required<{
    _id: unknown;
}>, any>;
export default Notifications;
