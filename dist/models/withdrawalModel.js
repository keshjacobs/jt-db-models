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
const mongoose_1 = __importStar(require("mongoose"));
const withdrawal_1 = require("../enums/withdrawal");
const WithdrawalSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    points: { type: Number, required: true, min: 1 },
    nairaPerThousandPoints: { type: Number, required: true },
    multiplier: { type: Number, required: true, default: 1 },
    campaign: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "PointsCampaigns",
        default: null,
    },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(withdrawal_1.WithdrawalStatus),
        default: withdrawal_1.WithdrawalStatus.pending,
        index: true,
    },
    bankDetails: {
        bankName: { type: String, required: true, trim: true },
        accountNumber: { type: String, required: true, trim: true },
        accountName: { type: String, required: true, trim: true },
    },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users", required: true },
    approvedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    approvedAt: { type: Date },
    rejectedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    rejectedAt: { type: Date },
    rejectionReason: { type: String, trim: true },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
// One pending withdrawal per user, enforced by the database.
WithdrawalSchema.index({ user: 1 }, {
    unique: true,
    partialFilterExpression: { status: withdrawal_1.WithdrawalStatus.pending },
});
WithdrawalSchema.index({ user: 1, createdAt: -1 });
WithdrawalSchema.set("toJSON", { virtuals: true });
const Withdrawal = mongoose_1.default.model("Withdrawals", WithdrawalSchema);
exports.default = Withdrawal;
