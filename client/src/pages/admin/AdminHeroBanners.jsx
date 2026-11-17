import React, { useState, useRef, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  SlidersHorizontal,
  Plus,
  Save,
  Trash2,
  Eye,
  ChevronUp,
  ChevronDown,
  Upload,
  Link2,
  Image as ImageIcon,
  X,
  GripVertical,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';

/* ─── helpers ─── */
const uid = () => `slide-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const blankSlide = (order = 1) => ({
  _id: uid(),
  badgeText: 'NITI AAYOG DARPAN RECOGNIZED NGO • UID DL/2020/0262802',
  headlinePrefix: 'Restoring Hope, Empowering',
  headlineHighlight: 'Children & Women',
  headlineSuffix: 'in Delhi NCR',
  floatingQuote: '"We make a living by what we get, but we make a life by what we give."',
  subtitle:
    'Rebirth Care Trust is a non-profit organization providing education, nutrition, and emergency healthcare to underprivileged children, women in distress, and destitute elderly in marginalized communities.',
  imageUrl: '',
  primaryBtnText: 'Donate Online',
  primaryBtnLink: '/donate',
  secondaryBtnText: 'Explore Our Programs',
  secondaryBtnLink: '/our-programs',
  stat1Label: 'Meals & Care Kits Distributed',
  stat2Label: 'Supported with Care',
  stat3Label: 'Real Stories Real Change',
  isActive: true,
  order,
});

/* Migrate old banner format → new multi-field format */
const migrateSlide = (b, idx) => ({
  _id: b._id || uid(),
  badgeText: b.badgeText || 'NITI AAYOG DARPAN RECOGNIZED NGO',
  headlinePrefix: b.headlinePrefix || b.title || '',
  headlineHighlight: b.headlineHighlight || '',
  headlineSuffix: b.headlineSuffix || '',
  floatingQuote: b.floatingQuote || '',
  subtitle: b.subtitle || '',
  imageUrl: b.imageUrl || '',
  primaryBtnText: b.primaryBtnText || 'Donate Now',
  primaryBtnLink: b.primaryBtnLink || '/donate',
  secondaryBtnText: b.secondaryBtnText || 'Explore Our Programs',
  secondaryBtnLink: b.secondaryBtnLink || '/our-programs',
  stat1Label: b.stat1Label || 'Meals & Care Kits Distributed',
  stat2Label: b.stat2Label || 'Supported with Care',
  stat3Label: b.stat3Label || 'Real Stories Real Change',
  isActive: b.isActive ?? true,
  order: b.order ?? idx + 1,
});

export const AdminHeroBanners = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const initBanners = () => {
    const raw = settings.heroBanners;
    if (raw && raw.length > 0) return raw.map(migrateSlide);
    return [blankSlide(1)];
  };

  const [banners, setBanners] = useState(initBanners);
  const [expandedIdx, setExpandedIdx] = useState(0);
  const [saving, setSaving] = useState(false);
  const [previewIdx, setPreviewIdx] = useState(null); // null = no full-screen preview
  const [uploadingIdx, setUploadingIdx] = useState(null);
  const fileInputRefs = useRef({});

  /* ── update field on specific slide ── */
  const updateSlide = (idx, field, val) => {
    setBanners(prev => {
      const updated = [...prev];
      updated[idx] = { ...updated[idx], [field]: val };
      return updated;
    });
  };

  /* ── add new slide ── */
  const handleAddSlide = () => {
    const newSlide = blankSlide(banners.length + 1);
    setBanners(prev => [...prev, newSlide]);
    setExpandedIdx(banners.length);
    showToast('New slide added. Fill in details and save.', 'info');
  };

  /* ── delete slide ── */
  const handleDelete = (idx) => {
    if (banners.length <= 1) {
      showToast('At least one hero banner slide is required.', 'error');
      return;
    }
    if (!window.confirm('Delete this slide? This action cannot be undone until you save.')) return;
    setBanners(prev => prev.filter((_, i) => i !== idx));
    setExpandedIdx(Math.max(0, expandedIdx > idx ? expandedIdx - 1 : expandedIdx));
    showToast('Slide removed. Click Save & Publish to confirm.', 'info');
  };

  /* ── move slide up / down ── */
  const moveSlide = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= banners.length) return;
    setBanners(prev => {
      const arr = [...prev];
      [arr[idx], arr[target]] = [arr[target], arr[idx]];
      return arr.map((s, i) => ({ ...s, order: i + 1 }));
    });
    setExpandedIdx(target);
  };

  /* ── local image upload ── */
  const handleFileUpload = async (idx, file) => {
    if (!file) return;
    setUploadingIdx(idx);
    try {
      const form = new FormData();
      form.append('image', file);
      const res = await api.post('/upload', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.imageUrl) {
        updateSlide(idx, 'imageUrl', res.imageUrl);
        showToast('Image uploaded successfully!', 'success');
      } else {
        showToast('Upload failed. Try again.', 'error');
      }
    } catch (err) {
      showToast(err.message || 'Upload failed.', 'error');
    } finally {
      setUploadingIdx(null);
    }
  };

  /* ── save all ── */
  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const sanitizedBanners = banners.map((b) => {
        const item = { ...b };
        if (typeof item._id === 'string' && item._id.startsWith('slide-')) {
          delete item._id;
        }
        return item;
      });

      const payload = {
        heroBanners: sanitizedBanners,
        hero: {
          badge: banners[0]?.badgeText || '',
          heading: `${banners[0]?.headlinePrefix || ''} ${banners[0]?.headlineHighlight || ''} ${banners[0]?.headlineSuffix || ''}`.trim(),
          subheading: banners[0]?.subtitle || '',
          ctaPrimaryText: banners[0]?.primaryBtnText || 'Donate Now',
          ctaPrimaryLink: banners[0]?.primaryBtnLink || '/donate',
          ctaSecondaryText: banners[0]?.secondaryBtnText || 'Explore Our Programs',
          ctaSecondaryLink: banners[0]?.secondaryBtnLink || '/our-programs',
        },
      };
      const res = await api.put('/settings', payload);
      if (res?.success) {
        showToast('Hero Banners saved and published!', 'success');
        if (res.settings?.heroBanners?.length) {
          setBanners(res.settings.heroBanners.map(migrateSlide));
        }
        refreshSettings();
      }
    } catch (err) {
      showToast(err.message || 'Failed to save.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const activeSlide = banners[expandedIdx] || banners[0] || {};

  return (
    <div className="space-y-0">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 mb-6 border-b border-slate-200 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 flex items-center gap-2">
            Homepage Hero Banners
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-600 border border-red-200">
              {banners.length} Slides
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage rotating hero slide images, headlines, call-to-action buttons, and local image uploads displayed on the homepage.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition"
          >
            <Eye className="w-3.5 h-3.5" />
            Preview
          </a>
          <button
            onClick={handleAddSlide}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-sm transition cursor-pointer disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* ── Instruction bar ── */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 mb-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <GripVertical className="w-3.5 h-3.5 text-slate-400" />
          <span>Slides automatically cycle on the homepage hero cross-fade slider. Use arrows to reorder.</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setBanners(prev => prev.map((_, i) => ({ ...prev[i] })))}
            className="font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Expand All
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => setExpandedIdx(-1)}
            className="font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* ── Slide Accordion List ── */}
      <div className="space-y-3">
        {banners.map((slide, idx) => {
          const isExpanded = expandedIdx === idx;
          const isUploading = uploadingIdx === idx;
          const headlinePreview = [slide.headlinePrefix, slide.headlineHighlight, slide.headlineSuffix]
            .filter(Boolean).join(' ');

          return (
            <div
              key={slide._id}
              className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                isExpanded ? 'border-red-300 shadow-sm shadow-red-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Slide header row */}
              <div
                className="flex items-center gap-3 px-4 py-3 cursor-pointer select-none"
                onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
              >
                {/* Slide # badge */}
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 text-[11px] font-black flex items-center justify-center shrink-0">
                  #{idx + 1}
                </span>

                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  {slide.imageUrl ? (
                    <img src={slide.imageUrl} alt="thumb" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-slate-400" />
                    </div>
                  )}
                </div>

                {/* Title summary */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {slide.headlinePrefix && <span>{slide.headlinePrefix} </span>}
                    {slide.headlineHighlight && (
                      <span className="text-[#DC2626]">{slide.headlineHighlight}</span>
                    )}
                    {slide.headlineSuffix && <span> {slide.headlineSuffix}</span>}
                    {!headlinePreview && <span className="text-slate-400 italic">Untitled Slide</span>}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">{slide.badgeText}</p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => moveSlide(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition cursor-pointer"
                    title="Move Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Delete Slide"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveSlide(idx, 1)}
                    disabled={idx === banners.length - 1}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 transition cursor-pointer"
                    title="Move Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Expand arrow */}
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                />
              </div>

              {/* Expanded form */}
              {isExpanded && (
                <div className="border-t border-slate-100 px-5 py-5 space-y-6">

                  {/* ── SECTION: Image ── */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold border border-red-100">
                        <ImageIcon className="w-3 h-3" />
                        HERO SLIDE BACKGROUND IMAGE *
                      </span>
                      <span className="text-[11px] text-slate-400 ml-auto">Recommended: 1920×1080 (16:9), Max 5MB</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Current image preview */}
                      <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-video flex items-center justify-center">
                        {slide.imageUrl ? (
                          <>
                            <img
                              src={slide.imageUrl}
                              alt="Hero preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
                              <p className="text-[10px] text-white truncate">{slide.imageUrl}</p>
                            </div>
                            <button
                              onClick={() => updateSlide(idx, 'imageUrl', '')}
                              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <div className="text-center p-4">
                            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                            <p className="text-xs text-slate-400">No image selected</p>
                          </div>
                        )}
                      </div>

                      {/* Upload options */}
                      <div className="space-y-3">
                        {/* Option 1: Local upload */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                          <p className="text-xs font-bold text-slate-700 mb-0.5">Option 1: Upload Image from Local Device</p>
                          <p className="text-[11px] text-slate-500 mb-3">
                            Select an image directly from your local computer files (JPG, PNG, WEBP, GIF).
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            ref={el => { fileInputRefs.current[idx] = el; }}
                            onChange={e => handleFileUpload(idx, e.target.files[0])}
                            className="hidden"
                          />
                          <button
                            onClick={() => fileInputRefs.current[idx]?.click()}
                            disabled={isUploading}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-60"
                          >
                            {isUploading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Upload className="w-3.5 h-3.5" />
                            )}
                            {isUploading ? 'Uploading...' : 'Choose Local Image File'}
                          </button>
                        </div>

                        {/* Option 2: URL */}
                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                          <p className="text-xs font-bold text-slate-700 mb-2">
                            <Link2 className="w-3 h-3 inline mr-1" />
                            Option 2: Image URL / Web Address
                          </p>
                          <input
                            type="text"
                            value={slide.imageUrl || ''}
                            onChange={e => updateSlide(idx, 'imageUrl', e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 transition"
                            placeholder="https://images.unsplash.com/photo-..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── SECTION: Headline & Copy ── */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">HEADLINE & SLIDE COPY</h4>

                    {/* Badge */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Top Badge Pill Text
                      </label>
                      <input
                        type="text"
                        value={slide.badgeText || ''}
                        onChange={e => updateSlide(idx, 'badgeText', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 transition"
                        placeholder="NITI AAYOG DARPAN RECOGNIZED NGO • UID DL/2020/0262802"
                      />
                    </div>

                    {/* Headline split: prefix + highlight + suffix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Headline Prefix <span className="text-slate-400 font-normal">(Before Red Highlight)</span>
                        </label>
                        <input
                          type="text"
                          value={slide.headlinePrefix || ''}
                          onChange={e => updateSlide(idx, 'headlinePrefix', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 transition"
                          placeholder="Restoring Hope, Empowering"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#DC2626] mb-1">
                          Headline Highlight <span className="font-normal">(Brand Red Text)</span>
                        </label>
                        <input
                          type="text"
                          value={slide.headlineHighlight || ''}
                          onChange={e => updateSlide(idx, 'headlineHighlight', e.target.value)}
                          className="w-full bg-white border border-red-200 rounded-lg px-3.5 py-2.5 text-xs text-[#DC2626] font-bold placeholder-red-300 focus:outline-none focus:border-red-500 transition"
                          placeholder="Children & Women"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Headline Suffix <span className="text-slate-400 font-normal">(After Red Highlight)</span>
                        </label>
                        <input
                          type="text"
                          value={slide.headlineSuffix || ''}
                          onChange={e => updateSlide(idx, 'headlineSuffix', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 transition"
                          placeholder="in Delhi NCR"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Floating Inspirational Quote
                        </label>
                        <input
                          type="text"
                          value={slide.floatingQuote || ''}
                          onChange={e => updateSlide(idx, 'floatingQuote', e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 transition italic"
                          placeholder='"We make a living by what we get..."'
                        />
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Subtitle Description Copy
                      </label>
                      <textarea
                        rows={3}
                        value={slide.subtitle || ''}
                        onChange={e => updateSlide(idx, 'subtitle', e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-red-400 transition resize-y"
                        placeholder="Mission statement displayed below the headline..."
                      />
                    </div>
                  </div>

                  {/* ── SECTION: CTA Buttons ── */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">CALL TO ACTION (CTA) BUTTONS</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Primary CTA */}
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                        <p className="text-[11px] font-bold text-slate-800 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] inline-block"></span>
                          Primary Red Button
                        </p>
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Button Label</label>
                          <input
                            type="text"
                            value={slide.primaryBtnText || ''}
                            onChange={e => updateSlide(idx, 'primaryBtnText', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-red-400 transition"
                            placeholder="Donate Online"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Target Link</label>
                          <input
                            type="text"
                            value={slide.primaryBtnLink || ''}
                            onChange={e => updateSlide(idx, 'primaryBtnLink', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-red-400 transition"
                            placeholder="/donate"
                          />
                        </div>
                      </div>

                      {/* Secondary CTA */}
                      <div className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5">
                        <p className="text-[11px] font-bold text-blue-700 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                          Secondary Outline Button
                        </p>
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Button Label</label>
                          <input
                            type="text"
                            value={slide.secondaryBtnText || ''}
                            onChange={e => updateSlide(idx, 'secondaryBtnText', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-400 transition"
                            placeholder="Explore Our Programs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-slate-500 mb-1">Target Link</label>
                          <input
                            type="text"
                            value={slide.secondaryBtnLink || ''}
                            onChange={e => updateSlide(idx, 'secondaryBtnLink', e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-blue-400 transition"
                            placeholder="/our-programs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ── SECTION: Stats Labels ── */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">BOTTOM STATS STRIP LABELS</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { field: 'stat1Label', placeholder: 'Meals & Care Kits Distributed' },
                        { field: 'stat2Label', placeholder: 'Supported with Care' },
                        { field: 'stat3Label', placeholder: 'Real Stories Real Change' },
                      ].map(({ field, placeholder }, si) => (
                        <div key={field}>
                          <label className="block text-[11px] text-slate-500 mb-1">Stat {si + 1} Label</label>
                          <input
                            type="text"
                            value={slide[field] || ''}
                            onChange={e => updateSlide(idx, field, e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-red-400 transition"
                            placeholder={placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ── Active toggle ── */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                      <div
                        onClick={() => updateSlide(idx, 'isActive', !slide.isActive)}
                        className={`relative w-10 h-5 rounded-full transition-colors cursor-pointer ${
                          slide.isActive ? 'bg-emerald-500' : 'bg-slate-300'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
                          slide.isActive ? 'left-5' : 'left-0.5'
                        }`} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">
                        {slide.isActive ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Slide Active on Live Homepage
                          </span>
                        ) : (
                          <span className="text-slate-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> Slide Hidden (Inactive)
                          </span>
                        )}
                      </span>
                    </label>

                    <button
                      onClick={() => setPreviewIdx(idx)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Preview Slide
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Bottom action bar ── */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
          <span>{banners.length} Slides • Configure rotating banners for homepage</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleAddSlide}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </button>
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-sm transition cursor-pointer disabled:opacity-60"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Publishing...' : 'Save & Publish'}
          </button>
        </div>
      </div>

      {/* ── Full-screen slide preview modal ── */}
      {previewIdx !== null && (() => {
        const s = banners[previewIdx] || {};
        return (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
              {/* Close */}
              <button
                onClick={() => setPreviewIdx(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero preview */}
              <div
                className="relative min-h-[480px] flex items-end p-10"
                style={{
                  background: s.imageUrl
                    ? `linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.3) 100%)`
                    : 'linear-gradient(135deg, #1a1a2e, #16213e)',
                }}
              >
                {s.imageUrl && (
                  <img
                    src={s.imageUrl}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-cover -z-10 opacity-60"
                  />
                )}

                <div className="relative z-10 max-w-xl space-y-4">
                  {s.badgeText && (
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/15 text-white border border-white/30 backdrop-blur-sm">
                      {s.badgeText}
                    </span>
                  )}
                  <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                    {s.headlinePrefix && <span>{s.headlinePrefix} </span>}
                    {s.headlineHighlight && <span className="text-[#DC2626]">{s.headlineHighlight}</span>}
                    {s.headlineSuffix && <span> {s.headlineSuffix}</span>}
                  </h1>
                  {s.subtitle && (
                    <p className="text-sm text-white/80 leading-relaxed">{s.subtitle}</p>
                  )}
                  <div className="flex items-center gap-3 pt-2 flex-wrap">
                    {s.primaryBtnText && (
                      <span className="px-5 py-2.5 rounded-full bg-[#DC2626] text-white text-sm font-bold shadow-lg">
                        {s.primaryBtnText}
                      </span>
                    )}
                    {s.secondaryBtnText && (
                      <span className="px-5 py-2.5 rounded-full border border-white/40 text-white text-sm font-semibold backdrop-blur-sm">
                        {s.secondaryBtnText}
                      </span>
                    )}
                  </div>
                  {/* Stats strip */}
                  {(s.stat1Label || s.stat2Label || s.stat3Label) && (
                    <div className="flex flex-wrap gap-4 pt-2 border-t border-white/20 mt-2">
                      {[s.stat1Label, s.stat2Label, s.stat3Label].filter(Boolean).map((l, i) => (
                        <span key={i} className="text-[11px] text-white/60 font-medium">{l}</span>
                      ))}
                    </div>
                  )}
                </div>

                {s.floatingQuote && (
                  <div className="absolute top-6 right-6 max-w-xs bg-black/40 backdrop-blur-sm border border-white/15 rounded-xl p-3 text-xs italic text-white/80">
                    {s.floatingQuote}
                  </div>
                )}
              </div>

              <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">Slide #{previewIdx + 1} Preview — Desktop Simulation</span>
                <button
                  onClick={() => setPreviewIdx(null)}
                  className="text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
