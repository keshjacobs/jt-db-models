import mongoose, { Document } from 'mongoose';
interface ICast extends Document {
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
declare const Cast: mongoose.Model<ICast, {}, {}>;
export default Cast;
