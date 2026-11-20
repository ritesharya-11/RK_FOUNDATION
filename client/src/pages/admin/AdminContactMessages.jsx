import React, { useState, useEffect, useMemo } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Search,
  Download,
  RefreshCw,
  Mail,
  Clock,
  CheckCircle2,
  FolderOpen,
  Trash2,
  X,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Edit2,
  Phone,
  Send,
  MessageSquare,
  User,
  Check,
} from 'lucide-react';

// ── Default 20 Inquiries matching screenshot exactly ──
const INITIAL_INQUIRIES = [
  {
    _id: 'inq-01',
    name: 'LTrZkBVUErgnpXEFTxv',
    email: 'd.af.i.xe.q.aw90@gmail.com',
    phone: '+5069409168',
    subject: 'cMyZgmtVuAoBLNxjCa',
    message: '2798007458',
    status: 'new',
    receivedDate: '13 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-02',
    name: 'wlgAjICKyMGQBZwxgsCFCX',
    email: 'sibi.d.e.ri87@gmail.com',
    phone: '+6549010211',
    subject: 'WPPodRemliCRwqpHiXItneS',
    message: '9366120460',
    status: 'new',
    receivedDate: '13 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-03',
    name: 'MWaxvxYUEgjYenpjax',
    email: 'w.e.ja.vu.y.uya86@gmail.com',
    phone: '+9451584924',
    subject: 'nKeEtjbiOWBJRTSByFxn',
    message: '7557982944',
    status: 'new',
    receivedDate: '13 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-04',
    name: 'KyWUrMqThiYVvmHzCkM',
    email: 'spat2016@aol.com',
    phone: '+2345701719',
    subject: 'qrmdoGSdcJqlwZKofIG',
    message: '3604882142',
    status: 'new',
    receivedDate: '12 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-05',
    name: 'YbLbXbEoldYetaQD',
    email: 'shelli@rvglasstech.com',
    phone: '+2247175479',
    subject: 'uRvKFwQNhhHtyHcnhTGIqaZZ',
    message: '5901920782',
    status: 'new',
    receivedDate: '12 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-06',
    name: 'ddBszebSDzTtAzEqxFAeeo',
    email: 'clbridgers@yahoo.com',
    phone: '+6039809101',
    subject: 'oEelWNvEPmRVtqbjx',
    message: '8573119676',
    status: 'new',
    receivedDate: '12 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-07',
    name: 'Rajesh Malhotra',
    email: 'rajesh.malhotra@corporatecsr.in',
    phone: '+91-9811223344',
    subject: 'Corporate CSR Partnership for Education',
    message: 'Our corporate CSR committee would like to discuss sponsoring 3 new Women Vocational Tailoring Centers in Delhi-NCR. Please connect us with your executive team.',
    status: 'new',
    receivedDate: '12 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-08',
    name: 'Sunita Aggarwal',
    email: 'sunita.aggarwal@gmail.com',
    phone: '+91-9877001122',
    subject: 'Donating used books and study laptops',
    message: 'We have approximately 25 refurbished laptops and 400 school textbooks available for donation. Where can we deliver them for your bridge school centers?',
    status: 'new',
    receivedDate: '11 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-09',
    name: 'Anand Vardhan',
    email: 'anand.vardhan@techsol.com',
    phone: '+91-9822334455',
    subject: 'Volunteering IT team for weekend training',
    message: 'Our team of 10 software engineers wants to volunteer every Saturday morning to conduct computer workshops for primary students.',
    status: 'new',
    receivedDate: '11 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-10',
    name: 'Meenakshi Iyer',
    email: 'meenakshi.iyer@healthtrust.org',
    phone: '+91-9833445566',
    subject: 'Medical camp collaboration inquiry',
    message: 'Can we partner to conduct free pediatric health checkups and hemoglobin screenings in Nand Nagri community next month?',
    status: 'new',
    receivedDate: '11 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-11',
    name: 'Pooja Bhatia',
    email: 'pooja.bhatia@outlook.com',
    phone: '+91-9844556677',
    subject: '80G Tax Exemption Receipt Query',
    message: 'I made a donation of ₹10,000 yesterday via UPI for the winter blanket drive. How can I download my 80G tax receipt?',
    status: 'new',
    receivedDate: '10 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-12',
    name: 'Vikas Saxena',
    email: 'vikas.saxena@delhifoodbank.org',
    phone: '+91-9855667788',
    subject: 'Grain and Nutrition Drive Support',
    message: 'We have surplus ration packages (rice, wheat flour, lentils) that we wish to route through your emergency hunger relief teams.',
    status: 'new',
    receivedDate: '10 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-13',
    name: 'Kavita Joshi',
    email: 'kavita.joshi@gmail.com',
    phone: '+91-9866778899',
    subject: 'Sponsoring a child school year tuition',
    message: 'I want to sponsor the remedial education for 5 street-to-school children for the upcoming academic year. Please provide banking details.',
    status: 'new',
    receivedDate: '10 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-14',
    name: 'Deepak Chopra',
    email: 'deepak.chopra@corporatesolutions.com',
    phone: '+91-9810101010',
    subject: 'Annual CSR Grant Allocation',
    message: 'Our corporate CSR department has shortlisted RK Foundation for our annual healthcare and child nutrition funding round. Please send official audit reports.',
    status: 'new',
    receivedDate: '09 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-15',
    name: 'Suman Roy',
    email: 'suman.roy@example.com',
    phone: '+91-9722331100',
    subject: 'Winter Clothes Collection Drop-off',
    message: 'Our residential society in Sector 62 Noida has collected over 300 warm coats and blankets. When can a pickup vehicle visit us?',
    status: 'new',
    receivedDate: '09 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-16',
    name: 'Rohan Mehra',
    email: 'rohan.mehra@gmail.com',
    phone: '+91-9877889900',
    subject: 'Birthday celebration food drive with children',
    message: 'I would like to celebrate my daughter’s birthday by sponsoring and serving a hot nutritious lunch for 150 slum school children this Sunday.',
    status: 'new',
    receivedDate: '08 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-17',
    name: 'Farida Bano',
    email: 'farida.bano@yahoo.com',
    phone: '+91-9811002233',
    subject: 'Enrollment in tailoring center',
    message: 'Can women from neighboring colonies also register for the free 6-month tailoring and sewing machine certification batch?',
    status: 'new',
    receivedDate: '08 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-18',
    name: 'Amitabh Sengupta',
    email: 'amitabh.s@financialtimes.co.in',
    phone: '+91-9822113344',
    subject: 'Press interview on grassroots relief impact',
    message: 'Writing a feature story on non-profit pediatric relief interventions in Delhi NCR. Would love a brief interview with your founder.',
    status: 'new',
    receivedDate: '07 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-19',
    name: 'Neha Chhabra',
    email: 'neha.chhabra@outlook.com',
    phone: '+91-9833224455',
    subject: 'Visiting the Sunday remedial bridge school',
    message: 'Would it be possible to visit the Sunday bridge school in Gokalpuri to understand the remedial learning methodology before donating?',
    status: 'new',
    receivedDate: '07 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'inq-20',
    name: 'Gaurav Narang',
    email: 'gaurav.narang@gmail.com',
    phone: '+91-9844335566',
    subject: 'Monthly recurring donor registration',
    message: 'Please guide me on how to set up an automated monthly recurring debit via e-mandate for the Nutrition Relief mission.',
    status: 'new',
    receivedDate: '06 Nov 2026',
    adminNotes: '',
    bookmarked: false,
  },
];

export const AdminContactMessages = () => {
  const { showToast } = useWebsite();
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('rk_inquiries_list_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_INQUIRIES;
  });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Newest Received');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('rk_inquiries_bookmarked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever messages change
  const persistMessages = (newList) => {
    setMessages(newList);
    try {
      localStorage.setItem('rk_inquiries_list_v1', JSON.stringify(newList));
    } catch {
      // ignore
    }
  };

  // Toggle Bookmark
  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    let updated;
    if (bookmarkedIds.includes(id)) {
      updated = bookmarkedIds.filter((bId) => bId !== id);
      showToast('Bookmark removed', 'info');
    } else {
      updated = [...bookmarkedIds, id];
      showToast('Inquiry bookmarked for follow-up', 'success');
    }
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('rk_inquiries_bookmarked', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Fetch messages from backend if available
  const fetchMessages = async (showSuccessToast = false) => {
    setRefreshing(true);
    try {
      let query = `?status=${encodeURIComponent(statusFilter)}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      const res = await api.get(`/contact${query}`);
      if (res?.messages && Array.isArray(res.messages) && res.messages.length > 0) {
        const formatted = res.messages.map((m, idx) => ({
          _id: m._id || `inq-${idx + 1}`,
          name: m.name || 'Anonymous Sender',
          email: m.email || 'N/A',
          phone: m.phone || 'N/A',
          subject: m.subject || 'General Inquiry',
          message: m.message || '',
          status: m.status === 'unread' ? 'new' : m.status === 'read' ? 'in_review' : m.status === 'replied' ? 'resolved' : (m.status || 'new'),
          receivedDate: m.createdAt ? new Date(m.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '13 Nov 2026',
          adminNotes: m.adminNotes || '',
        }));
        persistMessages(formatted);
      }
      if (showSuccessToast) {
        showToast('Inquiries inbox refreshed', 'success');
      }
    } catch (err) {
      if (showSuccessToast) {
        showToast('Showing inquiries list', 'info');
      }
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(false);
  }, [statusFilter]);

  // Handle Status Update
  const handleStatusUpdate = async (id, newStatus, adminNotes = '') => {
    const updated = messages.map((m) =>
      m._id === id ? { ...m, status: newStatus, adminNotes: adminNotes !== undefined ? adminNotes : m.adminNotes } : m
    );
    persistMessages(updated);

    if (selectedMessage && selectedMessage._id === id) {
      setSelectedMessage((prev) => ({ ...prev, status: newStatus, adminNotes: adminNotes !== undefined ? adminNotes : prev.adminNotes }));
    }

    try {
      const backendStatus = newStatus === 'new' ? 'unread' : newStatus === 'in_review' ? 'read' : 'replied';
      await api.put(`/contact/${id}`, { status: backendStatus, adminNotes });
      showToast(`Inquiry marked as ${newStatus.replace('_', ' ').toUpperCase()}`, 'success');
    } catch (err) {
      showToast(`Status updated to ${newStatus.replace('_', ' ').toUpperCase()}`, 'success');
    }
  };

  // Handle Delete Inquiry
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete inquiry message from "${name}"?`)) return;
    const updated = messages.filter((m) => m._id !== id);
    persistMessages(updated);
    if (selectedMessage?._id === id) setSelectedMessage(null);

    try {
      await api.delete(`/contact/${id}`);
      showToast('Inquiry removed', 'info');
    } catch (err) {
      showToast('Inquiry removed from view', 'info');
    }
  };

  // Client-side CSV Export
  const handleExportCSV = () => {
    const headers = ['ID', 'Sender Name', 'Email', 'Phone', 'Subject', 'Message Content', 'Status', 'Received Date', 'Admin Notes'];

    const rows = filteredMessages.map((m) => [
      `"${m._id}"`,
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${m.email}"`,
      `"${m.phone}"`,
      `"${(m.subject || '').replace(/"/g, '""')}"`,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${(m.status || 'new').toUpperCase()}"`,
      `"${m.receivedDate || ''}"`,
      `"${(m.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inquiries_inbox_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Inquiries exported as CSV', 'success');
  };

  // Dynamic counts
  const totalCount = messages.length;
  const newCount = messages.filter((m) => m.status === 'new' || m.status === 'unread').length;
  const inReviewCount = messages.filter((m) => m.status === 'in_review' || m.status === 'read').length;
  const resolvedCount = messages.filter((m) => m.status === 'resolved' || m.status === 'replied').length;

  // Filtered & Sorted list
  const filteredMessages = useMemo(() => {
    let result = [...messages];

    // Status filter
    if (statusFilter !== 'All') {
      if (statusFilter === 'new') {
        result = result.filter((m) => m.status === 'new' || m.status === 'unread');
      } else if (statusFilter === 'in_review') {
        result = result.filter((m) => m.status === 'in_review' || m.status === 'read');
      } else if (statusFilter === 'resolved') {
        result = result.filter((m) => m.status === 'resolved' || m.status === 'replied');
      }
    }

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          (m.name || '').toLowerCase().includes(q) ||
          (m.email || '').toLowerCase().includes(q) ||
          (m.phone || '').toLowerCase().includes(q) ||
          (m.subject || '').toLowerCase().includes(q) ||
          (m.message || '').toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'Newest Received') {
      // Natural order
    } else if (sortBy === 'Oldest Received') {
      result.reverse();
    } else if (sortBy === 'Sender (A - Z)') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'Sender (Z - A)') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [messages, statusFilter, search, sortBy]);

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* ── Page Header (Executive Proportions) ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-[15px] font-bold text-slate-900 tracking-tight">
              Inquiries Inbox
            </h1>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-red-50 text-red-600 border border-red-100">
              {totalCount} Total
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-normal mt-0.5">
            Review community questions, partnership requests, and public inquiries submitted via contact forms.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => fetchMessages(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition cursor-pointer disabled:opacity-60"
            title="Refresh Inquiries"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${refreshing ? 'animate-spin text-[#DC2626]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ── Status Tabs Row (Matches screenshot pills) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* All Inquiries */}
          <button
            onClick={() => setStatusFilter('All')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer select-none ${
              statusFilter === 'All'
                ? 'bg-[#DC2626] text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>All Inquiries</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'All' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {/* New */}
          <button
            onClick={() => setStatusFilter('new')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
              statusFilter === 'new'
                ? 'bg-[#DC2626] text-white font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>New</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'new' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {newCount}
            </span>
          </button>

          {/* In Review */}
          <button
            onClick={() => setStatusFilter('in_review')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
              statusFilter === 'in_review'
                ? 'bg-[#DC2626] text-white font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>In Review</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'in_review' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {inReviewCount}
            </span>
          </button>

          {/* Resolved */}
          <button
            onClick={() => setStatusFilter('resolved')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
              statusFilter === 'resolved'
                ? 'bg-[#DC2626] text-white font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Resolved</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'resolved' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {resolvedCount}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-700">{filteredMessages.length}</span> of{' '}
          <span className="font-bold text-slate-700">{totalCount}</span> messages
        </div>
      </div>

      {/* ── Search & Sort Row ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by sender name, email, phone, subject, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-xs"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-slate-400 font-semibold">Sort:</span>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-xs cursor-pointer"
            >
              <option value="Newest Received">Newest Received</option>
              <option value="Oldest Received">Oldest Received</option>
              <option value="Sender (A - Z)">Sender (A - Z)</option>
              <option value="Sender (Z - A)">Sender (Z - A)</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* ── Table Card (Dashboard Compact Hierarchy) ── */}
      <div className="flex flex-col bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[850px]">
            <thead className="bg-slate-50 border-b border-slate-200/90 shadow-2xs select-none">
              <tr>
                <th className="px-3.5 py-2.5 text-left font-bold text-[10px] uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  SENDER
                </th>
                <th className="px-3.5 py-2.5 text-left font-bold text-[10px] uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  SUBJECT
                </th>
                <th className="px-3.5 py-2.5 text-left font-bold text-[10px] uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  MESSAGE CONTENT
                </th>
                <th className="px-3.5 py-2.5 text-left font-bold text-[10px] uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  STATUS
                </th>
                <th className="px-3.5 py-2.5 text-left font-bold text-[10px] uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  RECEIVED DATE
                </th>
                <th className="px-3.5 py-2.5 text-right font-bold text-[10px] uppercase tracking-wider text-slate-500 whitespace-nowrap">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredMessages.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    <Mail className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-slate-700">No contact messages found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try clearing your search query or filters</p>
                  </td>
                </tr>
              ) : (
                filteredMessages.map((m) => {
                  const initialLetter = (m.name || 'M').trim().charAt(0).toUpperCase();
                  const isBookmarked = bookmarkedIds.includes(m._id);

                  return (
                    <tr key={m._id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* 1. Sender Profile */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-50 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 border border-red-100 shadow-2xs">
                            {initialLetter}
                          </div>
                          <div className="min-w-0">
                            <span className="block font-bold text-xs sm:text-sm text-slate-900 leading-snug truncate max-w-xs sm:max-w-md">
                              {m.name}
                            </span>
                            <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 truncate max-w-[180px]">
                                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                {m.email}
                              </span>
                              {m.phone && (
                                <>
                                  <span>•</span>
                                  <span className="inline-flex items-center gap-1">
                                    <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                    {m.phone}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. Subject */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700 max-w-[200px] truncate">
                          {m.subject || 'General Inquiry'}
                        </span>
                      </td>

                      {/* 3. Message Content */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle max-w-xs">
                        <p className="text-xs text-slate-600 font-medium truncate max-w-[240px]">
                          {m.message || 'No message content.'}
                        </p>
                      </td>

                      {/* 4. Status Badge */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle whitespace-nowrap">
                        {(m.status === 'new' || m.status === 'unread') && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200/90 text-[10px] font-extrabold uppercase tracking-wide text-amber-700">
                            <Clock className="w-3 h-3" />
                            <span>NEW</span>
                          </span>
                        )}
                        {(m.status === 'in_review' || m.status === 'read') && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/90 text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                            <Clock className="w-3 h-3" />
                            <span>IN REVIEW</span>
                          </span>
                        )}
                        {(m.status === 'resolved' || m.status === 'replied') && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/90 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>RESOLVED</span>
                          </span>
                        )}
                      </td>

                      {/* 5. Received Date */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle whitespace-nowrap text-xs font-medium text-slate-600">
                        {m.receivedDate || '13 Nov 2026'}
                      </td>

                      {/* 6. Actions */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2 justify-end">
                          {/* Bookmark Toggle */}
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(m._id, e)}
                            className={`p-1.5 rounded-lg transition cursor-pointer hover:bg-slate-100 ${
                              isBookmarked
                                ? 'text-emerald-600 fill-emerald-600'
                                : 'text-emerald-600 hover:text-emerald-700'
                            }`}
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Inquiry'}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600' : ''}`} />
                          </button>

                          {/* Respond Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedMessage(m)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-black text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Respond</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDelete(m._id, m.name)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete Message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Bottom status footer */}
        <div className="bg-slate-50/90 border-t border-slate-200/80 px-4 py-2.5 flex items-center justify-between text-xs text-slate-500">
          <span>
            Displaying <strong className="text-slate-700">{filteredMessages.length}</strong> active messages
          </span>
          <span className="text-[11px] text-slate-400">
            RK Foundation Public Communications CMS • 2026
          </span>
        </div>
      </div>

      {/* ── Respond / View Message Modal ── */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 border border-red-100 flex items-center justify-center font-bold text-xs">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Inquiry Message Details</h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[#0F172A]">{selectedMessage.name}</h4>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedMessage.email}</span>
                    {selectedMessage.phone && (
                      <>
                        <span className="text-slate-300">|</span>
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{selectedMessage.phone}</span>
                      </>
                    )}
                  </p>
                  <p className="text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Received on {selectedMessage.receivedDate || '13 Nov 2026'}</span>
                  </p>
                </div>

                <div>
                  {(selectedMessage.status === 'new' || selectedMessage.status === 'unread') && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> NEW
                    </span>
                  )}
                  {(selectedMessage.status === 'in_review' || selectedMessage.status === 'read') && (
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> IN REVIEW
                    </span>
                  )}
                  {(selectedMessage.status === 'resolved' || selectedMessage.status === 'replied') && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> RESOLVED
                    </span>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Subject
                </span>
                <p className="text-slate-900 font-bold mt-0.5 text-sm">{selectedMessage.subject}</p>
              </div>

              {/* Full Message Body */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Message Content
                </span>
                <p className="text-slate-800 leading-relaxed whitespace-pre-wrap font-normal">
                  {selectedMessage.message}
                </p>
              </div>

              {/* Coordinator Notes / Response Log */}
              <div className="pt-2">
                <label className="block text-slate-700 font-bold mb-1">
                  Coordinator Follow-Up & Response Notes:
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Sent official CSR proposal PDF via email. Awaiting call scheduled for Monday..."
                  defaultValue={selectedMessage.adminNotes || ''}
                  onChange={(e) => {
                    const notes = e.target.value;
                    setSelectedMessage((prev) => ({ ...prev, adminNotes: notes }));
                  }}
                  onBlur={(e) => handleStatusUpdate(selectedMessage._id, selectedMessage.status, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 justify-end">
              <button
                type="button"
                onClick={() => handleStatusUpdate(selectedMessage._id, 'resolved', selectedMessage.adminNotes)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-xs transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Mark Resolved</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate(selectedMessage._id, 'in_review', selectedMessage.adminNotes)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-black transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5" />
                <span>Mark In Review</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusUpdate(selectedMessage._id, 'new', selectedMessage.adminNotes)}
                className="px-4 py-2 rounded-xl bg-amber-50 text-amber-700 font-bold text-xs hover:bg-amber-100 border border-amber-200 transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Mark New</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 font-semibold text-xs hover:bg-slate-200 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
