import mongoose, { Document, Types } from "mongoose";
import { IUser } from "./userModel";
import { ActivityType, ActivityTargetModel } from "../enums/activityLog";
export interface IActivityLog extends Document {
    user: Types.ObjectId | IUser;
    type: ActivityType;
    targetModel?: ActivityTargetModel;
    targetId?: Types.ObjectId;
    metadata?: Record<string, any>;
    ip?: string;
    userAgent?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const ActivityLog: mongoose.Model<IActivityLog, {}, {}, {}, mongoose.Document<unknown, {}, IActivityLog> & IActivityLog & Required<{
    _id: unknown;
}>, any>;
export default ActivityLog;
