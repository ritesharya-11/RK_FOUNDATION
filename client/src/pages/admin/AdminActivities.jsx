import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { AdminPageHeader } from '../../components/admin/AdminUI';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

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
    <div className="space-y-5 w-full min-w-0 font-sans">
      <AdminPageHeader
        breadcrumb="Field Activities"
        badge={`${activities.length} Recorded Drives`}
        title="Field Activities Manager"
        subtitle="Record on-ground health camps, ration distribution drives, educational workshops, and humanitarian outreach."
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-bold text-xs text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-sm transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2D869]" />
            <span>Add New Field Activity</span>
          </button>
        }
      />

      <div className="bg-white border border-[#E5E7EB] rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-admin-scrollbar">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead className="bg-[#F9FAFB] text-[#14382C] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Activity</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Date & Location</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider">Beneficiaries</th>
                <th className="px-4 py-3 font-bold text-[11px] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activities.length === 0 && !loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#9CA3AF]">
                    No field activities recorded yet.
                  </td>
                </tr>
              ) : (
                activities.map((act) => (
                  <tr key={act._id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                    <td className="px-4 py-3.5 flex items-center gap-3">
                      <img
                        src={act.coverImage}
                        alt={act.title}
                        className="w-11 h-11 rounded-sm object-cover border border-[#E5E7EB] shrink-0"
                      />
                      <div className="min-w-0">
                        <strong className="text-[#111827] block font-bold text-xs sm:text-sm">{act.title}</strong>
                        <span className="text-xs text-[#6B7280] line-clamp-1">{act.description}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2.5 py-1 rounded-sm bg-[#EAF3EE] text-[#14382C] border border-[#14382C]/15 font-semibold text-[11px]">
                        {act.category}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div>
                        <span className="text-[#111827] font-semibold block">
                          {new Date(act.date).toLocaleDateString('en-IN')}
                        </span>
                        <span className="text-[#6B7280] text-[11px]">{act.location}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-extrabold text-[#14382C] text-sm">
                      {act.beneficiariesCount}
                    </td>
                    <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => handleOpenModal(act)}
                        className="p-2 rounded-sm bg-[#EAF3EE] text-[#14382C] hover:bg-[#14382C] hover:text-white border border-[#14382C]/15 transition cursor-pointer"
                        title="Edit activity"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(act._id)}
                        className="p-2 rounded-sm bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/80 transition cursor-pointer"
                        title="Delete activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0E241C]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-sm max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl custom-admin-scrollbar">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9]">
              <h3 className="text-lg font-sans font-semibold text-[#111827]">
                {editingActivity ? 'Edit Activity' : 'Record New Activity'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-sm bg-[#F9FAFB] text-[#6B7280] hover:text-[#111827] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Activity Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#374151] font-bold mb-1.5">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
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
                  <label className="block text-xs text-[#374151] font-bold mb-1.5">Beneficiaries Reached</label>
                  <input
                    type="number"
                    value={form.beneficiariesCount}
                    onChange={(e) => setForm({ ...form, beneficiariesCount: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#374151] font-bold mb-1.5">Date of Activity</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[#374151] font-bold mb-1.5">Location / Center</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Description & Report *</label>
                <textarea
                  rows={4}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Cover Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={form.coverImage}
                    onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                    placeholder="https://... or upload a photo"
                    className="flex-1 px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C] text-xs"
                  />
                  <label className="px-3.5 py-2.5 rounded-sm bg-[#EAF3EE] hover:bg-[#14382C] text-[#14382C] hover:text-white text-xs font-semibold cursor-pointer border border-[#14382C]/20 shrink-0 transition">
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

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-sm bg-[#F9FAFB] text-[#374151] hover:bg-slate-200 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-sm bg-[#14382C] hover:bg-[#1B4D3E] text-white font-bold text-xs cursor-pointer"
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

