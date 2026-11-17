// models/pushCampaignModel.ts
// An admin push notification sent (or scheduled) to an audience segment through FCM.
import mongoose, { Schema, Document, Types } from "mongoose";
import { AudienceSegment, PushCampaignStatus, PushPlatform } from "../enums/growth";

export interface IPushCampaign extends Document {
  title: string;
  body: string;
  segment: AudienceSegment;
  platform: PushPlatform;
  status: PushCampaignStatus;
  scheduledFor?: Date;
  sentAt?: Date;
  sent: number; // device tokens attempted
  delivered: number; // accepted by FCM
  failed: number;
  opened: number; // reported by the app
  error?: string;
  createdBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PushCampaignSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 50 },
    body: { type: String, required: true, maxlength: 160 },
    segment: { type: String, enum: Object.values(AudienceSegment), default: AudienceSegment.all_users },
    platform: { type: String, enum: Object.values(PushPlatform), default: PushPlatform.all },
    status: {
      type: String,
      enum: Object.values(PushCampaignStatus),
      default: PushCampaignStatus.draft,
      index: true,
    },
    scheduledFor: { type: Date, index: true },
    sentAt: { type: Date },
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    failed: { type: Number, default: 0 },
    opened: { type: Number, default: 0 },
    error: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true },
);

PushCampaignSchema.set("toJSON", { virtuals: true });

const PushCampaign = mongoose.model<IPushCampaign>("PushCampaigns", PushCampaignSchema);
export default PushCampaign;
