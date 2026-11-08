import mongoose, { Schema, Document } from "mongoose";
import { IListener } from "./listenersModel";
import { IUser } from "./userModel";
import { IChatRequests } from "./chatRequestModel";

export interface IChat extends Document {
  roomType: string;
  photo: string;
  members: {
    user: mongoose.Types.ObjectId | IUser;
    admin: boolean;
    accepted: boolean;
  }[];
  idemKey: string;
  groupRequestId?: any;
  groupTitle?: string;
  groupImage?: string;
  lastMessage: {
    content: string;
    sender: IUser;
    played: boolean;
    createdAt: Date;
  };
  last_modified: string;
  status: string; // ChatRoomStatus
  dissolvedAt?: Date;
  dissolvedBy?: mongoose.Types.ObjectId;
  dissolveReason?: string;
}

const ChatSchema = new Schema(
  {
    roomType: { type: String, enum: ["Private", "Group"], default: "Private" },
    photo: { type: String },
    members: [
      {
        user: { type: Schema.Types.ObjectId, ref: "Users" },
        admin: { type: Boolean },
        accepted: { type: Boolean },
      },
    ],
    idemKey: { type: String, unique: true },
    groupRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRequest",
      required: false,
    },
    groupTitle: { type: String, required: false },
    groupImage: { type: String, required: false },
    lastMessage: {
      content: String,
      sender: { type: Schema.Types.ObjectId, ref: "Users" },
      played: Boolean,
      createdAt: Date,
    },
    last_modified: { type: Date, default: Date.now },
    // Admin moderation
    status: {
      type: String,
      enum: ["active", "dissolved"],
      default: "active",
      index: true,
    },
    dissolvedAt: { type: Date },
    dissolvedBy: { type: Schema.Types.ObjectId, ref: "Users" },
    dissolveReason: { type: String },
  },
  {
    timestamps: true,
  },
);

ChatSchema.set("toJSON", { virtuals: true });
ChatSchema.index({ "members.user": 1 });

const Chat = mongoose.model<IChat>("Chats", ChatSchema);

export default Chat;
