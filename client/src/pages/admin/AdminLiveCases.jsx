import React, { useState, useEffect, useRef } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { AdminPageHeader, AdminStatCard } from '../../components/admin/AdminUI';
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
    <div className="space-y-5 w-full min-w-0 font-sans">
      {/* ── Page Header ── */}
      <AdminPageHeader
        breadcrumb="Live Emergency Cases"
        badge={`${activeAppealsCount} Active Appeals`}
        title="Live Beneficiary Emergency Cases"
        subtitle="Manage live emergency medical cases, verified dossiers, and transfer completed hospital recoveries directly to Our Impact."
        actions={
          <>
            <button
              onClick={() => fetchLiveCases(true)}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold text-[#374151] bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] shadow-sm transition cursor-pointer disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#6B7280] ${refreshing ? 'animate-spin text-[#14382C]' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-sm transition cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5 text-[#F2D869]" />
              New Beneficiary Case
            </button>
          </>
        }
      />

      {/* ── Top 4 Metric KPI Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <AdminStatCard
          label="Active Appeals"
          value={activeAppealsCount}
          subtext="Urgent Medical Cases"
          icon={Heart}
          accent="rose"
        />
        <AdminStatCard
          label="Completed / In Impact"
          value={curedCount}
          subtext="Recovered Beneficiaries"
          icon={CheckCircle2}
          accent="emerald"
        />
        <AdminStatCard
          label="Total Emergency Target"
          value={formatINR(totalTarget)}
          subtext="Estimated Medical Aid"
          icon={ShieldCheck}
          accent="blue"
        />
        <AdminStatCard
          label="Verified Raised"
          value={formatINR(totalRaised)}
          subtext="Disbursed & Pledged"
          icon={Sparkles}
          accent="gold"
        />
      </div>

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by beneficiary name, condition, hospital, or slug..."
            className="w-full bg-white border border-[#E5E7EB] rounded-sm pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] shadow-sm transition"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none bg-white border border-[#E5E7EB] rounded-sm pl-3.5 pr-9 py-2.5 text-xs text-[#374151] font-semibold focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] shadow-sm cursor-pointer transition min-w-[170px]"
          >
            <option value="all">All Statuses ({cases.length})</option>
            <option value="active">Active Appeals ({activeAppealsCount})</option>
            <option value="completed">Completed / In Impact ({curedCount})</option>
            <option value="paused">Paused ({cases.filter((c) => c.status === 'paused').length})</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Live Cases Table ── */}
      <div className="bg-white border border-[#E5E7EB] rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-admin-scrollbar">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-[11.5px] font-medium text-[#6B7280]">Beneficiary</th>
                <th className="px-4 py-3 text-[11.5px] font-medium text-[#6B7280]">Condition & Hospital</th>
                <th className="px-4 py-3 text-[11.5px] font-medium text-[#6B7280]">Target Need</th>
                <th className="px-4 py-3 text-[11.5px] font-medium text-[#6B7280]">Raised</th>
                <th className="px-4 py-3 text-[11.5px] font-medium text-[#6B7280] text-center">Status & Lifecycle</th>
                <th className="px-4 py-3 text-[11.5px] font-medium text-[#6B7280] text-center">Consent</th>
                <th className="px-4 py-3 text-[11.5px] font-medium text-[#6B7280] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <Loader2 className="w-5 h-5 text-[#14382C] animate-spin mx-auto mb-1.5" />
                    <p className="text-xs text-[#9CA3AF]">Loading emergency cases...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <Heart className="w-7 h-7 text-slate-300 mx-auto mb-1.5" />
                    <p className="text-xs text-[#9CA3AF]">No emergency cases found</p>
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
                    <tr key={item._id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                      <td className="px-4 py-3 align-middle whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-sm overflow-hidden bg-[#F9FAFB] border border-[#E5E7EB] shrink-0">
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
                            <p className="font-bold text-[#111827] text-xs sm:text-sm leading-snug">
                              {bName}
                            </p>
                            <p className="text-[11px] text-[#6B7280] mt-0.5">
                              {ageSubtitle}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3 align-middle">
                        <div className="max-w-xs sm:max-w-md">
                          <p className="font-bold text-[#111827] text-xs line-clamp-1">
                            {condTitle}
                          </p>
                          <p className="text-[11px] text-[#6B7280] line-clamp-1 mt-0.5">
                            {hospSubtitle}
                          </p>
                        </div>
                      </td>

                      <td className="px-4 py-3 align-middle font-bold text-[#111827] text-xs sm:text-sm whitespace-nowrap">
                        {formatINR(item.targetAmount || 0)}
                      </td>

                      <td className="px-4 py-3 align-middle font-bold text-[#14382C] text-xs sm:text-sm whitespace-nowrap">
                        {formatINR(item.raisedAmount || 0)}
                      </td>

                      <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                        {item.inImpact || item.status === 'completed' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                            IN IMPACT / CURED
                          </span>
                        ) : item.status === 'active' ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-sky-50 text-sky-700 border border-sky-200/80">
                            ACTIVE APPEAL
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-[#6B7280] border border-[#E5E7EB]">
                            PAUSED
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 align-middle text-center whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-[#EAF3EE] text-[#14382C] border border-[#14382C]/15">
                          {item.consentStatus || 'CERTIFIED'}
                        </span>
                      </td>

                      <td className="px-4 py-3 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleTransferToImpact(item)}
                            disabled={item.inImpact || transferringId === item._id}
                            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-sm text-[11px] font-semibold transition cursor-pointer border ${
                              item.inImpact
                                ? 'bg-slate-50 text-[#9CA3AF] border-[#E5E7EB] cursor-default'
                                : 'bg-[#EAF3EE] hover:bg-[#14382C] text-[#14382C] hover:text-white border-[#14382C]/20 shadow-sm'
                            }`}
                            title="Transfer completed recovery to Our Impact"
                          >
                            {transferringId === item._id ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              <Share2 className="w-3 h-3" />
                            )}
                            <span>{item.inImpact ? 'Transferred' : 'Transfer to Impact'}</span>
                          </button>

                          <a
                            href={`/projects/${item.slug || item._id}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-sm text-[#9CA3AF] hover:text-[#14382C] hover:bg-[#EAF3EE] transition"
                            title="Public View"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-sm text-[#6B7280] hover:text-[#14382C] hover:bg-[#EAF3EE] transition cursor-pointer"
                            title="Edit Case"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-1.5 rounded-sm text-[#9CA3AF] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
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
          <div className="px-4 py-3 border-t border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-between shrink-0">
            <span className="text-xs text-[#6B7280]">
              Showing <strong className="text-[#111827]">{filtered.length}</strong> of <strong className="text-[#111827]">{cases.length}</strong> emergency cases
            </span>
            {(search || filterStatus !== 'all') && (
              <button
                onClick={() => {
                  setSearch('');
                  setFilterStatus('all');
                }}
                className="text-xs text-[#14382C] hover:underline font-semibold cursor-pointer"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── Add / Edit Beneficiary Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0E241C]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-2xl w-full shadow-2xl max-h-[92vh] overflow-y-auto border border-[#E5E7EB] custom-admin-scrollbar">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-lg font-sans font-semibold text-[#111827]">
                  {editingCase ? 'Edit Beneficiary Case' : 'New Beneficiary Case'}
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  {editingCase ? `Editing: ${editingCase.beneficiaryNameOrGroup || editingCase.title}` : 'Launch a verified live emergency appeal'}
                </p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-sm bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] hover:bg-slate-200 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="px-6 py-5 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Beneficiary Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.beneficiaryName}
                    onChange={(e) => setFormData({ ...formData, beneficiaryName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                    placeholder="e.g. Gita Kumari"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Age (e.g. 1 Years, 12 Days)</label>
                  <input
                    type="text"
                    value={formData.beneficiaryAge}
                    onChange={(e) => setFormData({ ...formData, beneficiaryAge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                    placeholder="e.g. 1 Years"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Gender</label>
                  <select
                    value={formData.beneficiaryGender}
                    onChange={(e) => setFormData({ ...formData, beneficiaryGender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Child / Infant">Child / Infant</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">Medical Condition / Diagnosis *</label>
                <input
                  type="text"
                  required
                  value={formData.condition}
                  onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  placeholder="e.g. Congenital Heart Defect (Ventricular Septal Defect)"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">Hospital & Treatment Location Address *</label>
                <input
                  type="text"
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  placeholder="e.g. 4/9 Rattan Garden, New Colony Mor, Gurugram, Haryana-122001"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Target Need (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Raised So Far (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.raisedAmount}
                    onChange={(e) => setFormData({ ...formData, raisedAmount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Status & Lifecycle</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  >
                    <option value="active">Active Appeal</option>
                    <option value="completed">Target Achieved / Completed</option>
                    <option value="paused">Temporarily Paused</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Guardian Consent Verification</label>
                  <select
                    value={formData.consentStatus}
                    onChange={(e) => setFormData({ ...formData, consentStatus: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  >
                    <option value="CERTIFIED">CERTIFIED</option>
                    <option value="VERIFIED">VERIFIED</option>
                    <option value="PENDING">PENDING</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">Beneficiary Photo</label>
                <div className="space-y-2">
                  {formData.coverImage && (
                    <div className="relative rounded-sm overflow-hidden border border-[#E5E7EB] aspect-video bg-[#F9FAFB] max-h-40">
                      <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, coverImage: '' })}
                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0E241C]/75 text-white flex items-center justify-center hover:bg-rose-600 transition cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="flex-1 px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition text-xs"
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
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold text-white bg-[#14382C] hover:bg-[#1B4D3E] transition cursor-pointer disabled:opacity-60 shrink-0"
                    >
                      {uploadingImg ? <Loader2 className="w-3.5 h-3.5 animate-spin text-[#F2D869]" /> : <Upload className="w-3.5 h-3.5 text-[#F2D869]" />}
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">Case Story & Emergency Details</label>
                <textarea
                  rows={3}
                  value={formData.story}
                  onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition resize-y"
                  placeholder="Detailed background regarding surgical timeline, doctor recommendations..."
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-sm bg-[#F9FAFB] hover:bg-slate-200 text-[#374151] font-semibold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-sm bg-[#14382C] hover:bg-[#1B4D3E] text-white font-bold text-xs shadow-sm transition cursor-pointer disabled:opacity-60"
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
