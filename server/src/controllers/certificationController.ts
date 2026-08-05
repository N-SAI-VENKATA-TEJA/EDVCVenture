import { Request, Response } from 'express';
import Certification from '../models/Certification';
import Role from '../models/Role';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Role.find({});
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCertificationsByRole = async (req: Request, res: Response) => {
  try {
    const { role } = req.query;
    let filter = {};
    if (role) {
      filter = { roleTags: role };
    }
    // Sort by compositeValueScore descending
    const certs = await Certification.find(filter).sort({ compositeValueScore: -1 });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCertificationById = async (req: Request, res: Response) => {
  try {
    const cert = await Certification.findById(req.params.id);
    if (cert) {
      res.json(cert);
    } else {
      res.status(404).json({ message: 'Certification not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
