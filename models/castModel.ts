import mongoose, { Schema, Document } from "mongoose";
import { IPodcastAlbum } from "./podcastAlbum";

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
	mentions: any[];
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
		mentions: [{ type: Schema.Types.ObjectId, ref: "Users", default: [] }],
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

CastSchema.set("toJSON", { virtuals: true });

const Cast = mongoose.model<ICast>("Casts", CastSchema);

export default Cast;
