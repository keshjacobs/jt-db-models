import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";
import { IChat } from "./chatModel";
import { IMessage } from "./messageModel";

// Ledger of wallet point transfers between users. Written in the same
// transaction as the debit and credit, so it always matches the balances.
export interface IPointTransfer extends Document {
  sender: IUser;
  recipient: IUser;
  amount: number;
  chatRoom: IChat;
  message: IMessage;
  createdAt: Date;
  updatedAt: Date;
}

const PointTransferSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    amount: { type: Number, required: true, min: 1 },
    chatRoom: { type: Schema.Types.ObjectId, ref: "Chats", required: true },
    message: { type: Schema.Types.ObjectId, ref: "Messages" },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

PointTransferSchema.set("toJSON", { virtuals: true });

PointTransferSchema.index({ sender: 1, createdAt: -1 });
PointTransferSchema.index({ recipient: 1, createdAt: -1 });

const PointTransfer = mongoose.model<IPointTransfer>(
  "PointTransfers",
  PointTransferSchema,
);

export default PointTransfer;
