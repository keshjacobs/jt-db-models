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
// models/appealModel.ts
// A user asking for a moderation decision (suspension, ban, cast removal) to be reviewed.
const mongoose_1 = __importStar(require("mongoose"));
const safety_1 = require("../enums/safety");
const AppealSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true, index: true },
    action: { type: String, enum: Object.values(safety_1.AppealAction), required: true },
    cast: { type: mongoose_1.Schema.Types.ObjectId, ref: "Casts" },
    originalReason: { type: String },
    message: { type: String, required: true, maxlength: 1000 },
    status: { type: String, enum: Object.values(safety_1.AppealStatus), default: safety_1.AppealStatus.pending, index: true },
    decidedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    decidedAt: { type: Date },
    decisionNote: { type: String },
}, { timestamps: true });
// One pending appeal per user per decision (per cast for removals).
AppealSchema.index({ user: 1, action: 1, cast: 1 }, { unique: true, partialFilterExpression: { status: safety_1.AppealStatus.pending } });
AppealSchema.set("toJSON", { virtuals: true });
const Appeal = mongoose_1.default.model("Appeals", AppealSchema);
exports.default = Appeal;
