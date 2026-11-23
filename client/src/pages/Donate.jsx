import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
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
  Check,
  FileText,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const Donate = () => {
  const { settings, formatINR, showToast } = useWebsite();
  const [searchParams] = useSearchParams();

  // Selected Amount & Campaign
  const [amount, setAmount] = useState(() => {
    const queryAmt = searchParams.get('amount');
    return queryAmt ? Number(queryAmt) : 1000;
  });
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('General Charitable Fund');
  const [campaigns, setCampaigns] = useState([]);

  // Donor Details Form
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorPan, setDonorPan] = useState('');
  const [city, setCity] = useState('');
  const [utrNumber, setUtrNumber] = useState('');

  // Payment Tab: 'online' | 'bank'
  const [paymentTab, setPaymentTab] = useState('online');
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successDonation, setSuccessDonation] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await api.get('/projects?status=active');
        if (res?.projects && res.projects.length > 0) {
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

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(`Copied to clipboard: ${text}`, 'info');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleInitiatePayment = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!effectiveAmount || effectiveAmount < 500) {
      setErrorMsg('Minimum contribution amount is ₹500.');
      return;
    }

    if (!donorName.trim() || !donorEmail.trim() || !donorPhone.trim()) {
      setErrorMsg('Please enter your full name, email address, and mobile number.');
      return;
    }

    setProcessing(true);

    try {
      const orderPayload = {
        amount: effectiveAmount,
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone.trim(),
        donorPan: donorPan.trim().toUpperCase(),
        city: city.trim(),
        campaignTitle: selectedPurpose,
        isAnonymous: false,
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
          name: settings.siteName || 'REBIRTH CARE TRUST',
          description: `Contribution for ${selectedPurpose}`,
          order_id: orderRes.orderId,
          prefill: {
            name: donorName,
            email: donorEmail,
            contact: donorPhone,
          },
          theme: {
            color: '#DC2626',
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
        // Direct sandbox / verification simulation for test setups
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

  const handleBankTransferSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!effectiveAmount || effectiveAmount < 500) {
      setErrorMsg('Please enter valid transferred amount (Min ₹500).');
      return;
    }
    if (!utrNumber.trim()) {
      setErrorMsg('Please enter Bank UTR / Transaction Reference Number.');
      return;
    }
    if (!donorName.trim() || !donorEmail.trim() || !donorPhone.trim()) {
      setErrorMsg('Please enter your full name, email, and mobile number.');
      return;
    }

    setProcessing(true);
    try {
      const payload = {
        donorName: donorName.trim(),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone.trim(),
        donorPan: donorPan.trim().toUpperCase(),
        city: city.trim(),
        amount: effectiveAmount,
        paymentMode: 'bank_transfer',
        paymentStatus: 'pending',
        transactionId: utrNumber.trim(),
        campaignTitle: selectedPurpose,
        notes: `Offline Bank Transfer UTR: ${utrNumber.trim()}`,
      };

      const res = await api.post('/donations', payload);
      if (res?.donation || res?.success) {
        setSuccessDonation(res.donation || {
          receiptNumber: `RCT-PENDING-${Date.now().toString().slice(-4)}`,
          donorName,
          donorEmail,
          donorPhone,
          donorPan,
          amount: effectiveAmount,
          paymentStatus: 'pending_verification',
          paymentId: utrNumber.trim(),
          campaignTitle: selectedPurpose,
          createdAt: new Date().toISOString(),
        });
        showToast('Transfer record submitted! Trust accountant will verify within 2 hours.', 'success');
      }
    } catch (err) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  // SUCCESS SCREEN: Instant Printable 80G Tax Exemption Receipt
  if (successDonation) {
    return (
      <div className="bg-[#F8FAFC] min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Thank You for Your Life-Changing Contribution!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
              Your contribution makes an immediate difference. Your official Section 80G Tax Exemption receipt is generated below.
            </p>
          </div>

          {/* Printable Official Receipt Card */}
          <div id="printable-receipt" className="bg-white p-6 sm:p-9 rounded-3xl border border-slate-200/90 shadow-md space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-3">
              <div>
                <span className="text-[10px] font-bold text-[#DC2626] tracking-wider uppercase block">
                  Official Donation Receipt (Section 80G)
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                  {settings.siteName || 'REBIRTH CARE TRUST'}
                </h2>
                <p className="text-[11px] text-slate-500">
                  Reg No. 769 • PAN No. {settings.compliance?.panNumber || 'AAETR1099J'} • NITI Aayog: {settings.compliance?.ngoDarpanUid || 'DL/2020/0262802'}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Receipt Number</span>
                <strong className="text-xs sm:text-sm font-mono text-[#DC2626]">{successDonation.receiptNumber}</strong>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  Date: {new Date(successDonation.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Donor Details</span>
                <p className="font-bold text-sm text-slate-900">{successDonation.donorName}</p>
                <p className="text-slate-500">{successDonation.donorEmail} • {successDonation.donorPhone}</p>
                {successDonation.donorPan && (
                  <p className="text-[#DC2626] font-mono font-bold text-[11px]">PAN: {successDonation.donorPan}</p>
                )}
              </div>

              <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Payment & Purpose</span>
                <p className="font-bold text-sm text-slate-900">{successDonation.campaignTitle}</p>
                <p className="text-slate-500 font-mono text-[11px]">Ref ID: {successDonation.paymentId || 'ONLINE'}</p>
                <p className="text-slate-500 text-[11px]">Status: <strong className="text-emerald-600 font-bold uppercase">{successDonation.paymentStatus || 'COMPLETED'}</strong></p>
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Total Contribution Amount:</span>
              <span className="text-xl sm:text-2xl font-black text-white">
                {formatINR(successDonation.amount)}
              </span>
            </div>

            <div className="text-[10.5px] text-slate-500 leading-relaxed border-t border-slate-200 pt-3.5 space-y-1">
              <p className="font-bold text-slate-800">Statutory Tax Benefit Disclosure:</p>
              <p>
                All donations made to Rebirth Care Trust are 50% exempt from Income Tax under Section 80G of the Indian Income Tax Act, 1961 vide Order No. <strong>{settings.compliance?.section80GRegNo || 'CIT(E)/DELHI/80G/2021-22/A/1045'}</strong>. NITI Aayog NGO Darpan UID: <strong>{settings.compliance?.ngoDarpanUid || 'DL/2020/0262802'}</strong>.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-[#DC2626] hover:bg-red-700 transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Receipt</span>
            </button>

            <Link
              to="/"
              className="px-5 py-2.5 rounded-xl font-semibold text-xs text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition shadow-2xs"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-6 sm:py-8">
      {/* ── Top Header Section ── */}
      <div className="text-center px-4 max-w-2xl mx-auto mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-red-50 text-[#DC2626] border border-red-100 mb-2 shadow-2xs">
          <Heart className="w-3 h-3 fill-[#DC2626] text-[#DC2626]" />
          <span>Official Secure Donation Desk</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Make a Life-Changing <span className="text-[#DC2626]">Contribution</span>
        </h1>

        <p className="text-xs sm:text-[13px] text-slate-500 max-w-lg mx-auto mt-1.5 leading-relaxed font-normal">
          Every rupee goes directly towards nutritious meals, school education, winter clothing, and critical pediatric healthcare with official 50% tax exemption.
        </p>
      </div>

      {/* ── Main 2-Column Donation Desk Grid ── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          {/* ════════════ LEFT COLUMN: DONATION FORM CARD ════════════ */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            {/* Top Payment Mode Tabs */}
            <div className="bg-slate-100/80 p-1 rounded-xl flex gap-1 mb-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setPaymentTab('online')}
                className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer select-none ${
                  paymentTab === 'online'
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/60 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-red-500" />
                <span>Online Payment (UPI/Cards)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentTab('bank')}
                className={`flex-1 py-2 px-2.5 rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer select-none ${
                  paymentTab === 'bank'
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/60 font-bold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building className="w-3.5 h-3.5 text-slate-500" />
                <span>Bank Transfer / UPI QR</span>
              </button>
            </div>

            {paymentTab === 'online' ? (
              /* ── Online Payment Mode Form ── */
              <form onSubmit={handleInitiatePayment} className="space-y-4">
                {/* 1. CHOOSE DONATION AMOUNT (INR) */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                    1. Choose Donation Amount (INR)
                  </label>

                  {/* 6 Preset Buttons */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 sm:gap-2">
                    {[500, 1000, 2000, 3000, 5000, 10000].map((preset) => {
                      const isSelected = amount === preset && !customAmount;
                      return (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => handlePresetClick(preset)}
                          className={`py-2 px-1.5 rounded-lg text-xs transition cursor-pointer text-center select-none font-bold ${
                            isSelected
                              ? 'border border-red-500 text-red-600 bg-red-50/30 font-extrabold shadow-2xs'
                              : 'border border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                          }`}
                        >
                          ₹{preset.toLocaleString('en-IN')}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Input */}
                  <div className="relative mt-2">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                      ₹
                    </span>
                    <input
                      type="number"
                      min="500"
                      placeholder="Or enter custom amount (Min. ₹500)"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmount(null);
                      }}
                      className="w-full pl-7 pr-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:border-red-400 text-slate-800 shadow-2xs transition"
                    />
                  </div>
                </div>

                {/* 2. DONOR DETAILS (FOR OFFICIAL TAX RECEIPT) */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    2. Donor Details (For Official Tax Receipt)
                  </label>

                  {/* Row 1: Full Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-400 shadow-2xs transition"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-slate-600">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-normal">
                          Receipt sent here
                        </span>
                      </div>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-400 shadow-2xs transition"
                      />
                    </div>
                  </div>

                  {/* Row 2: Mobile Number & PAN */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-slate-600">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-normal">
                          WhatsApp/SMS
                        </span>
                      </div>
                      <div className="flex rounded-lg border border-slate-200 bg-white overflow-hidden shadow-2xs focus-within:border-red-400 transition">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-slate-50 border-r border-slate-200 text-xs font-medium text-slate-600 shrink-0 select-none">
                          <span className="text-xs leading-none">🇮🇳</span>
                          <span>+91</span>
                        </span>
                        <input
                          type="tel"
                          required
                          value={donorPhone}
                          onChange={(e) =>
                            setDonorPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))
                          }
                          placeholder="98765 43210"
                          className="w-full px-2.5 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-medium text-slate-600">
                          PAN Card (Optional)
                        </label>
                        <span className="text-[10px] text-slate-400 font-normal">
                          For 80G Exemption
                        </span>
                      </div>
                      <input
                        type="text"
                        maxLength={10}
                        value={donorPan}
                        onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                        placeholder="AAAAA9999A"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs font-mono uppercase text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-400 shadow-2xs transition"
                      />
                    </div>
                  </div>

                  {/* Row 3: City & Donation Purpose */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Delhi, Mumbai, etc."
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-red-400 shadow-2xs transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">
                        Donation Purpose
                      </label>
                      <div className="relative">
                        <select
                          value={selectedPurpose}
                          onChange={(e) => setSelectedPurpose(e.target.value)}
                          className="w-full appearance-none px-3 pr-7 py-2 rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-red-400 shadow-2xs transition cursor-pointer"
                        >
                          <option value="General Charitable Fund">General Charitable Fund</option>
                          <option value="Elderly Winter Relief & Nutritional Care Drive">
                            Elderly Winter Relief & Nutritional Care Drive
                          </option>
                          <option value="Women Livelihood & Sewing Skill Training Center">
                            Women Livelihood & Sewing Skill Training Center
                          </option>
                          <option value="Underprivileged Children Education & Nutrition 2026">
                            Underprivileged Children Education & Nutrition 2026
                          </option>
                          <option value="Child Welfare & Free Slum Coaching">
                            Child Welfare & Free Slum Coaching
                          </option>
                          <option value="Emergency Healthcare & Pediatric Aid">
                            Emergency Healthcare & Pediatric Aid
                          </option>
                          {campaigns.map((c) => (
                            <option key={c._id} value={c.title}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Proceed Button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold py-2.5 sm:py-3 px-5 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer disabled:opacity-60 active:scale-[0.99]"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>
                    {processing
                      ? 'Processing Securely...'
                      : `Proceed to Donate ${formatINR(effectiveAmount || 1000)}`}
                  </span>
                </button>

                {/* Security Trust Micro-footer */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>256-bit SSL Secured • Official Signed 100% Tax Receipt</span>
                </div>
              </form>
            ) : (
              /* ── Direct Bank Transfer / UTR Notification Form ── */
              <form onSubmit={handleBankTransferSubmit} className="space-y-3.5">
                <div className="p-3 bg-red-50/60 border border-red-100 rounded-xl text-xs text-slate-700 space-y-0.5">
                  <div className="flex items-center gap-2 font-bold text-[#DC2626] text-xs">
                    <Building className="w-3.5 h-3.5" />
                    <span>Direct Bank Transfer Verification</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    Transfer directly to our verified accounts (shown on the right) via NEFT, RTGS, IMPS, or UPI, then enter your UTR reference below to generate your 80G receipt.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Amount Transferred (INR) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      min="500"
                      required
                      value={effectiveAmount || ''}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      placeholder="e.g. 5000"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-800"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Bank UTR / Transaction Ref No. <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      placeholder="e.g. 238918239029"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono text-xs text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      PAN Card (For 80G Tax Exemption)
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={donorPan}
                      onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                      placeholder="AAAAA9999A"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono uppercase text-xs"
                    />
                  </div>
                </div>

                {errorMsg && (
                  <div className="p-2.5 bg-red-50 text-red-700 rounded-lg text-xs flex items-center gap-2 border border-red-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition flex items-center justify-center gap-2 text-xs cursor-pointer disabled:opacity-60"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit UTR for Receipt Verification</span>
                </button>
              </form>
            )}
          </div>

          {/* ════════════ RIGHT COLUMN: CREDENTIALS & BANK CARDS ════════════ */}
          <div className="lg:col-span-5 space-y-3.5">
            {/* Card 1: Legal Trust Credentials */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="w-1 h-3.5 bg-[#DC2626] rounded-full inline-block"></span>
                <h3 className="font-bold text-slate-900 text-xs sm:text-[13px]">
                  Legal Trust Credentials
                </h3>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                Rebirth Care Trust is recognized by NITI Aayog (NGO Darpan) and registered under the Indian Trusts Act.
              </p>

              <div className="space-y-1.5 pt-0.5">
                {/* NGO Darpan UID */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-200/70 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>NGO Darpan UID</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-800 text-[11px]">
                    <span>{settings.compliance?.ngoDarpanUid || 'DL/2020/0262802'}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.compliance?.ngoDarpanUid || 'DL/2020/0262802', 'uid')}
                      className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                      title="Copy UID"
                    >
                      {copiedKey === 'uid' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Trust PAN */}
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/80 border border-slate-200/70 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Trust PAN</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-800 text-[11px]">
                    <span>{settings.compliance?.panNumber || 'AAETR1099J'}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(settings.compliance?.panNumber || 'AAETR1099J', 'pan')}
                      className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                      title="Copy PAN"
                    >
                      {copiedKey === 'pan' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Informational Callout Note */}
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-lg flex items-start gap-2 text-[10.5px] text-slate-500 leading-normal mt-1.5">
                <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  All donations are accounted for strictly towards charitable causes with computer-generated receipts provided.
                </span>
              </div>
            </div>

            {/* Card 2: Direct Bank Accounts */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-3.5 bg-[#DC2626] rounded-full inline-block"></span>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-[13px]">
                    Direct Bank Accounts
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
                  Verified Current A/c
                </span>
              </div>

              {/* Bank 1: Indian Bank */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-lg p-2.5 space-y-1 text-xs">
                <div className="flex justify-between items-center pb-0.5 border-b border-slate-200/60">
                  <span className="font-bold text-slate-800 text-[11.5px]">Indian Bank</span>
                  <span className="text-[10px] text-slate-400 font-normal">Current A/c</span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Account No:</span>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                    <span>6911724277</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('6911724277', 'ac1')}
                      className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                    >
                      {copiedKey === 'ac1' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">IFSC Code:</span>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                    <span>IDIB000Y010</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('IDIB000Y010', 'ifsc1')}
                      className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                    >
                      {copiedKey === 'ifsc1' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400">
                  Branch: Yamuna Vihar, Delhi - 110053
                </p>
              </div>

              {/* Bank 2: Axis Bank */}
              <div className="bg-slate-50/70 border border-slate-200/80 rounded-lg p-2.5 space-y-1 text-xs">
                <div className="flex justify-between items-center pb-0.5 border-b border-slate-200/60">
                  <span className="font-bold text-slate-800 text-[11.5px]">Axis Bank</span>
                  <span className="text-[10px] text-slate-400 font-normal">Current A/c</span>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Account No:</span>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                    <span>920020064952926</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('920020064952926', 'ac2')}
                      className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                    >
                      {copiedKey === 'ac2' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">IFSC Code:</span>
                  <div className="flex items-center gap-1 font-mono font-bold text-slate-800">
                    <span>UTIB0003158</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('UTIB0003158', 'ifsc2')}
                      className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                    >
                      {copiedKey === 'ifsc2' ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400">
                  Branch: Kaushambi Ghaziabad, UP - 201010
                </p>
              </div>
            </div>

            {/* Card 3: SCAN & PAY VIA UPI */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-2 text-center">
              <div className="flex items-center justify-between text-left">
                <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  SCAN & PAY VIA UPI
                </h3>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-1.5 py-0.5 rounded">
                  Instant • 0% Surcharge
                </span>
              </div>

              {/* QR Code Graphic matching screenshot */}
              <div className="p-2 bg-white rounded-xl border border-slate-200 inline-block shadow-2xs mx-auto">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi%3A%2F%2Fpay%3Fpa%3Drebirthcaretrust%40indianbk%26pn%3DRebirth%20Care%20Trust%26cu%3DINR"
                  alt="UPI QR Code - Rebirth Care Trust"
                  className="w-32 h-32 object-contain mx-auto"
                />
              </div>

              <div className="space-y-0.5">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-800">
                  <span>rebirthcaretrust@indianbk</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('rebirthcaretrust@indianbk', 'upi')}
                    className="text-slate-400 hover:text-slate-700 transition cursor-pointer p-0.5"
                    title="Copy UPI ID"
                  >
                    {copiedKey === 'upi' ? (
                      <Check className="w-3 h-3 text-emerald-600" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 pt-0.5">
                  Compatible with Google Pay, PhonePe, Paytm, BHIM & all UPI banking apps
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
