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
  'Dalit Upliftment & Rights':         'bg-slate-100 text-slate-700 border-slate-200',
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
  'Child Welfare',
  'Child Education',
  'Women Empowerment',
  'Healthcare',
  'Healthcare & Relief',
  'Nutrition & Food Security',
  'Elderly Support',
  'Elderly Care',
  'Special Needs',
  'Education',
  'Community Welfare',
];

const FALLBACK_PROGRAMS = [
  {
    _id: 'prog-1',
    title: 'Children Development',
    slug: 'children-development',
    category: 'Child Welfare',
    shortDescription: 'Protecting child rights, fighting infant mortality, eliminating child labor, and providing free...',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 1500,
    beneficiariesCount: 1250,
    isFeatured: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    _id: 'prog-2',
    title: "Women's Development and Empowerment",
    slug: 'womens-development-and-empowerment',
    category: 'Women Empowerment',
    shortDescription: 'Empowering women to live with dignity and equal rights in violence-free environments...',
    coverImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 2000,
    beneficiariesCount: 840,
    isFeatured: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    _id: 'prog-3',
    title: 'Aged / Elderly Care',
    slug: 'aged-elderly',
    category: 'Elderly Support',
    shortDescription: 'Providing medical aid, nutrition, and companionship to destitute and abandoned senior...',
    coverImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 1800,
    beneficiariesCount: 520,
    isFeatured: true,
    isActive: true,
    displayOrder: 3,
  },
  {
    _id: 'prog-4',
    title: 'Differently Abled Support',
    slug: 'differently-abled',
    category: 'Special Needs',
    shortDescription: 'Ensuring differently-abled citizens enjoy equal rights, assistive equipment, dignity, and...',
    coverImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 2500,
    beneficiariesCount: 390,
    isFeatured: true,
    isActive: true,
    displayOrder: 4,
  },
  {
    _id: 'prog-5',
    title: 'Education and Literacy',
    slug: 'education-and-literacy',
    category: 'Education',
    shortDescription: 'Bridging educational gaps for slum children and school dropouts with non-formal evenin...',
    coverImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 1200,
    beneficiariesCount: 2100,
    isFeatured: true,
    isActive: true,
    displayOrder: 5,
  },
  {
    _id: 'prog-6',
    title: 'Health and Family Welfare',
    slug: 'health-and-family-welfare',
    category: 'Healthcare',
    shortDescription: 'Community health camps, preventative medical care, and quality mother-child health...',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 1500,
    beneficiariesCount: 3400,
    isFeatured: true,
    isActive: true,
    displayOrder: 6,
  },
  {
    _id: 'prog-7',
    title: 'Dalit Upliftment & Rights',
    slug: 'dalit-upliftment-rights',
    category: 'Community Welfare',
    shortDescription: 'Advocating for equal social rights, legal support, and economic empowerment for marginalized communities...',
    coverImage: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 1400,
    beneficiariesCount: 1650,
    isFeatured: false,
    isActive: true,
    displayOrder: 7,
  },
  {
    _id: 'prog-8',
    title: 'Drinking Water & Sanitation',
    slug: 'drinking-water-sanitation',
    category: 'Healthcare & Relief',
    shortDescription: 'Installing clean water filtration units and community sanitation facilities in rural villages...',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 2200,
    beneficiariesCount: 4500,
    isFeatured: false,
    isActive: true,
    displayOrder: 8,
  },
  {
    _id: 'prog-9',
    title: 'Environment and Forest Protection',
    slug: 'environment-forest-protection',
    category: 'Community Welfare',
    shortDescription: 'Mass afforestation drives, waste recycling awareness, and ecological preservation initiatives...',
    coverImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 900,
    beneficiariesCount: 12000,
    isFeatured: false,
    isActive: true,
    displayOrder: 9,
  },
  {
    _id: 'prog-10',
    title: 'Disaster Management & Emergency Relief',
    slug: 'disaster-emergency-relief',
    category: 'Healthcare & Relief',
    shortDescription: 'Rapid disaster relief response providing emergency rations, shelter, and medical camps...',
    coverImage: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&auto=format&fit=crop&q=80',
    budgetOrCostPerChild: 3000,
    beneficiariesCount: 5000,
    isFeatured: false,
    isActive: true,
    displayOrder: 10,
  },
];

const slugify = (text) =>
  text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-').replace(/[^\w-]+/g, '').replace(/--+/g, '-');

const categoryPill = (cat) => {
  const cls = CATEGORY_COLORS[cat] || 'bg-slate-50 text-slate-600 border-slate-100';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9.5px] sm:text-[10px] font-semibold border ${cls}`}>
      {cat}
    </span>
  );
};

export const AdminPrograms = () => {
  const { showToast } = useWebsite();
  const [programs, setPrograms] = useState(FALLBACK_PROGRAMS);
  const [loading, setLoading] = useState(false);
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
      if (res?.programs && res.programs.length > 0) {
        setPrograms(res.programs);
      }
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
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* ── Page Header (Executive Proportions) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-sm sm:text-[15px] font-bold text-slate-900 tracking-tight">Programs CMS</h2>
          <p className="text-[11px] text-slate-500 font-normal mt-0.5">
            Administer institutional charitable programs, narrative blueprints, cover photos, and publication status.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchPrograms(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition cursor-pointer disabled:opacity-60"
          >
            <RefreshCw className={`w-3 h-3 text-slate-500 ${refreshing ? 'animate-spin text-[#DC2626]' : ''}`} />
            Refresh
          </button>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs transition cursor-pointer active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            Add New Program
          </button>
        </div>
      </div>

      {/* ── Stats cards (Dashboard Compact Hierarchy) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Total */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Programs</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {programs.length} <span className="text-[10.5px] font-normal text-slate-400">initiatives</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        {/* Active */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Active Published</p>
            <p className="text-lg sm:text-xl font-extrabold text-emerald-600 mt-0.5 tracking-tight">
              {totalActive} <span className="text-[10.5px] font-normal text-slate-400">live on site</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        {/* Pillars */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 flex items-center justify-between shadow-xs hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Social Pillars</p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {uniquePillars} <span className="text-[10.5px] font-normal text-slate-400">focus sectors</span>
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ── Search + Filters (Compact & Clean) ── */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search programs by title, slug, or category..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 shadow-2xs transition"
          />
        </div>
        <div className="relative">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-2xs cursor-pointer transition min-w-[140px]"
          >
            <option value="">All Categories</option>
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-2xs cursor-pointer transition min-w-[125px]"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Programs Table (Fully Visible & Refined Dashboard Typography) ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[800px]">
            <thead className="bg-slate-50 border-b border-slate-200/90 shadow-2xs">
              <tr>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Program Details</th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">URL Route</th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-center">Order</th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Loader2 className="w-5 h-5 text-slate-400 animate-spin mx-auto mb-1.5" />
                    <p className="text-[11px] text-slate-400">Loading programs...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <Layers className="w-7 h-7 text-slate-200 mx-auto mb-1.5" />
                    <p className="text-[11px] text-slate-400">No programs found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((p, idx) => (
                  <tr key={p._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Program Details */}
                    <td className="px-3.5 py-2.5 align-middle">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
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
                          <p className="font-bold text-slate-900 text-xs sm:text-[13px] leading-tight truncate max-w-[280px]">
                            {p.title}
                          </p>
                          <p className="text-[10.5px] text-slate-400 truncate max-w-[280px] mt-0.5">
                            {p.shortDescription}
                          </p>
                          {p.isFeatured && (
                            <span className="inline-flex items-center gap-0.5 text-[9.5px] text-amber-600 font-semibold mt-0.5">
                              <Star className="w-2.5 h-2.5 fill-amber-500" /> Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* URL Route */}
                    <td className="px-3.5 py-2.5 align-middle">
                      <code className="text-[10.5px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md font-mono border border-slate-200/60 break-all">
                        /our-program/{p.slug}
                      </code>
                    </td>

                    {/* Category */}
                    <td className="px-3.5 py-2.5 align-middle">
                      {categoryPill(p.category)}
                    </td>

                    {/* Status */}
                    <td className="px-3.5 py-2.5 align-middle">
                      <button
                        onClick={() => toggleActive(p)}
                        title="Click to toggle status"
                        className="cursor-pointer"
                      >
                        {p.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                            PUBLISHED
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9.5px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 inline-block"></span>
                            DRAFT
                          </span>
                        )}
                      </button>
                    </td>

                    {/* Order */}
                    <td className="px-3.5 py-2.5 align-middle text-center">
                      <span className="text-xs font-bold text-slate-600">
                        {p.displayOrder || idx + 1}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3.5 py-2.5 align-middle">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/our-program/${p.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openModal(p)}
                          className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
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
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between">
            <span className="text-[10.5px] text-slate-400">
              Showing {filtered.length} of {programs.length} programs
            </span>
            {(search || filterCategory || filterStatus) && (
              <button
                onClick={() => { setSearch(''); setFilterCategory(''); setFilterStatus(''); }}
                className="text-[10.5px] text-[#DC2626] hover:underline font-semibold cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Add / Edit Modal ── */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl max-h-[92vh] overflow-y-auto border border-slate-200">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  {editingProgram ? 'Edit Program' : 'Add New Program'}
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {editingProgram ? `Editing: ${editingProgram.title}` : 'Create a new charitable program entry'}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3.5 text-xs">
              {/* Title */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Program Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-xs"
                  placeholder="e.g. Children Development"
                />
                {form.title && (
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    URL: <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">/our-program/{slugify(form.title)}</code>
                  </p>
                )}
              </div>

              {/* Category + Order */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-xs font-medium"
                  >
                    {ALL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={form.displayOrder}
                    onChange={(e) => setForm({ ...form, displayOrder: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-xs"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Short Description * <span className="text-slate-400 font-normal">(max 280 chars)</span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={280}
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-xs"
                  placeholder="Brief summary shown in program cards..."
                />
                <p className="text-[10px] text-slate-400 mt-0.5 text-right">{form.shortDescription.length}/280</p>
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition resize-y text-xs"
                  placeholder="Detailed description for the program page..."
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Cover Image</label>
                <div className="space-y-2">
                  {form.coverImage && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 max-h-36">
                      <img src={form.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setForm({ ...form, coverImage: '' })}
                        className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
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
                      className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-xs"
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
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer disabled:opacity-60 shrink-0"
                    >
                      {uploadingImg ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              {/* Budget + Beneficiaries */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Cost per Beneficiary (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.budgetOrCostPerChild}
                    onChange={(e) => setForm({ ...form, budgetOrCostPerChild: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Beneficiaries Count</label>
                  <input
                    type="number"
                    min="0"
                    value={form.beneficiariesCount}
                    onChange={(e) => setForm({ ...form, beneficiariesCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-xs"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((f) => ({ ...f, isFeatured: !f.isFeatured }))}
                    className={`relative w-8 h-4.5 rounded-full transition-colors cursor-pointer ${form.isFeatured ? 'bg-amber-400' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-xs transition-all duration-200 ${form.isFeatured ? 'left-4' : 'left-0.5'}`} />
                  </div>
                  <span className="text-slate-700 font-semibold text-[11px] flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-500 fill-amber-400" /> Featured
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setForm((f) => ({ ...f, isActive: !f.isActive }))}
                    className={`relative w-8 h-4.5 rounded-full transition-colors cursor-pointer ${form.isActive ? 'bg-emerald-500' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow-xs transition-all duration-200 ${form.isActive ? 'left-4' : 'left-0.5'}`} />
                  </div>
                  <span className="text-slate-700 font-semibold text-[11px]">
                    {form.isActive ? 'Published' : 'Draft'}
                  </span>
                </label>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-[#DC2626] text-white font-bold text-[11px] hover:bg-red-700 shadow-2xs transition cursor-pointer"
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
