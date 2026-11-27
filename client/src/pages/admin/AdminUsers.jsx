import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Plus, Trash2, X, ShieldCheck } from 'lucide-react';
import { AdminPageHeader } from '../../components/admin/AdminUI';

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
      <div className="max-w-xl mx-auto mt-10 bg-white border border-rose-200 rounded-sm p-8 text-center shadow-sm space-y-2">
        <ShieldCheck className="w-8 h-8 text-rose-600 mx-auto" />
        <h2 className="text-lg font-sans font-semibold text-[#111827]">Access Restricted</h2>
        <p className="text-sm text-[#4B5563]">
          Super Admin authorization is required to access User Management.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <AdminPageHeader
        breadcrumb="Admin Users"
        badge="Access Control"
        title="Admin Users & Permissions"
        subtitle="Manage administrator credentials, roles, and access levels."
        actions={
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded-full font-bold text-xs text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#F2D869]" />
            <span>Add Admin User</span>
          </button>
        }
      />

      <div className="bg-white border border-[#E5E7EB] rounded-sm overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-admin-scrollbar">
          <table className="w-full text-left text-xs text-[#374151] min-w-[680px]">
            <thead className="bg-[#F9FAFB] text-[#6B7280] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Account Status</th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider">Last Login</th>
                <th className="px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#9CA3AF] text-xs">
                    Loading administrator accounts...
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-[#9CA3AF] text-xs">
                    No administrator accounts found.
                  </td>
                </tr>
              ) : (
                admins.map((adm) => (
                  <tr key={adm._id} className="hover:bg-[#F9FAFB]/70 transition-colors">
                    <td className="px-4 py-3.5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#14382C] flex items-center justify-center font-bold text-[#F2D869] uppercase text-xs shrink-0">
                        {adm.name?.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <strong className="text-[#111827] block font-semibold text-[13px] truncate">{adm.name}</strong>
                        <span className="text-xs text-[#6B7280] truncate block">{adm.email}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase bg-[#EAF3EE] text-[#14382C] border border-[#14382C]/15">
                        {adm.role}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[#14382C] font-semibold text-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Active
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-[#6B7280] text-xs">
                      {adm.lastLogin ? new Date(adm.lastLogin).toLocaleString('en-IN') : 'Never'}
                    </td>
                    <td className="px-4 py-3.5 text-right">
                      {adm._id !== currentLoggedAdmin?.id && (
                        <button
                          onClick={() => handleDelete(adm._id)}
                          className="p-1.5 rounded-sm bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200/70 transition cursor-pointer"
                          title="Revoke Access"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
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
          <div className="bg-white border border-[#E5E7EB] rounded-sm max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-[#F1F5F9]">
              <h3 className="text-lg font-sans font-semibold text-[#111827]">Create Admin User</h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-sm text-[#9CA3AF] hover:text-[#14382C] hover:bg-[#EAF3EE] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#374151] font-semibold mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Sen"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-[#374151] font-semibold mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. suman@rkfoundation.org"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-[#374151] font-semibold mb-1.5">Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                />
              </div>

              <div>
                <label className="block text-[#374151] font-semibold mb-1.5">Role Permission</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-sm bg-[#F9FAFB] border border-[#E5E7EB] text-[#111827] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#14382C]/15 focus:border-[#14382C]"
                >
                  <option value="admin">Admin (CMS &amp; Records Access)</option>
                  <option value="superadmin">Super Admin (Full Access + User Management)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#F1F5F9]">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-full bg-slate-100 text-[#374151] font-semibold hover:bg-slate-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#14382C] text-white font-bold hover:bg-[#1B4D3E] shadow-sm transition cursor-pointer"
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

