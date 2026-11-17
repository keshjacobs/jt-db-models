import mongoose, { Document, Types } from "mongoose";
import { ReportCaseModel, ReportStatus } from "../enums/safety";
export interface IReportCase extends Document {
    case: Types.ObjectId;
    caseModel: ReportCaseModel;
    status: ReportStatus;
    assignee?: Types.ObjectId;
    resolution?: {
        castStatus?: string;
        userStatus?: string;
        warned?: boolean;
        note?: string;
    };
    resolvedBy?: Types.ObjectId;
    resolvedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare const ReportCase: mongoose.Model<IReportCase, {}, {}, {}, mongoose.Document<unknown, {}, IReportCase> & IReportCase & Required<{
    _id: unknown;
}>, any>;
export default ReportCase;
