import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";
import { ICast } from "./castModel";

export interface INotification extends Document {
	title: string;
	message: string;
	cast: ICast;
	user: IUser;
	subscriber: IUser;
	date_created: string;
}

const NotificationsSchema: Schema = new Schema(
	{
		title: { type: String },
		message: { type: String },
		user: { type: Schema.Types.ObjectId, ref: "Users" },
		cast: { type: Schema.Types.ObjectId, ref: "Casts" },
		subscriber: { type: Schema.Types.ObjectId, ref: "Users" },
		date_created: { type: Date, default: Date.now },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

NotificationsSchema.set("toJSON", { virtuals: true });

const Notifications = mongoose.model<INotification>(
	"Notifications",
	NotificationsSchema
);

export default Notifications;
