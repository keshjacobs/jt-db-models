import mongoose, { Document, Types } from "mongoose";
import { AppealAction, AppealStatus } from "../enums/safety";
export interface IAppeal extends Document {
    user: Types.ObjectId;
    action: AppealAction;
    cast?: Types.ObjectId;
    originalReason?: string;
    message: string;
    status: AppealStatus;
    decidedBy?: Types.ObjectId;
    decidedAt?: Date;
    decisionNote?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Appeal: mongoose.Model<IAppeal, {}, {}, {}, mongoose.Document<unknown, {}, IAppeal> & IAppeal & Required<{
    _id: unknown;
}>, any>;
export default Appeal;
