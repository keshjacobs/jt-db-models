import { Schema, model, Types } from 'mongoose';

export interface IUserDevice {
  user: Types.ObjectId;
  deviceType: string; // e.g., 'iOS', 'Android', etc.
  pushNotificationToken: string;
  deviceId: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserDeviceSchema = new Schema<IUserDevice>({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
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

const UserDevices = model<IUserDevice>('UserDevice', UserDeviceSchema);

export default UserDevices;
