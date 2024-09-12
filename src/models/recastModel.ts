import mongoose, { Schema, Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";

export interface IRecast extends Document {
	user: IUser;
	cast: ICast;
	date_created: string;
}

const RecastsSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		date_created: { type: Date, default: Date.now },
		cast: { type: Schema.Types.ObjectId, ref: "Casts" },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

RecastsSchema.set("toJSON", { virtuals: true });

const CastRecasts = mongoose.model<IRecast>("CastRecasts", RecastsSchema);

export default CastRecasts;
