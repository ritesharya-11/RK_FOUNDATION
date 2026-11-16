import React, { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import { ShieldCheck, Search, Printer, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export const ReceiptVerify = () => {
  const { settings, formatINR } = useWebsite();
  const [receiptNumber, setReceiptNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!receiptNumber.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setReceiptData(null);

    try {
      const res = await api.get(`/donations/receipt/${encodeURIComponent(receiptNumber.trim())}`);
      if (res?.success && res.donation) {
        setReceiptData(res.donation);
      }
    } catch (err) {
      setErrorMsg(err.message || 'No receipt found with this reference number.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Digital Transparency Portal"
        title="Verify 80G Tax Exemption Receipt"
        subtitle="Enter your unique RK Foundation receipt number to verify statutory compliance, view payment breakdown, and print your official duplicate certificate."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Verify Receipt' },
        ]}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        {/* Search Input Box */}
        <form onSubmit={handleSearch} className="bg-white p-8 rounded-3xl border border-[#E3D9CF] shadow-card space-y-4">
          <label className="block text-xs font-bold text-[#323D3D] uppercase tracking-wider">
            Enter Receipt Number (e.g. RKF-2026-REC-100234)
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              required
              placeholder="e.g. RKF-2026-REC-XXXXXX"
              value={receiptNumber}
              onChange={(e) => setReceiptNumber(e.target.value)}
              className="flex-1 px-4 py-3 rounded-2xl border border-[#E3D9CF] text-sm font-mono focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2] uppercase"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-full font-bold text-xs text-[#036C6C] bg-[#F67708] hover:bg-[#E06800] transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Searching...' : 'Verify'}</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3.5 bg-red-50 text-red-700 rounded-2xl text-xs flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}
        </form>

        {/* Display Verified Receipt */}
        {receiptData && (
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E3D9CF] shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D9CF] gap-4">
              <div>
                <span className="text-xs font-bold text-[#F67708] tracking-wider uppercase block">
                  Verified Section 80G Certificate
                </span>
                <h2 className="text-2xl font-black text-[#323D3D]">{settings.siteName || 'RK FOUNDATION'}</h2>
                <p className="text-xs text-[#697777]">{settings.contact?.address}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[#A0A4AE] block">Receipt Number</span>
                <strong className="text-sm font-mono text-[#036C6C]">{receiptData.receiptNumber}</strong>
                <span className="text-[11px] text-[#A0A4AE] block mt-1">
                  Date: {new Date(receiptData.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#A0A4AE] block font-semibold">Donor Details</span>
                <p className="font-bold text-sm text-[#323D3D]">{receiptData.donorName}</p>
                <p className="text-[#697777]">{receiptData.donorEmail} | {receiptData.donorPhone}</p>
                {receiptData.donorPan && (
                  <p className="text-[#036C6C] font-mono font-bold">PAN: {receiptData.donorPan}</p>
                )}
              </div>

              <div className="space-y-1 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#A0A4AE] block font-semibold">Payment & Purpose</span>
                <p className="font-bold text-sm text-[#323D3D]">{receiptData.campaignTitle}</p>
                <p className="text-[#697777]">Payment ID: <span className="font-mono">{receiptData.paymentId}</span></p>
                <p className="text-[#697777]">Status: <strong className="text-[#036C6C] font-bold uppercase">{receiptData.paymentStatus}</strong></p>
              </div>
            </div>

            <div className="p-5 bg-[#036C6C] text-white rounded-2xl flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300">Total Amount Contributed:</span>
              <span className="text-2xl font-black text-[#F67708]">
                {formatINR(receiptData.amount)}
              </span>
            </div>

            <div className="text-[11px] text-[#697777] leading-relaxed border-t border-[#E3D9CF] pt-4 space-y-1">
              <p className="font-bold text-[#323D3D]">Statutory Tax Benefit Disclosure:</p>
              <p>
                All donations made to RK FOUNDATION are 50% exempt from Income Tax under Section 80G of the Income Tax Act, 1961 vide Order No. <strong>{settings.compliance?.section80GRegNo || 'CIT(E)/DELHI/80G/2021-22/A/1045'}</strong>. NITI Aayog NGO Darpan UID: <strong>{settings.compliance?.ngoDarpanUid || 'DL/2021/0298412'}</strong>.
              </p>
            </div>

            <div className="pt-2 text-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-full font-bold text-xs text-white bg-[#036C6C] hover:bg-black transition flex items-center gap-2 mx-auto cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4 text-[#F67708]" />
                <span>Print Official Copy</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
