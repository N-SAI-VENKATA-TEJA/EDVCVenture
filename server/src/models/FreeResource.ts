import mongoose, { Schema, Document } from 'mongoose';

export interface IFreeResource extends Document {
  title: string;
  body: string;
  category?: string;
  createdAt: Date;
}

const FreeResourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IFreeResource>('FreeResource', FreeResourceSchema);
