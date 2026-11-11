import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  SlidersHorizontal,
  Plus,
  Save,
  Trash2,
  Eye,
  CheckCircle2,
  Sparkles,
  Image as ImageIcon,
  ExternalLink,
} from 'lucide-react';

export const AdminHeroBanners = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const initialBanners = settings.heroBanners?.length > 0 ? settings.heroBanners : [
    {
      _id: 'banner-1',
      badgeText: settings.hero?.badge || '50% Tax Deduction (Section 80G)',
      title: settings.hero?.heading || 'Helping Children Grow With Care',
      subtitle: settings.hero?.subheading || 'We are a children-focused charity organization dedicated to improving young lives through education, healthcare, protection, and community support.',
      imageUrl: '/hero-children.jpg',
      primaryBtnText: settings.hero?.ctaPrimaryText || 'Donate Now',
      primaryBtnLink: settings.hero?.ctaPrimaryLink || '/donate',
      isActive: true,
      order: 1,
    },
  ];

  const [banners, setBanners] = useState(initialBanners);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [saving, setSaving] = useState(false);

  const activeBanner = banners[selectedIdx] || banners[0] || {};

  const handleUpdateActive = (field, val) => {
    const updated = [...banners];
    updated[selectedIdx] = { ...updated[selectedIdx], [field]: val };
    setBanners(updated);
  };

  const handleAddSlide = () => {
    const newSlide = {
      _id: `slide-${Date.now()}`,
      badgeText: '50% Tax Exemption Under Section 80G',
      title: 'Protecting Vulnerable Children & Families',
      subtitle: 'Join us on the ground across rural villages and urban slums to deliver nutrition, healthcare, and schooling.',
      imageUrl: '/hero-children.jpg',
      primaryBtnText: 'Donate Now',
      primaryBtnLink: '/donate',
      isActive: true,
      order: banners.length + 1,
    };
    setBanners([...banners, newSlide]);
    setSelectedIdx(banners.length);
    showToast('New slide created! Edit details below and save.', 'info');
  };

  const handleDeleteSlide = (idx) => {
    if (banners.length <= 1) {
      showToast('At least one hero banner is required.', 'error');
      return;
    }
    const updated = banners.filter((_, i) => i !== idx);
    setBanners(updated);
    setSelectedIdx(Math.max(0, idx - 1));
    showToast('Slide removed. Click Save Changes to commit.', 'info');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // Synchronize both heroBanners array and main hero settings
      const payload = {
        heroBanners: banners,
        hero: {
          badge: banners[0]?.badgeText || '',
          heading: banners[0]?.title || '',
          subheading: banners[0]?.subtitle || '',
          ctaPrimaryText: banners[0]?.primaryBtnText || 'Donate Now',
          ctaPrimaryLink: banners[0]?.primaryBtnLink || '/donate',
        },
      };

      const res = await api.put('/settings', payload);
      if (res?.success) {
        showToast('Hero Banners updated successfully!', 'success');
        refreshSettings();
      }
    } catch (err) {
      showToast(err.message || 'Failed to save hero banners.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/10 text-red-500">
              <SlidersHorizontal className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Hero Banners Management</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure homepage hero slides, bold typography, tax badges, background imagery, and direct CTA actions.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleAddSlide}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Slide</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Save & Publish Banners'}</span>
          </button>
        </div>
      </div>

      {/* Slide Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {banners.map((b, i) => (
          <button
            key={b._id || i}
            onClick={() => setSelectedIdx(i)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 cursor-pointer ${
              selectedIdx === i
                ? 'bg-red-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            <span>Slide #{i + 1}</span>
            {b.isActive && (
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFC43D]" />
              <span>Editing Slide #{selectedIdx + 1}</span>
            </h3>

            {banners.length > 1 && (
              <button
                onClick={() => handleDeleteSlide(selectedIdx)}
                className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Slide</span>
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Badge / Legal Pill Notice
              </label>
              <input
                type="text"
                value={activeBanner.badgeText || ''}
                onChange={(e) => handleUpdateActive('badgeText', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                placeholder="e.g. 50% Tax Deduction (Section 80G)"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Hero Main Headline (Bold Title)
              </label>
              <textarea
                rows={2}
                value={activeBanner.title || ''}
                onChange={(e) => handleUpdateActive('title', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-bold"
                placeholder="e.g. Helping Children Grow With Care"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subheadline / Mission Statement Paragraph
              </label>
              <textarea
                rows={3}
                value={activeBanner.subtitle || ''}
                onChange={(e) => handleUpdateActive('subtitle', e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500"
                placeholder="Brief explanatory description displayed below the headline..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Background Cover Image URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={activeBanner.imageUrl || ''}
                  onChange={(e) => handleUpdateActive('imageUrl', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  placeholder="/hero-children.jpg or https://images.unsplash.com/..."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={activeBanner.primaryBtnText || ''}
                  onChange={(e) => handleUpdateActive('primaryBtnText', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  placeholder="Donate Now"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Primary Button Destination URL
                </label>
                <input
                  type="text"
                  value={activeBanner.primaryBtnLink || ''}
                  onChange={(e) => handleUpdateActive('primaryBtnLink', e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  placeholder="/donate"
                />
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={activeBanner.isActive ?? true}
                  onChange={(e) => handleUpdateActive('isActive', e.target.checked)}
                  className="w-4 h-4 rounded text-red-600 bg-slate-950 border-slate-800 focus:ring-0"
                />
                <span className="text-xs font-medium text-slate-300">
                  Slide is Active on Live Homepage
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Live Visual Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>Real-time Live Preview</span>
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              Desktop Simulation
            </span>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-[#0B0D17] min-h-[380px] flex flex-col justify-end p-6 shadow-2xl">
            {/* Background image preview with overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeBanner.imageUrl || '/hero-children.jpg'}
                alt="Banner Preview"
                className="w-full h-full object-cover opacity-35"
                onError={(e) => {
                  e.target.src = '/hero-children.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D17] via-[#0B0D17]/70 to-[#0B0D17]/40" />
            </div>

            <div className="relative z-10 space-y-3.5">
              {activeBanner.badgeText && (
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold bg-[#FFC43D]/20 text-[#FFC43D] border border-[#FFC43D]/30 backdrop-blur-xs">
                  {activeBanner.badgeText}
                </span>
              )}

              <h1 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeBanner.title || 'Helping Children Grow With Care'}
              </h1>

              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                {activeBanner.subtitle}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-[#0B0D17] text-white font-semibold text-xs px-4 py-2 rounded-full border border-white/20 shadow-lg">
                  <span>{activeBanner.primaryBtnText || 'Donate Now'}</span>
                  <span className="w-5 h-5 rounded-full bg-[#FFC43D] text-[#0B0D17] flex items-center justify-center font-black text-xs">
                    ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

