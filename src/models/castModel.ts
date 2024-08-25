import mongoose, { Schema, Document } from "mongoose";

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
		mentions: [{ type: Schema.Types.ObjectId, ref: "Users" }],
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

CastSchema.set("toJSON", { virtuals: true });

const Cast = mongoose.model<ICast>("Casts", CastSchema);

export default Cast;
