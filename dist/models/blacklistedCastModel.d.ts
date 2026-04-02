import mongoose, { Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";
export interface IBlacklistedCast extends Document {
    user: IUser;
    cast: ICast;
}
declare const BlacklistedCasts: mongoose.Model<IBlacklistedCast, {}, {}, {}, mongoose.Document<unknown, {}, IBlacklistedCast> & IBlacklistedCast & Required<{
    _id: unknown;
}>, any>;
export default BlacklistedCasts;
