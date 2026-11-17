// models/bannerModel.ts
// In-app announcement pinned to the top of the home feed.
import mongoose, { Schema, Document, Types } from "mongoose";
import { AudienceSegment, BannerTone } from "../enums/growth";

export interface IBanner extends Document {
  title: string;
  message: string;
  tone: BannerTone;
  ctaLabel?: string;
  ctaUrl?: string;
  audience: AudienceSegment;
  active: boolean;
  startsAt: Date;
  endsAt?: Date;
  impressions: number;
  clicks: number;
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BannerSchema = new Schema(
  {
    title: { type: String, required: true, maxlength: 60 },
    message: { type: String, required: true, maxlength: 160 },
    tone: { type: String, enum: Object.values(BannerTone), default: BannerTone.info },
    ctaLabel: { type: String, maxlength: 30 },
    ctaUrl: { type: String, maxlength: 500 },
    audience: { type: String, enum: Object.values(AudienceSegment), default: AudienceSegment.all_users },
    active: { type: Boolean, default: true, index: true },
    startsAt: { type: Date, default: Date.now },
    endsAt: { type: Date },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    createdBy: { type: Schema.Types.ObjectId, ref: "Users" },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true },
);

BannerSchema.set("toJSON", { virtuals: true });

const Banner = mongoose.model<IBanner>("Banners", BannerSchema);
export default Banner;
