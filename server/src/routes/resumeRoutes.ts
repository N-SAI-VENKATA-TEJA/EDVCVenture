import express from 'express';
import { getStandardResumes, createStandardResume } from '../controllers/resumeController';
import { authUser } from '../middleware/auth';
import { authAdmin } from '../middleware/adminAuth';

const router = express.Router();

router.get('/', authUser, getStandardResumes);
router.post('/', authAdmin, createStandardResume);

export default router;
