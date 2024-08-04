import mongoose, { Schema, Document } from 'mongoose';
import { ICast } from './castModel';
import { IUser } from './userModel';

export interface ILike extends Document {
    user: IUser,
    cast: ICast,
    date_created: string
}

const LikesSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    date_created: { type: Date, default: Date.now },
    cast: { type: Schema.Types.ObjectId, ref: 'Casts' }
});

const CastLikes = mongoose.model<ILike>('CastLikes', LikesSchema);

export default CastLikes;
