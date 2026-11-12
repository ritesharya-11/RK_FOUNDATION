import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Save, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export const AdminSettings = () => {
  const { settings, setSettings, refreshSettings, showToast } = useWebsite();

  const [formData, setFormData] = useState({
    siteName: settings.siteName || '',
    tagline: settings.tagline || '',
    missionStatement: settings.missionStatement || '',
    contact: { ...(settings.contact || {}) },
    compliance: { ...(settings.compliance || {}) },
    socialLinks: { ...(settings.socialLinks || {}) },
    donationSettings: { ...(settings.donationSettings || {}) },
    announcementBar: { ...(settings.announcementBar || {}) },
    hero: { ...(settings.hero || {}) },
    impactStats: { ...(settings.impactStats || {}) },
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await api.put('/settings', formData);
      if (res?.success) {
        showToast('Website settings and CMS content updated successfully!', 'success');
        refreshSettings();
      }
    } catch (err) {
      showToast(err.message || 'Failed to update settings.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">Website CMS & Settings</h2>
          <p className="text-xs text-slate-500">
            Dynamically manage branding, legal numbers, contact details, hero copy, and statistics.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-[#0F172A] bg-[#F59E0B] hover:bg-[#D97706] shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50 text-[#0F172A]"
        >
          <Save className="w-4 h-4 text-[#0F172A]" />
          <span>{saving ? 'Saving Changes...' : 'Save Settings'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 text-xs font-bold">
        {[
          { id: 'general', label: 'General & Branding' },
          { id: 'contact', label: 'Contact & Office' },
          { id: 'compliance', label: '80G & Legal Compliance' },
          { id: 'banking', label: 'Bank & UPI Details' },
          { id: 'hero', label: 'Homepage Hero & Banner' },
          { id: 'stats', label: 'Impact Statistics' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-[#FFC43D] text-[#0F172A] font-black shadow-sm'
                : 'text-slate-400 hover:text-white bg-white border border-slate-200/80 shadow-xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: General & Branding */}
        {activeTab === 'general' && (
          <div className="bg-white border border-slate-200/80 shadow-xs p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Identity & Mission Statement
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Foundation Official Name
                </label>
                <input
                  type="text"
                  value={formData.siteName}
                  onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tagline / Motto
                </label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Core Mission Statement
              </label>
              <textarea
                rows={3}
                value={formData.missionStatement}
                onChange={(e) => setFormData({ ...formData, missionStatement: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Contact & Office */}
        {activeTab === 'contact' && (
          <div className="bg-white border border-slate-200/80 shadow-xs p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Contact Helplines & Office Addresses
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Helpline Phone
                </label>
                <input
                  type="text"
                  value={formData.contact?.phone || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, phone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alternate Phone
                </label>
                <input
                  type="text"
                  value={formData.contact?.altPhone || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, altPhone: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  General Inquiry Email
                </label>
                <input
                  type="email"
                  value={formData.contact?.email || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, email: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Donations Support Email
                </label>
                <input
                  type="email"
                  value={formData.contact?.donorEmail || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, donorEmail: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Physical Address
              </label>
              <textarea
                rows={2}
                value={formData.contact?.address || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    contact: { ...formData.contact, address: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Legal & 80G Compliance */}
        {activeTab === 'compliance' && (
          <div className="bg-white border border-slate-200/80 shadow-xs p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Statutory Credentials (80G, 12A, NGO Darpan)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Section 80G Order Number
                </label>
                <input
                  type="text"
                  value={formData.compliance?.section80GRegNo || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, section80GRegNo: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  NGO Darpan UID
                </label>
                <input
                  type="text"
                  value={formData.compliance?.ngoDarpanUid || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, ngoDarpanUid: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Permanent Account Number (PAN)
                </label>
                <input
                  type="text"
                  value={formData.compliance?.panNumber || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, panNumber: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Trust Deed Registration No
                </label>
                <input
                  type="text"
                  value={formData.compliance?.trustRegistrationNo || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      compliance: { ...formData.compliance, trustRegistrationNo: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Banking & UPI */}
        {activeTab === 'banking' && (
          <div className="bg-white border border-slate-200/80 shadow-xs p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Bank Account & Offline Transfer Instructions
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bank Account Beneficiary Name
                </label>
                <input
                  type="text"
                  value={formData.donationSettings?.bankAccountName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      donationSettings: {
                        ...formData.donationSettings,
                        bankAccountName: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={formData.donationSettings?.bankName || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      donationSettings: {
                        ...formData.donationSettings,
                        bankName: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.donationSettings?.accountNumber || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      donationSettings: {
                        ...formData.donationSettings,
                        accountNumber: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={formData.donationSettings?.ifscCode || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      donationSettings: {
                        ...formData.donationSettings,
                        ifscCode: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono uppercase focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official UPI ID (VPA)
              </label>
              <input
                type="text"
                value={formData.donationSettings?.upiId || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    donationSettings: {
                      ...formData.donationSettings,
                      upiId: e.target.value,
                    },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            </div>
          </div>
        )}

        {/* Tab 5: Homepage Hero & Banner */}
        {activeTab === 'hero' && (
          <div className="bg-white border border-slate-200/80 shadow-xs p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Homepage Hero & Announcement Bar
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hero Main Headline
              </label>
              <input
                type="text"
                value={formData.hero?.heading || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, heading: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hero Subheading Description
              </label>
              <textarea
                rows={3}
                value={formData.hero?.subheading || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: { ...formData.hero, subheading: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            </div>

            <div className="pt-2 border-t border-slate-800">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Top Announcement Bar Message
              </label>
              <input
                type="text"
                value={formData.announcementBar?.text || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    announcementBar: { ...formData.announcementBar, text: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
              />
            </div>
          </div>
        )}

        {/* Tab 6: Impact Statistics */}
        {activeTab === 'stats' && (
          <div className="bg-white border border-slate-200/80 shadow-xs p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider">
              Live Impact Statistics Counter Numbers
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lives Impacted
                </label>
                <input
                  type="number"
                  value={formData.impactStats?.livesImpacted || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      impactStats: {
                        ...formData.impactStats,
                        livesImpacted: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Children Educated
                </label>
                <input
                  type="number"
                  value={formData.impactStats?.childrenEducated || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      impactStats: {
                        ...formData.impactStats,
                        childrenEducated: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Women Empowered
                </label>
                <input
                  type="number"
                  value={formData.impactStats?.womenEmpowered || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      impactStats: {
                        ...formData.impactStats,
                        womenEmpowered: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Meals Served
                </label>
                <input
                  type="number"
                  value={formData.impactStats?.mealsServed || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      impactStats: {
                        ...formData.impactStats,
                        mealsServed: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Health Camps Conducted
                </label>
                <input
                  type="number"
                  value={formData.impactStats?.healthCampsConducted || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      impactStats: {
                        ...formData.impactStats,
                        healthCampsConducted: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Active Volunteers
                </label>
                <input
                  type="number"
                  value={formData.impactStats?.activeVolunteers || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      impactStats: {
                        ...formData.impactStats,
                        activeVolunteers: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

