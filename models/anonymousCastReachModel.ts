import mongoose, { Schema, Document, Types } from "mongoose";

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

const AnonymousCastReachSchema: Schema = new Schema(
	{
		cast: { type: Schema.Types.ObjectId, ref: "Casts", required: true },
		tracker: {
			type: Schema.Types.ObjectId,
			ref: "AnonymousCastTrackers",
			required: true,
		},
		user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

AnonymousCastReachSchema.index({ cast: 1, user: 1 }, { unique: true });
AnonymousCastReachSchema.index({ user: 1 });

const AnonymousCastReach = mongoose.model<IAnonymousCastReach>(
	"AnonymousCastReaches",
	AnonymousCastReachSchema
);

export default AnonymousCastReach;
