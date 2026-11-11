import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Download,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  FileText,
  Printer,
  ShieldCheck,
  Eye,
} from 'lucide-react';

export const AdminDonations = () => {
  const { formatINR, showToast } = useWebsite();
  const [donations, setDonations] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewingDonation, setViewingDonation] = useState(null);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      let query = `?status=${encodeURIComponent(statusFilter)}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      const res = await api.get(`/donations${query}`);
      if (res?.success) {
        setDonations(res.donations);
        setTotalAmount(res.totalAmount);
      }
    } catch (err) {
      showToast('Error loading donations', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchDonations();
  };

  const handleExportCSV = () => {
    const token = localStorage.getItem('rk_token');
    window.open(`${import.meta.env.VITE_API_BASE_URL || '/api'}/donations/export/csv?token=${token}`, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Donations Ledger</h2>
          <p className="text-xs text-slate-400">
            Total Captured Funds: <strong className="text-emerald-400 text-sm">{formatINR(totalAmount)}</strong>
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export All Records (CSV)</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by donor name, email, phone, receipt number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </form>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="All">All Statuses</option>
          <option value="captured">Captured (Success)</option>
          <option value="created">Created (Pending)</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Receipt No</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Donor Name</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Campaign / Purpose</th>
                <th className="p-4 font-semibold">PAN / 80G</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {donations.map((d) => (
                <tr key={d._id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-mono font-bold text-slate-400">{d.receiptNumber}</td>
                  <td className="p-4 text-slate-400">{new Date(d.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="p-4">
                    <strong className="text-white block font-semibold">{d.donorName}</strong>
                    <span className="text-[11px] text-slate-500">{d.donorEmail}</span>
                  </td>
                  <td className="p-4 font-black text-emerald-400 text-sm">{formatINR(d.amount)}</td>
                  <td className="p-4 max-w-xs truncate">{d.campaignTitle}</td>
                  <td className="p-4 font-mono text-[11px]">{d.donorPan || '—'}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        d.paymentStatus === 'captured'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}
                    >
                      {d.paymentStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setViewingDonation(d)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Duplicate Receipt Modal */}
      {viewingDonation && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Donation Record Breakdown</h3>
              <button onClick={() => setViewingDonation(null)} className="text-slate-400">
                ×
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Receipt Reference</span>
                <p className="text-sm font-mono font-bold text-emerald-400">{viewingDonation.receiptNumber}</p>
                <p className="text-[11px] text-slate-400">
                  Recorded on: {new Date(viewingDonation.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Donor Name</span>
                  <strong className="text-white text-xs">{viewingDonation.donorName}</strong>
                  <p className="text-slate-400 mt-1">{viewingDonation.donorEmail}</p>
                  <p className="text-slate-400">{viewingDonation.donorPhone}</p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Tax Deductibility</span>
                  <p className="font-mono text-emerald-400 font-bold mt-1">PAN: {viewingDonation.donorPan || 'Not Specified'}</p>
                  <p className="text-slate-400 mt-1">Section 80G: 50% Tax Exemption</p>
                </div>
              </div>

              <div className="p-4 bg-emerald-950/40 border border-emerald-800/40 rounded-xl flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-300">Total Contribution:</span>
                <span className="text-xl font-black text-emerald-400">{formatINR(viewingDonation.amount)}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold">Campaign Allocation</span>
                <p className="font-semibold text-white">{viewingDonation.campaignTitle}</p>
                <p className="text-slate-400 text-[11px]">Payment Gateway: {viewingDonation.paymentGateway} | ID: {viewingDonation.paymentId || 'N/A'}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <Link
                to={`/receipt/verify?receiptNumber=${viewingDonation.receiptNumber}`}
                target="_blank"
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Open Verification View
              </Link>

              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Duplicate 80G Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

