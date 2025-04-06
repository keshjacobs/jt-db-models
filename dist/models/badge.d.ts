import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
import { BadgeLevels } from "../enums/badge";
export interface IBadge extends Document {
    user: IUser;
    points: number;
    level: BadgeLevels;
}
declare const Badges: mongoose.Model<IBadge, {}, {}, {}, mongoose.Document<unknown, {}, IBadge> & IBadge & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default Badges;
