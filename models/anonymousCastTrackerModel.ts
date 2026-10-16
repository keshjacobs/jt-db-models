import mongoose, { Schema, Document, Types } from "mongoose";
import { BadgeLevels } from "../enums/badge";

/**
 * One document per anonymous cast. Holds the paid reach budget (reachLimit)
 * and the counter of unique non-subscribers reached so far (reachedCount).
 * `caster` is the real owner and must never be returned to anyone but the owner.
 */

export interface IAnonymousReachPurchase {
	blocks: number; // number of 1000-reach blocks bought
	reach: number; // blocks * 1000
	badgeLevel: string; // a BadgeLevels value — the level the price was based on, at purchase time
	badgePoints: number;
	pricePerBlock: number;
	cost: number; // wallet points deducted
	purchasedAt: Date;
}

export interface IAnonymousCastTracker extends Document {
	cast: Types.ObjectId;
	caster: Types.ObjectId;
	reachLimit: number; // total non-subscriber reach paid for (sum of purchases)
	reachedCount: number; // unique non-subscribers counted so far
	active: boolean; // true while reachedCount < reachLimit and the cast exists
	exhaustedAt?: Date | null;
	castDeleted: boolean;
	purchases: IAnonymousReachPurchase[];
	createdAt: Date;
	updatedAt: Date;
}

const PurchaseSchema = new Schema<IAnonymousReachPurchase>(
	{
		blocks: { type: Number, required: true, min: 1 },
		reach: { type: Number, required: true, min: 1 },
		badgeLevel: { type: String, enum: BadgeLevels, required: true },
		badgePoints: { type: Number, required: true },
		pricePerBlock: { type: Number, required: true },
		cost: { type: Number, required: true, min: 0 },
		purchasedAt: { type: Date, default: Date.now },
	},
	{ _id: false }
);

const AnonymousCastTrackerSchema: Schema = new Schema(
	{
		cast: {
			type: Schema.Types.ObjectId,
			ref: "Casts",
			required: true,
			unique: true,
		},
		caster: {
			type: Schema.Types.ObjectId,
			ref: "Users",
			required: true,
			index: true,
		},
		reachLimit: { type: Number, required: true, min: 0 },
		reachedCount: { type: Number, default: 0, min: 0 },
		active: { type: Boolean, default: true },
		exhaustedAt: { type: Date, default: null },
		castDeleted: { type: Boolean, default: false },
		purchases: { type: [PurchaseSchema], default: [] },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

// The timeline looks up every tracker that is still spreading
AnonymousCastTrackerSchema.index({ active: 1, createdAt: -1 });

AnonymousCastTrackerSchema.set("toJSON", { virtuals: true });

const AnonymousCastTracker = mongoose.model<IAnonymousCastTracker>(
	"AnonymousCastTrackers",
	AnonymousCastTrackerSchema
);

export default AnonymousCastTracker;
