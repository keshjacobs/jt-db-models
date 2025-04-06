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
const badge_1 = require("../enums/badge");
const UserSchema = new mongoose_1.Schema({
    t_id: { type: String, required: true },
    photo: { type: String, default: "photo/default.png" },
    photo_header: { type: String, default: "photo/header.png" },
    full_name: { type: String, required: true },
    user_name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    verified: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    phone: { type: String, default: undefined },
    bio: { type: String, default: undefined },
    password: { type: String, required: true, select: false },
    pushtoken: { type: String, default: "000" },
    coord: {
        lat: { type: Number, default: 0 },
        long: { type: Number, default: 0 },
    },
    ratings: { type: Number, default: 0 },
    email_code: {
        code: {
            required: false,
            type: String,
        },
        expiresIn: {
            required: false,
            type: Date,
        },
    },
    badge: {
        level: {
            required: false,
            enum: badge_1.BadgeLevels,
            type: String,
        },
        points: {
            required: false,
            type: Number,
        },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    date_created: { type: Date, default: Date.now },
    status: { type: Number, default: 1 },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});
UserSchema.set("toJSON", { virtuals: true });
const User = mongoose_1.default.model("Users", UserSchema);
exports.default = User;
