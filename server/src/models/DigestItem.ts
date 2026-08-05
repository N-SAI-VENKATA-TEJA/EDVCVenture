import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDigestItem extends Document {
  title: string;
  type: string; // hackathon | certification | internship | session | deadline | other
  description: string;
  place: string;
  eventDateTime: Date;
  deadline?: Date;
  link: string;
  postedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DigestItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  place: { type: String, required: true },
  eventDateTime: { type: Date, index: true, required: true },
  deadline: { type: Date },
  link: { type: String, required: true },
  postedBy: { type: Schema.Types.ObjectId, ref: 'Admin', required: true },
}, { timestamps: true });

export default mongoose.model<IDigestItem>('DigestItem', DigestItemSchema);
