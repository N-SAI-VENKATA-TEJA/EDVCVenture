import { Request, Response } from 'express';
import FreeResource from '../models/FreeResource';
import ExclusiveResource from '../models/ExclusiveResource';

export const getFreeResources = async (req: Request, res: Response) => {
  try {
    const resources = await FreeResource.find({});
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getExclusiveResources = async (req: any, res: Response) => {
  try {
    const user = req.user;
    
    // Check server-side if user is premium and subscription is valid
    if (user.subscriptionStatus !== 'premium' || (user.subscriptionExpiry && new Date(user.subscriptionExpiry) < new Date())) {
      return res.status(403).json({ message: 'Requires active premium subscription' });
    }

    const resources = await ExclusiveResource.find({});
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
