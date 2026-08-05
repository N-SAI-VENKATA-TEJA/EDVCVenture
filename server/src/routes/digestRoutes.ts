import express from 'express';
import { getDigestItems, createDigestItem, updateDigestItem, deleteDigestItem } from '../controllers/digestController';
import { authUser } from '../middleware/auth';
import { authAdmin } from '../middleware/adminAuth';

const router = express.Router();

// Public (logged in student) can read
router.get('/', authUser, getDigestItems);

// Admin can manage
router.post('/', authAdmin, createDigestItem);
router.put('/:id', authAdmin, updateDigestItem);
router.delete('/:id', authAdmin, deleteDigestItem);

export default router;
