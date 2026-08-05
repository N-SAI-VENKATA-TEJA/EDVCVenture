import mongoose, { Schema, Document } from 'mongoose';

export interface ICertification extends Document {
  title: string;
  issuerName: string;
  issuerCredibilityScore: number;
  roleTags: string[];
  skillsCovered: string[];
  skillRelevanceScore: number;
  compositeValueScore: number;
  durationText?: string;
  url: string;
  sourceNote?: string;
  syllabusSummary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CertificationSchema: Schema = new Schema({
  title: { type: String, required: true },
  issuerName: { type: String, required: true },
  issuerCredibilityScore: { type: Number, required: true },
  roleTags: { type: [String], index: true, default: [] },
  skillsCovered: { type: [String], default: [] },
  skillRelevanceScore: { type: Number, required: true },
  compositeValueScore: { type: Number, index: true, required: true },
  durationText: { type: String },
  url: { type: String, required: true },
  sourceNote: { type: String },
  syllabusSummary: { type: String },
}, { timestamps: true });

export default mongoose.model<ICertification>('Certification', CertificationSchema);
