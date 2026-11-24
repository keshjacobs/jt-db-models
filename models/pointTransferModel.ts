import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";
import { IChat } from "./chatModel";
import { IMessage } from "./messageModel";
import { ICast } from "./castModel";

// Ledger of wallet point transfers between users. Written in the same
// transaction as the debit and credit, so it always matches the balances.
// A transfer comes from a chat (chatRoom + message) or a gift on a cast (cast).
export interface IPointTransfer extends Document {
  sender: IUser;
  recipient: IUser;
  amount: number;
  chatRoom?: IChat;
  message?: IMessage;
  cast?: ICast;
  createdAt: Date;
  updatedAt: Date;
}

const PointTransferSchema: Schema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    recipient: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    amount: { type: Number, required: true, min: 1 },
    chatRoom: { type: Schema.Types.ObjectId, ref: "Chats" },
    message: { type: Schema.Types.ObjectId, ref: "Messages" },
    cast: { type: Schema.Types.ObjectId, ref: "Casts" },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  },
);

PointTransferSchema.set("toJSON", { virtuals: true });

PointTransferSchema.index({ sender: 1, createdAt: -1 });
PointTransferSchema.index({ recipient: 1, createdAt: -1 });
PointTransferSchema.index({ cast: 1, createdAt: -1 }, { sparse: true });

const PointTransfer = mongoose.model<IPointTransfer>(
  "PointTransfers",
  PointTransferSchema,
);

export default PointTransfer;
