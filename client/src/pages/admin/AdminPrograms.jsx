import React, { useState, useEffect, useRef } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  RefreshCw,
  Search,
  ExternalLink,
  Layers,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Upload,
  Loader2,
  Eye,
  EyeOff,
  Star,
  Image as ImageIcon,
} from 'lucide-react';

/* ── category colour pills ── */
const CATEGORY_COLORS = {
  'Children Development':              'bg-blue-50 text-blue-700 border-blue-100',
  'Child Welfare':                     'bg-blue-50 text-blue-700 border-blue-100',
  'Child Education':                   'bg-indigo-50 text-indigo-700 border-indigo-100',
  "Women's Development and Empowerment": 'bg-pink-50 text-pink-700 border-pink-100',
  'Women Empowerment':                 'bg-pink-50 text-pink-700 border-pink-100',
  'Aged / Elderly Care':               'bg-amber-50 text-amber-700 border-amber-100',
  'Elderly Care':                      'bg-amber-50 text-amber-700 border-amber-100',
  'Elderly Support':                   'bg-amber-50 text-amber-700 border-amber-100',
  'Differently Abled Support':         'bg-purple-50 text-purple-700 border-purple-100',
  'Special Needs':                     'bg-purple-50 text-purple-700 border-purple-100',
  'Education and Literacy':            'bg-cyan-50 text-cyan-700 border-cyan-100',
  'Education':                         'bg-cyan-50 text-cyan-700 border-cyan-100',
  'Health and Family Welfare':         'bg-green-50 text-green-700 border-green-100',
  'Healthcare':                        'bg-green-50 text-green-700 border-green-100',
  'Healthcare & Relief':               'bg-green-50 text-green-700 border-green-100',
  'Dalit Upliftment & Rights':         'bg-orange-50 text-orange-700 border-orange-100',
  'Drinking Water & Sanitation':       'bg-sky-50 text-sky-700 border-sky-100',
  'Environment and Forest Protection': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Disaster Management & Emergency Relief': 'bg-red-50 text-red-700 border-red-100',
  'Nutrition & Food Security':         'bg-lime-50 text-lime-700 border-lime-100',
  'Community Welfare':                 'bg-teal-50 text-teal-700 border-teal-100',
};

const ALL_CATEGORIES = [
  'Children Development',
  "Women's Development and Empowerment",
  'Aged / Elderly Care',
  'Differently Abled Support',
  'Education and Literacy',
  'Health and Family Welfare',
  'Dalit Upliftment & Rights',
  'Drinking Water & Sanitation',
  'Environment and Forest Protection',
  'Disaster Management & Emergency Relief',
  'Child Education',
  'Women Empowerment',
  'Healthcare & Relief',
  'Nutrition & Food Security',
  'Elderly Care',
  'Community Welfare',
];

const slugify = (text) =>
  text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

const categoryPill = (cat) => {
  const cls = CATEGORY_COLORS[cat] || 'bg-slate-50 text-slate-600 border-slate-100';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-[11px] font-semibold border ${cls}`}>
      {cat}
    </span>
  );
};

export const AdminPrograms = () => {
  const { showToast } = useWebsite();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProgram, setEditingProgram] = useState(null);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileRef = useRef(null);

  const emptyForm = {
    title: '',
    category: 'Children Development',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    budgetOrCostPerChild: 1500,
    beneficiariesCount: 0,
    isFeatured: true,
    isActive: true,
    displayOrder: 0,
  };
  const [form, setForm] = useState(emptyForm);

  /* ── fetch ── */
  const fetchPrograms = async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await api.get('/programs?includeInactive=true');
      if (res?.programs) setPrograms(res.programs);
    } catch {
      showToast('Error loading programs', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { fetchPrograms(); }, []);

  /* ── filter ── */
  const filtered = programs.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.title?.toLowerCase().includes(q) ||
      p.slug?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.shortDescription?.toLowerCase().includes(q);
    const matchCat = !filterCategory || p.category === filterCategory;
    const matchStatus =
      !filterStatus ||
      (filterStatus === 'published' && p.isActive) ||
      (filterStatus === 'draft' && !p.isActive);
    return matchSearch && matchCat && matchStatus;
  });

  const totalActive = programs.filter((p) => p.isActive).length;
  const uniquePillars = [...new Set(programs.map((p) => p.category))].length;

  /* ── modal open ── */
  const openModal = (program = null) => {
    if (program) {
      setEditingProgram(program);
      setForm({
        title: program.title || '',
        category: program.category || 'Children Development',
        shortDescription: program.shortDescription || '',
        fullDescription: program.fullDescription || '',
        coverImage: program.coverImage || '',
        budgetOrCostPerChild: program.budgetOrCostPerChild || 1500,
        beneficiariesCount: program.beneficiariesCount || 0,
        isFeatured: program.isFeatured ?? true,
        isActive: program.isActive ?? true,
        displayOrder: program.displayOrder || 0,
      });
    } else {
      setEditingProgram(null);
      setForm(emptyForm);
    }
    setShowModal(true);
  };

  /* ── image upload ── */
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
        showToast('Cover image uploaded!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setUploadingImg(false);
    }
  };

  /* ── submit ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProgram) {
        await api.put(`/programs/${editingProgram._id}`, form);
        showToast('Program updated successfully', 'success');
      } else {
        await api.post('/programs', form);
        showToast('New program created successfully', 'success');
      }
      setShowModal(false);
      fetchPrograms(true);
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  /* ── delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this program permanently?')) return;
    try {
      await api.delete(`/programs/${id}`);
      showToast('Program deleted', 'info');
      fetchPrograms(true);
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  /* ── toggle active ── */
  const toggleActive = async (p) => {
    try {
      await api.put(`/programs/${p._id}`, { isActive: !p.isActive });
      showToast(`Program ${!p.isActive ? 'published' : 'unpublished'}`, 'success');
      fetchPrograms(true);
    } catch (err) {
      showToast(err.message || 'Update failed', 'error');
    }
  };

  /* ─────────────────────────────── RENDER ─────────────────────────────── */
  return (
    <div className="space-y-5">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Programs CMS</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Administer institutional charitable programs, narrative blueprints, cover photos, and publication status.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchPrograms(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-sm transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add New Program
          </button>
        </div>
      </div>

      {/* ── Stats cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Total Programs</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{programs.length}</p>
            <p className="text-xs text-slate-400">initiatives</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center">
            <Layers className="w-5 h-5 text-[#DC2626]" />
          </div>
        </div>
        {/* Active */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Active Published</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{totalActive}</p>
            <p className="text-xs text-slate-400">live on site</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        {/* Pillars */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Social Pillars</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">{uniquePillars}</p>
            <p className="text-xs text-slate-400">focus sectors</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
        </div>
      </div>

      {/* ── Search + Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs by title, slug, or category..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 shadow-xs transition"
          />
        </div>
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-xs cursor-pointer transition"
          >
            <option value="">All Categories</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-xs cursor-pointer transition"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Programs Table ── */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Program Details</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">URL Route</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Order</th>
                <th className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <Loader2 className="w-6 h-6 text-slate-400 animate-spin mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Loading programs...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center">
                    <Layers className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No programs found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((p, idx) => (
                  <tr key={p._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Program Details */}
                    <td className="px-4 py-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {p.coverImage ? (
                            <img
                              src={p.coverImage}
                              alt={p.title}
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
                          <p className="font-bold text-slate-900 text-sm truncate max-w-[260px]">{p.title}</p>
                          <p className="text-[11px] text-slate-400 truncate max-w-[260px] mt-0.5">
                            {p.shortDescription}
                          </p>
                          {p.isFeatured && (
                            <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-600 font-semibold mt-0.5">
                              <Star className="w-2.5 h-2.5" /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* URL Route */}
                    <td className="px-4 py-3">
                      <code className="text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg font-mono break-all">
                        /our-program/{p.slug}
                      </code>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">
                      {categoryPill(p.category)}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActive(p)}
                        title="Click to toggle status"
                        className="cursor-pointer"
                      >
                        {p.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                            PUBLISHED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span>
                            DRAFT
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Order */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-sm font-bold text-slate-600">
                        {p.displayOrder || idx + 1}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/our-programs/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openModal(p)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete"
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

        {/* Table footer */}
        {filtered.length > 0 && (
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Showing {filtered.length} of {programs.length} programs
            </span>
            {(search || filterCategory || filterStatus) && (
              <button
                onClick={() => { setSearch(''); setFilterCategory(''); setFilterStatus(''); }}
                className="text-[11px] text-red-500 hover:text-red-700 font-semibold cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingProgram ? 'Edit Program' : 'Add New Program'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {editingProgram ? `Editing: ${editingProgram.title}` : 'Create a new charitable program entry'}
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
              {/* Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  placeholder="e.g. Children Development"
                />
                {form.title && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    URL: <code className="bg-slate-100 px-1 rounded">/our-program/{slugify(form.title)}</code>
                  </p>
                )}
              </div>

              {/* Category + Order */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  >
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description * <span className="text-slate-400 font-normal">(max 280 chars)</span></label>
                <input
                  type="text"
                  required
                  maxLength={280}
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  placeholder="Brief summary shown in program cards..."
                />
                <p className="text-[11px] text-slate-400 mt-0.5 text-right">{form.shortDescription.length}/280</p>
              </div>

              {/* Full Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Description *</label>
                <textarea
                  rows={4}
                  required
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition resize-y"
                  placeholder="Detailed description for the program page..."
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cover Image</label>
                <div className="space-y-2">
                  {form.coverImage && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
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
                      placeholder="https://... or paste image URL"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileRef}
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploadingImg}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-60 shrink-0"
                    >
                      {uploadingImg ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              {/* Budget + Beneficiaries */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cost per Beneficiary (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.budgetOrCostPerChild}
                    onChange={(e) => setForm({ ...form, budgetOrCostPerChild: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Beneficiaries Count</label>
                  <input
                    type="number"
                    min="0"
                    value={form.beneficiariesCount}
                    onChange={(e) => setForm({ ...form, beneficiariesCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((f) => ({ ...f, isFeatured: !f.isFeatured }))}
                    className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${form.isFeatured ? 'bg-amber-400' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${form.isFeatured ? 'left-4' : 'left-0.5'}`} />
                  </div>
                  <span className="text-slate-700 font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500" /> Featured
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                    className={`relative w-9 h-5 rounded-full transition-colors cursor-pointer ${form.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${form.isActive ? 'left-4' : 'left-0.5'}`} />
                  </div>
                  <span className="text-slate-700 font-semibold">
                    {form.isActive ? 'Published' : 'Draft'}
                  </span>
                </label>
              </div>

              {/* Actions */}
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
                  className="px-5 py-2 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-red-700 shadow-sm transition cursor-pointer"
                >
                  {editingProgram ? 'Update Program' : 'Create Program'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
