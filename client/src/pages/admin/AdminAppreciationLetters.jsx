import React, { useState, useEffect, useRef } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { AdminPageHeader, AdminStatCard } from '../../components/admin/AdminUI';
import {
  FileText,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Edit2,
  Trash2,
  Star,
  X,
  Upload,
  Loader2,
  ExternalLink,
  Building2,
  ShieldCheck,
} from 'lucide-react';

const INITIAL_CERTIFICATES = [];

export const AdminAppreciationLetters = () => {
  const { settings, refreshSettings, showToast, formatINR } = useWebsite();

  const [docs, setDocs] = useState(() => {
    try {
      const stored = localStorage.getItem('rk_appreciation_letters');
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // If stored data contains the old mock cert items, clear it
          const hasOldMock = parsed.some(
            (d) => d._id?.startsWith?.('cert-') || d.fileUrl?.includes?.('proof-sheet')
          );
          if (hasOldMock) {
            localStorage.setItem('rk_appreciation_letters', '[]');
            return [];
          }
          return parsed;
        }
      }
    } catch {
      // fallback
    }
    return [];
  });

  const [search, setSearch] = useState('');
  const [filterHospital, setFilterHospital] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Modals state
  const [inspectDoc, setInspectDoc] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const fileInputRef = useRef(null);

  const defaultForm = {
    title: '',
    beneficiaryName: '',
    hospital: 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
    doctorName: 'Dr. Mohit Kumar Agrawal (Pediatrician & Neonatologist)',
    chequeNo: '',
    amount: 15000,
    issueDate: new Date().toISOString().split('T')[0],
    category: 'APPRECIATION LETTER',
    fileType: 'IMAGE',
    fileUrl: '',
    isFeatured: true,
    status: 'published',
  };

  const [formData, setFormData] = useState(defaultForm);

  // Sync settings when available
  useEffect(() => {
    if (settings?.appreciationLetters && Array.isArray(settings.appreciationLetters)) {
      // Strip any old mock letters
      const filtered = settings.appreciationLetters.filter(
        (l) => !l._id?.startsWith?.('cert-') && !l.fileUrl?.includes?.('proof-sheet')
      );
      setDocs(filtered);
      try {
        localStorage.setItem('rk_appreciation_letters', JSON.stringify(filtered));
      } catch {
        // ignore
      }
    } else {
      setDocs([]);
      try {
        localStorage.setItem('rk_appreciation_letters', '[]');
      } catch {
        // ignore
      }
    }
  }, [settings?.appreciationLetters]);

  const persistDocs = async (newDocs) => {
    setDocs(newDocs);
    try {
      localStorage.setItem('rk_appreciation_letters', JSON.stringify(newDocs));
    } catch {
      // ignore
    }
    try {
      const sanitized = newDocs.map((d) => {
        const item = { ...d };
        if (typeof item._id === 'string' && item._id.startsWith('cert-')) {
          delete item._id;
        }
        return item;
      });
      const res = await api.put('/settings', {
        appreciationLetters: sanitized,
      });
      if (res?.settings?.appreciationLetters) {
        setDocs(res.settings.appreciationLetters);
      }
      refreshSettings();
    } catch (err) {
      console.warn('API sync warning:', err.message);
    }
  };

  const handleDeleteAll = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete ALL appreciation letters? This will permanently remove all letters.'
      )
    )
      return;
    try {
      await persistDocs([]);
      showToast('All appreciation letters deleted successfully.', 'success');
    } catch (err) {
      showToast(err.message || 'Failed to delete letters', 'error');
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshSettings();
      showToast('Appreciation certificates refreshed.', 'success');
    } catch (err) {
      showToast(err.message || 'Error refreshing.', 'error');
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  };

  // Toggle Featured (Gold Star on Card)
  const handleToggleFeatured = async (docId, e) => {
    e.stopPropagation();
    const updated = docs.map((d) =>
      d._id === docId ? { ...d, isFeatured: !d.isFeatured } : d
    );
    await persistDocs(updated);
    const item = updated.find((d) => d._id === docId);
    showToast(
      item.isFeatured
        ? `Added to Featured on Portal!`
        : `Removed from Featured on Portal.`,
      'info'
    );
  };

  const handleOpenAdd = () => {
    setEditingDoc(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (doc, e) => {
    e.stopPropagation();
    setEditingDoc(doc);
    setFormData({
      title: doc.title || '',
      beneficiaryName: doc.beneficiaryName || '',
      hospital: doc.hospital || 'Girraj Ji Children Hospital, Sector 12A Gurgaon',
      doctorName: doc.doctorName || '',
      chequeNo: doc.chequeNo || '',
      amount: doc.amount || 15000,
      issueDate: doc.issueDate || new Date().toISOString().split('T')[0],
      category: doc.category || 'APPRECIATION LETTER',
      fileType: doc.fileType || 'IMAGE',
      fileUrl: doc.fileUrl || '',
      isFeatured: doc.isFeatured ?? true,
      status: doc.status || 'published',
    });
    setModalOpen(true);
  };

  const handleDelete = async (docId, e) => {
    e.stopPropagation();
    const target = docs.find((d) => d._id === docId);
    if (!window.confirm(`Delete certificate "${target?.title || 'this item'}"?`)) return;

    const updated = docs.filter((d) => d._id !== docId);
    await persistDocs(updated);
    showToast('Appreciation certificate deleted.', 'info');
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    setUploadingImg(true);
    try {
      const data = new FormData();
      data.append('image', file);
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (res?.url) {
        setFormData((prev) => ({
          ...prev,
          fileUrl: res.url,
          fileType: file.type.includes('pdf') ? 'PDF' : 'IMAGE',
        }));
        showToast('Certificate file uploaded successfully!', 'success');
      } else {
        throw new Error('Upload returned no URL');
      }
    } catch {
      // Local fallback to Base64
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          fileUrl: e.target.result,
          fileType: file.type.includes('pdf') ? 'PDF' : 'IMAGE',
        }));
        showToast('Certificate attached locally.', 'info');
      };
      reader.readAsDataURL(file);
    } finally {
      setUploadingImg(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.beneficiaryName && !formData.title) {
      showToast('Beneficiary or Title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      const fullTitle = formData.title || `${formData.beneficiaryName} – Hospital Relief Grant`;
      let updated;
      if (editingDoc) {
        updated = docs.map((d) =>
          d._id === editingDoc._id ? { ...d, ...formData, title: fullTitle } : d
        );
        showToast('Certificate updated successfully!', 'success');
      } else {
        const newEntry = {
          _id: `cert-${Date.now()}`,
          ...formData,
          title: fullTitle,
        };
        updated = [newEntry, ...docs];
        showToast('New appreciation letter published!', 'success');
      }
      await persistDocs(updated);
      setModalOpen(false);
    } catch (err) {
      showToast(err.message || 'Failed to save certificate', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Filter calculations
  const filtered = docs.filter((d) => {
    const q = search.toLowerCase();
    const titleMatch = (d.title || '').toLowerCase().includes(q);
    const bNameMatch = (d.beneficiaryName || '').toLowerCase().includes(q);
    const hospMatch = (d.hospital || '').toLowerCase().includes(q);
    const chqMatch = (d.chequeNo || '').toLowerCase().includes(q);
    const docMatch = (d.doctorName || '').toLowerCase().includes(q);

    const matchesSearch = !q || titleMatch || bNameMatch || hospMatch || chqMatch || docMatch;
    const matchesHosp = !filterHospital || (d.hospital || '').includes(filterHospital);

    return matchesSearch && matchesHosp;
  });

  // Unique hospitals for dropdown
  const uniqueHospitals = Array.from(
    new Set(docs.map((d) => (d.hospital || '').split(',')[0].trim()).filter(Boolean))
  );

  // KPI Calculations
  const totalDocs = docs.length;
  const partnerHospitalsCount = uniqueHospitals.length;
  const featuredCount = docs.filter((d) => d.isFeatured).length;
  const totalAidDisbursed = docs.reduce((acc, d) => acc + (Number(d.amount) || 0), 0);

  return (
    <div className="space-y-5 w-full min-w-0 font-sans">
      {/* ── Page Header ── */}
      <AdminPageHeader
        breadcrumb="Appreciation Letters"
        badge={`${totalDocs} Verified Letters`}
        title="Hospital Appreciation Letters & Proofs"
        subtitle="Manage authenticated letters of appreciation, hospital receipts, and PDF relief dossiers verified by attending doctors."
        actions={
          <>
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold text-[#374151] bg-white hover:bg-[#F9FAFB] border border-[#E5E7EB] shadow-sm transition cursor-pointer disabled:opacity-60"
              title="Refresh Certificates"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#6B7280] ${refreshing ? 'animate-spin text-[#14382C]' : ''}`} />
              <span>Refresh</span>
            </button>
            {docs.length > 0 && (
              <button
                onClick={handleDeleteAll}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold text-rose-600 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                title="Delete all appreciation letters"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete All</span>
              </button>
            )}
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-sm transition cursor-pointer active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5 text-[#F2D869]" />
              <span>Upload Certificates</span>
            </button>
          </>
        }
      />

      {/* ── 4 KPI Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <AdminStatCard
          label="Total Documents"
          value={totalDocs}
          subtext="Scanned & Verified"
          icon={FileText}
          accent="emerald"
        />
        <AdminStatCard
          label="Partner Hospitals"
          value={partnerHospitalsCount}
          subtext="Accredited Centers"
          icon={Building2}
          accent="blue"
        />
        <AdminStatCard
          label="Featured on Portal"
          value={featuredCount}
          subtext="Highlighted for Donors"
          icon={Star}
          accent="gold"
        />
        <AdminStatCard
          label="Aid Disbursed"
          value={`₹${totalAidDisbursed > 0 ? totalAidDisbursed.toLocaleString('en-IN') : '0'}`}
          subtext="Verified by Cheques"
          icon={ShieldCheck}
          accent="emerald"
        />
      </div>

      {/* ── Search & Filter Controls Bar ── */}
      <div className="flex flex-col sm:flex-row gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by beneficiary name, hospital, cheque #, or doctor..."
            className="w-full bg-white border border-[#E5E7EB] rounded-sm pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] shadow-sm transition"
          />
        </div>

        <div className="relative">
          <div className="flex items-center bg-white border border-[#E5E7EB] rounded-sm pl-3.5 pr-8 py-2.5 text-xs font-semibold text-[#374151] shadow-sm cursor-pointer min-w-[210px] focus-within:border-[#14382C]">
            <Filter className="w-3.5 h-3.5 text-[#14382C] mr-2 shrink-0" />
            <select
              value={filterHospital}
              onChange={(e) => setFilterHospital(e.target.value)}
              className="appearance-none bg-transparent w-full text-[#374151] font-semibold focus:outline-none cursor-pointer text-xs"
            >
              <option value="">Hospital: All Hospitals ({docs.length})</option>
              {uniqueHospitals.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ── 3-Column Certificate Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-[#E5E7EB] hover:border-[#14382C]/35 rounded-sm shadow-sm overflow-hidden flex flex-col justify-between group hover:shadow-md transition-all"
          >
            {/* Top Bar with Badges & Gold Star */}
            <div className="px-3.5 py-3 bg-[#F9FAFB] flex items-center justify-between border-b border-[#F1F5F9]">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#14382C] text-white uppercase tracking-wider">
                  {item.fileType || 'IMAGE'}
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 uppercase tracking-wider">
                  {item.status === 'published' ? 'Published' : 'Draft'}
                </span>
                <span className="text-[10px] font-semibold text-[#9CA3AF] uppercase tracking-wider truncate max-w-[120px]">
                  {item.issueDate || 'LETTER'}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleToggleFeatured(item._id, e)}
                title={item.isFeatured ? 'Featured on Portal (Click to unfeature)' : 'Mark Featured on Portal'}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  item.isFeatured
                    ? 'bg-amber-400 text-[#14382C] shadow-sm hover:scale-110'
                    : 'bg-white border border-[#E5E7EB] text-slate-300 hover:text-amber-500'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-[#14382C]' : ''}`} />
              </button>
            </div>

            {/* Document Scanned Preview Area */}
            <div
              onClick={() => setInspectDoc(item)}
              className="relative aspect-[1.35] bg-[#F9FAFB] p-3 overflow-hidden flex items-center justify-center cursor-pointer select-none"
            >
              {item.fileUrl ? (
                <img
                  src={item.fileUrl}
                  alt={item.title}
                  className="w-full h-full object-contain rounded-sm bg-white shadow-sm border border-[#E5E7EB]/70"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : null}

              {/* Styled Fallback / Clean Scanned Letter Rendering */}
              {(!item.fileUrl || item.fileUrl.includes('placeholder')) && (
                <div className="w-full h-full bg-white rounded-sm border border-[#E5E7EB] shadow-sm p-3 flex flex-col justify-between text-slate-800 font-sans">
                  <div>
                    <div className="flex justify-between items-start border-b border-[#F1F5F9] pb-1 mb-2">
                      <span className="text-[10px] font-bold tracking-tight text-[#111827] uppercase">
                        {item.hospital?.split(',')[0]}
                      </span>
                      <span className="text-[9px] text-[#9CA3AF] font-mono">
                        Date: {item.issueDate || '13/01/2024'}
                      </span>
                    </div>
                    <p className="text-[9px] text-[#6B7280] text-center uppercase tracking-widest font-sans font-bold mb-1">
                      Appreciation Letter
                    </p>
                    <p className="text-[8.5px] leading-relaxed text-[#374151]">
                      We are grateful to <strong className="font-semibold text-[#111827]">"RK Foundation"</strong> for providing financial help for parents of{' '}
                      <strong className="underline decoration-slate-300 font-semibold">{item.beneficiaryName}</strong> admitted under emergency situation for critical treatment.
                    </p>
                    <p className="text-[8.5px] leading-relaxed text-[#374151] mt-1">
                      Provided <strong className="text-[#14382C] font-bold">₹{(item.amount || 15000).toLocaleString('en-IN')}/-</strong> by cheque no.{' '}
                      <strong className="font-mono">{item.chequeNo || '528766'}</strong>.
                    </p>
                  </div>
                  <div className="flex justify-between items-end pt-1 border-t border-[#F1F5F9]">
                    <div className="w-8 h-8 rounded-full border border-[#14382C] text-[#14382C] flex items-center justify-center text-[6px] font-sans font-bold uppercase text-center p-0.5 leading-none">
                      Hospital Stamp
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-sans italic text-[#111827]">
                        {item.doctorName?.split('(')[0] || 'Authorized Signatory'}
                      </p>
                      <p className="text-[7px] text-[#9CA3AF] font-sans">Medical Superintendent</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0E241C]/65 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-sm bg-white text-[#14382C] font-bold text-xs shadow-lg transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Certificate</span>
                </span>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="px-4 py-3 bg-white flex items-center justify-between border-t border-[#F1F5F9]">
              <button
                type="button"
                onClick={() => setInspectDoc(item)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14382C] hover:underline transition cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={(e) => handleOpenEdit(item, e)}
                  title="Edit Certificate Details"
                  className="p-1.5 rounded-sm text-[#6B7280] hover:text-[#14382C] hover:bg-[#EAF3EE] transition cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleDelete(item._id, e)}
                  title="Delete Certificate"
                  className="p-1.5 rounded-sm text-[#9CA3AF] hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="bg-white border border-[#E5E7EB] rounded-sm p-12 text-center shadow-sm">
          <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-[#111827]">No appreciation letters found</h3>
          <p className="text-xs text-[#6B7280] mt-1">Upload scanned hospital relief letters or reset active filters.</p>
          {(search || filterHospital) && (
            <button
              onClick={() => {
                setSearch('');
                setFilterHospital('');
              }}
              className="mt-3 text-xs font-bold text-[#14382C] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}

      {/* ── Inspect Certificate Modal ── */}
      {inspectDoc && (
        <div
          className="fixed inset-0 z-50 bg-[#0E241C]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setInspectDoc(null)}
        >
          <div
            className="bg-white rounded-sm max-w-3xl w-full shadow-2xl max-h-[92vh] overflow-hidden flex flex-col border border-[#E5E7EB]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F9FAFB]">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#14382C] text-white">
                    VERIFIED CERTIFICATE
                  </span>
                  <span className="text-xs text-[#6B7280] font-mono">
                    Cheque #{inspectDoc.chequeNo || 'N/A'}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-sans font-semibold text-[#111827] mt-1 truncate">
                  {inspectDoc.title || `${inspectDoc.beneficiaryName} Relief Letter`}
                </h3>
              </div>
              <button
                onClick={() => setInspectDoc(null)}
                className="w-8 h-8 rounded-sm bg-white border border-[#E5E7EB] flex items-center justify-center text-[#6B7280] hover:text-[#111827] shadow-sm cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-[#F9FAFB]/50 flex flex-col items-center justify-center custom-admin-scrollbar">
              {inspectDoc.fileUrl ? (
                <div className="relative rounded-sm overflow-hidden bg-white shadow-md border border-[#E5E7EB] max-h-[58vh]">
                  <img
                    src={inspectDoc.fileUrl}
                    alt={inspectDoc.title}
                    className="max-h-[58vh] w-auto object-contain mx-auto"
                  />
                </div>
              ) : (
                <div className="p-8 bg-white rounded-sm border border-[#E5E7EB] text-center max-w-md shadow-sm">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#111827]">Scanned Document Proof</p>
                  <p className="text-xs text-[#6B7280] mt-1">
                    Beneficiary: {inspectDoc.beneficiaryName} | Hospital: {inspectDoc.hospital}
                  </p>
                </div>
              )}

              <div className="w-full mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-white rounded-sm border border-[#E5E7EB] text-center shadow-sm">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Beneficiary</p>
                  <p className="text-xs font-bold text-[#111827] mt-0.5 truncate">{inspectDoc.beneficiaryName || 'Child'}</p>
                </div>
                <div className="p-3 bg-white rounded-sm border border-[#E5E7EB] text-center shadow-sm">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Aid Amount</p>
                  <p className="text-xs font-extrabold text-[#14382C] mt-0.5">₹{(inspectDoc.amount || 15000).toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 bg-white rounded-sm border border-[#E5E7EB] text-center shadow-sm">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Cheque #</p>
                  <p className="text-xs font-bold text-[#111827] font-mono mt-0.5">{inspectDoc.chequeNo || '528766'}</p>
                </div>
                <div className="p-3 bg-white rounded-sm border border-[#E5E7EB] text-center shadow-sm">
                  <p className="text-[10px] font-bold text-[#9CA3AF] uppercase">Date</p>
                  <p className="text-xs font-bold text-[#111827] mt-0.5">{inspectDoc.issueDate || '2024-01-13'}</p>
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-white border-t border-[#F1F5F9] flex items-center justify-between">
              <span className="text-xs text-[#6B7280] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#14382C]" />
                <span className="truncate max-w-xs">{inspectDoc.hospital}</span>
              </span>

              <div className="flex items-center gap-2">
                {inspectDoc.fileUrl && (
                  <a
                    href={inspectDoc.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-semibold text-[#14382C] bg-[#EAF3EE] hover:bg-[#E4EFEA] border border-[#14382C]/20 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Original</span>
                  </a>
                )}
                <button
                  onClick={() => setInspectDoc(null)}
                  className="px-4 py-2 rounded-sm text-xs font-bold text-white bg-[#14382C] hover:bg-[#1B4D3E] transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Add / Edit Certificate Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#0E241C]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-sm max-w-xl w-full shadow-2xl max-h-[92vh] overflow-y-auto border border-[#E5E7EB] custom-admin-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 sm:p-6 border-b border-[#F1F5F9] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-sm bg-[#EAF3EE] text-[#14382C] border border-[#14382C]/15 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-[#111827] text-lg">
                    {editingDoc ? 'Edit Hospital Certificate' : 'Upload Hospital Appreciation Certificate'}
                  </h3>
                  <p className="text-xs text-[#6B7280]">Authenticated hospital financial relief documentation</p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#9CA3AF] hover:text-[#111827] p-1.5 rounded-sm bg-[#F9FAFB] hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    Beneficiary Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.beneficiaryName}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        beneficiaryName: e.target.value,
                        title: formData.title || `${e.target.value} – Hospital Relief Grant`,
                      })
                    }
                    placeholder="e.g. Baby of Tayaba"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    Cheque # / Reference
                  </label>
                  <input
                    type="text"
                    value={formData.chequeNo}
                    onChange={(e) => setFormData({ ...formData, chequeNo: e.target.value })}
                    placeholder="e.g. 528766"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">
                  Partner Hospital Name & Branch *
                </label>
                <input
                  type="text"
                  required
                  value={formData.hospital}
                  onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
                  placeholder="e.g. Girraj Ji Children Hospital, Sector 12A Gurgaon"
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    Attending Doctor / Signatory
                  </label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    placeholder="e.g. Dr. Mohit Kumar Agrawal"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">
                    Aid Disbursed (₹)
                  </label>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) || 0 })}
                    placeholder="15000"
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Letter / Receipt Date</label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] mb-1.5">Publication Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition"
                  >
                    <option value="published">Published (Visible to Donors)</option>
                    <option value="draft">Draft (Internal Only)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#374151] mb-1.5">
                  Scanned Letter Image / PDF File
                </label>
                {formData.fileUrl && (
                  <div className="relative rounded-sm overflow-hidden border border-[#E5E7EB] aspect-video bg-[#F9FAFB] max-h-40 mb-2">
                    <img
                      src={formData.fileUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, fileUrl: '' })}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#0E241C]/75 text-white flex items-center justify-center hover:bg-rose-600 transition cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    placeholder="/appreciation/... or image URL"
                    className="flex-1 px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] transition text-xs"
                  />
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImg}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm text-xs font-semibold text-white bg-[#14382C] hover:bg-[#1B4D3E] transition cursor-pointer disabled:opacity-60 shrink-0"
                  >
                    {uploadingImg ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#F2D869]" />
                    ) : (
                      <Upload className="w-3.5 h-3.5 text-[#F2D869]" />
                    )}
                    <span>Upload Proof</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-sm bg-amber-50/70 border border-amber-200/80">
                <div className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  <div>
                    <p className="font-bold text-[#111827] text-xs">Featured on Portal</p>
                    <p className="text-[11px] text-[#6B7280]">Highlight with gold star in donor public gallery</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-[#14382C] rounded cursor-pointer"
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
                  {saving ? 'Saving...' : editingDoc ? 'Update Certificate' : 'Save Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
