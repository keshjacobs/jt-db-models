import mongoose, { Document } from "mongoose";
import { IPodcastAlbum } from "./podcastAlbum";
import { CastModerationStatus } from "../enums/admin";
export interface ICast extends Document {
    title: string;
    cast: string;
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
/** Pass as `moderationStatus` in a filter to see casts in every state (admin only). */
export declare const ANY_MODERATION_STATUS: {
    $in: (CastModerationStatus | null)[];
};
declare const Cast: mongoose.Model<ICast, {}, {}, {}, mongoose.Document<unknown, {}, ICast> & ICast & Required<{
    _id: unknown;
}>, any>;
export default Cast;
