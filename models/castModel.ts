import mongoose, { Schema, Document } from "mongoose";
import { IPodcastAlbum } from "./podcastAlbum";
import { CastModerationStatus } from "../enums/admin";

export interface ICast extends Document {
	title: string;
	cast: string; //cast audio path
	streams: number;
	music?: string;
	ratings: number;
	duration: number;
	date_created: string;
	no_likes: number;
	no_replies: number;
	no_recasts: number;
	no_listeners: number;
	filter: {
		name: string;
		gain: number;
		type: string;
		frequency: number;
		detune: number;
		pitch: number;
	};
	recast: ICast;
	reply: ICast;
	caster: any;
	recaster: any;
	isPodcast: boolean;
	podcastAlbum: IPodcastAlbum;
	isSaved: boolean;
	mentions: any[];
	isAnonymous: boolean;
	moderationStatus: CastModerationStatus;
	moderationReason?: string;
	moderatedBy?: any;
	moderatedAt?: Date;
}

const CastSchema: Schema = new Schema(
	{
		t_id: { type: String },
		title: { type: String },
		cast: { type: String },
		streams: { type: Number, default: 0 },
		music: { type: String },
		ratings: { type: Number, default: 0 },
		duration: { type: Number, default: 0 },
		date_created: { type: Date, default: Date.now },
		no_likes: { type: Number, default: 0 },
		no_replies: { type: Number, default: 0 },
		no_recasts: { type: Number, default: 0 },
		no_listeners: { type: Number, default: 0 },
		filter: {
			name: { type: String, default: "normal" },
			gain: { type: Number, default: 2 },
			type: { type: String, default: "lowshelf" },
			frequency: { type: Number, default: 3150 },
			detune: { type: Number, default: 0 },
			pitch: { type: Number, default: 1 },
		},
		recast: { type: Schema.Types.ObjectId, ref: "Casts" },
		reply: { type: Schema.Types.ObjectId, ref: "Casts" },
		caster: { type: Schema.Types.ObjectId, ref: "Users" },
		recaster: { type: Schema.Types.ObjectId, ref: "Users" },
		isPodcast: { type: Boolean, default: false },
		podcastAlbum: { type: Schema.Types.ObjectId, ref: "PodcastAlbums" },
		isSaved: { type: Boolean, default: false },
		mentions: [{ type: Schema.Types.ObjectId, ref: "Users", default: [] }],
		// Anonymous cast: caster is hidden from viewers; paid reach is tracked in AnonymousCastTrackers
		isAnonymous: { type: Boolean, default: false, index: true },
		// Admin moderation. Existing docs have no value, which counts as "live".
		moderationStatus: {
			type: String,
			enum: Object.values(CastModerationStatus),
			default: CastModerationStatus.live,
			index: true,
		},
		moderationReason: { type: String },
		moderatedBy: { type: Schema.Types.ObjectId, ref: "Users" },
		moderatedAt: { type: Date },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

// Add index to optimize lookups
CastSchema.index({ createdAt: 1 });

/* ------------------------------------------------------------------
 * Keep hidden/removed casts out of every feed, list and search.
 *
 * Applies to find(), countDocuments() and aggregate() on Casts, so the
 * timeline, explore, profile and search queries all respect moderation
 * without each one needing its own filter.
 *
 * It deliberately does NOT apply when:
 *  - the query targets specific _ids (findById, populate, $in lookups),
 *    so existing references to a moderated cast don't turn into nulls;
 *  - the query already filters on moderationStatus. Admin code uses this
 *    as the opt-out: `{ moderationStatus: ANY_MODERATION_STATUS }`.
 * ------------------------------------------------------------------ */
const HIDDEN_FROM_FEEDS = [
	CastModerationStatus.hidden,
	CastModerationStatus.removed,
];

/** Pass as `moderationStatus` in a filter to see casts in every state (admin only). */
export const ANY_MODERATION_STATUS = {
	$in: [...Object.values(CastModerationStatus), null],
};

const skipsModerationFilter = (filter: any) =>
	!!filter &&
	(Object.prototype.hasOwnProperty.call(filter, "_id") ||
		Object.prototype.hasOwnProperty.call(filter, "moderationStatus"));

CastSchema.pre(["find", "countDocuments"], function () {
	if (skipsModerationFilter(this.getFilter())) return;
	this.where({ moderationStatus: { $nin: HIDDEN_FROM_FEEDS } });
});

CastSchema.pre("aggregate", function () {
	const pipeline = this.pipeline() as any[];
	const first = pipeline[0];
	if (first?.$match && skipsModerationFilter(first.$match)) return;

	const stage = { $match: { moderationStatus: { $nin: HIDDEN_FROM_FEEDS } } };
	// These stages must stay first in the pipeline.
	if (first && (first.$geoNear || first.$search || first.$searchMeta || first.$vectorSearch)) {
		pipeline.splice(1, 0, stage);
	} else {
		pipeline.unshift(stage);
	}
});

CastSchema.set("toJSON", { virtuals: true });

const Cast = mongoose.model<ICast>("Casts", CastSchema);

export default Cast;
