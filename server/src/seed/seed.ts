import mongoose from 'mongoose';
import dotenv from 'dotenv';
import xlsx from 'xlsx';
import path from 'path';

import Role from '../models/Role';
import IssuerTier from '../models/IssuerTier';
import Certification from '../models/Certification';
import Project from '../models/Project';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const filePath = path.resolve(__dirname, '../../../CareerLens_Research_Data.xlsx');

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careerlens';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Role.deleteMany({});
    await IssuerTier.deleteMany({});
    await Certification.deleteMany({});
    await Project.deleteMany({});
    console.log('Cleared existing data');

    const workbook = xlsx.readFile(filePath);

    // 1. Seed Roles
    const rolesSheet = workbook.Sheets['Roles & Skill Vectors'];
    const rolesData: any[] = xlsx.utils.sheet_to_json(rolesSheet, { range: 3 });
    const rolesToInsert = rolesData.map(row => ({
      name: row['Role'],
      description: row['Short Description'],
      skillVector: row['Core Skill Vector (controlled vocabulary)'] ? row['Core Skill Vector (controlled vocabulary)'].split(',').map((s: string) => s.trim()) : [],
      toolsTech: row['Common Tools / Technologies'] ? row['Common Tools / Technologies'].split(',').map((s: string) => s.trim()) : []
    }));
    await Role.insertMany(rolesToInsert.filter(r => r.name));
    console.log(`Inserted ${rolesToInsert.length} roles`);

    // 2. Seed Issuer Tiers
    const issuerSheet = workbook.Sheets['Issuer Credibility'];
    const issuerData: any[] = xlsx.utils.sheet_to_json(issuerSheet, { range: 3 });
    const issuersToInsert = issuerData.map(row => ({
      issuerName: row['Issuer / Provider'],
      tier: row['Tier'],
      credibilityScore: Number(row['Score (0-10)']),
      justification: row['Why This Tier (Justification)']
    }));
    await IssuerTier.insertMany(issuersToInsert.filter(i => i.issuerName));
    console.log(`Inserted ${issuersToInsert.length} issuer tiers`);

    // 3. Seed Certifications
    const certsSheet = workbook.Sheets['Free Certifications DB'];
    const certsData: any[] = xlsx.utils.sheet_to_json(certsSheet, { range: 3 });
    
    // We need to calculate skillRelevanceScore and compositeValueScore
    const roles = await Role.find({});
    const issuerTiers = await IssuerTier.find({});

    const certsToInsert = [];
    for (const row of certsData) {
      if (!row['Title']) continue;
      
      const roleName = row['Role'];
      const role = roles.find(r => r.name === roleName);
      const issuerName = row['Issuer'];
      const issuer = issuerTiers.find(i => i.issuerName === issuerName);

      const issuerCredibilityScore = issuer ? issuer.credibilityScore : 5; // default if not found
      
      const skillsCoveredStr = row['Skills Covered (from Skill Vector)'];
      const skillsCovered = skillsCoveredStr ? skillsCoveredStr.split(',').map((s: string) => s.trim()) : [];
      
      let skillRelevanceScore = 0;
      if (role && role.skillVector.length > 0) {
        // count how many skills covered are in role.skillVector
        const coveredInRole = skillsCovered.filter((s: string) => role.skillVector.includes(s));
        skillRelevanceScore = (coveredInRole.length / role.skillVector.length) * 10;
      }
      
      const compositeValueScore = (0.6 * issuerCredibilityScore) + (0.4 * skillRelevanceScore);

      certsToInsert.push({
        title: row['Title'],
        issuerName: issuerName,
        issuerCredibilityScore,
        roleTags: roleName ? [roleName] : [],
        skillsCovered,
        skillRelevanceScore,
        compositeValueScore,
        durationText: row['Duration'],
        url: row['URL'],
        sourceNote: row['Source (where this was found)'],
        syllabusSummary: row['Syllabus Summary (paraphrased)']
      });
    }
    await Certification.insertMany(certsToInsert);
    console.log(`Inserted ${certsToInsert.length} certifications`);

    // 4. Seed Projects
    const projectsSheet = workbook.Sheets['Projects Database'];
    const projectsData: any[] = xlsx.utils.sheet_to_json(projectsSheet, { range: 3 });
    const projectsToInsert = projectsData.map(row => {
      let diff = row['Difficulty'] ? row['Difficulty'].toLowerCase() : 'beginner';
      if (diff.includes('beginner')) diff = 'beginner';
      else if (diff.includes('intermediate')) diff = 'intermediate';
      else if (diff.includes('advanced')) diff = 'advanced';
      else diff = 'beginner';
      
      return {
        title: row['Title'],
        description: row['Description'] || 'No description provided.',
        roleTags: row['Role Tag(s)'] ? row['Role Tag(s)'].split(',').map((s: string) => s.trim()) : [],
        skillsDemonstrated: row['Skills Demonstrated (✓ = in current Skill Vector)'] ? row['Skills Demonstrated (✓ = in current Skill Vector)'].split(',').map((s: string) => s.trim()) : [],
        difficulty: diff,
        sourceReference: row['Source PDF']
      };
    });
    await Project.insertMany(projectsToInsert.filter(p => p.title));
    console.log(`Inserted ${projectsToInsert.length} projects`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();
