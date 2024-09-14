import mongoose, { Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";
export interface IRecast extends Document {
    user: IUser;
    cast: ICast;
    date_created: string;
}
declare const CastRecasts: mongoose.Model<IRecast, {}, {}>;
export default CastRecasts;
