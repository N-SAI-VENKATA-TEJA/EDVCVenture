import express from 'express';
import { getRoles, getCertificationsByRole, getCertificationById } from '../controllers/certificationController';
import { authUser } from '../middleware/auth';

const router = express.Router();

router.get('/roles', authUser, getRoles);
router.get('/', authUser, getCertificationsByRole);
router.get('/:id', authUser, getCertificationById);

export default router;
