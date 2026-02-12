import mongoose, { Schema, Document } from "mongoose";

import { IUser } from "./userModel";
import { ChatRequestStatus } from "../enums/chatRequest";

export interface IChatRequests extends Document {
	receiver: IUser;
	sender: IUser;
	status: ChatRequestStatus;
}

const ChatRequestsSchema: Schema = new Schema(
	{
		receiver: { type: Schema.Types.ObjectId, ref: "Users" },
		sender: { type: Schema.Types.ObjectId, ref: "Users" },
		status: {
			type: String,
			enum: ChatRequestStatus,
			default: ChatRequestStatus.pending,
		},
		requestType: {
			type: String,
			enum: ["Private", "Group"],
			default: "Private",
		},
		groupRequestId: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
);

ChatRequestsSchema.set("toJSON", { virtuals: true });

const ChatRequests = mongoose.model<IChatRequests>(
	"ChatRequests",
	ChatRequestsSchema,
);

export default ChatRequests;
