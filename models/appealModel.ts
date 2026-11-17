// models/appealModel.ts
// A user asking for a moderation decision (suspension, ban, cast removal) to be reviewed.
import mongoose, { Schema, Document, Types } from "mongoose";
import { AppealAction, AppealStatus } from "../enums/safety";

export interface IAppeal extends Document {
  user: Types.ObjectId;
  action: AppealAction;
  cast?: Types.ObjectId; // set for cast_removal
  originalReason?: string; // statusReason / moderationReason when the appeal was filed
  message: string;
  status: AppealStatus;
  decidedBy?: Types.ObjectId;
  decidedAt?: Date;
  decisionNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppealSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true, index: true },
    action: { type: String, enum: Object.values(AppealAction), required: true },
    cast: { type: Schema.Types.ObjectId, ref: "Casts" },
    originalReason: { type: String },
    message: { type: String, required: true, maxlength: 1000 },
    status: { type: String, enum: Object.values(AppealStatus), default: AppealStatus.pending, index: true },
    decidedBy: { type: Schema.Types.ObjectId, ref: "Users" },
    decidedAt: { type: Date },
    decisionNote: { type: String },
  },
  { timestamps: true },
);

// One pending appeal per user per decision (per cast for removals).
AppealSchema.index(
  { user: 1, action: 1, cast: 1 },
  { unique: true, partialFilterExpression: { status: AppealStatus.pending } },
);
AppealSchema.set("toJSON", { virtuals: true });

const Appeal = mongoose.model<IAppeal>("Appeals", AppealSchema);
export default Appeal;
