import mongoose, { Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";
export interface ILike extends Document {
    user: IUser;
    cast: ICast;
    date_created: string;
}
declare const CastLikes: mongoose.Model<ILike, {}, {}, {}, mongoose.Document<unknown, {}, ILike> & ILike & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default CastLikes;
