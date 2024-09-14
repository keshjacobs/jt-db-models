import mongoose, { Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";
export interface IListener extends Document {
    user: IUser;
    cast: ICast;
    date_created: string;
}
declare const CastListeners: mongoose.Model<IListener, {}, {}>;
export default CastListeners;
