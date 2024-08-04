import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './userModel';

export interface ISubscription extends Document {
    user: IUser,
    subscriber: IUser,
    date_created: string
}

const SubscriptionSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Users' },
    subscriber: { type: Schema.Types.ObjectId, ref: 'Users' },
    date_created: { type: Date, default: Date.now },
});

const Subscriptions = mongoose.model<ISubscription>('Subscriptions', SubscriptionSchema);

export default Subscriptions;
