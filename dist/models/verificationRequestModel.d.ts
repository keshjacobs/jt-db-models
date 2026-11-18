import mongoose, { Document, Types } from "mongoose";
import { VerificationStatus } from "../enums/safety";
export interface IVerificationRequest extends Document {
    user: Types.ObjectId;
    category: string;
    links: string[];
    note?: string;
    status: VerificationStatus;
    reviewedBy?: Types.ObjectId;
    reviewedAt?: Date;
    reviewNote?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const VerificationRequest: mongoose.Model<IVerificationRequest, {}, {}, {}, mongoose.Document<unknown, {}, IVerificationRequest> & IVerificationRequest & Required<{
    _id: unknown;
}>, any>;
export default VerificationRequest;
