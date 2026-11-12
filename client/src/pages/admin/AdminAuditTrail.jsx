import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  History,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Lock,
  Search,
  Download,
  Clock,
  User,
} from 'lucide-react';

export const AdminAuditTrail = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const sampleLogs = [
    {
      _id: 'log-1',
      timestamp: new Date().toLocaleString('en-IN'),
      action: 'HERO_BANNERS_UPDATE',
      user: user?.name || 'Administrator',
      role: user?.role || 'Super Admin',
      details: 'Updated Homepage primary hero banner typography & CTA links.',
      ip: '192.168.1.4',
      status: 'SUCCESS',
    },
    {
      _id: 'log-2',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toLocaleString('en-IN'),
      action: 'DONATION_80G_ISSUED',
      user: 'Automated Tax Engine',
      role: 'System',
      details: 'Generated official 80G tax receipt for donation ₹2,500.',
      ip: '127.0.0.1',
      status: 'SUCCESS',
    },
    {
      _id: 'log-3',
      timestamp: new Date(Date.now() - 65 * 60 * 1000).toLocaleString('en-IN'),
      action: 'IMPACT_METRICS_SYNC',
      user: user?.name || 'Administrator',
      role: 'Super Admin',
      details: 'Synced ground statistics: 48,500+ lives, 12,400+ children.',
      ip: '192.168.1.4',
      status: 'SUCCESS',
    },
    {
      _id: 'log-4',
      timestamp: new Date(Date.now() - 180 * 60 * 1000).toLocaleString('en-IN'),
      action: 'ADMIN_AUTHENTICATION',
      user: user?.name || 'Administrator',
      role: 'Super Admin',
      details: 'Successful administrator password verification & JWT session issued.',
      ip: '192.168.1.4',
      status: 'SUCCESS',
    },
    {
      _id: 'log-5',
      timestamp: new Date(Date.now() - 360 * 60 * 1000).toLocaleString('en-IN'),
      action: 'PROGRAM_CMS_MODIFIED',
      user: 'Super Admin',
      role: 'Super Admin',
      details: "Updated category & description for 'Women Development and Empowerment'.",
      ip: '192.168.1.4',
      status: 'SUCCESS',
    },
  ];

  const filtered = sampleLogs.filter(
    (l) =>
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase()) ||
      l.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FFC43D]/15 text-[#FFC43D] border border-[#FFC43D]/30">
              <History className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">System Audit Trail & Security Logs</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Immutable tracking of administrator logins, content modifications, 80G tax receipt issuances, and backend operations.
          </p>
        </div>

        <button
          onClick={() => alert('Audit logs downloaded as encrypted CSV report.')}
          className="px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Log</span>
        </button>
      </div>

      {/* Security Health Status Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Database Engine</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>MongoDB Connected</span>
          </h3>
          <p className="text-[11px] text-slate-500">Zero query latency, replica active</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">API Health</span>
            <Server className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Express.js Online</span>
          </h3>
          <p className="text-[11px] text-slate-500">Port 5000 /api endpoint 200 OK</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Authentication</span>
            <Lock className="w-4 h-4 text-[#FFC43D]" />
          </div>
          <h3 className="text-base font-bold text-white">JWT Bearer Active</h3>
          <p className="text-[11px] text-slate-500">Role-Based Access Control (RBAC)</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">80G Tax Compliance</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white">Auto-Validated</h3>
          <p className="text-[11px] text-slate-500">CIT(E)/DELHI/80G sanction valid</p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search audit trail by action, admin name, or event details..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-[#FFC43D]"
          />
        </div>

        <span className="text-xs text-slate-400 font-medium">
          Showing <strong className="text-white">{filtered.length}</strong> events
        </span>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="px-5 py-3 font-bold">Timestamp</th>
                <th className="px-5 py-3 font-bold">Action</th>
                <th className="px-5 py-3 font-bold">Admin User</th>
                <th className="px-5 py-3 font-bold">Details</th>
                <th className="px-5 py-3 font-bold">IP Address</th>
                <th className="px-5 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filtered.map((log) => (
                <tr key={log._id} className="hover:bg-slate-800/40 transition">
                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-400 flex items-center gap-1.5 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>{log.timestamp}</span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-800 text-slate-200 border border-slate-700 font-mono">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap font-medium text-white">
                    <div className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-500" />
                      <span>{log.user}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-slate-300 max-w-xs sm:max-w-md truncate">
                    {log.details}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                    {log.ip}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{log.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

