import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Plus, Edit2, Trash2, Check, X, ShieldCheck } from 'lucide-react';
import { ImageUploader } from '../../components/ImageUploader';

export const AdminPrograms = () => {
  const { formatINR, showToast } = useWebsite();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProgram, setEditingProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'Child Education',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    budgetOrCostPerChild: 1500,
    beneficiariesCount: 0,
    isFeatured: true,
  });

  const fetchPrograms = async () => {
    try {
      const res = await api.get('/programs?includeInactive=true');
      if (res?.programs) {
        setPrograms(res.programs);
      }
    } catch (err) {
      showToast('Error loading programs', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleOpenModal = (program = null) => {
    if (program) {
      setEditingProgram(program);
      setForm({
        title: program.title,
        category: program.category,
        shortDescription: program.shortDescription,
        fullDescription: program.fullDescription,
        coverImage: program.coverImage,
        budgetOrCostPerChild: program.budgetOrCostPerChild || 1500,
        beneficiariesCount: program.beneficiariesCount || 0,
        isFeatured: program.isFeatured ?? true,
      });
    } else {
      setEditingProgram(null);
      setForm({
        title: '',
        category: 'Child Education',
        shortDescription: '',
        fullDescription: '',
        coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
        budgetOrCostPerChild: 1500,
        beneficiariesCount: 0,
        isFeatured: true,
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProgram) {
        await api.put(`/programs/${editingProgram._id}`, form);
        showToast('Program updated successfully', 'success');
      } else {
        await api.post('/programs', form);
        showToast('New program created successfully', 'success');
      }
      setShowModal(false);
      fetchPrograms();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this program?')) return;
    try {
      await api.delete(`/programs/${id}`);
      showToast('Program deleted', 'info');
      fetchPrograms();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Programs Manager</h2>
          <p className="text-xs text-slate-400">Manage all charitable programs and initiatives</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Program</span>
        </button>
      </div>

      {/* Programs List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Program</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Cost / Beneficiary</th>
                <th className="p-4 font-semibold">Beneficiaries</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {programs.map((p) => (
                <tr key={p._id} className="hover:bg-slate-800/40">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={p.coverImage}
                      alt={p.title}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <strong className="text-white block font-semibold">{p.title}</strong>
                      <span className="text-[11px] text-slate-500">/{p.slug}</span>
                    </div>
                  </td>
                  <td className="p-4">{p.category}</td>
                  <td className="p-4 font-bold text-emerald-400">
                    {formatINR(p.budgetOrCostPerChild || 1500)}
                  </td>
                  <td className="p-4">{p.beneficiariesCount}</td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenModal(p)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
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

      {/* Modal Editor */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {editingProgram ? 'Edit Program' : 'Create New Program'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Program Title *</label>
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
                    <option value="Child Education">Child Education</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Healthcare & Relief">Healthcare & Relief</option>
                    <option value="Nutrition & Food Security">Nutrition & Food Security</option>
                    <option value="Elderly Care">Elderly Care</option>
                    <option value="Community Welfare">Community Welfare</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Cost per Beneficiary (INR)
                  </label>
                  <input
                    type="number"
                    value={form.budgetOrCostPerChild}
                    onChange={(e) =>
                      setForm({ ...form, budgetOrCostPerChild: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <input
                  type="text"
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={4}
                  required
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <ImageUploader
                  value={form.coverImage}
                  onChange={(url) => setForm({ ...form, coverImage: url })}
                  label="Program Cover Image (ImageKit Cloud Upload or URL)"
                />
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
                  Save Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

