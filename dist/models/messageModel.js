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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_EMOJIS = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Emoji progression from hour 6 to hour 11
exports.MESSAGE_EMOJIS = {
    6: "🤩",
    7: "😁",
    8: "😊",
    9: "😏",
    10: "🥹",
    11: "😭",
    12: "😤",
    13: "👿",
};
const PlayedBySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    playedAt: { type: Date, required: true },
}, { _id: false });
const MessageSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
    chatRoom: { type: mongoose_1.Schema.Types.ObjectId, ref: "Chats" },
    content: { type: String },
    listens: [{ type: String }],
    duration: { type: Number, default: 0 },
    played: { type: Boolean, default: false },
    playedBy: { type: [PlayedBySchema], default: [] },
    // isOptimistic: { type: Boolean, default: false },
    tempMessageId: { type: String },
    status: { type: String, enum: ["sending", "sent"], default: "sent" },
    isActive: { type: Boolean, default: true },
    currentEmoji: { type: String, default: exports.MESSAGE_EMOJIS[6] },
    expiresAt: { type: Date },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
// Set expiresAt to 12 hours from creation
MessageSchema.pre("save", function (next) {
    if (this.isNew) {
        this.expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
    }
    next();
});
MessageSchema.set("toJSON", { virtuals: true });
// MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // Add TTL index on createdAt to expire after a day
// Index for cronjob queries — keeps it fast
// MessageSchema.index({ isActive: 1, expiresAt: 1 });
// MessageSchema.index({ createdAt: 1 });
MessageSchema.index({
    isActive: 1,
    played: 1,
    expiresAt: 1,
    createdAt: 1,
});
const Message = mongoose_1.default.model("Messages", MessageSchema);
exports.default = Message;
