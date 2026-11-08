// models/adminAuditLogModel.ts
// Permanent record of every admin action. Unlike ActivityLogs this has NO TTL:
// the audit trail has to outlive the 90-day activity window.
import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

export interface IAdminAuditLog extends Document {
  admin: Types.ObjectId | IUser;
  adminRole: string;
  action: string; // human readable, e.g. "Suspended user"
  targetType: string; // AdminTargetType
  targetId?: Types.ObjectId;
  targetLabel?: string; // e.g. "@barry" or a cast title, for display/search
  reason?: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  service?: string; // which microservice wrote it
  ip?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AdminAuditLogSchema = new Schema(
  {
    admin: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    adminRole: { type: String, required: true },
    action: { type: String, required: true },
    targetType: { type: String, required: true },
    targetId: { type: Schema.Types.ObjectId },
    targetLabel: { type: String },
    reason: { type: String },
    before: { type: Schema.Types.Mixed },
    after: { type: Schema.Types.Mixed },
    service: { type: String },
    ip: { type: String },
    userAgent: { type: String },
  },
  { timestamps: true },
);

AdminAuditLogSchema.index({ createdAt: -1 });
AdminAuditLogSchema.index({ admin: 1, createdAt: -1 });
AdminAuditLogSchema.index({ targetType: 1, createdAt: -1 });
AdminAuditLogSchema.index({ targetId: 1, createdAt: -1 });

AdminAuditLogSchema.set("toJSON", { virtuals: true });

const AdminAuditLog = mongoose.model<IAdminAuditLog>(
  "AdminAuditLogs",
  AdminAuditLogSchema,
);
export default AdminAuditLog;
