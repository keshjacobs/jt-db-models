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
  idemKey: string;
  groupRequestId?: any;
  lastMessage: {
    content: string;
    sender: IUser;
    played: boolean;
    createdAt: Date;
  };
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
    groupRequestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRequest",
      required: false,
    },
    lastMessage: {
      content: String,
      sender: { type: Schema.Types.ObjectId, ref: "Users" },
      played: Boolean,
      createdAt: Date,
    },
    last_modified: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

ChatSchema.set("toJSON", { virtuals: true });
ChatSchema.index({ "members.user": 1 });

const Chat = mongoose.model<IChat>("Chats", ChatSchema);

export default Chat;
