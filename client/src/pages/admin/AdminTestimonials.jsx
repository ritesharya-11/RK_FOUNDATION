import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { AdminPageHeader } from '../../components/admin/AdminUI';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export const AdminTestimonials = () => {
  const { showToast } = useWebsite();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    role: 'Donor & Supporter',
    message: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300',
    rating: 5,
    isFeatured: true,
  });

  const fetchTestimonials = async () => {
    try {
      const res = await api.get('/testimonials');
      if (res?.testimonials) {
        setTestimonials(res.testimonials);
      }
    } catch (err) {
      showToast('Error loading testimonials', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleOpenModal = (test = null) => {
    if (test) {
      setEditingTestimonial(test);
      setForm({
        name: test.name,
        role: test.role,
        message: test.message,
        avatar: test.avatar,
        rating: test.rating || 5,
        isFeatured: test.isFeatured ?? true,
      });
    } else {
      setEditingTestimonial(null);
      setForm({
        name: '',
        role: 'Corporate Partner / Regular Donor',
        message: '',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300',
        rating: 5,
        isFeatured: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, form);
        showToast('Testimonial updated', 'success');
      } else {
        await api.post('/testimonials', form);
        showToast('Testimonial added', 'success');
      }
      setShowModal(false);
      fetchTestimonials();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.delete(`/testimonials/${id}`);
      showToast('Testimonial removed', 'info');
      fetchTestimonials();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-5 w-full min-w-0 font-sans">
      <AdminPageHeader
        breadcrumb="Testimonials"
        badge={`${testimonials.length} Featured Voices`}
        title="Testimonials Manager"
        subtitle="Curate donor reviews, volunteer reflections, and verified community feedback."
        actions={
          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-sm font-bold text-xs text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-sm transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-[#F2D869]" />
            <span>Add Testimonial</span>
          </button>
        }
      />

      {testimonials.length === 0 && !loading ? (
        <div className="bg-white border border-[#E5E7EB] rounded-sm p-12 text-center text-[#9CA3AF] text-sm shadow-sm">
          No testimonials added yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t._id}
              className="bg-white border border-[#E5E7EB] hover:border-[#14382C]/35 rounded-sm p-5 flex flex-col justify-between space-y-4 shadow-sm transition"
            >
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed italic">"{t.message}"</p>

              <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#14382C]/20 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-[#111827] truncate">{t.name}</h4>
                    <p className="text-[11px] text-[#6B7280] truncate">{t.role}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenModal(t)}
                    className="p-2 rounded-sm bg-[#EAF3EE] text-[#14382C] hover:bg-[#14382C] hover:text-white border border-[#14382C]/15 transition cursor-pointer"
                    title="Edit testimonial"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-2 rounded-sm bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/80 transition cursor-pointer"
                    title="Delete testimonial"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0E241C]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-[#E5E7EB] rounded-sm max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9]">
              <h3 className="text-lg font-sans font-semibold text-[#111827]">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
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
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Person Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Role / Designation *</label>
                <input
                  type="text"
                  required
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Message / Quote *</label>
                <textarea
                  rows={4}
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-xs text-[#374151] font-bold mb-1.5">Avatar Image URL</label>
                <input
                  type="text"
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

