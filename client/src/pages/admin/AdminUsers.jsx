import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Plus, Trash2, X, Shield, User, Lock, Mail } from 'lucide-react';

export const AdminUsers = () => {
  const { user: currentLoggedAdmin, isSuperAdmin } = useAuth();
  const { showToast } = useWebsite();

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/auth/users');
      if (res?.users) {
        setAdmins(res.users);
      }
    } catch (err) {
      showToast('Error loading admins list', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) {
      fetchAdmins();
    }
  }, [isSuperAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/users', form);
      showToast('New admin created successfully', 'success');
      setShowModal(false);
      setForm({ name: '', email: '', password: '', role: 'admin' });
      fetchAdmins();
    } catch (err) {
      showToast(err.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (id === currentLoggedAdmin?.id) {
      showToast('You cannot delete your own account.', 'error');
      return;
    }
    if (!window.confirm('Revoke access for this admin user?')) return;
    try {
      await api.delete(`/auth/users/${id}`);
      showToast('Admin user removed', 'info');
      fetchAdmins();
    } catch (err) {
      showToast(err.message || 'Delete failed', 'error');
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="p-8 text-center text-slate-400">
        Super Admin authorization is required to access User Management.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Admin Users & Permissions</h2>
          <p className="text-xs text-slate-400">Manage administrator credentials and access levels</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Admin User</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Account Status</th>
                <th className="p-4 font-semibold">Last Login</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {admins.map((adm) => (
                <tr key={adm._id} className="hover:bg-slate-800/40">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white uppercase text-xs">
                      {adm.name?.charAt(0)}
                    </div>
                    <div>
                      <strong className="text-white block font-semibold">{adm.name}</strong>
                      <span className="text-[11px] text-slate-500">{adm.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400">
                      {adm.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-emerald-400 font-semibold text-xs">Active</span>
                  </td>
                  <td className="p-4 text-slate-400">
                    {adm.lastLogin ? new Date(adm.lastLogin).toLocaleString('en-IN') : 'Never'}
                  </td>
                  <td className="p-4 text-right">
                    {adm._id !== currentLoggedAdmin?.id && (
                      <button
                        onClick={() => handleDelete(adm._id)}
                        className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
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
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create Admin User</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Sen"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. suman@rkfoundation.org"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Permission</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="admin">Admin (CMS & Records Access)</option>
                  <option value="superadmin">Super Admin (Full Access + User Management)</option>
                </select>
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
                  Create Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

