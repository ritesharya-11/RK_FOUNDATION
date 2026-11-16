import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Printer,
  Download,
  AlertCircle,
  Copy,
  Building,
  QrCode,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Donate = () => {
  const { settings, formatINR, showToast } = useWebsite();
  const [searchParams] = useSearchParams();

  // Selected Amount & Campaign
  const [amount, setAmount] = useState(() => {
    const queryAmt = searchParams.get('amount');
    return queryAmt ? Number(queryAmt) : settings.donationSettings?.defaultPreset || 2500;
  });
  const [customAmount, setCustomAmount] = useState('');
  const [selectedCampaignId, setSelectedCampaignId] = useState(() => searchParams.get('campaignId') || '');
  const [campaigns, setCampaigns] = useState([]);

  // Donor Details
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [notes, setNotes] = useState('');

  // Payment State
  const [paymentMode, setPaymentMode] = useState('gateway'); // 'gateway' | 'bank'
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successDonation, setSuccessDonation] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.get('/projects?status=active');
        if (res?.projects) {
          setCampaigns(res.projects);
        }
      } catch (err) {
        console.warn('Error fetching campaigns list:', err.message);
      }
    };

    fetchCampaigns();
  }, []);

  const effectiveAmount = customAmount ? Number(customAmount) : amount;

  const handlePresetClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!effectiveAmount || effectiveAmount < 100) {
      setErrorMsg('Minimum contribution amount is ₹100.');
      return;
    }

    if (!donorName.trim() || !donorEmail.trim() || !donorPhone.trim()) {
      setErrorMsg('Please provide your full name, email address, and phone number.');
      return;
    }

    setProcessing(true);

    try {
      const selectedCampaign = campaigns.find((c) => c._id === selectedCampaignId);

      const orderPayload = {
        amount: effectiveAmount,
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone.trim(),
        donorPan: donorPan.trim().toUpperCase(),
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        postalCode: postalCode.trim(),
        campaignId: selectedCampaignId || null,
        campaignTitle: selectedCampaign ? selectedCampaign.title : 'General Charitable Relief Fund',
        isAnonymous,
        notes: notes.trim(),
      };

      const orderRes = await api.post('/donations/create-order', orderPayload);

      if (!orderRes?.success || !orderRes.donationId) {
        throw new Error(orderRes?.message || 'Could not create donation order.');
      }

      // Check if Razorpay Checkout SDK is available in window
      if (window.Razorpay && orderRes.key && !orderRes.key.includes('test_RKFoundationKey123')) {
        const options = {
          key: orderRes.key,
          amount: Math.round(effectiveAmount * 100),
          currency: 'INR',
          name: settings.siteName || 'RK FOUNDATION',
          description: `Donation towards ${orderPayload.campaignTitle}`,
          order_id: orderRes.orderId,
          prefill: {
            name: donorName,
            email: donorEmail,
            contact: donorPhone,
          },
          theme: {
            color: '#036C6C',
          },
          handler: async (response) => {
            try {
              const verifyRes = await api.post('/donations/verify-payment', {
                donationId: orderRes.donationId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes?.success && verifyRes.donation) {
                setSuccessDonation(verifyRes.donation);
                showToast('Donation successful! Official 80G tax receipt generated.', 'success');
              }
            } catch (vErr) {
              setErrorMsg(vErr.message || 'Payment signature verification failed.');
            } finally {
              setProcessing(false);
            }
          },
          modal: {
            ondismiss: () => {
              setProcessing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        // Direct sandbox / test verification simulation
        const verifyRes = await api.post('/donations/verify-payment', {
          donationId: orderRes.donationId,
          razorpay_order_id: orderRes.orderId,
          razorpay_payment_id: `pay_sim_${Date.now()}`,
          isTestSimulation: true,
        });

        if (verifyRes?.success && verifyRes.donation) {
          setSuccessDonation(verifyRes.donation);
          showToast('Donation successful! Official 80G tax receipt generated.', 'success');
        }
        setProcessing(false);
      }
    } catch (err) {
      setErrorMsg(err.message || 'Payment failed to initiate. Please try again.');
      setProcessing(false);
    }
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, 'info');
  };

  // SUCCESS SCREEN: Instant Printable 80G Tax Exemption Receipt
  if (successDonation) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#036C6C] text-[#F67708] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-extrabold text-[#323D3D]">
              Thank You for Your Generous Contribution!
            </h1>
            <p className="text-sm text-[#697777] max-w-lg mx-auto">
              Your contribution makes an immediate difference. Your official Section 80G Tax Exemption receipt is generated below.
            </p>
          </div>

          {/* Printable Official Receipt Card */}
          <div id="printable-receipt" className="bg-white p-8 sm:p-10 rounded-3xl border border-[#E3D9CF] shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E3D9CF] gap-4">
              <div>
                <span className="text-xs font-bold text-[#F67708] tracking-wider uppercase block">
                  Official Donation Receipt (Section 80G)
                </span>
                <h2 className="text-2xl font-black text-[#323D3D]">{settings.siteName || 'RK FOUNDATION'}</h2>
                <p className="text-xs text-[#697777]">{settings.contact?.address}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-[#A0A4AE] block">Receipt Number</span>
                <strong className="text-sm font-mono text-[#036C6C]">{successDonation.receiptNumber}</strong>
                <span className="text-[11px] text-[#A0A4AE] block mt-1">
                  Date: {new Date(successDonation.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#A0A4AE] block font-semibold">Donor Details</span>
                <p className="font-bold text-sm text-[#323D3D]">{successDonation.donorName}</p>
                <p className="text-[#697777]">{successDonation.donorEmail} | {successDonation.donorPhone}</p>
                {successDonation.donorPan && (
                  <p className="text-[#036C6C] font-mono font-bold">PAN: {successDonation.donorPan}</p>
                )}
              </div>

              <div className="space-y-1 bg-[#FAF7F2] p-4 rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#A0A4AE] block font-semibold">Payment & Purpose</span>
                <p className="font-bold text-sm text-[#323D3D]">{successDonation.campaignTitle}</p>
                <p className="text-[#697777]">Payment ID: <span className="font-mono">{successDonation.paymentId}</span></p>
                <p className="text-[#697777]">Status: <strong className="text-[#036C6C] font-bold uppercase">{successDonation.paymentStatus}</strong></p>
              </div>
            </div>

            <div className="p-5 bg-[#036C6C] text-white rounded-2xl flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300">Total Amount Contributed:</span>
              <span className="text-2xl font-black text-[#F67708]">
                {formatINR(successDonation.amount)}
              </span>
            </div>

            <div className="text-[11px] text-[#697777] leading-relaxed border-t border-[#E3D9CF] pt-4 space-y-1">
              <p className="font-bold text-[#323D3D]">Statutory Tax Benefit Disclosure:</p>
              <p>
                All donations made to RK FOUNDATION are 50% exempt from Income Tax under Section 80G of the Income Tax Act, 1961 vide Order No. <strong>{settings.compliance?.section80GRegNo || 'CIT(E)/DELHI/80G/2021-22/A/1045'}</strong>. NITI Aayog NGO Darpan UID: <strong>{settings.compliance?.ngoDarpanUid || 'DL/2021/0298412'}</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-full font-bold text-sm text-white bg-[#036C6C] hover:bg-black transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Printer className="w-4 h-4 text-[#F67708]" />
              <span>Print / Save as PDF</span>
            </button>

            <Link
              to="/"
              className="px-6 py-3 rounded-full font-semibold text-sm text-[#323D3D] bg-white hover:bg-[#E3D9CF] border border-[#E3D9CF] transition"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="100% Tax Exempt Philanthropy"
        title="Support Our Life-Transforming Mission"
        subtitle="Every rupee directly funds bridge classrooms, pediatric emergency surgeries, women vocational tailoring units, and nutritious ration drives with instant 80G receipts."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Donate Online' },
        ]}
      />

      {/* Main Donation Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {/* Toggle Payment Mode: Online Gateway vs Direct Bank / UPI Transfer */}
        <div className="flex rounded-full bg-white p-1.5 max-w-md mx-auto mb-12 text-xs sm:text-sm font-bold border border-[#E3D9CF] shadow-card">
          <button
            type="button"
            onClick={() => setPaymentMode('gateway')}
            className={`flex-1 py-3 rounded-full transition-all duration-200 cursor-pointer ${
              paymentMode === 'gateway'
                ? 'bg-[#036C6C] text-[#F67708] shadow-sm'
                : 'text-[#697777] hover:text-[#323D3D]'
            }`}
          >
            Online (UPI, Card, NetBanking)
          </button>
          <button
            type="button"
            onClick={() => setPaymentMode('bank')}
            className={`flex-1 py-3 rounded-full transition-all duration-200 cursor-pointer ${
              paymentMode === 'bank'
                ? 'bg-[#036C6C] text-[#F67708] shadow-sm'
                : 'text-[#697777] hover:text-[#323D3D]'
            }`}
          >
            Bank Transfer / NEFT / RTGS
          </button>
        </div>

        {paymentMode === 'gateway' ? (
          <form onSubmit={handleInitiatePayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Amount & Campaign Selection */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D9CF] shadow-card space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#323D3D]">Step 1: Select Contribution Amount</h3>
                <p className="text-xs text-[#697777] mt-0.5">Select a suggested tier or enter any custom contribution (INR)</p>

                <div className="grid grid-cols-3 gap-3 mt-4">
                  {(settings.donationSettings?.presetAmounts || [500, 1000, 2500, 5000, 10000, 25000]).map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePresetClick(preset)}
                      className={`py-3 px-3 rounded-2xl text-sm font-extrabold border transition-all duration-200 cursor-pointer ${
                        amount === preset && !customAmount
                          ? 'bg-[#036C6C] text-[#F67708] border-[#036C6C] shadow-md scale-102'
                          : 'bg-[#FAF7F2] text-[#323D3D] border-[#E3D9CF] hover:border-[#F67708]'
                      }`}
                    >
                      ₹{preset.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-xs font-bold text-[#697777] mb-1">
                    Or Enter Other Amount (INR):
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#036C6C] font-black">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="100"
                      placeholder="e.g. 7500"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(null);
                      }}
                      className="w-full pl-9 pr-4 py-3 rounded-2xl border border-[#E3D9CF] text-sm font-bold focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2] text-[#323D3D]"
                    />
                  </div>
                </div>
              </div>

              {/* Purpose / Campaign Selection */}
              <div className="pt-4 border-t border-[#E3D9CF]">
                <label className="block text-xs font-bold text-[#323D3D] mb-2">
                  Select Cause / Campaign (Optional)
                </label>
                <select
                  value={selectedCampaignId}
                  onChange={(e) => setSelectedCampaignId(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm font-medium focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2] text-[#323D3D]"
                >
                  <option value="">General Charitable Relief Fund (Where Most Urgently Needed)</option>
                  {campaigns.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Donor Details */}
              <div className="pt-4 border-t border-[#E3D9CF] space-y-4">
                <h3 className="text-lg font-bold text-[#323D3D]">Step 2: Donor Details</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. rajesh@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">Mobile Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#323D3D] mb-1">
                      PAN Card Number (for 80G Tax Exemption)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      placeholder="e.g. ABCDE1234F"
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm font-mono uppercase focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#323D3D] mb-1">Postal Address</label>
                  <input
                    type="text"
                    placeholder="House/Street, City, Pincode"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm focus:outline-none focus:border-[#036C6C] focus:ring-1 focus:ring-[#036C6C] bg-[#FAF7F2]"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Checkout Trigger */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D9CF] shadow-card space-y-5 sticky top-28">
                <h3 className="text-lg font-bold text-[#323D3D]">Donation Summary</h3>

                <div className="p-4 bg-[#FAF7F2] rounded-2xl space-y-3 border border-[#E3D9CF] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[#697777]">Contribution Amount:</span>
                    <strong className="text-xl font-black text-[#036C6C]">
                      {formatINR(effectiveAmount)}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#697777]">80G Tax Exemption:</span>
                    <strong className="text-[#036C6C] font-bold">50% Deductible</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#697777]">Platform & Processing Fee:</span>
                    <strong className="text-[#036C6C] font-bold">₹0 (Zero Fee)</strong>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-3.5 bg-red-50 text-red-700 rounded-2xl text-xs flex items-start gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF] text-xs text-[#323D3D] space-y-1">
                  <div className="flex items-center gap-2 font-bold">
                    <ShieldCheck className="w-4 h-4 text-[#036C6C]" />
                    <span>Secure 256-Bit SSL Encrypted</span>
                  </div>
                  <p className="text-[11px] text-[#697777]">
                    Supports UPI (GPay, PhonePe, Paytm), All Debit/Credit Cards & Net Banking.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-4 rounded-xl font-extrabold text-sm uppercase tracking-wider text-white bg-[#F67708] hover:bg-[#E06800] shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {processing ? 'Processing Securely...' : `Donate ${formatINR(effectiveAmount)} Now`}
                  </span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Direct Bank Transfer / NEFT / RTGS Details */
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E3D9CF] shadow-card space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#036C6C] text-[#F67708] flex items-center justify-center mx-auto shadow-sm">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-[#323D3D]">Official Bank Account Details</h3>
              <p className="text-xs text-[#697777]">
                You can make direct transfers via NEFT, RTGS, IMPS, or UPI directly to our registered trust account.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between items-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#697777]">Account Name:</span>
                <span className="font-bold text-[#323D3D] font-mono text-right">{settings.donationSettings?.bankAccountName || 'RK FOUNDATION'}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#697777]">Bank Name:</span>
                <span className="font-bold text-[#323D3D]">{settings.donationSettings?.bankName || 'State Bank of India'}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#697777]">Account Number:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#323D3D]">{settings.donationSettings?.accountNumber || '40918273645'}</span>
                  <button
                    onClick={() => handleCopy(settings.donationSettings?.accountNumber || '40918273645', 'Account Number')}
                    className="p-1 hover:text-[#036C6C] transition"
                  >
                    <Copy className="w-4 h-4 text-[#F67708]" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#697777]">IFSC Code:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#323D3D]">{settings.donationSettings?.ifscCode || 'SBIN0004123'}</span>
                  <button
                    onClick={() => handleCopy(settings.donationSettings?.ifscCode || 'SBIN0004123', 'IFSC Code')}
                    className="p-1 hover:text-[#036C6C] transition"
                  >
                    <Copy className="w-4 h-4 text-[#F67708]" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF]">
                <span className="text-[#697777]">Official UPI ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-[#036C6C]">{settings.donationSettings?.upiId || 'rkfoundation@sbi'}</span>
                  <button
                    onClick={() => handleCopy(settings.donationSettings?.upiId || 'rkfoundation@sbi', 'UPI ID')}
                    className="p-1 hover:text-[#036C6C] transition"
                  >
                    <Copy className="w-4 h-4 text-[#F67708]" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF] text-xs text-[#323D3D] space-y-1.5">
              <p className="font-bold text-[#036C6C]">After Making Direct Bank Transfer:</p>
              <p className="text-[#697777]">
                Please email your transfer UTR / Transaction Reference number along with your PAN card copy to <strong>{settings.contact?.donorEmail || 'donate@rkfoundation.org'}</strong> or WhatsApp us at <strong>{settings.socialLinks?.whatsapp || '+91 98765 43210'}</strong> to receive your 80G tax certificate immediately.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
