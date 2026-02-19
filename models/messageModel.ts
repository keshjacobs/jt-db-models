import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";
import { IChat } from "./chatModel";

// Emoji progression from hour 6 to hour 11
export const MESSAGE_EMOJIS: Record<number, string> = {
	6: "🤩",
	7: "😁",
	8: "😊",
	9: "😏",
	10: "🥹",
	11: "😭",
	12: "😤",
	13: "👿",
};

export interface IPlayedBy {
	user: any;
	playedAt: Date;
}

const PlayedBySchema = new Schema<IPlayedBy>(
	{
		user: { type: Schema.Types.ObjectId, ref: "Users" },
		playedAt: { type: Date, required: true },
	},
	{ _id: false },
);

export interface IMessage extends Document {
	user: IUser;
	chatRoom: IChat;
	content: string;
	listens: string[];
	duration: number;
	played: boolean;
	playedBy: IPlayedBy[];
	// isOptimistic: boolean;
	tempMessageId: string;
	status: string;
	isActive: boolean; // false after 12 hours
	currentEmoji: string; // populated from hour 6 onwards
	expiresAt: Date;
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
		playedBy: { type: [PlayedBySchema], default: [] },
		// isOptimistic: { type: Boolean, default: false },
		tempMessageId: { type: String },
		status: { type: String, enum: ["sending", "sent"], default: "sent" },
		isActive: { type: Boolean, default: true },
		currentEmoji: { type: String, default: MESSAGE_EMOJIS[6] },
		expiresAt: { type: Date },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	},
);

// Set expiresAt to 12 hours from creation
MessageSchema.pre("save", function (next) {
	if (this.isNew) {
		this.expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);
	}
	next();
});

MessageSchema.set("toJSON", { virtuals: true });
// MessageSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 }); // Add TTL index on createdAt to expire after a day

// Index for cronjob queries — keeps it fast
// MessageSchema.index({ isActive: 1, expiresAt: 1 });
// MessageSchema.index({ createdAt: 1 });
MessageSchema.index({
	isActive: 1,
	played: 1,
	expiresAt: 1,
	createdAt: 1,
});

const Message = mongoose.model<IMessage>("Messages", MessageSchema);

export default Message;
