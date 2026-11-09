import mongoose, { Document, Types } from "mongoose";
export declare const APP_SETTINGS_KEY = "app";
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
    updatedBy?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const AppSetting: mongoose.Model<IAppSetting, {}, {}, {}, mongoose.Document<unknown, {}, IAppSetting> & IAppSetting & Required<{
    _id: unknown;
}>, any>;
export default AppSetting;
