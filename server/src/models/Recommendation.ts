import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IRecommendation extends Document {
  userId: Types.ObjectId;
  resumeUploadId: Types.ObjectId;
  missingSkills: string[];
  recommendedCertificationIds: Types.ObjectId[];
  recommendedProjectIds: Types.ObjectId[];
  generatedAt: Date;
}

const RecommendationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  resumeUploadId: { type: Schema.Types.ObjectId, ref: 'ResumeUpload', required: true },
  missingSkills: { type: [String], default: [] },
  recommendedCertificationIds: [{ type: Schema.Types.ObjectId, ref: 'Certification' }],
  recommendedProjectIds: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  generatedAt: { type: Date, default: Date.now },
});

export default mongoose.model<IRecommendation>('Recommendation', RecommendationSchema);
