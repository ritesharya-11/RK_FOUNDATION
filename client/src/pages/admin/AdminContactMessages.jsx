import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import { Mail, Search, CheckCircle2, Trash2, X, Clock } from 'lucide-react';

export const AdminContactMessages = () => {
  const { showToast } = useWebsite();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      let query = `?status=${encodeURIComponent(statusFilter)}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      const res = await api.get(`/contact${query}`);
      if (res?.messages) {
        setMessages(res.messages);
      }
    } catch (err) {
      showToast('Error loading messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleStatusUpdate = async (id, newStatus, adminNotes = '') => {
    try {
      await api.put(`/contact/${id}`, { status: newStatus, adminNotes });
      showToast(`Inquiry marked as ${newStatus}`, 'success');
      fetchMessages();
      if (selectedMessage) {
        setSelectedMessage((prev) => ({ ...prev, status: newStatus, adminNotes }));
      }
    } catch (err) {
      showToast('Status update failed', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      showToast('Message deleted', 'info');
      fetchMessages();
      setSelectedMessage(null);
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Inquiries & Contact Messages</h2>
          <p className="text-xs text-slate-400">Track questions, corporate CSR inquiries, and feedback</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchMessages();
          }}
          className="flex-1 relative"
        >
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by sender name, email, subject, message content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </form>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="All">All Inquiries</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Messages List */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Sender</th>
                <th className="p-4 font-semibold">Subject & Preview</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {messages.map((m) => (
                <tr key={m._id} className="hover:bg-slate-800/40">
                  <td className="p-4">
                    <strong className="text-white block font-semibold">{m.name}</strong>
                    <span className="text-[11px] text-slate-500">{m.email}</span>
                  </td>
                  <td className="p-4 max-w-md">
                    <strong className="text-white block font-semibold">{m.subject}</strong>
                    <span className="text-[11px] text-slate-400 line-clamp-1">{m.message}</span>
                  </td>
                  <td className="p-4 text-slate-400">{new Date(m.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                        m.status === 'unread'
                          ? 'bg-rose-500/10 text-rose-400'
                          : m.status === 'replied'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => {
                        setSelectedMessage(m);
                        if (m.status === 'unread') {
                          handleStatusUpdate(m._id, 'read');
                        }
                      }}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      Read
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="p-1 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
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

      {/* Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Inquiry Message</h3>
              <button onClick={() => setSelectedMessage(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-4 bg-slate-950 rounded-2xl space-y-1">
                <h4 className="text-sm font-bold text-white">{selectedMessage.name}</h4>
                <p className="text-slate-400">{selectedMessage.email} {selectedMessage.phone ? `| ${selectedMessage.phone}` : ''}</p>
                <p className="text-[11px] text-slate-500">
                  Received on: {new Date(selectedMessage.createdAt).toLocaleString('en-IN')}
                </p>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl space-y-2">
                <strong className="text-emerald-400 text-xs block">Subject: {selectedMessage.subject}</strong>
                <p className="text-slate-200 leading-relaxed whitespace-pre-line">{selectedMessage.message}</p>
              </div>

              <div className="pt-2">
                <label className="block text-slate-400 font-semibold mb-1">Coordinator Response Notes:</label>
                <input
                  type="text"
                  placeholder="e.g. Replied via email with CSR proposal package..."
                  defaultValue={selectedMessage.adminNotes || ''}
                  onBlur={(e) => handleStatusUpdate(selectedMessage._id, selectedMessage.status, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition"
              >
                Reply via Email
              </a>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(selectedMessage._id, 'replied')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-emerald-400 font-bold text-xs hover:bg-slate-700"
                >
                  Mark Replied
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedMessage._id, 'archived')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-400 font-semibold text-xs hover:bg-slate-700"
                >
                  Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

