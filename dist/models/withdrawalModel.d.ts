import mongoose, { Document, Types } from "mongoose";
import { IUser } from "./userModel";
import { IPointsCampaign } from "./pointsCampaignModel";
import { WithdrawalStatus } from "../enums/withdrawal";
export interface IWithdrawal extends Document {
    user: Types.ObjectId | IUser;
    points: number;
    nairaPerThousandPoints: number;
    multiplier: number;
    campaign?: Types.ObjectId | IPointsCampaign | null;
    amount: number;
    status: WithdrawalStatus;
    bankDetails: {
        bankName: string;
        accountNumber: string;
        accountName: string;
    };
    createdBy: Types.ObjectId | IUser;
    approvedBy?: Types.ObjectId | IUser;
    approvedAt?: Date;
    rejectedBy?: Types.ObjectId | IUser;
    rejectedAt?: Date;
    rejectionReason?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Withdrawal: mongoose.Model<IWithdrawal, {}, {}, {}, mongoose.Document<unknown, {}, IWithdrawal> & IWithdrawal & Required<{
    _id: unknown;
}>, any>;
export default Withdrawal;
