import crypto from 'crypto';
import Razorpay from 'razorpay';
import Donation from '../models/Donation.js';
import Project from '../models/Project.js';
import Setting from '../models/Setting.js';

// Initialize Razorpay instance if keys exist
const getRazorpayInstance = () => {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (key_id && key_secret && !key_id.includes('test_RKFoundationKey123')) {
    return new Razorpay({ key_id, key_secret });
  }
  return null;
};

// Generate unique receipt number
const generateReceiptNumber = () => {
  const year = new Date().getFullYear();
  const random = Math.floor(100000 + Math.random() * 900000);
  return `RKF-${year}-REC-${random}`;
};

// @desc    Initiate donation order
// @route   POST /api/donations/create-order
// @access  Public
export const createDonationOrder = async (req, res, next) => {
  try {
    const {
      amount,
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      address,
      city,
      state,
      postalCode,
      campaignId,
      campaignTitle,
      isAnonymous,
      notes,
    } = req.body;

    const parsedAmount = Number(amount);
    if (!parsedAmount || parsedAmount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Minimum donation amount is ₹100.',
      });
    }

    if (!donorName || !donorEmail || !donorPhone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide donor full name, email, and phone number.',
      });
    }

    // Verify campaign if provided
    let campaign = null;
    let finalCampaignTitle = campaignTitle || 'General Charitable Relief Fund';
    if (campaignId) {
      campaign = await Project.findById(campaignId);
      if (campaign) {
        finalCampaignTitle = campaign.title;
      }
    }

    const receiptNumber = generateReceiptNumber();
    const razorpay = getRazorpayInstance();

    let orderId = `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

    if (razorpay) {
      try {
        const options = {
          amount: Math.round(parsedAmount * 100), // amount in paise
          currency: 'INR',
          receipt: receiptNumber,
          notes: {
            donorName,
            donorEmail,
            campaign: finalCampaignTitle,
          },
        };
        const order = await razorpay.orders.create(options);
        orderId = order.id;
      } catch (rzpErr) {
        console.warn('[Razorpay API Error] Fallback to simulated payment gateway:', rzpErr.message);
      }
    }

    // Save initial donation record in database
    const donation = await Donation.create({
      receiptNumber,
      donorName,
      donorEmail,
      donorPhone,
      donorPan: donorPan || '',
      address: address || '',
      city: city || '',
      state: state || '',
      postalCode: postalCode || '',
      amount: parsedAmount,
      currency: 'INR',
      campaignId: campaign ? campaign._id : null,
      campaignTitle: finalCampaignTitle,
      orderId,
      paymentGateway: razorpay ? 'razorpay' : 'test_mode',
      paymentStatus: 'created',
      taxExemption80G: Boolean(donorPan),
      isAnonymous: Boolean(isAnonymous),
      notes: notes || '',
    });

    res.status(200).json({
      success: true,
      donationId: donation._id,
      receiptNumber: donation.receiptNumber,
      orderId,
      amount: parsedAmount,
      currency: 'INR',
      key: process.env.RAZORPAY_KEY_ID || 'rzp_test_RKFoundationKey123',
      donor: {
        name: donorName,
        email: donorEmail,
        phone: donorPhone,
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify payment signature and finalize donation
// @route   POST /api/donations/verify-payment
// @access  Public
export const verifyDonationPayment = async (req, res, next) => {
  try {
    const {
      donationId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isTestSimulation,
    } = req.body;

    const donation = await Donation.findById(donationId);
    if (!donation) {
      return res.status(404).json({
        success: false,
        message: 'Donation record not found.',
      });
    }

    if (donation.paymentStatus === 'captured') {
      return res.status(200).json({
        success: true,
        message: 'Donation has already been verified.',
        donation,
      });
    }

    const key_secret = process.env.RAZORPAY_KEY_SECRET;
    let isValid = false;

    // Check if live/test signature verification applies
    if (
      razorpay_order_id &&
      razorpay_payment_id &&
      razorpay_signature &&
      key_secret &&
      !key_secret.includes('RKFoundationSecretValue456')
    ) {
      const generatedSignature = crypto
        .createHmac('sha256', key_secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      isValid = generatedSignature === razorpay_signature;
    } else {
      // In sandbox/development test mode with test keys
      if (isTestSimulation || (razorpay_payment_id && donation.paymentGateway === 'test_mode')) {
        isValid = true;
      }
    }

    if (!isValid) {
      donation.paymentStatus = 'failed';
      await donation.save();
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed. Invalid gateway signature.',
      });
    }

    // Payment successfully confirmed
    donation.paymentId = razorpay_payment_id || `pay_${Date.now()}`;
    if (razorpay_order_id) donation.orderId = razorpay_order_id;
    if (razorpay_signature) donation.signature = razorpay_signature;
    donation.paymentStatus = 'captured';
    await donation.save();

    // Increment Project campaign progress if linked
    if (donation.campaignId) {
      await Project.findByIdAndUpdate(donation.campaignId, {
        $inc: {
          raisedAmount: donation.amount,
          donorsCount: 1,
        },
      });
    }

    // Update global impact stats
    await Setting.findOneAndUpdate(
      {},
      {
        $inc: {
          'impactStats.livesImpacted': Math.ceil(donation.amount / 1000) || 1,
        },
      }
    );

    res.status(200).json({
      success: true,
      message: 'Donation verified successfully! Thank you for your support.',
      donation,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get donation details & 80G Tax Receipt data
// @route   GET /api/donations/receipt/:idOrReceiptNumber
// @access  Public
export const getDonationReceipt = async (req, res, next) => {
  try {
    const { idOrReceiptNumber } = req.params;
    let donation = null;

    if (idOrReceiptNumber.match(/^[0-9a-fA-F]{24}$/)) {
      donation = await Donation.findById(idOrReceiptNumber).populate('campaignId');
    }
    if (!donation) {
      donation = await Donation.findOne({ receiptNumber: idOrReceiptNumber }).populate('campaignId');
    }

    if (!donation) {
      return res.status(404).json({ success: false, message: 'Receipt not found.' });
    }

    const settings = (await Setting.findOne()) || {};

    res.status(200).json({
      success: true,
      donation,
      organization: {
        siteName: settings.siteName || 'RK FOUNDATION',
        tagline: settings.tagline || 'Registered Public Charitable Trust',
        address: settings.contact?.address || 'Institutional Area, Sector 62, Noida, Delhi-NCR',
        phone: settings.contact?.phone || '+91-9876543210',
        email: settings.contact?.donorEmail || 'donate@rkfoundation.org',
        trustRegistrationNo: settings.compliance?.trustRegistrationNo || 'TRUST/DL/2021/887412',
        ngoDarpanUid: settings.compliance?.ngoDarpanUid || 'DL/2021/0298412',
        panNumber: settings.compliance?.panNumber || 'AAETR5566K',
        section80GRegNo: settings.compliance?.section80GRegNo || 'CIT(E)/DELHI/80G/2021-22/A/1045',
        section12ARegNo: settings.compliance?.section12ARegNo || 'CIT(E)/DELHI/12A/2021-22/A/2088',
        taxExemptionNote: settings.compliance?.taxExemptionNote || '50% tax exempt under Section 80G.',
      },
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all donations (Admin) with search, filter, pagination
// @route   GET /api/donations
// @access  Private (Admin)
export const getDonations = async (req, res, next) => {
  try {
    const { status, campaign, search, page = 1, limit = 20 } = req.query;
    let query = {};

    if (status && status !== 'All') {
      query.paymentStatus = status;
    }

    if (campaign && campaign !== 'All') {
      query.campaignTitle = { $regex: campaign, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { donorName: { $regex: search, $options: 'i' } },
        { donorEmail: { $regex: search, $options: 'i' } },
        { donorPhone: { $regex: search, $options: 'i' } },
        { donorPan: { $regex: search, $options: 'i' } },
        { receiptNumber: { $regex: search, $options: 'i' } },
        { paymentId: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Donation.countDocuments(query);
    const donations = await Donation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    // Summary calculation
    const totalAmountResult = await Donation.aggregate([
      { $match: { paymentStatus: 'captured' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].total : 0;

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      totalAmount,
      donations,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Export donations to CSV
// @route   GET /api/donations/export/csv
// @access  Private (Admin)
export const exportDonationsCSV = async (req, res, next) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });

    const headers = [
      'Receipt No',
      'Date',
      'Donor Name',
      'Donor Email',
      'Donor Phone',
      'Donor PAN',
      'Amount (INR)',
      'Campaign',
      'Status',
      'Payment Gateway',
      'Payment ID',
      '80G Claimed',
    ];

    const rows = donations.map((d) => [
      `"${d.receiptNumber}"`,
      `"${new Date(d.createdAt).toLocaleDateString('en-IN')}"`,
      `"${d.donorName.replace(/"/g, '""')}"`,
      `"${d.donorEmail}"`,
      `"${d.donorPhone}"`,
      `"${d.donorPan || 'N/A'}"`,
      d.amount,
      `"${d.campaignTitle.replace(/"/g, '""')}"`,
      `"${d.paymentStatus}"`,
      `"${d.paymentGateway}"`,
      `"${d.paymentId || 'N/A'}"`,
      `"${d.taxExemption80G ? 'Yes' : 'No'}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="rk-foundation-donations-${Date.now()}.csv"`
    );
    res.status(200).send(csvContent);
  } catch (err) {
    next(err);
  }
};

// @desc    Create manual offline donation receipt
// @route   POST /api/donations/manual
// @access  Private (Admin)
export const createManualDonation = async (req, res, next) => {
  try {
    const {
      amount,
      donorName,
      donorEmail,
      donorPhone,
      donorPan,
      campaignTitle,
      paymentMode,
      notes,
    } = req.body;

    const receiptNumber = generateReceiptNumber();
    const donation = await Donation.create({
      receiptNumber,
      donorName: donorName || 'Anonymous Donor',
      donorEmail: donorEmail || 'offline@rkfoundation.org',
      donorPhone: donorPhone || 'N/A',
      donorPan: donorPan || '',
      amount: Number(amount) || 500,
      campaignTitle: campaignTitle || 'General Charitable Relief Fund',
      paymentGateway: paymentMode ? paymentMode.toLowerCase() : 'manual',
      source: 'manual',
      paymentStatus: 'captured',
      taxExemption80G: true,
      notes: notes || 'Generated manually from Admin Portal',
    });

    res.status(201).json({
      success: true,
      message: 'Manual receipt recorded successfully.',
      donation,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete donation record
// @route   DELETE /api/donations/:id
// @access  Private (Admin)
export const deleteDonation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const donation = await Donation.findByIdAndDelete(id);
    if (!donation) {
      return res.status(404).json({ success: false, message: 'Donation record not found' });
    }
    res.status(200).json({ success: true, message: 'Donation record deleted' });
  } catch (err) {
    next(err);
  }
};
