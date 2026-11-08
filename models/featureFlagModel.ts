// models/featureFlagModel.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IFeatureFlag extends Document {
  key: string; // e.g. "group_chats"
  label: string;
  description?: string;
  enabled: boolean;
  rollout: number; // 0-100, % of users who get it when enabled
  platforms: string[]; // "android" | "ios"
  updatedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FeatureFlagSchema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^[a-z0-9_]+$/,
    },
    label: { type: String, required: true },
    description: { type: String },
    enabled: { type: Boolean, default: false },
    rollout: { type: Number, default: 100, min: 0, max: 100 },
    platforms: {
      type: [String],
      enum: ["android", "ios"],
      default: ["android", "ios"],
    },
    updatedBy: { type: Schema.Types.ObjectId, ref: "Users" },
  },
  { timestamps: true },
);

FeatureFlagSchema.set("toJSON", { virtuals: true });

const FeatureFlag = mongoose.model<IFeatureFlag>("FeatureFlags", FeatureFlagSchema);
export default FeatureFlag;
