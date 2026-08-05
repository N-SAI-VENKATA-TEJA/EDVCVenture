import { Request, Response } from 'express';
import DigestItem from '../models/DigestItem';

export const getDigestItems = async (req: Request, res: Response) => {
  try {
    const items = await DigestItem.find({}).sort({ eventDateTime: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createDigestItem = async (req: any, res: Response) => {
  try {
    const { title, type, description, place, eventDateTime, deadline, link } = req.body;
    
    const item = await DigestItem.create({
      title, type, description, place, eventDateTime, deadline, link,
      postedBy: req.admin.id
    });
    
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateDigestItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await DigestItem.findByIdAndUpdate(id, req.body, { new: true });
    
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteDigestItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const item = await DigestItem.findByIdAndDelete(id);
    
    if (item) {
      res.json({ message: 'Item removed' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
