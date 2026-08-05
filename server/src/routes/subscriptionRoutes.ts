import express from 'express';
import { createOrder, verifyPayment } from '../controllers/subscriptionController';
import { authUser } from '../middleware/auth';

const router = express.Router();

router.post('/create-order', authUser, createOrder);
router.post('/verify-payment', authUser, verifyPayment);

export default router;
