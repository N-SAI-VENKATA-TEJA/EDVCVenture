import mongoose, { Schema, Document } from 'mongoose';

export interface IIssuerTier extends Document {
  issuerName: string;
  tier: string; // S / A / B / C
  credibilityScore: number; // 0-10
  justification: string;
}

const IssuerTierSchema: Schema = new Schema({
  issuerName: { type: String, required: true },
  tier: { type: String, required: true },
  credibilityScore: { type: Number, required: true, min: 0, max: 10 },
  justification: { type: String },
});

export default mongoose.model<IIssuerTier>('IssuerTier', IssuerTierSchema);
