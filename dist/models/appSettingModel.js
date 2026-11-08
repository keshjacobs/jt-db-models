"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_SETTINGS_KEY = void 0;
// models/appSettingModel.ts
// Remote app config. Single document keyed "app" so the mobile app can fetch it in one read.
const mongoose_1 = __importStar(require("mongoose"));
exports.APP_SETTINGS_KEY = "app";
const AppSettingSchema = new mongoose_1.Schema({
    key: { type: String, required: true, unique: true, default: exports.APP_SETTINGS_KEY },
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
    updatedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
}, { timestamps: true });
AppSettingSchema.set("toJSON", { virtuals: true });
const AppSetting = mongoose_1.default.model("AppSettings", AppSettingSchema);
exports.default = AppSetting;
