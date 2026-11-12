import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  FileText,
  Plus,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Edit2,
  Trash2,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  X,
  Globe,
  Sparkles,
  ShieldCheck,
  Clock,
} from 'lucide-react';

const INITIAL_PAGES = [
  {
    _id: 'page-1',
    title: 'Our Field Success Stories',
    slug: '/our-success',
    summary: 'Field relief drives, clothing distributions, and educational milestones achieved by Rebirth Care Trust across Delhi NCR.',
    status: 'published',
    seoReadiness: 'Meta Ready',
    updatedAt: '21 Oct 2026',
    metaTitle: 'Our Field Success Stories & Relief Milestones | Rebirth Care Trust',
    metaDescription: 'Explore verified outreach stories, hospital interventions, winter warmth distributions, and education bridge school recoveries.',
    metaKeywords: 'impact stories, humanitarian relief, charity outcomes, rebirth care trust, ngo delhi',
    content: 'Full structured archive of field relief operations, disaster outreach, and verified beneficiary milestones.',
  },
  {
    _id: 'page-2',
    title: 'Certificates & Registration Credentials',
    slug: '/certificates',
    summary: 'Official registration credentials, Darpan UID, and PAN documentation certified for statutory transparent governance.',
    status: 'published',
    seoReadiness: 'Meta Ready',
    updatedAt: '21 Oct 2026',
    metaTitle: 'Legal Registrations, 80G/12A Certificates & Darpan UID | Rebirth Care Trust',
    metaDescription: 'Official government credentials, Income Tax Section 80G tax exemption approval, 12A trust deed, and NITI Aayog accreditation.',
    metaKeywords: '80g certificate, 12a registration, niti aayog darpan, tax exemption, trust legal credentials',
    content: 'Authenticated public disclosure of government statutory approvals, tax deductions, and trust deeds.',
  },
  {
    _id: 'page-3',
    title: 'Terms and Conditions',
    slug: '/terms-and-conditions',
    summary: 'Terms governing donations, website usage, and official trust declarations for donors and volunteers.',
    status: 'published',
    seoReadiness: 'Meta Ready',
    updatedAt: '21 Oct 2026',
    metaTitle: 'Terms & Conditions of Donation & Website Usage | Rebirth Care Trust',
    metaDescription: 'Read the official terms and conditions governing online contributions, computer-generated receipt issuance, and site policies.',
    metaKeywords: 'terms and conditions, donation policy, receipt terms, charity trust governance',
    content: 'Official conditions and policy agreements governing transparent donations and portal usage.',
  },
  {
    _id: 'page-4',
    title: 'Privacy Policy',
    slug: '/privacy-policy',
    summary: 'Rebirth Care Trust privacy policy regarding donor and beneficiary data protection, confidentiality, and transaction security.',
    status: 'published',
    seoReadiness: 'Meta Ready',
    updatedAt: '21 Oct 2026',
    metaTitle: 'Privacy Policy & Donor Data Protection | Rebirth Care Trust',
    metaDescription: 'How Rebirth Care Trust safeguards donor personal information, 80G tax receipt records, and beneficiary child privacy.',
    metaKeywords: 'privacy policy, donor confidentiality, data protection, secure donations',
    content: 'Comprehensive data protection and security commitment ensuring complete donor confidentiality.',
  },
];

export const AdminPageSections = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const [pages, setPages] = useState(() => {
    try {
      const stored = localStorage.getItem('rk_page_sections_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_PAGES;
  });

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState(null);
  const [saving, setSaving] = useState(false);

  const defaultForm = {
    title: '',
    slug: '',
    summary: '',
    status: 'published',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    content: '',
  };

  const [formData, setFormData] = useState(defaultForm);

  // Sync with backend if present
  useEffect(() => {
    if (settings?.pageSections?.pages && Array.isArray(settings.pageSections.pages) && settings.pageSections.pages.length > 0) {
      setPages(settings.pageSections.pages);
      try {
        localStorage.setItem('rk_page_sections_list', JSON.stringify(settings.pageSections.pages));
      } catch {
        // ignore
      }
    }
  }, [settings?.pageSections?.pages]);

  const persistPages = async (newPages) => {
    setPages(newPages);
    try {
      localStorage.setItem('rk_page_sections_list', JSON.stringify(newPages));
    } catch {
      // ignore
    }
    try {
      await api.put('/settings', {
        pageSections: {
          ...(settings?.pageSections || {}),
          pages: newPages,
        },
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
      showToast('Page sections refreshed.', 'success');
    } catch (err) {
      showToast(err.message || 'Error refreshing.', 'error');
    } finally {
      setTimeout(() => setRefreshing(false), 400);
    }
  };

  const handleCopySlug = (slug, id, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(slug);
    setCopiedId(id);
    showToast('Slug copied to clipboard!', 'info');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleOpenAdd = () => {
    setEditingPage(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (page, e) => {
    e.stopPropagation();
    setEditingPage(page);
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      summary: page.summary || '',
      status: page.status || 'published',
      metaTitle: page.metaTitle || '',
      metaDescription: page.metaDescription || '',
      metaKeywords: page.metaKeywords || '',
      content: page.content || '',
    });
    setModalOpen(true);
  };

  const handleDelete = async (pageId, e) => {
    e.stopPropagation();
    const target = pages.find((p) => p._id === pageId);
    if (!window.confirm(`Delete page "${target?.title || 'this page'}"?`)) return;

    const updated = pages.filter((p) => p._id !== pageId);
    await persistPages(updated);
    showToast('Page removed successfully.', 'info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Page Title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      let slugFormatted = formData.slug.trim();
      if (!slugFormatted.startsWith('/')) {
        slugFormatted = `/${slugFormatted}`;
      }
      slugFormatted = slugFormatted
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\/-]/g, '');

      const isSeoReady = !!(formData.metaTitle && formData.metaDescription);

      const record = {
        ...formData,
        slug: slugFormatted,
        seoReadiness: isSeoReady ? 'Meta Ready' : 'Needs Review',
        updatedAt: '21 Oct 2026',
      };

      let updated;
      if (editingPage) {
        updated = pages.map((p) => (p._id === editingPage._id ? { ...p, ...record } : p));
        showToast('Page content & SEO metadata updated!', 'success');
      } else {
        const newEntry = {
          _id: `page-${Date.now()}`,
          ...record,
        };
        updated = [newEntry, ...pages];
        showToast('New static page created and published!', 'success');
      }
      await persistPages(updated);
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Failed to save page', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Filter calculations
  const filtered = pages.filter((page) => {
    const q = search.toLowerCase();
    const titleMatch = (page.title || '').toLowerCase().includes(q);
    const slugMatch = (page.slug || '').toLowerCase().includes(q);
    const sumMatch = (page.summary || '').toLowerCase().includes(q);

    const matchesSearch = !q || titleMatch || slugMatch || sumMatch;
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'published'
        ? page.status === 'published'
        : page.status === 'draft';

    return matchesSearch && matchesStatus;
  });

  const publishedCount = pages.filter((p) => p.status === 'published').length;

  return (
    <div className="space-y-5 w-full min-w-0">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span>Admin</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">Page Sections</span>
      </div>

      {/* ── Page Header (Matches Screenshot) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
            Page Content & SEO CMS
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage structured static pages, legal declarations, and search engine metadata tags.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs transition cursor-pointer font-semibold text-xs flex items-center gap-1.5 disabled:opacity-60"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ New Page</span>
          </button>
        </div>
      </div>

      {/* ── Search & Filter Controls Bar (Matches Screenshot) ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search pages by title, slug, summary..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 shadow-xs transition"
          />
        </div>

        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-xs cursor-pointer transition min-w-[150px]"
          >
            <option value="all">All Statuses ({pages.length})</option>
            <option value="published">Published ({publishedCount})</option>
            <option value="draft">Draft ({pages.length - publishedCount})</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Table Card Layout (Matches Exact Screenshot Format) ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm w-full sticky top-[104px] z-10 flex flex-col max-h-[calc(100vh-124px)]">
        <div className="w-full overflow-x-auto overflow-y-auto flex-1 custom-admin-scrollbar rounded-t-2xl">
          <table className="w-full text-left text-xs min-w-[880px] border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 shadow-xs">
              <tr>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider rounded-tl-2xl">
                  PAGE TITLE & DETAILS
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  URL SLUG
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  SEO READINESS
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  UPDATED AT
                </th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right rounded-tr-2xl">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center border-b border-slate-100">
                    <FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No structured pages found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                    {/* PAGE TITLE & DETAILS */}
                    <td className="px-5 py-4 max-w-sm border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] border border-red-100 flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {item.summary}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* URL SLUG with Copy Button */}
                    <td className="px-5 py-4 whitespace-nowrap border-b border-slate-100">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100/90 border border-slate-200 text-[11px] font-mono text-slate-700">
                        <span>{item.slug}</span>
                        <button
                          type="button"
                          onClick={(e) => handleCopySlug(item.slug, item._id, e)}
                          className="text-slate-400 hover:text-slate-700 transition cursor-pointer"
                          title="Copy Slug"
                        >
                          {copiedId === item._id ? (
                            <Check className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* STATUS: Green Dot Badge */}
                    <td className="px-5 py-4 whitespace-nowrap border-b border-slate-100">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase ${
                          item.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-500 border border-slate-200'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.status === 'published' ? 'bg-emerald-500' : 'bg-slate-400'
                          }`}
                        />
                        <span>{item.status === 'published' ? 'PUBLISHED' : 'DRAFT'}</span>
                      </span>
                    </td>

                    {/* SEO READINESS */}
                    <td className="px-5 py-4 whitespace-nowrap border-b border-slate-100">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          item.seoReadiness === 'Meta Ready'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{item.seoReadiness || 'Meta Ready'}</span>
                      </span>
                    </td>

                    {/* UPDATED AT */}
                    <td className="px-5 py-4 whitespace-nowrap border-b border-slate-100 font-medium text-slate-600 text-xs">
                      {item.updatedAt || '21 Oct 2026'}
                    </td>

                    {/* ACTIONS */}
                    <td className="px-5 py-4 text-right whitespace-nowrap border-b border-slate-100">
                      <div className="inline-flex items-center justify-end gap-1.5">
                        <a
                          href={item.slug === '/terms-and-conditions' ? '/terms-conditions' : item.slug}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                          title="Open Public Page"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        <button
                          type="button"
                          onClick={(e) => handleOpenEdit(item, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                          title="Edit Page & SEO"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => handleDelete(item._id, e)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          title="Delete Page"
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
              Showing {filtered.length} of {pages.length} structured pages
            </span>
            {(search || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
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

      {/* ── Add / Edit Page Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-50 text-[#DC2626] flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingPage ? 'Edit Page Content & SEO' : 'Create New Structured Page'}
                  </h3>
                  <p className="text-xs text-slate-400">Manage route metadata, declarations, and SEO</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
              {/* Page Title & URL Slug */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Page Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                        slug:
                          formData.slug ||
                          `/${e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
                      })
                    }
                    placeholder="e.g. Terms and Conditions"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="/terms-and-conditions"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition font-mono"
                  />
                </div>
              </div>

              {/* Summary / Subtitle */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Page Summary / Tagline</label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Short explanation displayed in tables and site index..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              {/* SEO Meta Title */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>SEO Meta Title</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {formData.metaTitle.length}/60 chars
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.metaTitle}
                  onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                  placeholder="e.g. Terms and Conditions | Rebirth Care Trust"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                />
              </div>

              {/* SEO Meta Description */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>SEO Meta Description</span>
                  <span className="text-[11px] text-slate-400 font-normal">
                    {formData.metaDescription.length}/160 chars
                  </span>
                </label>
                <textarea
                  rows={2}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                  placeholder="Concise snippet shown on Google search engine result pages..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition resize-y"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Publication Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#DC2626] text-white font-bold hover:bg-red-700 shadow-xs transition cursor-pointer disabled:opacity-60"
                >
                  {saving ? 'Saving...' : editingPage ? 'Update Page' : 'Publish Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
