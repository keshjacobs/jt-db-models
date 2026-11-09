import mongoose, { Document, Types } from "mongoose";
export interface IFeatureFlag extends Document {
    key: string;
    label: string;
    description?: string;
    enabled: boolean;
    rollout: number;
    platforms: string[];
    updatedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const FeatureFlag: mongoose.Model<IFeatureFlag, {}, {}, {}, mongoose.Document<unknown, {}, IFeatureFlag> & IFeatureFlag & Required<{
    _id: unknown;
}>, any>;
export default FeatureFlag;
