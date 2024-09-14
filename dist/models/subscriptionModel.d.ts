import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
export interface ISubscription extends Document {
    user: IUser;
    subscriber: IUser;
    date_created: string;
}
declare const Subscriptions: mongoose.Model<ISubscription, {}, {}>;
export default Subscriptions;
