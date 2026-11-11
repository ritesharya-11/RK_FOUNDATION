import React, { useState, useEffect } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Trash2,
  Edit2,
  X,
} from 'lucide-react';

export const AdminVolunteers = () => {
  const { showToast } = useWebsite();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const fetchVolunteers = async () => {
    setLoading(true);
    try {
      let query = `?status=${encodeURIComponent(statusFilter)}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      const res = await api.get(`/volunteers${query}`);
      if (res?.volunteers) {
        setVolunteers(res.volunteers);
      }
    } catch (err) {
      showToast('Error loading volunteers', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus, adminNotes = '') => {
    try {
      await api.put(`/volunteers/${id}`, { status: newStatus, adminNotes });
      showToast(`Status updated to ${newStatus}`, 'success');
      fetchVolunteers();
      if (selectedVolunteer) {
        setSelectedVolunteer((prev) => ({ ...prev, status: newStatus, adminNotes }));
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this volunteer application?')) return;
    try {
      await api.delete(`/volunteers/${id}`);
      showToast('Application deleted', 'info');
      fetchVolunteers();
      setSelectedVolunteer(null);
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">Volunteer Applications Pipeline</h2>
          <p className="text-xs text-slate-400">Review applicants, approve roles, and coordinate orientations</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchVolunteers();
          }}
          className="flex-1 relative"
        >
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by volunteer name, email, phone, city..."
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
          <option value="All">All Applications</option>
          <option value="pending">Pending Review</option>
          <option value="approved">Approved</option>
          <option value="contacted">Contacted</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-4 font-semibold">Applicant</th>
                <th className="p-4 font-semibold">Location</th>
                <th className="p-4 font-semibold">Availability</th>
                <th className="p-4 font-semibold">Areas of Interest</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {volunteers.map((v) => (
                <tr key={v._id} className="hover:bg-slate-800/40">
                  <td className="p-4">
                    <strong className="text-white block font-semibold">{v.fullName}</strong>
                    <span className="text-[11px] text-slate-500">{v.email} • {v.phone}</span>
                  </td>
                  <td className="p-4">{v.city}, {v.state}</td>
                  <td className="p-4 font-medium text-slate-300">{v.availableHoursPerWeek}</td>
                  <td className="p-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {(v.areasOfInterest || []).map((interest, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold capitalize ${
                        v.status === 'approved'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : v.status === 'pending'
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedVolunteer(v)}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
                    >
                      Review
                    </button>
                    <button
                      onClick={() => handleDelete(v._id)}
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

      {/* Review Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Volunteer Application Profile</h3>
              <button onClick={() => setSelectedVolunteer(null)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-4 bg-slate-950 rounded-2xl space-y-1">
                <h4 className="text-sm font-bold text-white">{selectedVolunteer.fullName}</h4>
                <p className="text-slate-400">{selectedVolunteer.email} | {selectedVolunteer.phone}</p>
                <p className="text-slate-400">{selectedVolunteer.city}, {selectedVolunteer.state}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-950 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Occupation</span>
                  <p className="text-white mt-0.5">{selectedVolunteer.occupation || 'N/A'}</p>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Availability</span>
                  <p className="text-emerald-400 font-bold mt-0.5">{selectedVolunteer.availableHoursPerWeek}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                <span className="text-slate-500 text-[10px] uppercase font-bold block">Applicant Motivation</span>
                <p className="text-slate-300 leading-relaxed italic">"{selectedVolunteer.motivation}"</p>
              </div>

              {selectedVolunteer.previousExperience && (
                <div className="p-3 bg-slate-950 rounded-xl space-y-1">
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Prior Experience</span>
                  <p className="text-slate-300 leading-relaxed">{selectedVolunteer.previousExperience}</p>
                </div>
              )}

              <div className="pt-2">
                <label className="block text-slate-400 font-semibold mb-1">Coordinator Notes:</label>
                <input
                  type="text"
                  placeholder="e.g. Assigned to Sunday bridge school math coaching..."
                  defaultValue={selectedVolunteer.adminNotes || ''}
                  onBlur={(e) => handleStatusChange(selectedVolunteer._id, selectedVolunteer.status, e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-800 justify-end">
              <button
                onClick={() => handleStatusChange(selectedVolunteer._id, 'approved', selectedVolunteer.adminNotes)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 transition"
              >
                Approve Application
              </button>
              <button
                onClick={() => handleStatusChange(selectedVolunteer._id, 'contacted', selectedVolunteer.adminNotes)}
                className="px-3.5 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 transition"
              >
                Mark Contacted
              </button>
              <button
                onClick={() => handleStatusChange(selectedVolunteer._id, 'rejected', selectedVolunteer.adminNotes)}
                className="px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-300 font-bold text-xs hover:bg-rose-500/30 transition"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

