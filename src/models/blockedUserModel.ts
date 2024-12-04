import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";

export interface IBlockedUser extends Document {
	user: IUser;
	blockedUser: IUser;
	reason?: string;
}

const BlockedUsersSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "Users" },
		blockedUser: { type: Schema.Types.ObjectId, ref: "Users" },
		reason: { required: false, type: String },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

BlockedUsersSchema.set("toJSON", { virtuals: true });

const BlockedUsers = mongoose.model<IBlockedUser>(
	"BlockedUsers",
	BlockedUsersSchema
);

export default BlockedUsers;
