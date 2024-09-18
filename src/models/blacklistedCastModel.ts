import mongoose, { Schema, Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";

export interface IBlacklistedCast extends Document {
	user: IUser;
	cast: ICast;
}

const BlacklistedCastsSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "Users" },
		cast: { type: Schema.Types.ObjectId, ref: "Casts" },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

BlacklistedCastsSchema.set("toJSON", { virtuals: true });

const BlacklistedCasts = mongoose.model<IBlacklistedCast>(
	"BlacklistedCasts",
	BlacklistedCastsSchema
);

export default BlacklistedCasts;
