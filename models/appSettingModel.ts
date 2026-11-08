// models/appSettingModel.ts
// Remote app config. Single document keyed "app" so the mobile app can fetch it in one read.
import mongoose, { Schema, Document, Types } from "mongoose";

export const APP_SETTINGS_KEY = "app";

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
    updatedBy: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true },
);

AppSettingSchema.set("toJSON", { virtuals: true });

const AppSetting = mongoose.model<IAppSetting>("AppSettings", AppSettingSchema);
export default AppSetting;
