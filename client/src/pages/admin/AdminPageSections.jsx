import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  FileText,
  Save,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Building2,
  HelpCircle,
  Eye,
} from 'lucide-react';

export const AdminPageSections = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const [sections, setSections] = useState({
    initiativesBadge: settings.pageSections?.initiativesBadge || 'Our Core Initiatives',
    initiativesTitle: settings.pageSections?.initiativesTitle || 'Charitable Programs Transforming Lives',
    initiativesDesc:
      settings.pageSections?.initiativesDesc ||
      'Addressing foundational challenges in child schooling, healthcare access, women livelihood, and emergency disaster relief.',

    aboutBadge: settings.pageSections?.aboutBadge || 'ABOUT RK FOUNDATION',
    aboutTitle: settings.pageSections?.aboutTitle || 'A Dedicated Public Charitable Trust Working For The Last Mile',
    aboutParagraph1:
      settings.pageSections?.aboutParagraph1 ||
      'Founded with a profound commitment to human dignity, RK FOUNDATION is a non-profit registered public charitable trust working directly across marginalized rural settlements and urban slum clusters.',
    aboutParagraph2:
      settings.pageSections?.aboutParagraph2 ||
      'We operate transparently with certified 80G and 12A tax exemption statuses, channeling 100% of donor contributions towards impactful child education, women self-help empowerment, and emergency medical camps.',

    ctaBannerBadge: settings.pageSections?.ctaBannerBadge || '50% Tax Benefit Under Section 80G',
    ctaBannerTitle: settings.pageSections?.ctaBannerTitle || "Transform a Child's Future or Save a Life Today",
    ctaBannerDesc:
      settings.pageSections?.ctaBannerDesc ||
      'Every single rupee contributed goes towards child education, women livelihood training, or life-saving pediatric healthcare. 100% transparent and audited.',

    statutoryNotice:
      settings.pageSections?.statutoryNotice ||
      'Statutory Notice: RK FOUNDATION is registered under the Indian Trusts Act with NGO Darpan UID DL/2021/0298412 and PAN AAETR5566K. Official computer-generated receipts are issued for all contributions. Tax exemption eligibility is subject to prevailing provisions of the Income Tax Act, 1961.',
  });

  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('initiatives');

  const handleChange = (field, val) => {
    setSections({ ...sections, [field]: val });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await api.put('/settings', {
        pageSections: sections,
      });
      if (res?.success) {
        showToast('Page sections copy updated successfully!', 'success');
        refreshSettings();
      }
    } catch (err) {
      showToast(err.message || 'Failed to update page sections.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/10 text-red-500">
              <FileText className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Page Sections CMS</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Edit live headlines, section intros, mission stories, tax callout banners, and statutory legal disclaimers.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing...' : 'Publish Page Sections'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-bold">
        {[
          { id: 'initiatives', label: '1. Core Initiatives Section' },
          { id: 'about', label: '2. About Trust Section' },
          { id: 'cta', label: '3. 80G Tax Callout Banner' },
          { id: 'legal', label: '4. Statutory Notice & Legal' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl transition cursor-pointer ${
              activeTab === tab.id
                ? 'bg-red-600 text-white font-extrabold shadow-sm'
                : 'text-slate-400 hover:text-white bg-slate-900 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Core Initiatives */}
        {activeTab === 'initiatives' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFC43D]" />
              <span>Core Initiatives Section (Homepage & Programs)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Badge Pill Text
              </label>
              <input
                type="text"
                value={sections.initiativesBadge}
                onChange={(e) => handleChange('initiativesBadge', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Main Section Headline
              </label>
              <input
                type="text"
                value={sections.initiativesTitle}
                onChange={(e) => handleChange('initiativesTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subtitle / Description Paragraph
              </label>
              <textarea
                rows={3}
                value={sections.initiativesDesc}
                onChange={(e) => handleChange('initiativesDesc', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 2: About Trust */}
        {activeTab === 'about' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              <span>About RK Foundation Section</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Sub-Badge Headline
              </label>
              <input
                type="text"
                value={sections.aboutBadge}
                onChange={(e) => handleChange('aboutBadge', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Main Headline
              </label>
              <input
                type="text"
                value={sections.aboutTitle}
                onChange={(e) => handleChange('aboutTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Story Paragraph 1
              </label>
              <textarea
                rows={3}
                value={sections.aboutParagraph1}
                onChange={(e) => handleChange('aboutParagraph1', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500 leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Story Paragraph 2 (Transparency & 80G)
              </label>
              <textarea
                rows={3}
                value={sections.aboutParagraph2}
                onChange={(e) => handleChange('aboutParagraph2', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 3: 80G Tax Callout */}
        {activeTab === 'cta' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FFC43D]" />
              <span>Section 80G Tax Benefit Banner</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tax Badge Notice
              </label>
              <input
                type="text"
                value={sections.ctaBannerBadge}
                onChange={(e) => handleChange('ctaBannerBadge', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Banner Headline
              </label>
              <input
                type="text"
                value={sections.ctaBannerTitle}
                onChange={(e) => handleChange('ctaBannerTitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Banner Description
              </label>
              <textarea
                rows={3}
                value={sections.ctaBannerDesc}
                onChange={(e) => handleChange('ctaBannerDesc', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500 leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Tab 4: Statutory Legal */}
        {activeTab === 'legal' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Statutory Legal Notice (Footer & Receipt Pages)</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Statutory Disclaimer Text
              </label>
              <textarea
                rows={4}
                value={sections.statutoryNotice}
                onChange={(e) => handleChange('statutoryNotice', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500 leading-relaxed font-mono"
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

