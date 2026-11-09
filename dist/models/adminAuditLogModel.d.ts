import mongoose, { Document, Types } from "mongoose";
import { IUser } from "./userModel";
export interface IAdminAuditLog extends Document {
    admin: Types.ObjectId | IUser;
    adminRole: string;
    action: string;
    targetType: string;
    targetId?: Types.ObjectId;
    targetLabel?: string;
    reason?: string;
    before?: Record<string, any>;
    after?: Record<string, any>;
    service?: string;
    ip?: string;
    userAgent?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const AdminAuditLog: mongoose.Model<IAdminAuditLog, {}, {}, {}, mongoose.Document<unknown, {}, IAdminAuditLog> & IAdminAuditLog & Required<{
    _id: unknown;
}>, any>;
export default AdminAuditLog;
