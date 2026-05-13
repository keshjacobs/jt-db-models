// models/activityLogModel.ts
import mongoose, { Schema, Document, Types } from "mongoose";
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

const ActivityLogSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ActivityType),
      required: true,
    },
    targetModel: {
      type: String,
      enum: Object.values(ActivityTargetModel),
      required: false,
    },
    targetId: {
      type: Schema.Types.ObjectId,
      refPath: "targetModel",
      required: false,
    },
    // Free-form payload — e.g. { reason: "spam" } for reports,
    // { duration: 32 } for listens, { ip, device } for logins, etc.
    metadata: { type: Schema.Types.Mixed },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true },
);

// Auto-prune after 90 days. Tune to taste — logs grow fast.
ActivityLogSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 60 * 60 * 24 * 90 },
);

// "What did this user do recently?"
ActivityLogSchema.index({ user: 1, createdAt: -1 });
// "All recent actions of type X" (admin/analytics)
ActivityLogSchema.index({ type: 1, createdAt: -1 });

ActivityLogSchema.set("toJSON", { virtuals: true });

const ActivityLog = mongoose.model<IActivityLog>(
  "ActivityLogs",
  ActivityLogSchema,
);
export default ActivityLog;
