import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";
import { IChat } from "./chatModel";

export interface IMessage extends Document {
	user: IUser;
	chatRoom: IChat;
	content: string;
	listens: string[];
	duration: number;
	played: boolean;
	isOptimistic: boolean;
	tempMessageId: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

const MessageSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "Users" },
		chatRoom: { type: Schema.Types.ObjectId, ref: "Chats" },
		content: { type: String },
		listens: [{ type: String }],
		duration: { type: Number, default: 0 },
		played: { type: Boolean, default: false },
		isOptimistic: { type: Boolean, default: false },
		tempMessageId: { type: String },
		status: { type: String, enum: ["sending", "sent"], default: "sent" },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

MessageSchema.set("toJSON", { virtuals: true });
MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // Add TTL index on createdAt to expire after a day

const Message = mongoose.model<IMessage>("Messages", MessageSchema);

export default Message;
