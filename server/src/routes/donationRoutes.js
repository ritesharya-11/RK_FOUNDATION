import express from 'express';
import {
  createDonationOrder,
  verifyDonationPayment,
  getDonationReceipt,
  getDonations,
  exportDonationsCSV,
} from '../controllers/donationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes for making donations and getting receipts
router.post('/create-order', createDonationOrder);
router.post('/verify-payment', verifyDonationPayment);
router.get('/receipt/:idOrReceiptNumber', getDonationReceipt);

// Admin routes for managing donations
router.get('/', protect, getDonations);
router.get('/export/csv', protect, exportDonationsCSV);

export default router;
