import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  description: string;
  skillVector: string[];
  toolsTech: string[];
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  skillVector: { type: [String], default: [] },
  toolsTech: { type: [String], default: [] },
});

export default mongoose.model<IRole>('Role', RoleSchema);
