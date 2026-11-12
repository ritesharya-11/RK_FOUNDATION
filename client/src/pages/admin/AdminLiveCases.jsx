import React, { useState, useEffect, useRef } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Heart,
  Plus,
  RefreshCw,
  Search,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Upload,
  Loader2,
  Edit2,
  Trash2,
  ExternalLink,
  X,
  Share2,
  Image as ImageIcon,
} from 'lucide-react';

export const AdminLiveCases = () => {
  const { formatINR, showToast } = useWebsite();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [transferringId, setTransferringId] = useState(null);
  const fileRef = useRef(null);

  const defaultForm = {
    beneficiaryName: '',
    beneficiaryAge: '',
    beneficiaryGender: 'Female',
    condition: '',
    hospital: '',
    targetAmount: 250000,
    raisedAmount: 0,
    status: 'active',
    consentStatus: 'CERTIFIED',
    coverImage: '',
    summary: '',
    story: '',
    isUrgent: true,
    isFeatured: true,
  };

  const [formData, setFormData] = useState(defaultForm);

  const fetchLiveCases = async (quiet = false) => {
    if (!quiet) setLoading(true);
    else setRefreshing(true);
    try {
      const res = await api.get('/projects?all=true');
      if (res?.success || res?.projects) {
        setCases(res.projects || []);
      }
    } catch (err) {
      showToast(err.message || 'Error loading live emergency cases', 'error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLiveCases();
  }, []);

  // Filter calculations
  const filtered = cases.filter((c) => {
    const q = search.toLowerCase();
    const bName = (c.beneficiaryNameOrGroup || c.title || '').toLowerCase();
    const cond = (c.condition || c.title || '').toLowerCase();
    const hosp = (c.hospital || c.location || '').toLowerCase();
    const slug = (c.slug || '').toLowerCase();

    const matchesSearch = !q || bName.includes(q) || cond.includes(q) || hosp.includes(q) || slug.includes(q);

    let matchesStatus = true;
    if (filterStatus === 'active') {
      matchesStatus = c.status === 'active' && !c.inImpact;
    } else if (filterStatus === 'completed') {
      matchesStatus = c.status === 'completed' || c.inImpact;
    } else if (filterStatus === 'paused') {
      matchesStatus = c.status === 'paused';
    }

    return matchesSearch && matchesStatus;
  });

  // KPI Metrics Calculation
  const activeAppealsCount = cases.filter((c) => c.status === 'active' && !c.inImpact).length;
  const curedCount = cases.filter((c) => c.status === 'completed' || c.inImpact).length;
  const totalTarget = cases.reduce((acc, c) => acc + (Number(c.targetAmount) || 0), 0);
  const totalRaised = cases.reduce((acc, c) => acc + (Number(c.raisedAmount) || 0), 0);

  const handleOpenAdd = () => {
    setEditingCase(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingCase(item);
    setFormData({
      beneficiaryName: item.beneficiaryNameOrGroup || item.title || '',
      beneficiaryAge: item.beneficiaryAge || '',
      beneficiaryGender: item.beneficiaryGender || 'Female',
      condition: item.condition || item.title || '',
      hospital: item.hospital || item.location || '',
      targetAmount: item.targetAmount || 100000,
      raisedAmount: item.raisedAmount || 0,
      status: item.status || 'active',
      consentStatus: item.consentStatus || 'CERTIFIED',
      coverImage: item.coverImage || '',
      summary: item.summary || '',
      story: item.story || '',
      isUrgent: item.isUrgent ?? true,
      isFeatured: item.isFeatured ?? true,
    });
    setModalOpen(true);
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
        setFormData((prev) => ({ ...prev, coverImage: res.imageUrl }));
        showToast('Beneficiary photo uploaded!', 'success');
      }
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (!formData.beneficiaryName && !formData.condition) {
      showToast('Please provide beneficiary name or condition', 'error');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: formData.condition || formData.beneficiaryName,
        category: 'Urgent Medical Relief',
        beneficiaryNameOrGroup: formData.beneficiaryName,
        beneficiaryAge: formData.beneficiaryAge,
        beneficiaryGender: formData.beneficiaryGender,
        condition: formData.condition,
        hospital: formData.hospital,
        location: formData.hospital || 'Delhi-NCR',
        targetAmount: Number(formData.targetAmount) || 100000,
        raisedAmount: Number(formData.raisedAmount) || 0,
        status: formData.status,
        consentStatus: formData.consentStatus,
        coverImage: formData.coverImage,
        summary: formData.summary || `${formData.condition} treatment at ${formData.hospital}`,
        story: formData.story || `${formData.beneficiaryName} is fighting ${formData.condition} requiring urgent medical relief.`,
        isUrgent: formData.isUrgent,
        isFeatured: formData.isFeatured,
      };

      if (editingCase?._id) {
        await api.put(`/projects/${editingCase._id}`, payload);
        showToast('Beneficiary case updated successfully!', 'success');
      } else {
        await api.post('/projects', payload);
        showToast('New emergency case published successfully!', 'success');
      }
      setModalOpen(false);
      fetchLiveCases(true);
    } catch (err) {
      showToast(err.message || 'Failed to save case.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleTransferToImpact = async (item) => {
    if (item.inImpact) {
      showToast('Case is already recorded in Our Impact.', 'info');
      return;
    }
    if (!window.confirm(`Transfer "${item.beneficiaryNameOrGroup || item.title}" to Our Impact as a cured recovery?`)) {
      return;
    }

    setTransferringId(item._id);
    try {
      await api.put(`/projects/${item._id}`, {
        inImpact: true,
        status: 'completed',
      });
      showToast('Successfully transferred hospital recovery to Our Impact!', 'success');
      fetchLiveCases(true);
    } catch (err) {
      showToast(err.message || 'Transfer failed', 'error');
    } finally {
      setTransferringId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this beneficiary emergency case?')) return;
    try {
      await api.delete(`/projects/${id}`);
      showToast('Emergency case deleted successfully.', 'info');
      fetchLiveCases(true);
    } catch (err) {
      showToast(err.message || 'Failed to delete case.', 'error');
    }
  };

  return (
    <div className="space-y-5">
      {/* ── Page Header (Breadcrumbs + Title + Action Buttons) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            Live Beneficiary Emergency Cases
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage live emergency cases, verified medical dossiers, and transfer completed hospital recoveries directly to Our Impact.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => fetchLiveCases(true)}
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
            New Beneficiary Case
          </button>
        </div>
      </div>

      {/* ── Top 4 Metric KPI Cards (Matches Screenshot Format) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ACTIVE APPEALS */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ACTIVE APPEALS</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {activeAppealsCount} <span className="text-xs font-semibold text-slate-400">cases</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
            <Heart className="w-5 h-5 text-[#DC2626]" />
          </div>
        </div>

        {/* COMPLETED / IN IMPACT */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">COMPLETED / IN IMPACT</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {curedCount} <span className="text-xs font-semibold text-slate-400">cured</span>
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
        </div>

        {/* TOTAL EMERGENCY TARGET */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL EMERGENCY TARGET</p>
            <p className="text-2xl font-black text-slate-900 mt-1">
              {formatINR(totalTarget)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-blue-500" />
          </div>
        </div>

        {/* VERIFIED RAISED */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xs">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">VERIFIED RAISED</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">
              {formatINR(totalRaised)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by beneficiary name, condition, hospital, or slug..."
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-400 shadow-xs transition"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-slate-200 rounded-xl pl-3.5 pr-9 py-2.5 text-xs text-slate-700 font-semibold focus:outline-none focus:border-red-400 shadow-xs cursor-pointer transition min-w-[160px]"
          >
            <option value="all">All Statuses ({cases.length})</option>
            <option value="active">Active Appeals ({activeAppealsCount})</option>
            <option value="completed">Completed / In Impact ({curedCount})</option>
            <option value="paused">Paused ({cases.filter((c) => c.status === 'paused').length})</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Live Cases Table (Exact Match to Screenshot Format) ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm w-full sticky top-[104px] z-10 flex flex-col max-h-[calc(100vh-124px)]">
        <div className="w-full overflow-x-auto overflow-y-auto flex-1 custom-admin-scrollbar rounded-t-2xl">
          <table className="w-full text-left text-xs min-w-full border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 shadow-xs">
              <tr>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider rounded-tl-2xl">BENEFICIARY</th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">CONDITION & HOSPITAL</th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">TARGET NEED</th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider">RAISED</th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">STATUS & LIFECYCLE</th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">CONSENT</th>
                <th className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 px-5 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right rounded-tr-2xl">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Loader2 className="w-6 h-6 text-slate-400 animate-spin mx-auto mb-2" />
                    <p className="text-xs text-slate-400">Loading emergency cases...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-16 text-center">
                    <Heart className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                    <p className="text-xs text-slate-400">No emergency cases found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const bName = item.beneficiaryNameOrGroup || item.title;
                  const ageSubtitle = [
                    item.beneficiaryAge,
                    item.beneficiaryGender,
                  ].filter(Boolean).join(' • ') || 'Verified Beneficiary';

                  const condTitle = item.condition || item.title;
                  const hospSubtitle = item.hospital || item.location || 'Delhi-NCR & Western UP';

                  return (
                    <tr key={item._id} className="hover:bg-slate-50/70 transition-colors">
                      {/* BENEFICIARY: Photo + Name + Subtitle (Age • Gender) */}
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                            {item.coverImage ? (
                              <img
                                src={item.coverImage}
                                alt={bName}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="w-4 h-4 text-slate-300" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm leading-snug">
                              {bName}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              {ageSubtitle}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* CONDITION & HOSPITAL: Condition Name + Hospital Address */}
                      <td className="px-5 py-3.5">
                        <div className="max-w-xs sm:max-w-md">
                          <p className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                            {condTitle}
                          </p>
                          <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                            {hospSubtitle}
                          </p>
                        </div>
                      </td>

                      {/* TARGET NEED: Bold formatted currency */}
                      <td className="px-5 py-3.5 font-bold text-slate-900 text-sm whitespace-nowrap">
                        {formatINR(item.targetAmount || 0)}
                      </td>

                      {/* RAISED: Bold Emerald figure */}
                      <td className="px-5 py-3.5 font-bold text-emerald-600 text-sm whitespace-nowrap">
                        {formatINR(item.raisedAmount || 0)}
                      </td>

                      {/* STATUS & LIFECYCLE: Pill badge */}
                      <td className="px-5 py-3.5 text-center whitespace-nowrap">
                        {item.inImpact || item.status === 'completed' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                            IN IMPACT / CURED
                          </span>
                        ) : item.status === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-blue-50 text-blue-600 border border-blue-200">
                            ACTIVE APPEAL
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-500 border border-slate-200">
                            PAUSED
                          </span>
                        )}
                      </td>

                      {/* CONSENT: Pill badge */}
                      <td className="px-5 py-3.5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {item.consentStatus || 'CERTIFIED'}
                        </span>
                      </td>

                      {/* ACTIONS: Transfer to Impact + External + Edit + Trash */}
                      <td className="px-5 py-3.5 text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleTransferToImpact(item)}
                            disabled={item.inImpact || transferringId === item._id}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer border ${
                              item.inImpact
                                ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-default'
                                : 'bg-emerald-50/70 hover:bg-emerald-100 text-emerald-700 border-emerald-200 shadow-2xs'
                            }`}
                            title="Transfer completed recovery to Our Impact"
                          >
                            {transferringId === item._id ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Share2 className="w-3.5 h-3.5" />
                            )}
                            <span>{item.inImpact ? 'Transferred' : 'Transfer to Impact'}</span>
                          </button>

                          <a
                            href={`/projects/${item.slug || item._id}`}
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
                            title="Edit Case"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete Case"
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
          <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex items-center justify-between shrink-0">
            <span className="text-[11px] text-slate-400">
              Showing {filtered.length} of {cases.length} emergency cases
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

      {/* ── Add / Edit Beneficiary Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingCase ? 'Edit Beneficiary Case' : 'New Beneficiary Case'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {editingCase ? `Editing: ${editingCase.beneficiaryNameOrGroup || editingCase.title}` : 'Launch a verified live emergency appeal'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="px-6 py-5 space-y-4 text-xs">
              {/* Beneficiary Name + Age + Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block font-semibold text-slate-700 mb-1">Beneficiary Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.beneficiaryName}
                    onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                    placeholder="e.g. Gita Kumari"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age (e.g. 1 Years, 12 Days)</label>
                  <input
                    type="text"
                    value={formData.beneficiaryAge}
                    onChange={(e) => setFormData({ ...formData, beneficiaryAge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                    placeholder="e.g. 1 Years"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.beneficiaryGender}
                    onChange={(e) => setFormData({ ...formData, beneficiaryGender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Child / Infant">Child / Infant</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Condition / Diagnosis */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medical Condition / Diagnosis *</label>
                <input
                  type="text"
                  required
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  placeholder="e.g. Congenital Heart Defect (Ventricular Septal Defect)"
                />
              </div>

              {/* Hospital Address / Location */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hospital & Treatment Location Address *</label>
                <input
                  type="text"
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  placeholder="e.g. 4/9 Rattan Garden, New Colony Mor, Gurugram, Haryana-122001"
                />
              </div>

              {/* Target Need + Raised So Far */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Need (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Raised So Far (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.raisedAmount}
                    onChange={(e) => setFormData({ ...formData, raisedAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  />
                </div>
              </div>

              {/* Status + Consent Status */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status & Lifecycle</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  >
                    <option value="active">Active Appeal</option>
                    <option value="completed">Target Achieved / Completed</option>
                    <option value="paused">Temporarily Paused</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Guardian Consent Verification</label>
                  <select
                    value={formData.consentStatus}
                    onChange={(e) => setFormData({ ...formData, consentStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                  >
                    <option value="CERTIFIED">CERTIFIED</option>
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
              </div>

              {/* Cover Photo Upload */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Beneficiary Photo</label>
                <div className="space-y-2">
                  {formData.coverImage && (
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-video bg-slate-100 max-h-40">
                      <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: '' })}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition"
                      placeholder="https://... or choose image file"
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

              {/* Story / Background */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Case Story & Emergency Details</label>
                <textarea
                  rows={3}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-400 transition resize-y"
                  placeholder="Detailed background regarding surgical timeline, doctor recommendations..."
                />
              </div>

              {/* Modal Buttons */}
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
                  {saving ? 'Saving...' : editingCase ? 'Update Case' : 'Launch Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
