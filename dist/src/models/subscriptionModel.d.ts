import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
export interface ISubscription extends Document {
    user: IUser;
    subscriber: IUser;
    date_created: string;
}
declare const Subscriptions: mongoose.Model<ISubscription, {}, {}, {}, mongoose.Document<unknown, {}, ISubscription> & ISubscription & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default Subscriptions;
