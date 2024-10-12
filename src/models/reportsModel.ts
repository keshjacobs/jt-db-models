import mongoose, { Schema, Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";

export interface IUserReport extends Document {
  user: IUser;
  reasons: string[];
  case: ICast | IUser;
  caseModel: string;
}

const UserReportSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    reasons: { type: [String], required: true }, // Array of reasons
    case: { type: Schema.Types.ObjectId, required: true, refPath: "caseModel" }, // Dynamic reference
    caseModel: { type: String, required: true, enum: ["Casts", "Users"] }, // Will define the model used in the ref
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

UserReportSchema.set("toJSON", { virtuals: true });

const UserReports = mongoose.model<IUserReport>("UserReports", UserReportSchema);

export default UserReports;
