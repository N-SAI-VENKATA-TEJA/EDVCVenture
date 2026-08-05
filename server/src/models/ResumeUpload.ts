import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IResumeUpload extends Document {
  userId: Types.ObjectId;
  fileUrl: string;
  targetRole: string;
  extractedSkills: string[];
  uploadedAt: Date;
}

const ResumeUploadSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, required: true },
  targetRole: { type: String, required: true },
  extractedSkills: { type: [String], default: [] },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IResumeUpload>('ResumeUpload', ResumeUploadSchema);
