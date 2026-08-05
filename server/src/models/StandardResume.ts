import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IStandardResume extends Document {
  role: string;
  fileUrl: string;
  recommendedCertifications: Types.ObjectId[];
  recommendedProjects: Types.ObjectId[];
  notes?: string;
  curatedBy?: string;
  lastUpdated: Date;
}

const StandardResumeSchema: Schema = new Schema({
  role: { type: String, required: true },
  fileUrl: { type: String, required: true },
  recommendedCertifications: [{ type: Schema.Types.ObjectId, ref: 'Certification' }],
  recommendedProjects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  notes: { type: String },
  curatedBy: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

export default mongoose.model<IStandardResume>('StandardResume', StandardResumeSchema);
