import mongoose, { Document } from "mongoose";
import { ICast } from "./castModel";
import { IUser } from "./userModel";
export interface IUserReport extends Document {
    user: IUser;
    reasons: string[];
    case: ICast | IUser;
    caseModel: string;
}
declare const UserReports: mongoose.Model<IUserReport, {}, {}, {}, mongoose.Document<unknown, {}, IUserReport> & IUserReport & Required<{
    _id: unknown;
}>, any>;
export default UserReports;
