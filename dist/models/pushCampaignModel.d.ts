import mongoose, { Document, Types } from "mongoose";
import { AudienceSegment, PushCampaignStatus, PushPlatform } from "../enums/growth";
export interface IPushCampaign extends Document {
    title: string;
    body: string;
    segment: AudienceSegment;
    platform: PushPlatform;
    status: PushCampaignStatus;
    scheduledFor?: Date;
    sentAt?: Date;
    sent: number;
    delivered: number;
    failed: number;
    opened: number;
    error?: string;
    createdBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const PushCampaign: mongoose.Model<IPushCampaign, {}, {}, {}, mongoose.Document<unknown, {}, IPushCampaign> & IPushCampaign & Required<{
    _id: unknown;
}>, any>;
export default PushCampaign;
