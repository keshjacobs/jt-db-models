import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./userModel";

export interface IPodcastAlbum extends Document {
	user: IUser;
	title: string;
	description: string;
	photo: string;
	date_created: string;
}

const PodcastAlbumSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "Users" },
		title: { type: String },
		description: { type: String },
		photo: { type: String, default: "photo/podcast-default.png" },
		date_created: { type: Date, default: Date.now },
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	}
);

PodcastAlbumSchema.set("toJSON", { virtuals: true });

const PodcastAlbum = mongoose.model<IPodcastAlbum>(
	"PodcastAlbums",
	PodcastAlbumSchema
);

export default PodcastAlbum;
