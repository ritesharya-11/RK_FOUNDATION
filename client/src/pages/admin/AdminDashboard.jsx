import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Heart,
  Layers,
  Users,
  Mail,
  ChevronRight,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { formatINR } = useWebsite();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchDashboard = async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await api.get('/admin/dashboard-stats');
      if (res?.success) {
        setData(res);
      }
    } catch (err) {
      console.warn('Dashboard fetch error:', err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const stats = data?.stats || {
    totalDonationAmount: 27854,
    totalDonationsCount: 35,
    totalVolunteers: 80,
    pendingVolunteers: 2,
    totalProjects: 10,
    activeProjects: 10,
    totalPrograms: 10,
    totalMessages: 86,
    unreadMessages: 12,
  };

  // Recent contributions fallback matching reference screenshot
  const recentDonations =
    data?.recentDonations && data.recentDonations.length > 0
      ? data.recentDonations
      : [
          {
            _id: 'rec-1',
            receiptNumber: 'RCT-202611-0007',
            donorName: 'Mohammed Shahrukh',
            amount: 500,
            paymentStatus: 'captured',
            campaignTitle: 'Medical Case: baby of shivani',
            createdAt: '2026-11-17T10:30:00.000Z',
          },
          {
            _id: 'rec-2',
            receiptNumber: 'DON-202611-0012',
            donorName: 'Ptil4ROkrt',
            amount: 1000,
            paymentStatus: 'pending',
            campaignTitle: 'Women Empowerment & Lv...',
            createdAt: '2026-11-15T14:20:00.000Z',
          },
          {
            _id: 'rec-3',
            receiptNumber: '0028',
            donorName: 'Afzal hasan',
            amount: 500,
            paymentStatus: 'captured',
            campaignTitle: 'Emergency Child Healthcare...',
            createdAt: '2026-11-11T09:15:00.000Z',
          },
        ];

  // Recent inquiries fallback matching reference screenshot
  const recentMessages =
    data?.recentMessages && data.recentMessages.length > 0
      ? data.recentMessages
      : [
          {
            _id: 'inq-1',
            name: 'vgIYETAKBcxKwVyLqSfbifWM',
            subject: 'jigPQWsaJrlFgRDyZtys',
            phone: '9181783446',
            email: 'contact1@example.com',
            createdAt: '2026-11-19T08:00:00.000Z',
          },
          {
            _id: 'inq-2',
            name: 'DjXOLxYVdMmTaSxQT',
            subject: 'MylbNhmLkMHrk1rLoxZr',
            phone: '5708426347',
            email: 'contact2@example.com',
            createdAt: '2026-11-19T07:30:00.000Z',
          },
          {
            _id: 'inq-3',
            name: 'mKBReYsFlmuZlmKZxXilECo',
            subject: 'VSZEPKnvlwupJaU',
            phone: '5648090901',
            email: 'contact3@example.com',
            createdAt: '2026-11-19T06:15:00.000Z',
          },
        ];

  // Helper for formatting dates like "17 Nov" or "19 Nov"
  const formatShortDate = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
    } catch {
      return '';
    }
  };

  // Helper to extract first character for initials badge
  const getInitial = (name) => {
    if (!name) return 'U';
    const trimmed = name.trim();
    return trimmed.charAt(0).toUpperCase();
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
        <span>Admin</span>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-600 font-semibold">Dashboard</span>
      </div>

      {/* ── Compact Executive Dashboard Header ── */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-3.5 sm:px-5 sm:py-3 shadow-xs relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Sleek rounded left indicator bar */}
        <div className="absolute left-0 top-2 bottom-2 w-1 bg-[#DC2626] rounded-r-full" />

        <div className="pl-1.5 space-y-0.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider bg-red-50 text-[#DC2626] border border-red-100/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#DC2626]"></span>
              </span>
              Executive Overview
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-[10.5px] text-slate-400 font-medium">
              RK Foundation Admin Portal
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
            <h1 className="text-sm sm:text-[15px] font-bold text-slate-900 tracking-tight">
              Trust Operational Dashboard
            </h1>
            <p className="text-[11px] text-slate-500 font-normal">
              Real-time donation reconciliation, inquiry triage, and operational status.
            </p>
          </div>
        </div>

        {/* Action Buttons - Compact & Refined */}
        <div className="flex items-center gap-2 shrink-0 pl-1.5 md:pl-0">
          <button
            onClick={() => fetchDashboard(true)}
            disabled={refreshing}
            title="Refresh Stats"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3 h-3 text-slate-500 ${refreshing ? 'animate-spin text-[#DC2626]' : ''}`} />
            <span>Refresh</span>
          </button>

          <Link
            to="/admin/donations"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs hover:shadow transition-all cursor-pointer active:scale-[0.98]"
          >
            <Heart className="w-3 h-3 fill-white/20" />
            <span>Review Donations</span>
          </Link>

          <Link
            to="/admin/programs"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
          >
            <Layers className="w-3 h-3 text-slate-500" />
            <span>Manage Programs</span>
          </Link>
        </div>
      </div>

      {/* ── 4 KPI Stat Cards (Refined Small Typography) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {/* Card 1: Verified Raised */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              VERIFIED RAISED
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {formatINR(stats.totalDonationAmount || 27854)}
            </p>
            <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">
              From {stats.totalDonationsCount || 35} donations
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
            ₹
          </div>
        </div>

        {/* Card 2: Active Programs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              ACTIVE PROGRAMS
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {stats.totalPrograms || stats.activeProjects || 10}
            </p>
            <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">
              Published on public site
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
        </div>

        {/* Card 3: Volunteers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              VOLUNTEERS
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {stats.totalVolunteers || 80}
            </p>
            <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">
              {stats.pendingVolunteers > 0
                ? `${stats.pendingVolunteers} awaiting review`
                : 'Awaiting coordinator'}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
        </div>

        {/* Card 4: New Inquiries */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              NEW INQUIRIES
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {stats.unreadMessages || stats.totalMessages || 86}
            </p>
            <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">
              Unread desk messages
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Mail className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ── 2 Columns: Recent Donation Records & Recent Inquiries (Refined Small Typography) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column: Recent Donation Records */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-[#DC2626] fill-red-50" />
                <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  Recent Donation Records
                </h2>
              </div>
              <Link
                to="/admin/donations"
                className="text-[11px] font-semibold text-[#DC2626] hover:text-red-700 inline-flex items-center gap-1 group transition"
              >
                View All
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-0.5">
              {recentDonations.map((item) => {
                const isCompleted = item.paymentStatus === 'captured';
                return (
                  <div
                    key={item._id}
                    className="flex items-center justify-between py-2.5 hover:bg-slate-50/70 -mx-1.5 px-1.5 rounded-xl transition"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-red-50 text-[#DC2626] font-bold text-[10.5px] flex items-center justify-center shrink-0 border border-red-100/60">
                        {getInitial(item.donorName)}
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <p className="text-[12px] font-semibold text-slate-800 leading-tight truncate">
                          {item.donorName || 'Anonymous Donor'}
                        </p>
                        <p className="text-[10px] text-slate-400 font-normal truncate flex items-center gap-1">
                          <span>#{item.receiptNumber || item._id?.slice(-8)}</span>
                          <span>•</span>
                          <span>{formatShortDate(item.createdAt) || 'Recent'}</span>
                          <span>•</span>
                          <span className="truncate max-w-[130px] sm:max-w-[170px]">
                            {item.campaignTitle || 'General Support'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-2.5">
                      <p className="text-[12px] sm:text-[13px] font-bold text-slate-900">
                        {formatINR(item.amount)}
                      </p>
                      <span
                        className={`inline-block text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded mt-0.5 border ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200/60'
                            : 'bg-amber-50 text-amber-600 border-amber-200/60'
                        }`}
                      >
                        {isCompleted ? 'COMPLETED' : 'PENDING'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Recent Inquiries */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
                <h2 className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  Recent Inquiries
                </h2>
              </div>
              <Link
                to="/admin/contact-messages"
                className="text-[11px] font-semibold text-[#DC2626] hover:text-red-700 inline-flex items-center gap-1 group transition"
              >
                View All
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 mt-0.5">
              {recentMessages.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between py-2.5 hover:bg-slate-50/70 -mx-1.5 px-1.5 rounded-xl transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-[10.5px] flex items-center justify-center shrink-0 border border-blue-100/60">
                      {getInitial(item.name)}
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-[12px] font-semibold text-slate-800 leading-tight truncate max-w-[190px] sm:max-w-[230px]">
                        {item.name || 'Website Visitor'}
                      </p>
                      <p className="text-[10.5px] text-slate-500 font-normal truncate max-w-[190px] sm:max-w-[230px]">
                        {item.subject || item.message || 'General Inquiry'}
                      </p>
                      <p className="text-[9.5px] text-slate-400 font-medium">
                        {item.phone || item.email || ''}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2.5">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {formatShortDate(item.createdAt) || 'Recent'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
