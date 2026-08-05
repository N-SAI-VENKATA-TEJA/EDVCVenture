import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ISubscription extends Document {
  userId: Types.ObjectId;
  plan: string;
  amount: number;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  status: string; // created | paid | failed
  startDate?: Date;
  endDate?: Date;
}

const SubscriptionSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, required: true },
  amount: { type: Number, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  status: { type: String, enum: ['created', 'paid', 'failed'], default: 'created' },
  startDate: { type: Date },
  endDate: { type: Date },
});

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);
