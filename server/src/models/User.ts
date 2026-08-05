import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  targetRole?: string;
  subscriptionStatus: 'free' | 'premium';
  subscriptionExpiry?: Date | null;
  createdAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true, select: false },
  targetRole: { type: String },
  subscriptionStatus: { type: String, enum: ['free', 'premium'], default: 'free' },
  subscriptionExpiry: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IUser>('User', UserSchema);
