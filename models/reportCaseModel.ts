// models/reportCaseModel.ts
// Admin review state for everything reported about one cast or one user.
// Individual reports stay in UserReports (one row per reporter); this holds the
// case-level status, assignee and resolution. No row = never reviewed = "open".
import mongoose, { Schema, Document, Types } from "mongoose";
import { ReportCaseModel, ReportStatus } from "../enums/safety";

export interface IReportCase extends Document {
  case: Types.ObjectId;
  caseModel: ReportCaseModel;
  status: ReportStatus;
  assignee?: Types.ObjectId;
  resolution?: {
    castStatus?: string; // CastModerationStatus applied, if any
    userStatus?: string; // AccountStatus applied, if any
    warned?: boolean; // the owner was sent a warning
    note?: string;
  };
  resolvedBy?: Types.ObjectId;
  resolvedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ReportCaseSchema = new Schema(
  {
    case: { type: Schema.Types.ObjectId, required: true, refPath: "caseModel" },
    caseModel: { type: String, required: true, enum: Object.values(ReportCaseModel) },
    status: { type: String, enum: Object.values(ReportStatus), default: ReportStatus.open, index: true },
    assignee: { type: Schema.Types.ObjectId, ref: "Users" },
    resolution: {
      castStatus: { type: String },
      userStatus: { type: String },
      warned: { type: Boolean },
      note: { type: String },
    },
    resolvedBy: { type: Schema.Types.ObjectId, ref: "Users" },
    resolvedAt: { type: Date },
  },
  { timestamps: true },
);

ReportCaseSchema.index({ case: 1, caseModel: 1 }, { unique: true });
ReportCaseSchema.set("toJSON", { virtuals: true });

const ReportCase = mongoose.model<IReportCase>("ReportCases", ReportCaseSchema);
export default ReportCase;
