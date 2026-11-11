import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  HeartHandshake,
  UserCheck,
  Target,
  Mail,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Calendar,
  Eye,
} from 'lucide-react';

export const AdminDashboard = () => {
  const { formatINR } = useWebsite();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get('/admin/dashboard-stats');
        if (res?.success) {
          setData(res);
        }
      } catch (err) {
        console.warn('Dashboard fetch error:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const stats = data?.stats || {
    totalDonationAmount: 0,
    totalDonationsCount: 0,
    totalVolunteers: 0,
    pendingVolunteers: 0,
    totalProjects: 0,
    activeProjects: 0,
    totalMessages: 0,
    unreadMessages: 0,
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-950 to-slate-900 border border-slate-800 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Operational Overview
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome to the Foundation Command Center
          </h2>
          <p className="text-xs text-slate-400">
            Monitor real-time donations, review volunteer applications, and manage dynamic website content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/donations"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition"
          >
            Review Donations
          </Link>
          <Link
            to="/admin/settings"
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
          >
            Website CMS
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Donations */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Funds Raised</span>
            <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <HeartHandshake className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">
            {formatINR(stats.totalDonationAmount)}
          </h3>
          <p className="text-[11px] text-slate-500">
            {stats.totalDonationsCount} Verified Contributions
          </p>
        </div>

        {/* Card 2: Active Projects */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Campaigns</span>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Target className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">{stats.activeProjects} Active</h3>
          <p className="text-[11px] text-slate-500">Total {stats.totalProjects} Campaigns</p>
        </div>

        {/* Card 3: Volunteers */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Volunteers</span>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <UserCheck className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">{stats.totalVolunteers}</h3>
          <p className="text-[11px] text-amber-400 font-semibold">
            {stats.pendingVolunteers} Pending Review
          </p>
        </div>

        {/* Card 4: Inquiries */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Contact Inquiries</span>
            <span className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Mail className="w-4 h-4" />
            </span>
          </div>
          <h3 className="text-2xl font-black text-white">{stats.totalMessages}</h3>
          <p className="text-[11px] text-purple-400 font-semibold">
            {stats.unreadMessages} Unread Inquiries
          </p>
        </div>
      </div>

      {/* 2-Column Tables: Recent Donations & Recent Volunteers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Donations */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>Recent Online Contributions</span>
            </h3>
            <Link to="/admin/donations" className="text-xs text-emerald-400 hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-2 font-semibold">Receipt</th>
                  <th className="pb-2 font-semibold">Donor</th>
                  <th className="pb-2 font-semibold">Amount</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {(data?.recentDonations || []).map((d) => (
                  <tr key={d._id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-mono text-[11px] text-slate-400">
                      {d.receiptNumber}
                    </td>
                    <td className="py-2.5 font-medium text-white">{d.donorName}</td>
                    <td className="py-2.5 font-bold text-emerald-400">{formatINR(d.amount)}</td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          d.paymentStatus === 'captured'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-rose-500/10 text-rose-400'
                        }`}
                      >
                        {d.paymentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Volunteer Applications */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-blue-400" />
              <span>New Volunteer Applicants</span>
            </h3>
            <Link to="/admin/volunteers" className="text-xs text-blue-400 hover:underline">
              View Pipeline
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="pb-2 font-semibold">Applicant</th>
                  <th className="pb-2 font-semibold">City</th>
                  <th className="pb-2 font-semibold">Role/Occupation</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {(data?.recentVolunteers || []).map((v) => (
                  <tr key={v._id} className="hover:bg-slate-800/40">
                    <td className="py-2.5 font-medium text-white">{v.fullName}</td>
                    <td className="py-2.5 text-slate-400">{v.city}</td>
                    <td className="py-2.5 text-slate-400">{v.occupation}</td>
                    <td className="py-2.5">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                          v.status === 'approved'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : v.status === 'pending'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

