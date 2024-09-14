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
const mongoose_1 = __importStar(require("mongoose"));
const ChatSchema = new mongoose_1.Schema({
    title: { type: String, default: "Group" },
    photo: { type: String },
    members: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
            admin: { type: Boolean },
            accepted: { type: Boolean },
        },
    ],
    conversations: [
        {
            user: { type: mongoose_1.Schema.Types.ObjectId, ref: "Users" },
            cast: { type: String },
            cast_id: { type: String },
            played: { type: Boolean, default: false },
            duration: { type: Number, default: 0 },
            listens: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "CastListeners" }],
            expired: { type: Boolean, default: false },
            date_created: { type: Date, default: Date.now },
            date_expired: { type: Date },
        },
    ],
    last_modified: { type: Date, default: Date.now },
}, {
    timestamps: true,
    usePushEach: true,
});
ChatSchema.set("toJSON", { virtuals: true });
const Chat = mongoose_1.default.model("Chats", ChatSchema);
exports.default = Chat;
