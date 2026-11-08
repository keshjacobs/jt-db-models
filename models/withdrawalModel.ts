import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";
import { IPointsCampaign } from "./pointsCampaignModel";
import { WithdrawalStatus } from "../enums/withdrawal";

// A request to cash out wallet points. The rate is locked when the request is made,
// so a campaign ending (or starting) later doesn't change what the user is owed.
export interface IWithdrawal extends Document {
	user: Types.ObjectId | IUser;
	points: number;
	nairaPerThousandPoints: number;
	multiplier: number;
	campaign?: Types.ObjectId | IPointsCampaign | null;
	amount: number; // naira
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

const WithdrawalSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
		points: { type: Number, required: true, min: 1 },
		nairaPerThousandPoints: { type: Number, required: true },
		multiplier: { type: Number, required: true, default: 1 },
		campaign: {
			type: Schema.Types.ObjectId,
			ref: "PointsCampaigns",
			default: null,
		},
		amount: { type: Number, required: true },
		status: {
			type: String,
			enum: Object.values(WithdrawalStatus),
			default: WithdrawalStatus.pending,
			index: true,
		},
		bankDetails: {
			bankName: { type: String, required: true, trim: true },
			accountNumber: { type: String, required: true, trim: true },
			accountName: { type: String, required: true, trim: true },
		},
		createdBy: { type: Schema.Types.ObjectId, ref: "Users", required: true },
		approvedBy: { type: Schema.Types.ObjectId, ref: "Users" },
		approvedAt: { type: Date },
		rejectedBy: { type: Schema.Types.ObjectId, ref: "Users" },
		rejectedAt: { type: Date },
		rejectionReason: { type: String, trim: true },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

// One pending withdrawal per user, enforced by the database.
WithdrawalSchema.index(
	{ user: 1 },
	{
		unique: true,
		partialFilterExpression: { status: WithdrawalStatus.pending },
	}
);
WithdrawalSchema.index({ user: 1, createdAt: -1 });

WithdrawalSchema.set("toJSON", { virtuals: true });

const Withdrawal = mongoose.model<IWithdrawal>("Withdrawals", WithdrawalSchema);

export default Withdrawal;
