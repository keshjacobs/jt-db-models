"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserDeviceSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Users', required: true },
    deviceType: { type: String, required: true },
    pushNotificationToken: { type: String, required: true },
    deviceId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Update updatedAt field on save
UserDeviceSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const UserDevices = (0, mongoose_1.model)('UserDevice', UserDeviceSchema);
exports.default = UserDevices;
