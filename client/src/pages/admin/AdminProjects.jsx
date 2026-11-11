import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Plus, Edit2, Trash2, X, Target, Heart } from 'lucide-react';
import { ImageUploader } from '../../components/ImageUploader';

export const AdminProjects = () => {
  const { formatINR, showToast } = useWebsite();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Slum Child Education',
    summary: '',
    story: '',
    targetAmount: 100000,
    raisedAmount: 0,
    coverImage: '',
    isUrgent: false,
    status: 'active',
    location: 'Delhi-NCR',
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects?all=true');
      if (res?.projects) {
        setProjects(res.projects);
      }
    } catch (err) {
      showToast('Error loading campaigns', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setForm({
        title: project.title,
        category: project.category,
        summary: project.summary,
        story: project.story,
        targetAmount: project.targetAmount,
        raisedAmount: project.raisedAmount || 0,
        coverImage: project.coverImage,
        isUrgent: project.isUrgent ?? false,
        status: project.status || 'active',
        location: project.location || 'Delhi-NCR',
      });
    } else {
      setEditingProject(null);
      setForm({
        title: '',
        category: 'Slum Child Education',
        summary: '',
        story: '',
        targetAmount: 250000,
        raisedAmount: 0,
        coverImage: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?q=80&w=800',
        isUrgent: false,
        status: 'active',
        location: 'Delhi-NCR',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, form);
        showToast('Campaign updated successfully', 'success');
      } else {
        await api.post('/projects', form);
        showToast('New campaign created successfully', 'success');
      }
      setShowModal(false);
      fetchProjects();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this fundraising campaign?')) return;
    try {
      await api.delete(`/projects/${id}`);
      showToast('Campaign deleted', 'info');
      fetchProjects();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Causes & Campaigns Manager</h2>
          <p className="text-xs text-slate-400">Manage urgent fundraising appeals and progress goals</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Campaign</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Campaign Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Goal / Raised</th>
                <th className="p-4 font-semibold">Urgency</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {projects.map((proj) => {
                const percent = Math.min(
                  100,
                  Math.round(((proj.raisedAmount || 0) / (proj.targetAmount || 1)) * 100)
                );

                return (
                  <tr key={proj._id} className="hover:bg-slate-800/40">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={proj.coverImage}
                        alt={proj.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <strong className="text-white block font-semibold">{proj.title}</strong>
                        <span className="text-[11px] text-slate-500">{proj.location}</span>
                      </div>
                    </td>
                    <td className="p-4">{proj.category}</td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-emerald-400 font-bold">{formatINR(proj.raisedAmount || 0)}</span>
                          <span className="text-slate-500">of {formatINR(proj.targetAmount)}</span>
                        </div>
                        <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {proj.isUrgent ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-400">
                          Urgent
                        </span>
                      ) : (
                        <span className="text-slate-500">Normal</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold capitalize bg-slate-800 text-slate-300">
                        {proj.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenModal(proj)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(proj._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProject ? 'Edit Campaign' : 'Create New Campaign'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Urgent Medical Relief">Urgent Medical Relief</option>
                    <option value="Slum Child Education">Slum Child Education</option>
                    <option value="Women Vocational Center">Women Vocational Center</option>
                    <option value="Ration & Nutrition Kit">Ration & Nutrition Kit</option>
                    <option value="Disaster & Winter Relief">Disaster & Winter Relief</option>
                    <option value="Sanitation & Clean Water">Sanitation & Clean Water</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Amount (INR) *</label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={form.targetAmount}
                    onChange={(e) => setForm({ ...form, targetAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Amount Raised So Far (INR)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.raisedAmount}
                    onChange={(e) => setForm({ ...form, raisedAmount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Summary *</label>
                <input
                  type="text"
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <ImageUploader
                  value={form.coverImage}
                  onChange={(url) => setForm({ ...form, coverImage: url })}
                  label="Campaign Cover Photo (ImageKit Cloud Upload or URL)"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Detailed Story & Case Background *</label>
                <textarea
                  rows={4}
                  required
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isUrgent}
                    onChange={(e) => setForm({ ...form, isUrgent: e.target.checked })}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>Mark as Urgent Appeal</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Status:</span>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

