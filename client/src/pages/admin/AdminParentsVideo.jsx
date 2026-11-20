import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Video,
  Plus,
  Search,
  ChevronDown,
  Play,
  Star,
  Edit2,
  Trash2,
  X,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  Layers,
  Sparkles,
  RefreshCw,
  Film,
} from 'lucide-react';

// Utility to parse YouTube ID from standard formats
const extractYoutubeId = (url) => {
  if (!url) return '';
  const trimmed = url.trim();
  // If it's already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : '';
};

const INITIAL_VIDEOS = [
  {
    _id: 'vid-1',
    title: 'Rebirth Care Trust',
    parentSubtitle: 'Rebirth Care Trust',
    beneficiaryName: 'Rebirth Care Trust',
    youtubeUrl: 'https://www.youtube.com/watch?v=VV8h_j3XFkk',
    youtubeId: 'VV8h_j3XFkk',
    category: 'Child Healthcare',
    aidProvided: 'Direct Medical Care',
    location: 'Delhi NCR',
    dateLabel: 'October 2026',
    status: 'published',
    isFeatured: false,
  },
  {
    _id: 'vid-2',
    title: 'Rebirth Care Trust',
    parentSubtitle: 'Rebirth Care Trust',
    beneficiaryName: 'Rebirth Care Trust',
    youtubeUrl: 'https://www.youtube.com/watch?v=0p7ChGjMayU',
    youtubeId: '0p7ChGjMayU',
    category: 'Child Healthcare',
    aidProvided: 'Direct Medical Care',
    location: 'Delhi NCR',
    dateLabel: 'October 2026',
    status: 'published',
    isFeatured: false,
  },
  {
    _id: 'vid-3',
    title: 'Rebirth Care Trust',
    parentSubtitle: 'Rebirth Care Trust',
    beneficiaryName: 'Rebirth Care Trust',
    youtubeUrl: 'https://www.youtube.com/watch?v=_nLpnWdtzzk',
    youtubeId: '_nLpnWdtzzk',
    category: 'Child Healthcare',
    aidProvided: 'Direct Medical Care',
    location: 'Delhi NCR',
    dateLabel: 'October 2026',
    status: 'published',
    isFeatured: false,
  },
  {
    _id: 'vid-4',
    title: 'Rebirth Care Trust',
    parentSubtitle: 'Rebirth Care Trust',
    beneficiaryName: 'Rebirth Care Trust',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    category: 'Child Healthcare',
    aidProvided: 'Direct Medical Care',
    location: 'Delhi NCR',
    dateLabel: 'October 2026',
    status: 'published',
    isFeatured: false,
  },
];

export const AdminParentsVideo = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const [videos, setVideos] = useState(() => {
    try {
      const stored = localStorage.getItem('rk_parents_videos_list');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_VIDEOS;
  });

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Modals state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const defaultForm = {
    title: 'Rebirth Care Trust',
    parentSubtitle: 'Rebirth Care Trust',
    beneficiaryName: 'Rebirth Care Trust',
    youtubeUrl: '',
    category: 'Child Healthcare',
    aidProvided: 'Direct Medical Care',
    location: 'Delhi NCR',
    dateLabel: 'October 2026',
    status: 'published',
    isFeatured: false,
  };

  const [formData, setFormData] = useState(defaultForm);

  // Sync with backend settings if populated
  useEffect(() => {
    if (settings?.parentsVideos && Array.isArray(settings.parentsVideos) && settings.parentsVideos.length > 0) {
      const hasFormatted = settings.parentsVideos.some((v) => v.youtubeId || v.aidProvided || v.beneficiaryName);
      if (hasFormatted) {
        setVideos(settings.parentsVideos);
        try {
          localStorage.setItem('rk_parents_videos_list', JSON.stringify(settings.parentsVideos));
        } catch {
          // ignore
        }
      }
    }
  }, [settings?.parentsVideos]);

  const persistVideos = async (newVideos) => {
    setVideos(newVideos);
    try {
      localStorage.setItem('rk_parents_videos_list', JSON.stringify(newVideos));
    } catch {
      // ignore
    }
    try {
      const sanitized = newVideos.map((v) => {
        const item = { ...v };
        if (typeof item._id === 'string' && item._id.startsWith('vid-')) {
          delete item._id;
        }
        return item;
      });
      const res = await api.put('/settings', {
        parentsVideos: sanitized,
      });
      if (res?.settings?.parentsVideos?.length) {
        setVideos(res.settings.parentsVideos);
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
      showToast('Parents video reviews refreshed.', 'success');
    } catch (err) {
      showToast(err.message || 'Error refreshing.', 'error');
    } finally {
      setTimeout(() => setRefreshing(false), 400);
    }
  };

  // Toggle Featured Proof (Star icon)
  const handleToggleFeatured = async (vidId, e) => {
    e.stopPropagation();
    const updated = videos.map((v) =>
      v._id === vidId ? { ...v, isFeatured: !v.isFeatured } : v
    );
    await persistVideos(updated);
    const target = updated.find((v) => v._id === vidId);
    showToast(
      target.isFeatured ? 'Marked as Featured Proof!' : 'Removed from Featured Proof.',
      'info'
    );
  };

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (vid, e) => {
    e.stopPropagation();
    setEditingVideo(vid);
    setFormData({
      title: vid.title || 'Rebirth Care Trust',
      parentSubtitle: vid.parentSubtitle || vid.parentName || 'Rebirth Care Trust',
      beneficiaryName: vid.beneficiaryName || 'Rebirth Care Trust',
      youtubeUrl: vid.youtubeUrl || (vid.youtubeId ? `https://www.youtube.com/watch?v=${vid.youtubeId}` : ''),
      category: vid.category || 'Child Healthcare',
      aidProvided: vid.aidProvided || 'Direct Medical Care',
      location: vid.location || 'Delhi NCR',
      dateLabel: vid.dateLabel || 'October 2026',
      status: vid.status || 'published',
      isFeatured: vid.isFeatured ?? false,
    });
    setModalOpen(true);
  };

  const handleDelete = async (vidId, e) => {
    e.stopPropagation();
    const target = videos.find((v) => v._id === vidId);
    if (!window.confirm(`Delete video review "${target?.title || 'this entry'}"?`)) return;

    const updated = videos.filter((v) => v._id !== vidId);
    await persistVideos(updated);
    showToast('Video removed from list.', 'info');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const yId = extractYoutubeId(formData.youtubeUrl);
    if (!yId) {
      showToast('Please provide a valid YouTube URL or Video ID', 'error');
      return;
    }

    setSaving(true);
    try {
      const entry = {
        ...formData,
        youtubeId: yId,
        thumbnailUrl: `https://img.youtube.com/vi/${yId}/hqdefault.jpg`,
      };

      let updated;
      if (editingVideo) {
        updated = videos.map((v) => (v._id === editingVideo._id ? { ...v, ...entry } : v));
        showToast('Video review updated successfully!', 'success');
      } else {
        const newRecord = {
          _id: `vid-${Date.now()}`,
          ...entry,
        };
        updated = [newRecord, ...videos];
        showToast('New parents video review published!', 'success');
      }
      await persistVideos(updated);
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Failed to save video review', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Filter calculations
  const filtered = videos.filter((v) => {
    const q = search.toLowerCase();
    const titleMatch = (v.title || '').toLowerCase().includes(q);
    const subMatch = (v.parentSubtitle || '').toLowerCase().includes(q);
    const benMatch = (v.beneficiaryName || '').toLowerCase().includes(q);
    const locMatch = (v.location || '').toLowerCase().includes(q);
    const idMatch = (v.youtubeId || '').toLowerCase().includes(q);

    const matchesSearch = !q || titleMatch || subMatch || benMatch || locMatch || idMatch;
    const matchesCategory = !filterCategory || v.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'published'
        ? v.status === 'published'
        : v.status === 'draft';

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Unique categories
  const uniqueCategories = Array.from(new Set(videos.map((v) => v.category).filter(Boolean)));

  // KPI Calculations
  const totalStories = videos.length;
  const publishedLive = videos.filter((v) => v.status === 'published').length;
  const featuredProof = videos.filter((v) => v.isFeatured).length;
  const categoriesCount = uniqueCategories.length || 1;

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* ── Page Header (Executive Proportions) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h2 className="text-sm sm:text-[15px] font-bold text-slate-900 tracking-tight">
            Parents Video Testimonials & CMS
          </h2>
          <p className="text-[11px] text-slate-500 font-normal mt-0.5">
            Upload & manage verified YouTube video reviews of children and families benefited through Rebirth Care Trust.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/parents-video"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            <span>Public Page</span>
          </a>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white bg-[#DC2626] hover:bg-red-700 shadow-xs transition cursor-pointer active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Video</span>
          </button>
        </div>
      </div>

      {/* ── 4 KPI Metric Cards (Dashboard Compact Hierarchy) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* TOTAL STORIES */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-xs flex items-center justify-between hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              TOTAL STORIES
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5 tracking-tight">
              {totalStories}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-red-50 text-[#DC2626] flex items-center justify-center shrink-0">
            <Video className="w-4 h-4" />
          </div>
        </div>

        {/* PUBLISHED LIVE */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-xs flex items-center justify-between hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              PUBLISHED LIVE
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-emerald-600 mt-0.5 tracking-tight">
              {publishedLive}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>

        {/* FEATURED PROOF */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-xs flex items-center justify-between hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              FEATURED PROOF
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-amber-500 mt-0.5 tracking-tight">
              {featuredProof}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4" />
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="bg-white border border-slate-200 rounded-2xl p-3 sm:p-3.5 shadow-xs flex items-center justify-between hover:border-slate-300 transition">
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              CATEGORIES
            </p>
            <p className="text-lg sm:text-xl font-extrabold text-blue-600 mt-0.5 tracking-tight">
              {categoriesCount}
            </p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <Film className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls Bar ── */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, beneficiary, location..."
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
            {uniqueCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3 pr-8 py-2 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-2xs cursor-pointer transition min-w-[140px]"
          >
            <option value="all">All Statuses ({videos.length})</option>
            <option value="published">Published ({publishedLive})</option>
            <option value="draft">Draft ({videos.length - publishedLive})</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Table Layout (Refined Dashboard Typography) ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden w-full">
        <div className="overflow-x-auto custom-admin-scrollbar">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-slate-50 border-b border-slate-200/90 shadow-2xs">
              <tr>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  VIDEO STORY
                </th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  BENEFICIARY
                </th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  CATEGORY
                </th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  AID PROVIDED
                </th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  LOCATION / DATE
                </th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  STATUS
                </th>
                <th className="px-3.5 py-2.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <Film className="w-7 h-7 text-slate-200 mx-auto mb-1.5" />
                    <p className="text-[11px] text-slate-400">No parents video reviews found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const yId = item.youtubeId || extractYoutubeId(item.youtubeUrl);
                  const thumb =
                    item.thumbnailUrl ||
                    (yId
                      ? `https://img.youtube.com/vi/${yId}/hqdefault.jpg`
                      : 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800');

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                      {/* VIDEO STORY */}
                      <td className="px-3.5 py-2.5 align-middle max-w-sm">
                        <div className="flex items-center gap-2.5">
                          <div
                            onClick={() => setPreviewVideo(item)}
                            className="relative w-16 h-10 rounded-xl overflow-hidden bg-slate-900 border border-slate-200 shrink-0 group/thumb cursor-pointer shadow-2xs"
                          >
                            <img
                              src={thumb}
                              alt={item.title}
                              className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-200"
                              onError={(e) => {
                                e.target.src = 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800';
                              }}
                            />
                            <div className="absolute inset-0 m-auto w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md group-hover/thumb:scale-115 transition-transform">
                              <Play className="w-2.5 h-2.5 fill-white ml-0.5" />
                            </div>
                          </div>

                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 text-xs sm:text-[13px] leading-tight truncate">
                              {item.title}
                            </p>
                            <p className="text-[10.5px] text-slate-500 truncate mt-0.5">
                              {item.parentSubtitle || item.parentName || 'Rebirth Care Trust'}
                            </p>
                            <p className="text-[9.5px] text-slate-400 font-mono truncate mt-0.5">
                              ID: {yId || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* BENEFICIARY */}
                      <td className="px-3.5 py-2.5 align-middle whitespace-nowrap font-bold text-slate-800 text-xs">
                        {item.beneficiaryName || 'Rebirth Care Trust'}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-3.5 py-2.5 align-middle whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 text-[9.5px] font-semibold rounded-md inline-block">
                          {item.category || 'Child Healthcare'}
                        </span>
                      </td>

                      {/* AID PROVIDED */}
                      <td className="px-3.5 py-2.5 align-middle whitespace-nowrap font-bold text-[#DC2626] text-xs">
                        {item.aidProvided || 'Direct Medical Care'}
                      </td>

                      {/* LOCATION / DATE */}
                      <td className="px-3.5 py-2.5 align-middle whitespace-nowrap">
                        <p className="font-semibold text-slate-800 text-xs">
                          {item.location || 'Delhi NCR'}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-0.5">
                          {item.dateLabel || 'October 2026'}
                        </p>
                      </td>

                      {/* STATUS */}
                      <td className="px-3.5 py-2.5 align-middle whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md text-[9.5px] font-bold tracking-wide uppercase border ${
                            item.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {item.status === 'published' ? 'PUBLISHED' : 'DRAFT'}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-3.5 py-2.5 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setPreviewVideo(item)}
                            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Play Video"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleToggleFeatured(item._id, e)}
                            className={`p-1 rounded-md transition cursor-pointer ${
                              item.isFeatured
                                ? 'text-amber-500 hover:bg-amber-50'
                                : 'text-slate-400 hover:text-amber-500 hover:bg-amber-50'
                            }`}
                            title={item.isFeatured ? 'Featured (Click to unmark)' : 'Mark as Featured Proof'}
                          >
                            <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-amber-500' : ''}`} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleOpenEdit(item, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                            title="Edit Video"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => handleDelete(item._id, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete Video"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Summary Footer */}
        {filtered.length > 0 && (
          <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/80 flex items-center justify-between shrink-0">
            <span className="text-[10.5px] text-slate-400">
              Showing {filtered.length} of {videos.length} videos
            </span>
            {(search || filterCategory || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilterCategory('');
                  setFilterStatus('all');
                }}
                className="text-[10.5px] text-[#DC2626] hover:underline font-semibold cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Video Player Modal ── */}
      {previewVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewVideo(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <p className="text-xs text-slate-400 font-mono">
                  YouTube ID: {previewVideo.youtubeId || extractYoutubeId(previewVideo.youtubeUrl)}
                </p>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base mt-0.5">
                  {previewVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 shadow-xs cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${
                  previewVideo.youtubeId || extractYoutubeId(previewVideo.youtubeUrl)
                }?autoplay=1`}
                title={previewVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-white flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-slate-900">{previewVideo.beneficiaryName}</span>
                <span className="text-slate-400">•</span>
                <span>{previewVideo.location || 'Delhi NCR'}</span>
              </div>
              <a
                href={
                  previewVideo.youtubeUrl ||
                  `https://www.youtube.com/watch?v=${previewVideo.youtubeId}`
                }
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-700"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Video Modal ── */}
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
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {editingVideo ? 'Edit Video Review' : 'Upload Video Review'}
                  </h3>
                  <p className="text-xs text-slate-400">Authenticated parent testimonial & ground proof</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
              {/* YouTube Link with Live Thumbnail Preview */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  YouTube Video URL or Video ID *
                </label>
                <input
                  type="text"
                  required
                  value={formData.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=VV8h_j3XFkk or VV8h_j3XFkk"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition font-mono"
                />
                {extractYoutubeId(formData.youtubeUrl) && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-slate-50 rounded-xl border border-slate-200">
                    <img
                      src={`https://img.youtube.com/vi/${extractYoutubeId(formData.youtubeUrl)}/hqdefault.jpg`}
                      alt="Thumbnail Preview"
                      className="w-16 h-10 object-cover rounded-lg"
                    />
                    <div className="text-[11px]">
                      <p className="font-bold text-slate-800">YouTube Video Detected</p>
                      <p className="text-slate-500 font-mono">ID: {extractYoutubeId(formData.youtubeUrl)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Subtitle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Video Story Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Rebirth Care Trust"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Parent Subtitle / Org</label>
                  <input
                    type="text"
                    value={formData.parentSubtitle}
                    onChange={(e) => setFormData({ ...formData, parentSubtitle: e.target.value })}
                    placeholder="e.g. Rebirth Care Trust"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>
              </div>

              {/* Beneficiary & Aid Provided */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Beneficiary Name</label>
                  <input
                    type="text"
                    value={formData.beneficiaryName}
                    onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
                    placeholder="e.g. Rebirth Care Trust / Child Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Aid Provided</label>
                  <input
                    type="text"
                    value={formData.aidProvided}
                    onChange={(e) => setFormData({ ...formData, aidProvided: e.target.value })}
                    placeholder="e.g. Direct Medical Care"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition text-[#DC2626] font-semibold"
                  />
                </div>
              </div>

              {/* Category & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Child Healthcare"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Location & Date</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Delhi NCR"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                    />
                    <input
                      type="text"
                      value={formData.dateLabel}
                      onChange={(e) => setFormData({ ...formData, dateLabel: e.target.value })}
                      placeholder="e.g. October 2026"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                    />
                  </div>
                </div>
              </div>

              {/* Status & Featured Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="featProof"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 text-[#DC2626] rounded border-slate-300 focus:ring-red-400 cursor-pointer"
                  />
                  <label htmlFor="featProof" className="font-semibold text-slate-700 cursor-pointer">
                    Mark as Featured Proof
                  </label>
                </div>
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
                  {saving ? 'Saving...' : editingVideo ? 'Update Video' : 'Save Video'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
