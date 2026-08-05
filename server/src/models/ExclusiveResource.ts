import mongoose, { Schema, Document } from 'mongoose';

export interface IExclusiveResource extends Document {
  title: string;
  body: string;
  category?: string;
  createdAt: Date;
}

const ExclusiveResourceSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IExclusiveResource>('ExclusiveResource', ExclusiveResourceSchema);
