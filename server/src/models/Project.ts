import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  roleTags: string[];
  skillsDemonstrated: string[];
  difficulty: string; // beginner | intermediate | advanced
  sourceReference?: string;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  roleTags: { type: [String], index: true, default: [] },
  skillsDemonstrated: { type: [String], index: true, default: [] },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  sourceReference: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProject>('Project', ProjectSchema);
