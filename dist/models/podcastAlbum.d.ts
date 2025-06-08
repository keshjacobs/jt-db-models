import mongoose, { Document } from "mongoose";
import { IUser } from "./userModel";
export interface IPodcastAlbum extends Document {
    user: IUser;
    title: string;
    description: string;
    photo: string;
    date_created: string;
}
declare const PodcastAlbum: mongoose.Model<IPodcastAlbum, {}, {}, {}, mongoose.Document<unknown, {}, IPodcastAlbum> & IPodcastAlbum & Required<{
    _id: unknown;
}> & {
    __v?: number;
}, any>;
export default PodcastAlbum;
