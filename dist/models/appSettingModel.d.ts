import mongoose, { Document, Types } from "mongoose";
import { BadgeThresholds } from "../enums/growth";
export declare const APP_SETTINGS_KEY = "app";
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
export declare const DEFAULT_POINT_RULES: PointRules;
export interface IAppSetting extends Document {
    key: string;
    minimumVersion: {
        android: string;
        ios: string;
    };
    latestVersion: {
        android: string;
        ios: string;
    };
    maintenanceMode: boolean;
    maintenanceMessage: string;
    dailyAdLimit: number;
    pointsPerAd: number;
    maxCastDuration: number;
    maxGroupMembers: number;
    reportAutoHideThreshold: number;
    badgeThresholds: BadgeThresholds;
    pointRules: PointRules;
    updatedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const AppSetting: mongoose.Model<IAppSetting, {}, {}, {}, mongoose.Document<unknown, {}, IAppSetting> & IAppSetting & Required<{
    _id: unknown;
}>, any>;
export default AppSetting;
