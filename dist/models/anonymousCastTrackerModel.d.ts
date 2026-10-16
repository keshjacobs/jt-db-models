import mongoose, { Document, Types } from "mongoose";
/**
 * One document per anonymous cast. Holds the paid reach budget (reachLimit)
 * and the counter of unique non-subscribers reached so far (reachedCount).
 * `caster` is the real owner and must never be returned to anyone but the owner.
 */
export interface IAnonymousReachPurchase {
    blocks: number;
    reach: number;
    badgeLevel: string;
    badgePoints: number;
    pricePerBlock: number;
    cost: number;
    purchasedAt: Date;
}
export interface IAnonymousCastTracker extends Document {
    cast: Types.ObjectId;
    caster: Types.ObjectId;
    reachLimit: number;
    reachedCount: number;
    active: boolean;
    exhaustedAt?: Date | null;
    castDeleted: boolean;
    purchases: IAnonymousReachPurchase[];
    createdAt: Date;
    updatedAt: Date;
}
declare const AnonymousCastTracker: mongoose.Model<IAnonymousCastTracker, {}, {}, {}, mongoose.Document<unknown, {}, IAnonymousCastTracker> & IAnonymousCastTracker & Required<{
    _id: unknown;
}>, any>;
export default AnonymousCastTracker;
