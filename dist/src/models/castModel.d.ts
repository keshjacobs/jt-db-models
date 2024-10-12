import mongoose, { Document } from "mongoose";
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
    mentions: any[];
}
declare const Cast: mongoose.Model<ICast, {}, {}, {}, mongoose.Document<unknown, {}, ICast> & ICast & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default Cast;
