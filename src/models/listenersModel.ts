import mongoose, { Schema, Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";

export interface IListener extends Document {
	user: IUser;
	cast: ICast;
	date_created: string;
}

const ListenersSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		date_created: { type: Date, default: Date.now },
		cast: { type: Schema.Types.ObjectId, ref: "Casts" },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

ListenersSchema.set("toJSON", { virtuals: true });

const CastListeners = mongoose.model<IListener>(
	"CastListeners",
	ListenersSchema
);

export default CastListeners;
