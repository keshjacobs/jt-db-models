import mongoose, { Document, Types } from "mongoose";
/**
 * One document per (anonymous cast, non-subscriber) counted against the cast's paid reach.
 * The unique { cast, user } index guarantees a person is only counted once, even if two
 * requests for the same person arrive at the same time.
 *
 * It also lets the timeline keep showing an anonymous cast to the people it already
 * reached after the cast stops spreading.
 */
export interface IAnonymousCastReach extends Document {
    cast: Types.ObjectId;
    tracker: Types.ObjectId;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const AnonymousCastReach: mongoose.Model<IAnonymousCastReach, {}, {}, {}, mongoose.Document<unknown, {}, IAnonymousCastReach> & IAnonymousCastReach & Required<{
    _id: unknown;
}>, any>;
export default AnonymousCastReach;
