import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { ICast } from "./castModel";
interface INotification extends Document {
    title: string;
    message: string;
    cast: ICast;
    user: IUser;
    subscription: boolean;
    date_created: string;
}
declare const Notifications: mongoose.Model<INotification, {}, {}>;
export default Notifications;
