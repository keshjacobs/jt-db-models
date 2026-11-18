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
// models/reportCaseModel.ts
// Admin review state for everything reported about one cast or one user.
// Individual reports stay in UserReports (one row per reporter); this holds the
// case-level status, assignee and resolution. No row = never reviewed = "open".
const mongoose_1 = __importStar(require("mongoose"));
const safety_1 = require("../enums/safety");
const ReportCaseSchema = new mongoose_1.Schema({
    case: { type: mongoose_1.Schema.Types.ObjectId, required: true, refPath: "caseModel" },
    caseModel: { type: String, required: true, enum: Object.values(safety_1.ReportCaseModel) },
    status: { type: String, enum: Object.values(safety_1.ReportStatus), default: safety_1.ReportStatus.open, index: true },
    assignee: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    resolution: {
        castStatus: { type: String },
        userStatus: { type: String },
        warned: { type: Boolean },
        note: { type: String },
    },
    resolvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    resolvedAt: { type: Date },
}, { timestamps: true });
ReportCaseSchema.index({ case: 1, caseModel: 1 }, { unique: true });
ReportCaseSchema.set("toJSON", { virtuals: true });
const ReportCase = mongoose_1.default.model("ReportCases", ReportCaseSchema);
exports.default = ReportCase;
