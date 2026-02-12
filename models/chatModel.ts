import mongoose, { Schema, Document } from "mongoose";
import { IListener } from "./listenersModel";
import { IUser } from "./userModel";
import { IChatRequests } from "./chatRequestModel";

export interface IChat extends Document {
	roomType: string;
	photo: string;
	members: [
		{
			user: IUser;
			admin: boolean;
			accepted: boolean;
		},
	];
	// conversations: [
	//   {
	//     user: IUser;
	//     cast: string;
	//     cast_id: string;
	//     played: boolean;
	//     duration: number;
	//     listens: IListener[];
	//     expired: boolean;
	//     date_created: string;
	//     date_expired: string;
	//   }
	// ];
	idemKey: string;
	groupRequestId?: any;
	last_modified: string;
}

const ChatSchema = new Schema(
	{
		roomType: { type: String, enum: ["Private", "Group"], default: "Group" },
		photo: { type: String },
		members: [
			{
				user: { type: Schema.Types.ObjectId, ref: "Users" },
				admin: { type: Boolean },
				accepted: { type: Boolean },
			},
		],
		idemKey: { type: String, unique: true },
		// conversations: [
		//   {
		//     user: { type: Schema.Types.ObjectId, ref: "Users" },
		//     cast: { type: String },
		//     cast_id: { type: String },
		//     played: { type: Boolean, default: false },
		//     duration: { type: Number, default: 0 },
		//     listens: [{ type: Schema.Types.ObjectId, ref: "CastListeners" }],
		//     expired: { type: Boolean, default: false },
		//     date_created: { type: Date, default: Date.now },
		//     date_expired: { type: Date },
		//   },
		// ],
		groupRequestId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ChatRequest",
			required: false,
		},
		last_modified: { type: Date, default: Date.now },
	},
	{
		timestamps: true,
	},
);

ChatSchema.set("toJSON", { virtuals: true });

const Chat = mongoose.model<IChat>("Chats", ChatSchema);

export default Chat;
