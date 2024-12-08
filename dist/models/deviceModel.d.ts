import { Types } from 'mongoose';
export interface IUserDevice {
    user: Types.ObjectId;
    deviceType: string;
    pushNotificationToken: string;
    deviceId: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const UserDevices: import("mongoose").Model<IUserDevice, {}, {}, {}, import("mongoose").Document<unknown, {}, IUserDevice> & IUserDevice & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>;
export default UserDevices;
