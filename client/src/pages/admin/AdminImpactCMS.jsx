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

const INITIAL_STORIES = [
  {
    _id: 'story-1',
    title: '10,000+ Nutritious Meals Served in Marginalized Slum Settlements',
    slug: '10000-nutritious-meals-served',
    category: 'Hunger & Nutrition Relief',
    outcomeMetric: '10,000+ Nutritious Meals',
    location: 'Nand Nagri, Yamuna Vihar & Seelampur, Delhi NCR',
    pdfDossierUrl: '/reports/meals-distribution-audit.pdf',
    coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
    summary: 'Providing freshly cooked warm nutritional food packets and emergency grocery packs to destitute households.',
    status: 'published',
    isActive: true,
  },
  {
    _id: 'story-2',
    title: 'Saree & Warm Garments Distribution for 1,500+ Destitute Women & Seniors',
    slug: 'saree-garments-distribution-women',
    category: 'Clothing & Dignity',
    outcomeMetric: '1,500+ Women & Elderly',
    location: 'Yamuna Khadar & Mustafabad Settlements, Delhi',
    pdfDossierUrl: '/reports/garments-distribution-audit.pdf',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    summary: 'Seasonal winter warmth and dignified clothing support for elderly widows and marginalized women.',
    status: 'published',
    isActive: true,
  },
  {
    _id: 'story-3',
    title: 'Emergency Medical & NICU Treatment Sponsorship for 45+ Critical Infants',
    slug: 'emergency-medical-nicu-sponsorship',
    category: 'Healthcare & NICU Support',
    outcomeMetric: '₹4.5L+ Hospital Care Sponsored',
    location: 'GTB Hospital, AIIMS & Kalawati Saran, Delhi',
    pdfDossierUrl: '/reports/nicu-treatment-audit.pdf',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
    summary: 'Life-saving surgical interventions, phototherapy, and premature infant stabilization care.',
    status: 'published',
    isActive: true,
  },
  {
    _id: 'story-4',
    title: 'Street-to-School Remedial Child Bridge Centers',
    slug: 'street-to-school-remedial-education',
    category: 'Child Literacy & Education',
    outcomeMetric: '250+ Children Enrolled',
    location: 'Nand Nagri & Gokalpuri, Delhi NCR',
    pdfDossierUrl: '/reports/remedial-education-audit.pdf',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
    summary: 'Mainstreaming children of waste-pickers and migrant daily-wagers into formal public schools.',
    status: 'published',
    isActive: true,
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
    pdfDossierUrl: '',
    coverImage: '',
    summary: '',
    status: 'published',
    isActive: true,
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
      await api.put('/settings', {
        impactStories: newStories,
      });
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
    setForm(emptyForm);
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
      pdfDossierUrl: item.pdfDossierUrl || '',
      coverImage: item.coverImage || '',
      summary: item.summary || '',
      status: item.status || 'published',
      isActive: item.isActive ?? true,
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
            ? { ...s, ...form, slug: targetSlug }
            : s
        );
      } else {
        const newEntry = {
          _id: `story-${Date.now()}`,
          ...form,
          slug: targetSlug,
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
    <div className="space-y-5 w-full min-w-0">
      {/* ── Page Header (Breadcrumbs + Title + Action Buttons) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Our Impact & Completed Cases CMS
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Administer verified outreach recoveries, outcome metrics, and publish official PDF audit reports.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Completed Case
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

      {/* ── Table Layout with Sticky Table Card & Sticky Header ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm w-full sticky top-[104px] z-10 flex flex-col max-h-[calc(100vh-124px)]">
        <div className="w-full overflow-x-auto overflow-y-auto flex-1 custom-admin-scrollbar rounded-t-2xl">
          <table className="w-full text-left text-xs min-w-[760px] border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 shadow-xs">
              <tr>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider rounded-tl-2xl">
                  CASE STORY
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  CATEGORY & OUTCOME
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  LOCATION
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  PDF AUDIT DOSSIER
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right rounded-tr-2xl">
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
                  <tr key={item._id || item.slug} className="hover:bg-slate-50/70 transition-colors">
                    {/* CASE STORY: Thumbnail + Title + Route */}
                    <td className="px-5 py-3.5 max-w-sm border-b border-slate-100">
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
                    <td className="px-5 py-3.5 max-w-xs border-b border-slate-100">
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
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition shadow-2xs"
                        >
                          <FileText className="w-3 h-3" />
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

                    {/* ACTIONS */}
                    <td className="px-5 py-3.5 text-right whitespace-nowrap border-b border-slate-100">
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

      {/* ── Add / Edit Completed Case Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingStory ? 'Edit Completed Case' : 'Add Completed Case Story'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {editingStory ? `Editing: ${editingStory.title}` : 'Publish a verified outreach recovery or outcome dossier'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 text-xs">
              {/* Case Story Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Case Story Title *</label>
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition font-bold"
                  placeholder="e.g. 10,000+ Nutritious Meals Served in Marginalized Slum Settlements"
                />
              </div>

              {/* URL Slug */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  URL Route Slug <span className="text-slate-400 font-normal">(/our-success/slug)</span>
                </label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition font-mono"
                  placeholder="10000-nutritious-meals-served"
                />
              </div>

              {/* Category + Outcome Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                    placeholder="e.g. Hunger & Nutrition Relief"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-emerald-700 mb-1">Outcome Metric Badge *</label>
                  <input
                    type="text"
                    required
                    value={form.outcomeMetric}
                    onChange={(e) => setForm({ ...form, outcomeMetric: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-emerald-200 text-emerald-700 font-bold focus:outline-none focus:border-emerald-500 transition"
                    placeholder="e.g. 10,000+ Nutritious Meals"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Field Location / Hospital *</label>
                <input
                  type="text"
                  required
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  placeholder="e.g. Nand Nagri, Yamuna Vihar & Seelampur, Delhi NCR"
                />
              </div>

              {/* PDF Audit Dossier Link/Upload */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">PDF Audit Dossier Report</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={form.pdfDossierUrl}
                    onChange={(e) => setForm({ ...form, pdfDossierUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                    placeholder="/reports/audit-dossier.pdf or URL"
                  />
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-60 shrink-0"
                  >
                    {uploadingPdf ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                    Upload PDF
                  </button>
                </div>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cover Image</label>
                <div className="space-y-2">
                  {form.coverImage && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 max-h-40">
                      <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '' })}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={form.coverImage}
                      onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                      placeholder="https://... or choose image file"
                    />
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-60 shrink-0"
                    >
                      {uploadingImg ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      Upload Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* Brief Summary */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Brief Description / Outreach Summary</label>
                <textarea
                  rows={3}
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition resize-y"
                  placeholder="Summary of families aided, rations distributed, or medical milestones reached..."
                />
              </div>

              {/* Status Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Publication Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value, isActive: e.target.value === 'published' })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                >
                  <option value="published">Published (Visible on Public Website)</option>
                  <option value="draft">Draft (Saved Internally)</option>
                </select>
              </div>

              {/* Modal Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-red-700 shadow-xs transition cursor-pointer disabled:opacity-60"
                >
                  {saving ? 'Publishing...' : editingStory ? 'Update Case' : 'Save Completed Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
