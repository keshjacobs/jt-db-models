import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";
import { BadgeLevels, BadgePoints } from "../enums/badge";

export interface IBadge extends Document {
	user: IUser;
	points: number;
	level: BadgeLevels;
}

const BadgesSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "Users" },
		points: { type: Number, default: BadgePoints.base },
		level: { type: String, enum: BadgeLevels, default: BadgeLevels.base },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

BadgesSchema.set("toJSON", { virtuals: true });

const Badges = mongoose.model<IBadge>("Badges", BadgesSchema);

export default Badges;
