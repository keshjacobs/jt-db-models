import mongoose, { Document, Types } from "mongoose";
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
declare const Banner: mongoose.Model<IBanner, {}, {}, {}, mongoose.Document<unknown, {}, IBanner> & IBanner & Required<{
    _id: unknown;
}>, any>;
export default Banner;
