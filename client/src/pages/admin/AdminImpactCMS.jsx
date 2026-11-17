import React, { useState, useEffect, useRef } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Award,
  FileText,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Plus,
  Search,
  ChevronDown,
  MapPin,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Upload,
  Loader2,
  Image as ImageIcon,
} from 'lucide-react';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

const CATEGORIES_LIST = [
  'Hunger & Nutrition Relief',
  'Healthcare & Medical Relief',
  'Child Literacy & Education',
  'Clothing & Dignity',
  'Women Tailoring & Livelihood',
  'Elderly Winter Warmth',
  'Clean Water & Sanitation',
  'Disaster Relief & Floods',
  'General Community Work',
  'Dalit Upliftment & Rights',
  'Specialized Medical Surgeries',
];

const PRESET_IMAGES = [
  { label: 'Food Aid & Distribution', url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800' },
  { label: 'Healthcare & Emergency', url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800' },
  { label: 'Women Empowerment', url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800' },
  { label: 'Women Dignity & Care', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800' },
  { label: 'Child Health Support', url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800' },
  { label: 'Garments & Relief Aid', url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800' },
];

const INITIAL_STORIES = [
  {
    _id: 'story-1',
    title: '10,000+ Nutritious Meals Served in Marginalized Slum Belts',
    slug: '10000-nutritious-meals-served',
    category: 'Hunger & Nutrition Relief',
    outcomeMetric: '10,000+ Nutritious Meals',
    location: 'Nand Nagri, Yamuna Vihar & Seelampur, Delhi NCR',
    timeframe: '2021 – 2024 Continuous',
    pdfDossierUrl: '/documents/Rebirth_Food_Relief_Audit_Report.pdf',
    reportTitle: 'Nutrition Relief Field Verification & Food Distribution Audit Dossier',
    verifiedBy: 'Rebirth Care Trust Operations & Compliance Cell',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
    summary: 'Continuous feeding drives for migrant daily-wage laborers, homeless individuals, and malnourished children across East and North-East Delhi slums.',
    narrative: `Zero-Hunger Direct Intervention
Between 2021 and 2024, Rebirth Care Trust deployed targeted daily cooked-meal and dry-ration relief squads across North-East Delhi's dense informal settlements including Nand Nagri, Yamuna Vihar, and Seemapuri. High poverty density, inflation, and lack of consistent daily-wage work severely impacted children and the elderly in these communities.

Field Operations & Nutritional Standards
Our volunteer squads partnered with certified community kitchens to prepare balanced meals containing adequate proteins, fresh lentils, fortified rice, and seasonal greens. Distribution camps were systematically scheduled at community chowks, construction worker clusters, and outside government health clinics.

Documented Verification & Transparency
Every feeding camp was logged with timestamped photography, guardian signatures, and ration slip reconciliations overseen by our trust field officers. 100% of donor funding was audited and matched against procured food stocks.`,
    status: 'published',
    isActive: true,
    displayOrder: 1,
  },
  {
    _id: 'story-2',
    title: 'Saree & Warm Garments Distribution for 1,500+ Destitute Women & Seniors',
    slug: 'saree-garments-distribution-women',
    category: 'Clothing & Dignity',
    outcomeMetric: '1,500+ Women & Elderly',
    location: 'Yamuna Khadar & Mustafabad Settlements, Delhi',
    timeframe: '2022 – 2024 Winter Relief',
    pdfDossierUrl: '/reports/garments-distribution-audit.pdf',
    reportTitle: 'Women & Senior Citizen Dignity Relief Audit Dossier',
    verifiedBy: 'Rebirth Care Trust Operations & Compliance Cell',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    summary: 'Seasonal winter warmth and dignified clothing support for elderly widows and marginalized women.',
    narrative: `Winter Warmth Intervention
Emergency blanket and clothing distribution for over 1,500 vulnerable women and senior citizens living in temporary riverbed dwellings and unauthorized colonies.`,
    status: 'published',
    isActive: true,
    displayOrder: 2,
  },
  {
    _id: 'story-3',
    title: 'Emergency Medical & NICU Treatment Sponsorship for 45+ Critical Infants',
    slug: 'emergency-medical-nicu-sponsorship',
    category: 'Healthcare & NICU Support',
    outcomeMetric: '₹4.5L+ Hospital Care Sponsored',
    location: 'GTB Hospital, AIIMS & Kalawati Saran, Delhi',
    timeframe: '2023 – 2024 Continuous',
    pdfDossierUrl: '/reports/nicu-treatment-audit.pdf',
    reportTitle: 'Pediatric & Neonatal Intensive Care Support Audit Report',
    verifiedBy: 'Rebirth Care Trust Operations & Compliance Cell',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
    summary: 'Life-saving surgical interventions, phototherapy, and premature infant stabilization care.',
    narrative: `Pediatric Emergency Care
Provided emergency life-saving ICU support, specialized diagnostics, and postoperative recovery funds for infants born to impoverished daily-wage families.`,
    status: 'published',
    isActive: true,
    displayOrder: 3,
  },
  {
    _id: 'story-4',
    title: 'Street-to-School Remedial Child Bridge Centers',
    slug: 'street-to-school-remedial-education',
    category: 'Child Literacy & Education',
    outcomeMetric: '250+ Children Enrolled',
    location: 'Nand Nagri & Gokalpuri, Delhi NCR',
    timeframe: '2022 – Ongoing Bridge Centers',
    pdfDossierUrl: '/reports/remedial-education-audit.pdf',
    reportTitle: 'Child Education & Bridge School Mainstreaming Dossier',
    verifiedBy: 'Rebirth Care Trust Operations & Compliance Cell',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
    summary: 'Mainstreaming children of waste-pickers and migrant daily-wagers into formal public schools.',
    narrative: `Bridge Education Program
Established non-formal community study centers that provide daily remedial tutoring, school enrollment assistance, stationery kits, and mid-day nutritional snacks.`,
    status: 'published',
    isActive: true,
    displayOrder: 4,
  },
];

export const AdminImpactCMS = () => {
  const { settings, refreshSettings, showToast } = useWebsite();
  const [stories, setStories] = useState(() => {
    try {
      const stored = localStorage.getItem('rk_impact_cases_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_STORIES;
  });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingStory, setEditingStory] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const fileImgRef = useRef(null);
  const filePdfRef = useRef(null);

  const emptyForm = {
    title: '',
    slug: '',
    category: 'Hunger & Nutrition Relief',
    outcomeMetric: '',
    location: '',
    timeframe: '2021 – 2024 Continuous',
    coverImage: '',
    summary: '',
    narrative: '',
    pdfDossierUrl: '',
    reportTitle: '',
    verifiedBy: 'Rebirth Care Trust Operations & Compliance Cell',
    status: 'published',
    isActive: true,
    displayOrder: 1,
  };
  const [form, setForm] = useState(emptyForm);

  // Sync settings when available
  useEffect(() => {
    if (settings?.impactStories && settings.impactStories.length > 0) {
      setStories(settings.impactStories);
      try {
        localStorage.setItem('rk_impact_cases_list', JSON.stringify(settings.impactStories));
      } catch {
        // ignore
      }
    }
  }, [settings?.impactStories]);

  const persistStories = async (newStories) => {
    setStories(newStories);
    try {
      localStorage.setItem('rk_impact_cases_list', JSON.stringify(newStories));
    } catch {
      // ignore
    }

    try {
      const sanitized = newStories.map((s) => {
        const item = { ...s };
        if (typeof item._id === 'string' && item._id.startsWith('story-')) {
          delete item._id;
        }
        return item;
      });
      const res = await api.put('/settings', {
        impactStories: sanitized,
      });
      if (res?.settings?.impactStories?.length) {
        setStories(res.settings.impactStories);
      }
      refreshSettings();
    } catch (err) {
      console.warn('API sync warning:', err.message);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshSettings();
      showToast('Impact stories refreshed!', 'info');
    } catch {
      showToast('Error refreshing data', 'error');
    } finally {
      setRefreshing(false);
    }
  };

  // Filter logic
  const filtered = stories.filter((item) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      item.title?.toLowerCase().includes(q) ||
      item.category?.toLowerCase().includes(q) ||
      item.location?.toLowerCase().includes(q) ||
      item.slug?.toLowerCase().includes(q) ||
      item.outcomeMetric?.toLowerCase().includes(q);

    const matchCategory = !filterCategory || item.category === filterCategory;

    let matchStatus = true;
    if (filterStatus === 'published') {
      matchStatus = item.status === 'published' || item.isActive;
    } else if (filterStatus === 'draft') {
      matchStatus = item.status === 'draft' || !item.isActive;
    }

    return matchSearch && matchCategory && matchStatus;
  });

  // KPI calculations
  const totalAudited = stories.filter((s) => Boolean(s.pdfDossierUrl)).length;
  const uniqueCategories = [...new Set(stories.map((s) => s.category).filter(Boolean))];
  const activeCount = stories.filter((s) => s.status === 'published' || s.isActive).length;

  const handleOpenAdd = () => {
    setEditingStory(null);
    setForm({
      ...emptyForm,
      displayOrder: stories.length + 1,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (item) => {
    setEditingStory(item);
    setForm({
      title: item.title || '',
      slug: item.slug || slugify(item.title || ''),
      category: item.category || 'Hunger & Nutrition Relief',
      outcomeMetric: item.outcomeMetric || '',
      location: item.location || '',
      timeframe: item.timeframe || '2021 – 2024 Continuous',
      coverImage: item.coverImage || '',
      summary: item.summary || '',
      narrative: item.narrative || item.story || '',
      pdfDossierUrl: item.pdfDossierUrl || '',
      reportTitle: item.reportTitle || 'Nutrition Relief Field Verification & Food Distribution Audit Dossier',
      verifiedBy: item.verifiedBy || 'Rebirth Care Trust Operations & Compliance Cell',
      status: item.status || 'published',
      isActive: item.isActive ?? true,
      displayOrder: item.displayOrder || item.order || 1,
    });
    setShowModal(true);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImg(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.imageUrl) {
        setForm((f) => ({ ...f, coverImage: res.imageUrl }));
        showToast('Cover photo uploaded!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImg(false);
    }
  };

  const handlePdfUpload = async (file) => {
    if (!file) return;
    setUploadingPdf(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const res = await api.post('/upload', fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.imageUrl) {
        setForm((f) => ({ ...f, pdfDossierUrl: res.imageUrl }));
        showToast('PDF audit report uploaded!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      showToast('Title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      let updatedStories;
      const targetSlug = form.slug || slugify(form.title);

      if (editingStory) {
        updatedStories = stories.map((s) =>
          (s._id === editingStory._id || s.slug === editingStory.slug)
            ? { ...s, ...form, slug: targetSlug, story: form.narrative || s.story || '' }
            : s
        );
      } else {
        const newEntry = {
          _id: `story-${Date.now()}`,
          ...form,
          slug: targetSlug,
          story: form.narrative || '',
        };
        updatedStories = [newEntry, ...stories];
      }

      await persistStories(updatedStories);
      showToast(editingStory ? 'Story updated successfully!' : 'New completed case published!', 'success');
      setShowModal(false);
    } catch (err) {
      showToast(err.message || 'Failed to save completed case', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (target) => {
    if (!window.confirm(`Delete "${target.title}"?`)) return;

    try {
      const updatedStories = stories.filter(
        (s) => s._id !== target._id && s.slug !== target.slug
      );
      await persistStories(updatedStories);
      showToast('Case story deleted.', 'info');
    } catch (err) {
      showToast(err.message || 'Failed to delete case', 'error');
    }
  };

  return (
    <div
      className="space-y-6 w-full min-w-0 font-sans -m-4 sm:-m-8 p-4 sm:p-8 min-h-screen"
      style={{
        backgroundColor: '#F8FAFC',
        backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* ── Top Bar: Breadcrumb & User Info matching screenshot ── */}
      <div className="flex items-center justify-between pb-1">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <span className="text-slate-400">Admin</span>
          <span className="text-slate-300">›</span>
          <span className="text-slate-800 font-semibold">Our Impact CMS</span>
        </nav>

        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#DC2626] text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
            T
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold text-slate-900 leading-tight">
              Trust Administrator
            </span>
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">
              SUPER ADMIN
            </span>
          </div>
        </div>
      </div>

      {/* ── Page Header (Title + Subtitle + Action Buttons) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Our Impact & Completed Cases CMS
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Administer verified outreach recoveries, outcome metrics, and publish official PDF audit reports.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Completed Case</span>
          </button>
        </div>
      </div>

      {/* ── Top 4 KPI Metric Cards (Matches Screenshot Format) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* TOTAL IMPACT STORIES */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL IMPACT STORIES</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {stories.length} <span className="text-xs font-semibold text-slate-400">cases</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Award className="w-5 h-5 text-[#DC2626]" />
          </div>
        </div>

        {/* VERIFIED PDF DOSSIERS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">VERIFIED PDF DOSSIERS</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {totalAudited} <span className="text-xs font-semibold text-slate-400">audited</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <FileText className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        {/* FOCUS SECTORS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">FOCUS SECTORS</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {uniqueCategories.length} <span className="text-xs font-semibold text-slate-400">pillars</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* ACTIVE PUBLISHED */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE PUBLISHED</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {activeCount} <span className="text-xs font-semibold text-slate-400">live</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* ── Search and Filter Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search completed stories by title, category, location, or slug..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 shadow-xs transition"
          />
        </div>

        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-xs cursor-pointer transition min-w-[150px]"
          >
            <option value="">All Categories</option>
            {uniqueCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-xs cursor-pointer transition min-w-[150px]"
          >
            <option value="all">All Statuses ({stories.length})</option>
            <option value="published">Published ({activeCount})</option>
            <option value="draft">Draft ({stories.length - activeCount})</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Table Layout matching screenshot ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto custom-admin-scrollbar">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CASE STORY
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CATEGORY & OUTCOME
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  LOCATION
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  PDF AUDIT DOSSIER
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right sticky right-0 z-20 bg-white border-b border-slate-100 shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center border-b border-slate-100">
                    <Loader2 className="w-6 h-6 text-slate-400 animate-spin mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Loading impact stories...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center border-b border-slate-100">
                    <Award className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No completed cases found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id || item.slug} className="group hover:bg-slate-50/80 transition-colors">
                    {/* CASE STORY: Thumbnail + Title + Route */}
                    <td className="px-5 py-3.5 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {item.coverImage ? (
                            <img
                              src={item.coverImage}
                              alt={item.title}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-slate-300" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                            {item.title}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
                            /our-success/{item.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* CATEGORY & OUTCOME */}
                    <td className="px-5 py-3.5 whitespace-nowrap border-b border-slate-100">
                      <p className="font-semibold text-slate-800 text-xs">
                        {item.category}
                      </p>
                      <p className="font-bold text-emerald-600 text-xs mt-0.5">
                        {item.outcomeMetric || 'Impact Documented'}
                      </p>
                    </td>

                    {/* LOCATION */}
                    <td className="px-5 py-3.5 max-w-[130px] sm:max-w-[170px] border-b border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{item.location || 'Delhi NCR'}</span>
                      </div>
                    </td>

                    {/* PDF AUDIT DOSSIER */}
                    <td className="px-5 py-3.5 whitespace-nowrap border-b border-slate-100">
                      {item.pdfDossierUrl ? (
                        <a
                          href={item.pdfDossierUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Open PDF Document"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition shadow-2xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-red-500" />
                          <span>PDF Dossier</span>
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">No File Attached</span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td className="px-5 py-3.5 whitespace-nowrap border-b border-slate-100">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase ${
                          item.status === 'published' || item.isActive
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {item.status === 'published' || item.isActive ? 'PUBLISHED' : 'DRAFT'}
                      </span>
                    </td>

                    {/* ACTIONS (Sticky right column so it never gets hidden) */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap border-b border-slate-100 sticky right-0 z-10 bg-white group-hover:bg-slate-50/80 transition-colors shadow-[-8px_0_12px_-4px_rgba(0,0,0,0.06)]">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <a
                          href={`/our-success/${item.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          title="Public View"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                          title="Edit Case Story"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDelete(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Case Story"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Summary Footer */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-400">
              Showing {filtered.length} of {stories.length} completed impact stories
            </span>
            {(search || filterCategory || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilterCategory('');
                  setFilterStatus('all');
                }}
                className="text-[11px] text-[#DC2626] hover:underline font-semibold cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Add / Edit Completed Case Modal (Matches user reference format) ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-100">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#DC2626] border border-red-100 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#DC2626]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingStory ? 'Edit Completed Impact Case' : 'Add Completed Impact Case'}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Ref #{form.slug || 'new-case-story'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="px-6 py-5 overflow-y-auto space-y-4 text-xs flex-1 custom-admin-scrollbar">
              {/* Case Story Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Case Story Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setForm((prev) => ({
                      ...prev,
                      title: val,
                      slug: prev.slug || slugify(val),
                    }));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition font-bold text-sm bg-white"
                  placeholder="10,000+ Nutritious Meals Served in Marginalized Slum Belts"
                />
              </div>

              {/* URL Slug & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    URL Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition font-mono text-xs bg-white"
                    placeholder="10000-nutritious-meals-served"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition text-xs bg-white cursor-pointer"
                  >
                    {CATEGORIES_LIST.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 3 Columns: Outcome Stat, Location / Ward, Completed Date / Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Key Outcome Stat <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.outcomeMetric}
                    onChange={(e) => setForm({ ...form, outcomeMetric: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition text-xs font-semibold bg-white"
                    placeholder="10,000+ Nutritious Meals"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Location / Ward
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition text-xs bg-white"
                    placeholder="Nand Nagri, Yamuna Vihar & Se..."
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Completed Date / Status
                  </label>
                  <input
                    type="text"
                    value={form.timeframe}
                    onChange={(e) => setForm({ ...form, timeframe: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition text-xs bg-white"
                    placeholder="2021 – 2024 Continuous"
                  />
                </div>
              </div>

              {/* Cover Image & Visual Documentation Container Box */}
              <div className="border border-slate-200/90 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs">
                      Cover Image & Visual Documentation <span className="text-red-500">*</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Upload from local file manager or choose from public media assets.
                    </p>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileImgRef}
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileImgRef.current?.click()}
                      disabled={uploadingImg}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#DC2626] bg-white border border-[#DC2626]/40 hover:bg-red-50 hover:border-[#DC2626] transition shadow-2xs cursor-pointer disabled:opacity-60 shrink-0"
                    >
                      {uploadingImg ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DC2626]" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 text-[#DC2626]" />
                      )}
                      Upload Image from File Manager
                    </button>
                  </div>
                </div>

                {/* Active image path display & preview */}
                <div className="border border-slate-200 rounded-xl p-3 bg-white flex items-center gap-3">
                  <div className="w-14 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                    {form.coverImage ? (
                      <img
                        src={form.coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }}
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <input
                      type="text"
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                      placeholder="/uploads/image.jpg or https://..."
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-red-400 bg-slate-50/50"
                    />
                    <p className="text-[10px] text-slate-400 truncate mt-1 font-mono">
                      Active public path: {form.coverImage || '/uploads/7557d65598b47e28fb5e7f8174af1b2d.jpg'}
                    </p>
                  </div>
                  {form.coverImage && (
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, coverImage: '' })}
                      className="p-1 rounded-md text-slate-400 hover:text-red-600 transition cursor-pointer"
                      title="Clear image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Presets */}
                <div>
                  <p className="text-[11px] text-slate-500 font-medium mb-1.5">
                    Or select a public preset image:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: preset.url })}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition cursor-pointer ${
                          form.coverImage === preset.url
                            ? 'bg-red-50 text-[#DC2626] border-red-200 font-semibold'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Short Summary (Shows on Public Cards) */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Short Summary (Shows on Public Cards) <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition text-xs resize-y bg-white"
                  placeholder="Continuous feeding drives for migrant daily-wage laborers, homeless individuals, and malnourished..."
                />
              </div>

              {/* Detailed Narrative & Field Documentation */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Detailed Narrative & Field Documentation / Story Content
                </label>
                <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:border-red-400 transition bg-white">
                  <textarea
                    rows={6}
                    value={form.narrative}
                    onChange={(e) => setForm({ ...form, narrative: e.target.value })}
                    className="w-full p-3.5 text-xs text-slate-800 focus:outline-none resize-y leading-relaxed font-sans"
                    placeholder="Enter full case story narrative, operational background, and verified impact documentation..."
                  />
                  <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400">
                    <span className="font-mono">Formatted HTML Output</span>
                    <span>
                      {form.narrative?.trim() ? form.narrative.trim().split(/\s+/).length : 0} words • {form.narrative ? form.narrative.length : 0} characters
                    </span>
                  </div>
                </div>
              </div>

              {/* Official PDF Report & Documentation Dossier Box */}
              <div className="border border-slate-200/90 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-50 text-red-500 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">
                        Official PDF Report & Documentation Dossier
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Upload statutory audit reports or field verification PDFs directly to the public folder.
                      </p>
                    </div>
                  </div>
                  <div>
                    <input
                      type="file"
                      accept=".pdf,image/*"
                      ref={filePdfRef}
                      onChange={(e) => handlePdfUpload(e.target.files[0])}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => filePdfRef.current?.click()}
                      disabled={uploadingPdf}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[#DC2626] bg-white border border-[#DC2626]/40 hover:bg-red-50 hover:border-[#DC2626] transition shadow-2xs cursor-pointer disabled:opacity-60 shrink-0"
                    >
                      {uploadingPdf ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-[#DC2626]" />
                      ) : (
                        <Upload className="w-3.5 h-3.5 text-[#DC2626]" />
                      )}
                      Upload PDF from Local File Manager
                    </button>
                  </div>
                </div>

                {/* PDF Attached Preview Card */}
                {form.pdfDossierUrl && (
                  <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-emerald-900 text-xs truncate">
                          {form.reportTitle || 'Nutrition Relief Field Verification & Food Distribution Audit Dossier'}
                        </p>
                        <p className="text-[10px] text-emerald-700/80 truncate font-mono mt-0.5">
                          {form.pdfDossierUrl} • 1.8 MB (PDF Document)
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={form.pdfDossierUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50 transition shadow-2xs"
                      >
                        Preview PDF
                      </a>
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, pdfDossierUrl: '' })}
                        className="p-1 rounded-md text-emerald-700 hover:text-red-600 transition cursor-pointer"
                        title="Remove PDF"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* PDF URL Input */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    PDF Document URL / File Link
                  </label>
                  <input
                    type="text"
                    value={form.pdfDossierUrl}
                    onChange={(e) => setForm({ ...form, pdfDossierUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs font-mono focus:outline-none focus:border-red-400"
                    placeholder="/documents/Rebirth_Food_Relief_Audit_Report.pdf"
                  />
                </div>

                {/* Report Title & Verified By */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Report Title
                    </label>
                    <input
                      type="text"
                      value={form.reportTitle}
                      onChange={(e) => setForm({ ...form, reportTitle: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-red-400"
                      placeholder="Nutrition Relief Field Verification & Food Distrib..."
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Verified By Authority
                    </label>
                    <input
                      type="text"
                      value={form.verifiedBy}
                      onChange={(e) => setForm({ ...form, verifiedBy: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-red-400"
                      placeholder="Rebirth Care Trust Operations & Compliance Ce..."
                    />
                  </div>
                </div>
              </div>

              {/* Publication Status & Display Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Publication Status</label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                        isActive: e.target.value === 'published',
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition text-xs bg-white cursor-pointer"
                  >
                    <option value="published">Published (Visible on site)</option>
                    <option value="draft">Draft (Internal Review)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="1"
                    value={form.displayOrder || 1}
                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-800 focus:outline-none focus:border-red-400 transition text-xs bg-white"
                    placeholder="1"
                  />
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-red-700 text-white font-bold text-xs shadow-xs transition cursor-pointer disabled:opacity-60"
                >
                  {saving ? 'Updating...' : editingStory ? 'Update Case Story' : 'Create Completed Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
