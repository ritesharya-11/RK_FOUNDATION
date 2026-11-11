import React, { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  FileCheck,
  Plus,
  Save,
  Trash2,
  FileText,
  ExternalLink,
  ShieldCheck,
  Building2,
  Calendar,
  X,
  Eye,
} from 'lucide-react';

export const AdminAppreciationLetters = () => {
  const { settings, refreshSettings, showToast } = useWebsite();

  const initialDocs = settings.appreciationLetters?.length > 0 ? settings.appreciationLetters : [
    {
      _id: 'doc-1',
      title: 'Section 80G Registration Order',
      authority: 'Office of the Commissioner of Income Tax (Exemption), Delhi',
      certificateNo: 'CIT(E)/DELHI/80G/2021-22/A/1045',
      issueDate: '2021-08-15',
      category: 'Statutory 80G Tax Exemption',
      fileUrl: '/certificates/80g.pdf',
      isActive: true,
    },
    {
      _id: 'doc-2',
      title: 'Section 12A Registration Order',
      authority: 'Income Tax Department, Ministry of Finance, Govt of India',
      certificateNo: 'CIT(E)/DELHI/12A/2021-22/A/2088',
      issueDate: '2021-08-15',
      category: '12A Non-Profit Entity Status',
      fileUrl: '/certificates/12a.pdf',
      isActive: true,
    },
    {
      _id: 'doc-3',
      title: 'NITI Aayog NGO Darpan Registration',
      authority: 'NITI Aayog, Planning Commission, Government of India',
      certificateNo: 'DL/2021/0298412',
      issueDate: '2021-04-10',
      category: 'Government Accreditation',
      fileUrl: '/certificates/darpan.pdf',
      isActive: true,
    },
    {
      _id: 'doc-4',
      title: 'District Relief Appreciation Letter',
      authority: 'Office of the District Magistrate, Delhi-NCR Relief Cell',
      certificateNo: 'DM/NCR/RELIEF/2023/419',
      issueDate: '2023-11-20',
      category: 'Donor & State Appreciation',
      fileUrl: '/certificates/dm-appreciation.pdf',
      isActive: true,
    },
  ];

  const [docs, setDocs] = useState(initialDocs);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    authority: '',
    certificateNo: '',
    issueDate: '',
    category: 'Statutory 80G Tax Exemption',
    fileUrl: '',
    isActive: true,
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      authority: '',
      certificateNo: '',
      issueDate: new Date().toISOString().split('T')[0],
      category: 'Statutory 80G Tax Exemption',
      fileUrl: '',
      isActive: true,
    });
    setModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Title is required.', 'error');
      return;
    }
    const newDoc = { ...formData, _id: `doc-${Date.now()}` };
    setDocs([...docs, newDoc]);
    setModalOpen(false);
    showToast('Document added to queue. Click "Publish All Documents" to save.', 'info');
  };

  const handleDelete = (id) => {
    setDocs(docs.filter((d) => d._id !== id));
    showToast('Document removed. Remember to publish changes.', 'info');
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await api.put('/settings', {
        appreciationLetters: docs,
      });
      if (res?.success) {
        showToast('Appreciation letters & legal compliance updated successfully!', 'success');
        refreshSettings();
      }
    } catch (err) {
      showToast(err.message || 'Failed to save documents.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/10 text-red-500">
              <FileCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Appreciation Letters & Compliance</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Maintain government sanctions, 80G/12A registrations, statutory certificates, and official donor commendations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleOpenAdd}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Document</span>
          </button>

          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Publish All Documents'}</span>
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {docs.map((doc) => (
          <div
            key={doc._id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#FFC43D]/20 text-[#FFC43D] border border-[#FFC43D]/30">
                  {doc.category}
                </span>

                <button
                  onClick={() => handleDelete(doc._id)}
                  className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition"
                  title="Remove Document"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-base font-bold text-white leading-snug">
                {doc.title}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span className="line-clamp-1">{doc.authority}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="font-mono text-slate-300 font-bold">{doc.certificateNo}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>Issue Date: {doc.issueDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified & Publicly Displayed</span>
              </span>

              {doc.fileUrl ? (
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1"
                >
                  <span>View Doc</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-[11px] text-slate-500">No Attachment</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Document Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-red-500" />
                <span>Add Legal / Appreciation Document</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Document / Certificate Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Section 80G Registration Order"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Issuing Authority / Ministry / Partner
                </label>
                <input
                  type="text"
                  required
                  value={formData.authority}
                  onChange={(e) => setFormData({ ...formData, authority: e.target.value })}
                  placeholder="e.g. Income Tax Department, Government of India"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Certificate / Registration Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.certificateNo}
                    onChange={(e) => setFormData({ ...formData, certificateNo: e.target.value })}
                    placeholder="e.g. CIT(E)/DELHI/80G/2021-22"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={formData.issueDate}
                    onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                >
                  <option value="Statutory 80G Tax Exemption">Statutory 80G Tax Exemption</option>
                  <option value="12A Non-Profit Entity Status">12A Non-Profit Entity Status</option>
                  <option value="Government Accreditation">Government Accreditation</option>
                  <option value="Donor & State Appreciation">Donor & State Appreciation</option>
                  <option value="FCRA Status">FCRA Status</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Document / Certificate PDF or Image URL
                </label>
                <input
                  type="text"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="/certificates/80g.pdf or https://..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Add to List</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

