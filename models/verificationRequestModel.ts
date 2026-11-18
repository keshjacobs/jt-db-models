// models/verificationRequestModel.ts
// A request for the verified creator checkmark (User.creatorVerified).
import mongoose, { Schema, Document, Types } from "mongoose";
import { VERIFICATION_CATEGORIES, VerificationStatus } from "../enums/safety";

export interface IVerificationRequest extends Document {
  user: Types.ObjectId;
  category: string; // VERIFICATION_CATEGORIES
  links: string[];
  note?: string;
  status: VerificationStatus;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  reviewNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const VerificationRequestSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true, index: true },
    category: { type: String, enum: [...VERIFICATION_CATEGORIES], required: true },
    links: { type: [String], default: [] },
    note: { type: String, maxlength: 500 },
    status: {
      type: String,
      enum: Object.values(VerificationStatus),
      default: VerificationStatus.pending,
      index: true,
    },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "Users" },
    reviewedAt: { type: Date },
    reviewNote: { type: String },
  },
  { timestamps: true },
);

// One pending request per user.
VerificationRequestSchema.index(
  { user: 1 },
  { unique: true, partialFilterExpression: { status: VerificationStatus.pending } },
);
VerificationRequestSchema.set("toJSON", { virtuals: true });

const VerificationRequest = mongoose.model<IVerificationRequest>(
  "VerificationRequests",
  VerificationRequestSchema,
);
export default VerificationRequest;
