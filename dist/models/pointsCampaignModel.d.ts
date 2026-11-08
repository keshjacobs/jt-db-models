import mongoose, { Document, Types } from "mongoose";
import { IUser } from "./userModel";
export interface IPointsCampaign extends Document {
    name: string;
    multiplier: number;
    startDate: Date;
    endDate: Date;
    createdBy: Types.ObjectId | IUser;
    updatedBy?: Types.ObjectId | IUser;
    createdAt: Date;
    updatedAt: Date;
}
declare const PointsCampaign: mongoose.Model<IPointsCampaign, {}, {}, {}, mongoose.Document<unknown, {}, IPointsCampaign> & IPointsCampaign & Required<{
    _id: unknown;
}>, any>;
export default PointsCampaign;
