import mongoose, { Schema, Document, Types, } from "mongoose";
import { BadgeLevels } from "../enums/badge";

export enum TTP_GENDERS {
	male = "male",
	female = "female",
}

export enum TTP_VOICE_NAMES {
	male = "en-GB-Neural2-O",
	female = "en-GB-Neural2-N",
}

export interface IUser extends Document {
	t_id: string;
	photo: string;
	photo_header: string;
	full_name: string;
	user_name: string;
	email: string;
	verified: boolean;
	admin: boolean;
	phone?: string;
	bio?: string;
	password: string;
	pushtoken: string;
	coord: {
		lat: number;
		long: number;
	};
	ratings: number;
	email_code?: {
		code: string;
		expiresIn: string;
	};
	badge?: {
		level: string;
		points: number;
		dateOfLastClick: Date;
	};
	wallet?: {
		points: number;
	};
	ttp: {
		gender: string;
		voiceName: string;
	};
	resetPasswordToken?: string;
	resetPasswordExpires?: Date;
	date_created: Date;
	status: number;
	referralCode?: string;
	referredBy?: Types.ObjectId;
}

const UserSchema: Schema = new Schema(
	{
		t_id: { type: String, required: true },
		photo: { type: String, default: "photo/default.png" },
		photo_header: { type: String, default: "photo/header.png" },
		full_name: { type: String, required: true },
		user_name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		verified: { type: Boolean, default: false },
		admin: { type: Boolean, default: false },
		phone: { type: String, default: undefined },
		bio: { type: String, default: undefined },
		password: { type: String, required: true, select: false },
		pushtoken: { type: String, default: "000" },
		coord: {
			lat: { type: Number, default: 0 },
			long: { type: Number, default: 0 },
		},
		ratings: { type: Number, default: 0 },
		email_code: {
			code: {
				required: false,
				type: String,
			},
			expiresIn: {
				required: false,
				type: Date,
			},
		},
		badge: {
			level: {
				required: false,
				enum: BadgeLevels,
				type: String,
			},
			points: {
				required: false,
				type: Number,
				default: 0,
			},
			dateOfLastClick: {
				required: false,
				type: Date,
			},
		},
		wallet: {
			points: {
				required: false,
				type: Number,
				default: 0,
			},
		},
		ttp: {
			gender: {
				required: false,
				type: String,
				enum: TTP_GENDERS,
			},
			voiceName: {
				required: false,
				type: String,
				enum: TTP_VOICE_NAMES,
			},
		},
		resetPasswordToken: { type: String },
		resetPasswordExpires: { type: Date },
		date_created: { type: Date, default: Date.now },
		status: { type: Number, default: 1 },
		referralCode: {
			type: String,
			unique: true,
			sparse: true, // allows multiple null values if user doesn't have referral code yet
			default: function (this: IUser): String {
				return this.user_name.toLowerCase();   // 'this' refers to the document being created
			}
		},

		referredBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			default: null
		}
	},
	{
		timestamps: true, // Adds createdAt and updatedAt fields
	},
);

UserSchema.set("toJSON", { virtuals: true });

const User = mongoose.model<IUser>("Users", UserSchema);

export default User;
