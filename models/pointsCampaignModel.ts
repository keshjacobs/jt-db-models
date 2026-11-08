import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./userModel";

// A time-boxed boost on the naira value of wallet points at withdrawal time.
export interface IPointsCampaign extends Document {
	name: string;
	multiplier: number;
	startDate: Date;
	endDate: Date;
	createdBy: Types.ObjectId | IUser;
	updatedBy?: Types.ObjectId | IUser;
	createdAt: Date;
	updatedAt: Date;
}

const PointsCampaignSchema: Schema = new Schema(
	{
		name: { type: String, required: true, trim: true },
		multiplier: { type: Number, required: true, min: 1 },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		createdBy: { type: Schema.Types.ObjectId, ref: "Users", required: true },
		updatedBy: { type: Schema.Types.ObjectId, ref: "Users" },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

PointsCampaignSchema.index({ startDate: 1, endDate: 1 });

PointsCampaignSchema.set("toJSON", { virtuals: true });

const PointsCampaign = mongoose.model<IPointsCampaign>(
	"PointsCampaigns",
	PointsCampaignSchema
);

export default PointsCampaign;
