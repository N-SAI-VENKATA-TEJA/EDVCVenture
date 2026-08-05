import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController';
import { authUser } from '../middleware/auth';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authUser, getUserProfile);

export default router;
