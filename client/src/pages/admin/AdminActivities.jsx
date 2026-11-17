import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Plus, Edit2, Trash2, X, Calendar, MapPin } from 'lucide-react';

export const AdminActivities = () => {
  const { showToast } = useWebsite();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingActivity, setEditingActivity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Ration & Food Distribution',
    date: new Date().toISOString().split('T')[0],
    location: 'Delhi-NCR',
    description: '',
    beneficiariesCount: 100,
    coverImage: '',
    status: 'completed',
  });

  const fetchActivities = async () => {
    try {
      const res = await api.get('/activities');
      if (res?.activities) {
        setActivities(res.activities);
      }
    } catch (err) {
      showToast('Error loading activities', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleOpenModal = (act = null) => {
    if (act) {
      setEditingActivity(act);
      setForm({
        title: act.title,
        category: act.category,
        date: act.date ? new Date(act.date).toISOString().split('T')[0] : '',
        location: act.location,
        description: act.description,
        beneficiariesCount: act.beneficiariesCount || 0,
        coverImage: act.coverImage,
        status: act.status || 'completed',
      });
    } else {
      setEditingActivity(null);
      setForm({
        title: '',
        category: 'Ration & Food Distribution',
        date: new Date().toISOString().split('T')[0],
        location: 'Delhi-NCR',
        description: '',
        beneficiariesCount: 100,
        coverImage: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800',
        status: 'completed',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingActivity) {
        await api.put(`/activities/${editingActivity._id}`, form);
        showToast('Activity updated successfully', 'success');
      } else {
        await api.post('/activities', form);
        showToast('Activity added successfully', 'success');
      }
      setShowModal(false);
      fetchActivities();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this field activity?')) return;
    try {
      await api.delete(`/activities/${id}`);
      showToast('Activity deleted', 'info');
      fetchActivities();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Field Activities Manager</h2>
          <p className="text-xs text-slate-400">Record on-ground health camps, ration distribution drives, and outreach</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Field Activity</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Activity</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Date & Location</th>
                <th className="p-4 font-semibold">Beneficiaries</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {activities.map((act) => (
                <tr key={act._id} className="hover:bg-slate-800/40">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={act.coverImage}
                      alt={act.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <strong className="text-white block font-semibold">{act.title}</strong>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{act.description}</span>
                    </div>
                  </td>
                  <td className="p-4">{act.category}</td>
                  <td className="p-4">
                    <div>
                      <span className="text-white block">{new Date(act.date).toLocaleDateString('en-IN')}</span>
                      <span className="text-slate-500">{act.location}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-emerald-400">{act.beneficiariesCount}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenModal(act)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(act._id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
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
                {editingActivity ? 'Edit Activity' : 'Record New Activity'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Activity Title *</label>
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
                    <option value="Dalit Upliftment & Rights">Dalit Upliftment & Rights</option>
                    <option value="Health Camp">Health Camp</option>
                    <option value="Ration & Food Distribution">Ration & Food Distribution</option>
                    <option value="Winter Blanket Drive">Winter Blanket Drive</option>
                    <option value="Education Kit Distribution">Education Kit Distribution</option>
                    <option value="Women Workshop">Women Workshop</option>
                    <option value="Tree Plantation & Cleanliness">Tree Plantation & Cleanliness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Beneficiaries Reached</label>
                  <input
                    type="number"
                    value={form.beneficiariesCount}
                    onChange={(e) => setForm({ ...form, beneficiariesCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date of Activity</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Location / Center</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description & Report *</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="https://... or upload a photo"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                  <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold cursor-pointer border border-slate-600 shrink-0 transition">
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        try {
                          const formData = new FormData();
                          formData.append('image', file);
                          const res = await api.post('/upload', formData, {
                            headers: { 'Content-Type': 'multipart/form-data' },
                          });
                          if (res?.imageUrl || res?.url) {
                            setForm((prev) => ({ ...prev, coverImage: res.imageUrl || res.url }));
                            showToast('Cover photo uploaded successfully', 'success');
                          }
                        } catch (upErr) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            setForm((prev) => ({ ...prev, coverImage: ev.target.result }));
                            showToast('Cover photo loaded', 'info');
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
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
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

