import Donation from '../models/Donation.js';
import Volunteer from '../models/Volunteer.js';
import Project from '../models/Project.js';
import Program from '../models/Program.js';
import ContactMessage from '../models/ContactMessage.js';
import News from '../models/News.js';

// @desc    Get Admin Dashboard KPI Statistics and Recent Records
// @route   GET /api/admin/dashboard-stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res, next) => {
  try {
    // Aggregation for Total Donations Amount and Count
    const donationStats = await Donation.aggregate([
      { $match: { paymentStatus: 'captured' } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
    ]);

    const totalDonationAmount = donationStats[0]?.totalAmount || 0;
    const totalDonationsCount = donationStats[0]?.count || 0;

    // Counts
    const totalVolunteers = await Volunteer.countDocuments();
    const pendingVolunteers = await Volunteer.countDocuments({ status: 'pending' });
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const totalPrograms = await Program.countDocuments();
    const totalMessages = await ContactMessage.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ status: 'unread' });
    const totalArticles = await News.countDocuments();

    // Recent items
    const recentDonations = await Donation.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select('receiptNumber donorName donorEmail amount campaignTitle paymentStatus createdAt paymentId');

    const recentVolunteers = await Volunteer.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select('fullName email phone city occupation status createdAt');

    const recentMessages = await ContactMessage.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .select('name email subject status createdAt');

    // Recent 6 Months Donation Trend
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyTrends = await Donation.aggregate([
      {
        $match: {
          paymentStatus: 'captured',
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } },
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalDonationAmount,
        totalDonationsCount,
        totalVolunteers,
        pendingVolunteers,
        totalProjects,
        activeProjects,
        totalPrograms,
        totalMessages,
        unreadMessages,
        totalArticles,
      },
      recentDonations,
      recentVolunteers,
      recentMessages,
      monthlyTrends,
    });
  } catch (err) {
    next(err);
  }
};
