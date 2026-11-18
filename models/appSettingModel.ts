// models/appSettingModel.ts
// Remote app config. Single document keyed "app" so the mobile app can fetch it in one read.
import mongoose, { Schema, Document, Types } from "mongoose";

import { BadgeThresholds, DEFAULT_BADGE_THRESHOLDS } from "../enums/growth";

export const APP_SETTINGS_KEY = "app";

/**
 * Badge points a user earns per action, plus a daily cap.
 * perListen/perCast start at 0 so nobody earns from listens or casts until an admin
 * sets a value on Growth > Badges. dailyCap limits listen + cast points per user per
 * UTC day (0 = listens and casts earn nothing).
 */
export interface PointRules {
  perListen: number;
  perCast: number;
  perAdWatched: number;
  perReferral: number;
  dailyCap: number;
}

export const DEFAULT_POINT_RULES: PointRules = {
  perListen: 0,
  perCast: 0,
  perAdWatched: 2,
  perReferral: 10,
  dailyCap: 40,
};

export interface IAppSetting extends Document {
  key: string;
  minimumVersion: { android: string; ios: string };
  latestVersion: { android: string; ios: string };
  maintenanceMode: boolean;
  maintenanceMessage: string;
  dailyAdLimit: number;
  pointsPerAd: number;
  maxCastDuration: number; // seconds
  maxGroupMembers: number;
  reportAutoHideThreshold: number;
  badgeThresholds: BadgeThresholds;
  pointRules: PointRules;
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AppSettingSchema = new Schema(
  {
    key: { type: String, required: true, unique: true, default: APP_SETTINGS_KEY },
    minimumVersion: {
      android: { type: String, default: "0.0.0" },
      ios: { type: String, default: "0.0.0" },
    },
    latestVersion: {
      android: { type: String, default: "0.0.0" },
      ios: { type: String, default: "0.0.0" },
    },
    maintenanceMode: { type: Boolean, default: false },
    maintenanceMessage: {
      type: String,
      default: "JustTalk is getting an upgrade. We'll be back shortly.",
    },
    dailyAdLimit: { type: Number, default: 5, min: 0 },
    pointsPerAd: { type: Number, default: 2, min: 0 },
    maxCastDuration: { type: Number, default: 300, min: 1 },
    maxGroupMembers: { type: Number, default: 64, min: 2 },
    reportAutoHideThreshold: { type: Number, default: 10, min: 1 },
    // Badge points needed per level (admin-editable; defaults mirror the BadgePoints enum).
    badgeThresholds: Object.fromEntries(
      Object.entries(DEFAULT_BADGE_THRESHOLDS).map(([level, pts]) => [level, { type: Number, default: pts, min: 0 }]),
    ),
    // How users earn badge points.
    pointRules: Object.fromEntries(
      Object.entries(DEFAULT_POINT_RULES).map(([k, v]) => [k, { type: Number, default: v, min: 0 }]),
    ),
    updatedBy: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true },
);

AppSettingSchema.set("toJSON", { virtuals: true });

const AppSetting = mongoose.model<IAppSetting>("AppSettings", AppSettingSchema);
export default AppSetting;
