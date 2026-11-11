import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Heart,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Edit2,
  Trash2,
  ExternalLink,
  Flame,
  Stethoscope,
  X,
  Save,
} from 'lucide-react';

export const AdminLiveCases = () => {
  const { formatINR, showToast } = useWebsite();
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState(null);
  const [saving, setSaving] = useState(false);

  const defaultForm = {
    title: '',
    category: 'Medical Relief',
    targetAmount: 300000,
    raisedAmount: 0,
    shortDescription: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
    isUrgent: true,
    isFeatured: true,
    status: 'active',
  };

  const [formData, setFormData] = useState(defaultForm);

  const fetchLiveCases = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      if (res?.success) {
        // Filter or prioritize medical & urgent live cases
        setCases(res.projects || []);
      }
    } catch (err) {
      console.warn('Live cases load err:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveCases();
  }, []);

  const handleOpenAdd = () => {
    setEditingCase(null);
    setFormData(defaultForm);
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingCase(item);
    setFormData({
      title: item.title || '',
      category: item.category || 'Medical Relief',
      targetAmount: item.targetAmount || 0,
      raisedAmount: item.raisedAmount || 0,
      shortDescription: item.shortDescription || '',
      description: item.description || '',
      coverImage: item.coverImage || '',
      isUrgent: item.isUrgent ?? true,
      isFeatured: item.isFeatured ?? true,
      status: item.status || 'active',
    });
    setModalOpen(true);
  };

  const handleSaveSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      showToast('Case title is required', 'error');
      return;
    }

    setSaving(true);
    try {
      if (editingCase?._id) {
        const res = await api.put(`/projects/${editingCase._id}`, formData);
        if (res?.success) {
          showToast('Live case updated successfully!', 'success');
        }
      } else {
        const res = await api.post('/projects', formData);
        if (res?.success) {
          showToast('Urgent live case published successfully!', 'success');
        }
      }
      setModalOpen(false);
      fetchLiveCases();
    } catch (err) {
      showToast(err.message || 'Failed to save case.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this live case?')) return;
    try {
      const res = await api.delete(`/projects/${id}`);
      if (res?.success) {
        showToast('Live case deleted successfully.', 'success');
        setCases(cases.filter((c) => c._id !== id));
      }
    } catch (err) {
      showToast(err.message || 'Failed to delete case.', 'error');
    }
  };

  const filtered = cases.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-red-600/10 text-red-500">
              <Heart className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Live Cases & Urgent Appeals</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage high-priority medical appeals, verified child surgeries, emergency relief cases, and live donation targets.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-900/30 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Launch Urgent Case</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cases by patient name, condition, or category..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-red-500"
          />
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-white">{filtered.length}</strong> live cases
        </span>
      </div>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => {
          const percent = Math.min(100, Math.round(((item.raisedAmount || 0) / (item.targetAmount || 1)) * 100));

          return (
            <div
              key={item._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-slate-700 transition"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-950">
                  <img
                    src={item.coverImage || '/hero-children.jpg'}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-white" />
                      <span>{item.category || 'Urgent Appeal'}</span>
                    </span>
                  </div>

                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-900/80 backdrop-blur-xs text-emerald-400 border border-emerald-500/30">
                    {item.status || 'Active'}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {item.shortDescription}
                  </p>

                  {/* Financial Progress */}
                  <div className="space-y-1.5 pt-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-300">Raised: {formatINR(item.raisedAmount || 0)}</span>
                      <span className="text-[#FFC43D] font-bold">{percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 to-[#FFC43D] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Goal: {formatINR(item.targetAmount || 0)}</span>
                      <span>Section 80G Exempt</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between">
                <a
                  href={`/projects/${item.slug || item._id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <span>Public View</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                    title="Edit Case"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-slate-800 transition cursor-pointer"
                    title="Delete Case"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Case Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-red-500" />
                <span>{editingCase ? 'Edit Live Medical Case' : 'Launch New Urgent Case'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Case Headline / Patient Story
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Urgent Pediatric Heart Surgery for Baby Aarav"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500 font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  >
                    <option value="Medical Relief">Medical Relief</option>
                    <option value="Pediatric Care">Pediatric Care</option>
                    <option value="Emergency Disaster">Emergency Disaster</option>
                    <option value="Child Nutrition">Child Nutrition</option>
                    <option value="Special Needs">Special Needs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  >
                    <option value="active">Active & Collecting</option>
                    <option value="completed">Target Achieved / Closed</option>
                    <option value="paused">Temporarily Paused</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.targetAmount}
                    onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Raised So Far (₹)</label>
                  <input
                    type="number"
                    value={formData.raisedAmount}
                    onChange={(e) => setFormData({ ...formData, raisedAmount: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Cover Photo URL</label>
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-hidden focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Brief Medical Summary (Card View)
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Summary of patient diagnosis, required medical procedure, hospital name..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-red-500"
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
                  disabled={saving}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? 'Saving...' : 'Save Live Case'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

