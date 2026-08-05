import { Request, Response } from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import User from '../models/User';
import Subscription from '../models/Subscription';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'test_key',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'test_secret',
});

export const createOrder = async (req: any, res: Response) => {
  try {
    const user = req.user;
    // For V1 MVP, a static premium plan amount
    const amount = 49900; // ₹499.00
    const currency = 'INR';

    const options = {
      amount,
      currency,
      receipt: `receipt_order_${user.id}_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    const subscription = await Subscription.create({
      userId: user.id,
      plan: 'premium',
      amount: amount / 100,
      razorpayOrderId: order.id,
      status: 'created'
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      subscriptionId: subscription.id
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating Razorpay order', error });
  }
};

export const verifyPayment = async (req: any, res: Response) => {
  try {
    const user = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'test_secret')
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update subscription record
      await Subscription.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { razorpayPaymentId: razorpay_payment_id, status: 'paid', startDate: new Date(), endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) }
      );

      // Update user record
      await User.findByIdAndUpdate(user.id, {
        subscriptionStatus: 'premium',
        subscriptionExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
      });

      res.json({ message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid payment signature' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error verifying payment', error });
  }
};
