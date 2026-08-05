import { Request, Response } from 'express';
import StandardResume from '../models/StandardResume';

export const getStandardResumes = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    let filter = {};
    if (role) {
      filter = { role: role };
    }
    const resumes = await StandardResume.find(filter);
    res.json(resumes.map(r => ({
      _id: r._id,
      targetRole: r.role,
      cloudinaryUrl: r.fileUrl,
      notes: r.notes,
      experienceLevel: 'Standard'
    })));
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createStandardResume = async (req: Request, res: Response) => {
  try {
    const { targetRole, cloudinaryUrl, notes } = req.body;
    
    const resume = await StandardResume.create({
      role: targetRole, 
      fileUrl: cloudinaryUrl, 
      notes
    });
    
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
