import express from 'express';
import { getFreeResources, getExclusiveResources } from '../controllers/resourceController';
import { authUser } from '../middleware/auth';

const router = express.Router();

router.get('/free', authUser, getFreeResources);
router.get('/exclusive', authUser, getExclusiveResources);

export default router;
