import React, { useState, useEffect, useRef } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Save,
  Building2,
  Phone,
  Landmark,
  QrCode,
  Share2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Upload,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';

export const AdminSettings = () => {
  const { settings, refreshSettings, showToast } = useWebsite();
  const fileInputRef = useRef(null);

  // Form State initialized with settings or fallback defaults from screenshot
  const [formData, setFormData] = useState({
    siteName: 'Rebirth Care Trust',
    tagline: 'Education for Underprivileged Children, Women Empowerment & Community Healthcare',
    missionStatement: '',
    compliance: {
      panNumber: 'AAETR1099J',
      ngoDarpanUid: 'DL/2020/0262802',
      trustRegistrationNo: 'TRUST/DL/2021/887412',
      section80GRegNo: 'CIT(E)/DELHI/80G/2021-22/A/1045',
      section12ARegNo: 'CIT(E)/DELHI/12A/2021-22/A/2088',
      taxExemptionNote:
        'All donations made to the foundation are 50% tax exempt under Section 80G of the Indian Income Tax Act, 1961.',
    },
    contact: {
      phone: '+91-9311878362',
      email: 'contact@rebirthcaretrust.org',
      altEmail: 'info@rebirthcaretrust.org',
      donorEmail: 'donate@rebirthcaretrust.org',
      address: 'E-4/202 Nand Nagri, Delhi - 110093',
      branchAddress: '1104, Harsharan Niwas, Shri Ram Nagar, New Delhi - 110032',
      officeHours: 'Mon - Sat: 9:00 AM - 6:30 PM (IST)',
    },
    donationSettings: {
      bankAccountName: 'Rebirth Care Trust',
      bankName: 'Indian Bank',
      accountNumber: '505001234567',
      ifscCode: 'IDIB000N123',
      branchName: 'Nand Nagri Branch, Delhi',
      secondaryBank: {
        bankAccountName: 'Rebirth Care Trust',
        bankName: 'Axis Bank',
        accountNumber: '921020012345678',
        ifscCode: 'UTIB0001234',
        branchName: 'Connaught Place Branch, New Delhi',
        isActive: true,
      },
      upiId: 'rebirthcaretrust@indianbk',
      qrCodeImage: '/uploads/2cd52fa93d56753fdbaa24f072e57ee3.png',
      enableOnlineGateway: true,
      minimumDonationAmount: 500,
      defaultPreset: 2500,
    },
    socialLinks: {
      facebook: 'https://www.facebook.com/RebirthCareTrust',
      twitter: 'https://twitter.com/CareRebirth',
      instagram: 'https://www.instagram.com/rebirthcaretrust4/',
      youtube: 'https://www.youtube.com/channel/UC7Wmeu7CyiH8jvdVpBrmHhA',
    },
  });

  // Accordion Expand/Collapse State
  const [expandedSections, setExpandedSections] = useState({
    legal: true,
    communication: true,
    banking: true,
    upi: true,
    social: true,
    compliance: false,
  });

  const [saving, setSaving] = useState(false);
  const [uploadingQr, setUploadingQr] = useState(false);

  // Sync state from backend settings once loaded
  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData((prev) => ({
        ...prev,
        siteName: settings.siteName || prev.siteName,
        tagline: settings.tagline || prev.tagline,
        missionStatement: settings.missionStatement || prev.missionStatement,
        compliance: {
          ...prev.compliance,
          ...(settings.compliance || {}),
        },
        contact: {
          ...prev.contact,
          ...(settings.contact || {}),
        },
        donationSettings: {
          ...prev.donationSettings,
          ...(settings.donationSettings || {}),
          secondaryBank: {
            ...prev.donationSettings.secondaryBank,
            ...((settings.donationSettings && settings.donationSettings.secondaryBank) || {}),
          },
        },
        socialLinks: {
          ...prev.socialLinks,
          ...(settings.socialLinks || {}),
        },
      }));
    }
  }, [settings]);

  // Toggle Single Section
  const toggleSection = (sec) => {
    setExpandedSections((prev) => ({ ...prev, [sec]: !prev[sec] }));
  };

  // Expand / Collapse All
  const setAllSections = (val) => {
    setExpandedSections({
      legal: val,
      communication: val,
      banking: val,
      upi: val,
      social: val,
      compliance: val,
    });
  };

  // Jump to Section Handler
  const handleJumpToSection = (e) => {
    const secId = e.target.value;
    if (!secId) return;
    setExpandedSections((prev) => ({ ...prev, [secId]: true }));
    const el = document.getElementById(`section-${secId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle Save
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);

    try {
      const res = await api.put('/settings', formData);
      if (res?.success) {
        showToast('Trust settings and configuration updated successfully!', 'success');
        refreshSettings();
      } else {
        showToast('Settings saved locally', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update trust settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Handle Local QR File Upload
  const handleQrUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingQr(true);
    const data = new FormData();
    data.append('image', file);

    try {
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res?.url) {
        setFormData((prev) => ({
          ...prev,
          donationSettings: {
            ...prev.donationSettings,
            qrCodeImage: res.url,
          },
        }));
        showToast('Official UPI QR code uploaded successfully!', 'success');
      }
    } catch (err) {
      // Local fallback preview using FileReader if backend endpoint is unavailable
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        setFormData((prev) => ({
          ...prev,
          donationSettings: {
            ...prev.donationSettings,
            qrCodeImage: loadEvt.target.result,
          },
        }));
        showToast('QR code preview updated locally', 'info');
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingQr(false);
    }
  };

  return (
    <div className="space-y-4 w-full min-w-0 pb-16">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span>Admin</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">Trust Settings</span>
      </div>

      {/* ── Top Header Card (Matches Screenshot Exactly) ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Trust Settings & Configuration
            </h1>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-slate-50 text-slate-700 border border-slate-200">
              PAN: {formData.compliance.panNumber || 'AAETR1099J'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage legal registration credentials, banking channels, official contact points, and donation compliance.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs transition cursor-pointer disabled:opacity-50 shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Trust Settings'}</span>
        </button>
      </div>

      {/* ── Quick Navigation & Accordion Control Bar ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl px-5 py-3 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-slate-500">Jump to Section:</span>
          <div className="relative">
            <select
              onChange={handleJumpToSection}
              defaultValue=""
              className="appearance-none pl-3 pr-8 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs cursor-pointer text-xs"
            >
              <option value="" disabled>
                Select Section...
              </option>
              <option value="legal">1. Legal Registration & Identity</option>
              <option value="communication">2. Communication & Physical Offices</option>
              <option value="banking">3. Direct Bank Transfer Accounts</option>
              <option value="upi">4. UPI & Online Donation Gateway</option>
              <option value="social">5. Official Social Media Profiles</option>
              <option value="compliance">6. 80G & 12A Compliance Clauses</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <button
            type="button"
            onClick={() => setAllSections(true)}
            className="hover:text-slate-900 hover:underline cursor-pointer"
          >
            Expand All
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setAllSections(false)}
            className="hover:text-slate-900 hover:underline cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* ── Form Body with 5 Primary Sections ── */}
      <form onSubmit={handleSave} className="space-y-4">
        {/* ── SECTION 1: Legal Registration & Identity ── */}
        <div
          id="section-legal"
          className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection('legal')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  1. Legal Registration & Identity
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Trust legal name, mission motto, PAN number, and NITI Aayog NGO Darpan UID.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <span>{expandedSections.legal ? 'Expanded' : 'Collapsed'}</span>
              {expandedSections.legal ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {/* Section Content */}
          {expandedSections.legal && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Trust Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.siteName}
                    onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                    placeholder="e.g. Rebirth Care Trust"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Tagline / Mission Motto</label>
                  <input
                    type="text"
                    value={formData.tagline}
                    onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                    placeholder="e.g. Education for Underprivileged Children, Women Empowerment & Community Healthcare"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Trust PAN Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.compliance.panNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        compliance: { ...formData.compliance, panNumber: e.target.value.toUpperCase() },
                      })
                    }
                    placeholder="e.g. AAETR1099J"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-mono font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">NITI Aayog NGO Darpan UID</label>
                  <input
                    type="text"
                    value={formData.compliance.ngoDarpanUid}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        compliance: { ...formData.compliance, ngoDarpanUid: e.target.value },
                      })
                    }
                    placeholder="e.g. DL/2020/0262802"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── SECTION 2: Communication & Physical Offices ── */}
        <div
          id="section-communication"
          className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection('communication')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  2. Communication & Physical Offices
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Helpline telephone, official emails, registered headquarters, and project centers.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <span>{expandedSections.communication ? 'Expanded' : 'Collapsed'}</span>
              {expandedSections.communication ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {/* Section Content */}
          {expandedSections.communication && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-4">
              {/* Row 1: 3-column contact grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Primary Helpline / Phone *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contact.phone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, phone: e.target.value },
                      })
                    }
                    placeholder="e.g. +91-9311878362"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Primary Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                    placeholder="e.g. contact@rebirthcaretrust.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Alternate / Info Email
                  </label>
                  <input
                    type="email"
                    value={formData.contact.altEmail || formData.contact.donorEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, altEmail: e.target.value, donorEmail: e.target.value },
                      })
                    }
                    placeholder="e.g. info@rebirthcaretrust.org"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>
              </div>

              {/* Row 2: 2-column physical addresses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Registered Headquarters Address (Line 1) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.contact.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, address: e.target.value },
                      })
                    }
                    placeholder="e.g. E-4/202 Nand Nagri, Delhi - 110093"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Branch / Project Center Address (Line 2)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.contact.branchAddress || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, branchAddress: e.target.value },
                      })
                    }
                    placeholder="e.g. 1104, Harsharan Niwas, Shri Ram Nagar, New Delhi - 110032"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs resize-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── SECTION 3: Direct Bank Transfer Accounts (NEFT / RTGS) ── */}
        <div
          id="section-banking"
          className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection('banking')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  3. Direct Bank Transfer Accounts (NEFT / RTGS)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official trust current accounts with Indian Bank and Axis Bank for direct remittances.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <span>{expandedSections.banking ? 'Expanded' : 'Collapsed'}</span>
              {expandedSections.banking ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {/* Section Content: Two side-by-side Bank Cards */}
          {expandedSections.banking && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {/* Bank Card 1: Primary Indian Bank */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-800">
                      Primary Account: {formData.donationSettings.bankName || 'Indian Bank'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Beneficiary Account Name
                    </label>
                    <input
                      type="text"
                      value={formData.donationSettings.bankAccountName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          donationSettings: {
                            ...formData.donationSettings,
                            bankAccountName: e.target.value,
                          },
                        })
                      }
                      placeholder="e.g. Rebirth Care Trust"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={formData.donationSettings.accountNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              accountNumber: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. 505001234567"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        value={formData.donationSettings.ifscCode}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              ifscCode: e.target.value.toUpperCase(),
                            },
                          })
                        }
                        placeholder="e.g. IDIB000N123"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={formData.donationSettings.bankName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              bankName: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. Indian Bank"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Branch Name</label>
                      <input
                        type="text"
                        value={formData.donationSettings.branchName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              branchName: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. Nand Nagri Branch, Delhi"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Card 2: Secondary Axis Bank */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="font-extrabold text-sm text-slate-800">
                      Secondary Account:{' '}
                      {formData.donationSettings.secondaryBank?.bankName || 'Axis Bank'}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      Active
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Beneficiary Account Name
                    </label>
                    <input
                      type="text"
                      value={formData.donationSettings.secondaryBank?.bankAccountName || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          donationSettings: {
                            ...formData.donationSettings,
                            secondaryBank: {
                              ...formData.donationSettings.secondaryBank,
                              bankAccountName: e.target.value,
                            },
                          },
                        })
                      }
                      placeholder="e.g. Rebirth Care Trust"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Account Number</label>
                      <input
                        type="text"
                        value={formData.donationSettings.secondaryBank?.accountNumber || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              secondaryBank: {
                                ...formData.donationSettings.secondaryBank,
                                accountNumber: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="e.g. 921020012345678"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">IFSC Code</label>
                      <input
                        type="text"
                        value={formData.donationSettings.secondaryBank?.ifscCode || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              secondaryBank: {
                                ...formData.donationSettings.secondaryBank,
                                ifscCode: e.target.value.toUpperCase(),
                              },
                            },
                          })
                        }
                        placeholder="e.g. UTIB0001234"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-mono font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 uppercase"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={formData.donationSettings.secondaryBank?.bankName || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              secondaryBank: {
                                ...formData.donationSettings.secondaryBank,
                                bankName: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="e.g. Axis Bank"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Branch Name</label>
                      <input
                        type="text"
                        value={formData.donationSettings.secondaryBank?.branchName || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              secondaryBank: {
                                ...formData.donationSettings.secondaryBank,
                                branchName: e.target.value,
                              },
                            },
                          })
                        }
                        placeholder="e.g. Connaught Place Branch, New Delhi"
                        className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── SECTION 4: UPI & Online Donation Gateway ── */}
        <div
          id="section-upi"
          className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection('upi')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 border border-purple-100 flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  4. UPI & Online Donation Gateway
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official trust UPI VPA address, QR image upload from local PC, and gateway activation.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <span>{expandedSections.upi ? 'Expanded' : 'Collapsed'}</span>
              {expandedSections.upi ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {/* Section Content: 2 Columns (Left Form, Right QR Preview) */}
          {expandedSections.upi && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left 7 Cols: Form Inputs */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Official Trust UPI VPA / Handle *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.donationSettings.upiId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          donationSettings: {
                            ...formData.donationSettings,
                            upiId: e.target.value.toLowerCase(),
                          },
                        })
                      }
                      placeholder="e.g. rebirthcaretrust@indianbk"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                    />
                  </div>

                  {/* QR Image Upload Box */}
                  <div className="p-4 rounded-xl bg-slate-50/70 border border-slate-200 space-y-2.5">
                    <div>
                      <span className="block text-xs font-bold text-slate-800">
                        Official UPI QR Code Image
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Upload your bank's QR code image file directly from your local computer, or provide an image link.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleQrUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploadingQr}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F172A] hover:bg-black shadow-xs transition cursor-pointer disabled:opacity-60"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingQr ? 'Uploading QR...' : 'Upload QR from Computer'}</span>
                      </button>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Or enter QR Image URL:
                      </label>
                      <input
                        type="text"
                        value={formData.donationSettings.qrCodeImage || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              qrCodeImage: e.target.value,
                            },
                          })
                        }
                        placeholder="e.g. /uploads/2cd52fa93d56753fdbaa24f072e57ee3.png"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  </div>

                  {/* Enable Gateway Checkbox Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="enableOnlineGateway"
                      checked={formData.donationSettings.enableOnlineGateway ?? true}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          donationSettings: {
                            ...formData.donationSettings,
                            enableOnlineGateway: e.target.checked,
                          },
                        })
                      }
                      className="mt-0.5 w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
                    />
                    <label htmlFor="enableOnlineGateway" className="text-xs cursor-pointer select-none">
                      <span className="font-bold text-slate-800 block">
                        Enable Online Gateway (Razorpay/Cards/NetBanking) on Public Donation Portal
                      </span>
                      <span className="text-[11px] text-slate-500 block mt-0.5">
                        When disabled, only direct bank NEFT/RTGS accounts and UPI QR codes are presented to donors.
                      </span>
                    </label>
                  </div>

                  {/* Minimum Donation Amount */}
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="block text-xs font-bold text-slate-800">
                        Minimum Donation Amount (INR ₹)
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Sets the minimum permissible donation amount across the homepage donation input and donation portal. Default is ₹100.
                      </p>
                    </div>

                    <div className="relative w-32 shrink-0">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="10"
                        step="50"
                        value={formData.donationSettings.minimumDonationAmount || 500}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            donationSettings: {
                              ...formData.donationSettings,
                              minimumDonationAmount: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-900 font-bold text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-right"
                      />
                    </div>
                  </div>
                </div>

                {/* Right 5 Cols: QR Code Live Preview Card */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-4 block">
                    QR CODE PREVIEW
                  </span>

                  <div className="w-52 h-52 p-3 bg-white border border-slate-200 rounded-2xl shadow-sm flex items-center justify-center overflow-hidden">
                    {formData.donationSettings.qrCodeImage ? (
                      <img
                        src={formData.donationSettings.qrCodeImage}
                        alt="Trust UPI QR Code"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(
                            formData.donationSettings.upiId || 'rebirthcaretrust@indianbk'
                          )}&pn=${encodeURIComponent(formData.siteName || 'Rebirth Care Trust')}&cu=INR`;
                        }}
                      />
                    ) : (
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=${encodeURIComponent(
                          formData.donationSettings.upiId || 'rebirthcaretrust@indianbk'
                        )}&pn=${encodeURIComponent(formData.siteName || 'Rebirth Care Trust')}&cu=INR`}
                        alt="Generated UPI QR Code"
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <p className="mt-3 font-mono text-xs font-semibold text-slate-600 truncate max-w-xs">
                    {formData.donationSettings.upiId || 'rebirthcaretrust@indianbk'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── SECTION 5: Official Social Media Profiles ── */}
        <div
          id="section-social"
          className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection('social')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 border border-pink-100 flex items-center justify-center shrink-0">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  5. Official Social Media Profiles
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  External links to trust community profiles on Facebook, Instagram, Twitter/X, and YouTube.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <span>{expandedSections.social ? 'Expanded' : 'Collapsed'}</span>
              {expandedSections.social ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {/* Section Content: 2x2 Grid matching screenshot */}
          {expandedSections.social && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Facebook Page URL
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.facebook || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, facebook: e.target.value },
                      })
                    }
                    placeholder="https://www.facebook.com/RebirthCareTrust"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Twitter / X URL
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.twitter || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                      })
                    }
                    placeholder="https://twitter.com/CareRebirth"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.instagram || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value },
                      })
                    }
                    placeholder="https://www.instagram.com/rebirthcaretrust4/"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    YouTube Channel URL
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks.youtube || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                      })
                    }
                    placeholder="https://www.youtube.com/channel/UC7Wmeu7CyiH8jvdVpBrmHhA"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── SECTION 6: 80G & 12A Compliance Clauses ── */}
        <div
          id="section-compliance"
          className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden transition-all"
        >
          {/* Section Header */}
          <button
            type="button"
            onClick={() => toggleSection('compliance')}
            className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-slate-50/50 transition cursor-pointer select-none"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  6. 80G & 12A Tax Exemption Compliance
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Statutory 80G order number, 12A registration, and donor tax exemption declaration text.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
              <span>{expandedSections.compliance ? 'Expanded' : 'Collapsed'}</span>
              {expandedSections.compliance ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </div>
          </button>

          {/* Section Content */}
          {expandedSections.compliance && (
            <div className="p-5 sm:p-6 border-t border-slate-100 bg-white space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Section 80G Registration Order No
                  </label>
                  <input
                    type="text"
                    value={formData.compliance.section80GRegNo || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        compliance: { ...formData.compliance, section80GRegNo: e.target.value },
                      })
                    }
                    placeholder="e.g. CIT(E)/DELHI/80G/2021-22/A/1045"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Section 12A Registration Order No
                  </label>
                  <input
                    type="text"
                    value={formData.compliance.section12ARegNo || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        compliance: { ...formData.compliance, section12ARegNo: e.target.value },
                      })
                    }
                    placeholder="e.g. CIT(E)/DELHI/12A/2021-22/A/2088"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Official 80G Tax Exemption Note
                </label>
                <textarea
                  rows={2}
                  value={formData.compliance.taxExemptionNote || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, taxExemptionNote: e.target.value },
                    })
                  }
                  placeholder="All contributions made are eligible for 50% tax exemption under Section 80G..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-2xs resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* ── Sticky Bottom Save Bar (Exact Match with Screenshot) ── */}
        <div className="sticky bottom-4 z-20 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Click <strong className="text-slate-900">Save Trust Settings</strong> to apply your configuration changes across the public website.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-sm transition cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Trust Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
