import React, { useState, useEffect, useMemo } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import api from '../../services/api';
import {
  Search,
  Download,
  RefreshCw,
  Users,
  Clock,
  Phone,
  CheckCircle2,
  XCircle,
  MapPin,
  Building2,
  Calendar,
  Bookmark,
  Edit2,
  Trash2,
  X,
  ChevronDown,
  ChevronRight,
  Check,
  Mail,
  UserCheck,
} from 'lucide-react';

// ── Default 20 Volunteer Applications matching screenshot exactly ──
const INITIAL_VOLUNTEERS = [
  {
    _id: 'vol-01',
    fullName: 'FnNfAXcnBNHWKrqtapQoGd',
    email: 'g.ammenh@web.de',
    phone: '8116834091',
    city: 'PaBIPOHXvypqHPfXLuGuExhT',
    state: 'Delhi NCR',
    occupation: 'cdWnpwyOsjCmUATZFKBurp',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '12 Nov 2026',
    motivation: 'Deeply committed to on-ground humanitarian relief, food distribution, and community empowerment initiatives.',
    previousExperience: '2+ years volunteering with local youth and emergency food distribution networks.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-02',
    fullName: 'WbPMSSngiGBYArQrZzGarOS',
    email: 'mik.e...m.ac.lea.r@gmail.com',
    phone: '8952149201',
    city: 'wtHXeCFtgydZyzRH',
    state: 'Delhi NCR',
    occupation: 'MGsLGKByyojTLcfmSWENcmE',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '12 Nov 2026',
    motivation: 'Eager to support child tutoring and weekend educational bridge programs for underprivileged children.',
    previousExperience: 'Organized remedial education workshops for primary school students.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-03',
    fullName: 'NVbtlexmJcnvqejxQMDJ',
    email: 'baine.miller@yahoo.com',
    phone: '6139452592',
    city: 'NQoczRyGuctcqXelLHOE',
    state: 'Delhi NCR',
    occupation: 'OjSHaXXNSPnJfJtMYb',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '12 Nov 2026',
    motivation: 'Want to assist in medical camps, patient documentation, and hospital relief coordination.',
    previousExperience: 'Assisted in health checkup camps and volunteer blood donation drives.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-04',
    fullName: 'TbPhYOnkCpcPEAkt',
    email: 'devinder_nijjar@yahoo.com',
    phone: '8745156041',
    city: 'pWBrXyJimYDmlQPgSEI',
    state: 'Delhi NCR',
    occupation: 'hxGROUXymPriNjqKVwjVXju',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '11 Nov 2026',
    motivation: 'Passionate about volunteer coordination, logistics dispatch, and weekend community engagement drives.',
    previousExperience: 'Community outreach lead for neighborhood clean-up and literacy campaigns.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-05',
    fullName: 'goLcLJbEjDalvLRMplRBRst',
    email: 't.ommi.e.s...a.h@gmail.com',
    phone: '6447691637',
    city: 'MPgijesTYQdJogOWPWeHneE',
    state: 'Delhi NCR',
    occupation: 'kSXbxRmiPXsmKLgPe',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '11 Nov 2026',
    motivation: 'Experienced in community outreach and emergency food distributions across Delhi NCR.',
    previousExperience: 'Field volunteer for slum nourishment drives and ration delivery.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-06',
    fullName: 'Aakash Sharma',
    email: 'aakash.sharma.vol@gmail.com',
    phone: '9876543210',
    city: 'New Delhi, Central District',
    state: 'Delhi',
    occupation: 'Software Engineer & Mentor',
    areasOfInterest: ['General Community', 'Child Tutoring & Education'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '11 Nov 2026',
    motivation: 'Excited to contribute technical skills and teach computer basics to bridge school children.',
    previousExperience: '3 years college NGO coordinator for primary education.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-07',
    fullName: 'Ananya Verma',
    email: 'ananya.verma@outlook.com',
    phone: '9812345678',
    city: 'Noida, Sector 62',
    state: 'Uttar Pradesh',
    occupation: 'Medical Intern & Nurse Volunteer',
    areasOfInterest: ['General Community', 'Medical & Health Camps'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '11 Nov 2026',
    motivation: 'Passionate about pediatric relief, vitals screening, and patient assistance at health camps.',
    previousExperience: 'Medical intern at district civil hospital.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-08',
    fullName: 'Brijesh Kumar',
    email: 'brijesh.kumar@yahoo.com',
    phone: '9898765432',
    city: 'East Delhi, Nand Nagri',
    state: 'Delhi',
    occupation: 'Logistics Supervisor',
    areasOfInterest: ['General Community', 'Food & Nutrition Drives'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '10 Nov 2026',
    motivation: 'Dedicated to hunger relief and organizing transparent food truck distribution routes.',
    previousExperience: 'Warehouse and dispatch volunteer for disaster aid.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-09',
    fullName: 'Divya Mehra',
    email: 'divya.mehra@gmail.com',
    phone: '9711223344',
    city: 'South Delhi, Saket',
    state: 'Delhi',
    occupation: 'Remedial Educator',
    areasOfInterest: ['General Community', 'Child Tutoring & Education'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '10 Nov 2026',
    motivation: 'Believes in inclusive education and foundational literacy for every underprivileged child.',
    previousExperience: '5 years teaching Hindi and English remedial classes.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-10',
    fullName: 'Farhan Khan',
    email: 'farhan.khan@hotmail.com',
    phone: '9655443322',
    city: 'North East Delhi, Seelampur',
    state: 'Delhi',
    occupation: 'Community Organizer',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '10 Nov 2026',
    motivation: 'Committed to grassroots mobilization and helping families receive direct medical subsidies.',
    previousExperience: 'Youth club organizer in Seelampur and Yamuna Vihar.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-11',
    fullName: 'Harpreet Kaur',
    email: 'harpreet.kaur@gmail.com',
    phone: '9877001122',
    city: 'West Delhi, Janakpuri',
    state: 'Delhi',
    occupation: 'Vocational Trainer & Designer',
    areasOfInterest: ['General Community', 'Women Vocational Training'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '09 Nov 2026',
    motivation: 'Empowering marginalized women through tailoring, embroidery, and livelihood micro-skills.',
    previousExperience: 'Conducted tailoring certification batches for self-help groups.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-12',
    fullName: 'Jaspreet Singh',
    email: 'jaspreet.singh@yahoo.in',
    phone: '9833445566',
    city: 'Gurgaon, Sector 14',
    state: 'Haryana',
    occupation: 'Digital Media Specialist',
    areasOfInterest: ['General Community', 'Social Media & Content'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '09 Nov 2026',
    motivation: 'Helping create transparent donor impact stories and visual outreach video reels.',
    previousExperience: 'Managed social campaigns for non-profit education fundraisers.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-13',
    fullName: 'Lakshmi Narayan',
    email: 'lakshmi.narayan@gmail.com',
    phone: '9844556677',
    city: 'Ghaziabad, Indirapuram',
    state: 'Uttar Pradesh',
    occupation: 'Senior Accountant',
    areasOfInterest: ['General Community', 'Fundraising & Outreach'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '08 Nov 2026',
    motivation: 'Desire to support audited financial transparency and verified donor receipts.',
    previousExperience: 'Handled internal accounting and reconciliation for charity funds.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-14',
    fullName: 'Neha Gupta',
    email: 'neha.gupta@outlook.com',
    phone: '9866778899',
    city: 'Faridabad, Sector 15',
    state: 'Haryana',
    occupation: 'Counselor & Psychologist',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '08 Nov 2026',
    motivation: 'Offering emotional and counseling support for distressed hospital patients and families.',
    previousExperience: 'Hospital volunteer psychologist for pediatric ward caregivers.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-15',
    fullName: 'Prateek Bansal',
    email: 'prateek.bansal@gmail.com',
    phone: '9877889900',
    city: 'Delhi NCR, Rohini',
    state: 'Delhi',
    occupation: 'Event Coordinator',
    areasOfInterest: ['General Community', 'Event Management & Logistics'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '07 Nov 2026',
    motivation: 'Skilled in large-scale event organization, volunteer dispatch, and crowd management.',
    previousExperience: 'Managed 500+ attendees medical awareness conclaves.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-16',
    fullName: 'Rohit Sharma',
    email: 'rohit.sharma@yahoo.com',
    phone: '9811002233',
    city: 'South Delhi, Hauz Khas',
    state: 'Delhi',
    occupation: 'Outreach Photographer',
    areasOfInterest: ['General Community', 'Social Media & Content'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '07 Nov 2026',
    motivation: 'Documenting high-resolution photo archives of food relief and bridge schools.',
    previousExperience: 'Freelance photojournalist covering community outreach.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-17',
    fullName: 'Tanvi Jain',
    email: 'tanvi.jain@gmail.com',
    phone: '9822113344',
    city: 'New Delhi, Connaught Place',
    state: 'Delhi',
    occupation: 'Legal & Compliance Advisor',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '06 Nov 2026',
    motivation: 'Passionate about legal rights awareness and statutory compliance support for vulnerable families.',
    previousExperience: 'Volunteer legal aid clinic associate.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-18',
    fullName: 'Vikas Yadav',
    email: 'vikas.yadav@gmail.com',
    phone: '9833224455',
    city: 'Noida, Sector 18',
    state: 'Uttar Pradesh',
    occupation: 'Physical Education Coach',
    areasOfInterest: ['General Community', 'Child Tutoring & Education'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '06 Nov 2026',
    motivation: 'Encouraging healthy sports, nutrition habits, and discipline among street-to-school kids.',
    previousExperience: 'School athletic instructor and weekend football coach.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-19',
    fullName: 'Yasmin Begum',
    email: 'yasmin.begum@hotmail.com',
    phone: '9844335566',
    city: 'Delhi, Yamuna Khadar',
    state: 'Delhi',
    occupation: 'Social Worker',
    areasOfInterest: ['General Community', 'Food & Nutrition Drives'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '05 Nov 2026',
    motivation: 'Eager to serve underprivileged riverbank settlements with drinking water and warm garments.',
    previousExperience: '4 years active field worker in Yamuna flood relief operations.',
    adminNotes: '',
    bookmarked: false,
  },
  {
    _id: 'vol-20',
    fullName: 'Zoya Akhtar',
    email: 'zoya.akhtar@yahoo.com',
    phone: '9855446677',
    city: 'South Delhi, Greater Kailash',
    state: 'Delhi',
    occupation: 'University Student',
    areasOfInterest: ['General Community'],
    availableHoursPerWeek: 'Weekends',
    status: 'pending',
    appliedDate: '05 Nov 2026',
    motivation: 'Looking to give back to society by dedicating weekends to children and humanitarian relief.',
    previousExperience: 'Active volunteer in college community service cell.',
    adminNotes: '',
    bookmarked: false,
  },
];

export const AdminVolunteers = () => {
  const { showToast } = useWebsite();
  const [volunteers, setVolunteers] = useState(() => {
    try {
      const saved = localStorage.getItem('rk_volunteers_list_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_VOLUNTEERS;
  });

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Newest Applied');
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('rk_volunteers_bookmarked');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever volunteers change
  const persistVolunteers = (newList) => {
    setVolunteers(newList);
    try {
      localStorage.setItem('rk_volunteers_list_v2', JSON.stringify(newList));
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
      showToast('Applicant bookmarked for quick review', 'success');
    }
    setBookmarkedIds(updated);
    try {
      localStorage.setItem('rk_volunteers_bookmarked', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  // Fetch volunteers from backend if available
  const fetchVolunteers = async (showSuccessToast = false) => {
    setRefreshing(true);
    try {
      let query = `?status=${encodeURIComponent(statusFilter)}`;
      if (search) query += `&search=${encodeURIComponent(search)}`;
      const res = await api.get(`/volunteers${query}`);
      if (res?.volunteers && Array.isArray(res.volunteers) && res.volunteers.length > 0) {
        // Merge with initial data format
        const formatted = res.volunteers.map((v, idx) => ({
          _id: v._id || `vol-${idx + 1}`,
          fullName: v.fullName || 'Anonymous Volunteer',
          email: v.email || 'N/A',
          phone: v.phone || 'N/A',
          city: v.city || 'Delhi NCR',
          state: v.state || 'Delhi',
          occupation: v.occupation || 'Volunteer Professional',
          areasOfInterest: Array.isArray(v.areasOfInterest) && v.areasOfInterest.length > 0 ? v.areasOfInterest : ['General Community'],
          availableHoursPerWeek: v.availableHoursPerWeek || 'Weekends',
          status: v.status || 'pending',
          appliedDate: v.createdAt ? new Date(v.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '12 Nov 2026',
          motivation: v.motivation || 'Deeply committed to on-ground community relief.',
          previousExperience: v.previousExperience || '',
          adminNotes: v.adminNotes || '',
        }));
        persistVolunteers(formatted);
      }
      if (showSuccessToast) {
        showToast('Volunteer applications refreshed', 'success');
      }
    } catch (err) {
      if (showSuccessToast) {
        showToast('Showing active volunteer applications', 'info');
      }
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVolunteers(false);
  }, [statusFilter]);

  // Handle Status Update
  const handleStatusChange = async (id, newStatus, adminNotes = '') => {
    const updated = volunteers.map((v) =>
      v._id === id ? { ...v, status: newStatus, adminNotes: adminNotes !== undefined ? adminNotes : v.adminNotes } : v
    );
    persistVolunteers(updated);

    if (selectedVolunteer && selectedVolunteer._id === id) {
      setSelectedVolunteer((prev) => ({ ...prev, status: newStatus, adminNotes: adminNotes !== undefined ? adminNotes : prev.adminNotes }));
    }

    try {
      await api.put(`/volunteers/${id}`, { status: newStatus, adminNotes });
      showToast(`Status updated to ${newStatus.toUpperCase()}`, 'success');
    } catch (err) {
      showToast(`Status marked as ${newStatus.toUpperCase()}`, 'success');
    }
  };

  // Handle Delete Application
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete volunteer application for "${name}"?`)) return;
    const updated = volunteers.filter((v) => v._id !== id);
    persistVolunteers(updated);
    if (selectedVolunteer?._id === id) setSelectedVolunteer(null);

    try {
      await api.delete(`/volunteers/${id}`);
      showToast('Volunteer application removed', 'info');
    } catch (err) {
      showToast('Volunteer application removed', 'info');
    }
  };

  // Client-side CSV Export
  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Full Name',
      'Email',
      'Phone',
      'City',
      'State',
      'Occupation',
      'Areas of Interest',
      'Availability',
      'Status',
      'Applied Date',
      'Coordinator Notes',
      'Motivation',
    ];

    const rows = filteredVolunteers.map((v) => [
      `"${v._id}"`,
      `"${v.fullName.replace(/"/g, '""')}"`,
      `"${v.email}"`,
      `"${v.phone}"`,
      `"${v.city.replace(/"/g, '""')}"`,
      `"${v.state || 'Delhi NCR'}"`,
      `"${(v.occupation || '').replace(/"/g, '""')}"`,
      `"${(v.areasOfInterest || []).join('; ')}"`,
      `"${v.availableHoursPerWeek || 'Weekends'}"`,
      `"${v.status.toUpperCase()}"`,
      `"${v.appliedDate || ''}"`,
      `"${(v.adminNotes || '').replace(/"/g, '""')}"`,
      `"${(v.motivation || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `volunteer_applications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Volunteer applications exported as CSV', 'success');
  };

  // Dynamic status counts
  const totalCount = volunteers.length;
  const pendingCount = volunteers.filter((v) => v.status === 'pending').length;
  const contactedCount = volunteers.filter((v) => v.status === 'contacted').length;
  const approvedCount = volunteers.filter((v) => v.status === 'approved').length;
  const rejectedCount = volunteers.filter((v) => v.status === 'rejected').length;

  // Filtered & Sorted list
  const filteredVolunteers = useMemo(() => {
    let result = [...volunteers];

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((v) => (v.status || '').toLowerCase() === statusFilter.toLowerCase());
    }

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (v) =>
          (v.fullName || '').toLowerCase().includes(q) ||
          (v.email || '').toLowerCase().includes(q) ||
          (v.phone || '').toLowerCase().includes(q) ||
          (v.city || '').toLowerCase().includes(q) ||
          (v.occupation || '').toLowerCase().includes(q) ||
          (v.areasOfInterest || []).some((tag) => tag.toLowerCase().includes(q)) ||
          (v.motivation || '').toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'Newest Applied') {
      // Natural order as stored (already newest first)
    } else if (sortBy === 'Oldest Applied') {
      result.reverse();
    } else if (sortBy === 'Name (A - Z)') {
      result.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (sortBy === 'Name (Z - A)') {
      result.sort((a, b) => b.fullName.localeCompare(a.fullName));
    }

    return result;
  }, [volunteers, statusFilter, search, sortBy]);

  return (
    <div className="space-y-4 w-full min-w-0">
      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <span>Admin</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800">Volunteers</span>
      </div>

      {/* ── Page Header (Exact match with screenshot) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Volunteer Applications
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-50 text-red-600 border border-red-100">
              {totalCount} Total
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review community applicants, track skills and areas of interest, and coordinate on-ground orientation.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => fetchVolunteers(true)}
            disabled={refreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition cursor-pointer disabled:opacity-60"
            title="Refresh Volunteers"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* ── Status Tabs Row (Matches screenshot pills) ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* All */}
          <button
            onClick={() => setStatusFilter('All')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer select-none ${
              statusFilter === 'All'
                ? 'bg-[#DC2626] text-white shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>All</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'All' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {totalCount}
            </span>
          </button>

          {/* Pending */}
          <button
            onClick={() => setStatusFilter('pending')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
              statusFilter === 'pending'
                ? 'bg-[#DC2626] text-white font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Pending</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'pending' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {pendingCount}
            </span>
          </button>

          {/* Contacted */}
          <button
            onClick={() => setStatusFilter('contacted')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
              statusFilter === 'contacted'
                ? 'bg-[#DC2626] text-white font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contacted</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'contacted' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {contactedCount}
            </span>
          </button>

          {/* Approved */}
          <button
            onClick={() => setStatusFilter('approved')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
              statusFilter === 'approved'
                ? 'bg-[#DC2626] text-white font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Approved</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'approved' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {approvedCount}
            </span>
          </button>

          {/* Rejected */}
          <button
            onClick={() => setStatusFilter('rejected')}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs transition cursor-pointer select-none ${
              statusFilter === 'rejected'
                ? 'bg-[#DC2626] text-white font-bold shadow-xs'
                : 'bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 font-semibold'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Rejected</span>
            <span
              className={`px-1.5 py-0.2 rounded text-[11px] font-bold ${
                statusFilter === 'rejected' ? 'bg-red-700/80 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {rejectedCount}
            </span>
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-700">{filteredVolunteers.length}</span> of{' '}
          <span className="font-bold text-slate-700">{totalCount}</span> applications
        </div>
      </div>

      {/* ── Search & Sort Row ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, email, phone, city, skills..."
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

        <div className="relative shrink-0">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto appearance-none pl-3.5 pr-8 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 shadow-xs cursor-pointer"
          >
            <option value="Newest Applied">Newest Applied</option>
            <option value="Oldest Applied">Oldest Applied</option>
            <option value="Name (A - Z)">Name (A - Z)</option>
            <option value="Name (Z - A)">Name (Z - A)</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* ── Sticky Table Card (Matches screenshot with top-[104px] sticky layout) ── */}
      <div className="sticky top-[104px] z-10 flex flex-col max-h-[calc(100vh-124px)] bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto flex-1">
          <table className="w-full text-left text-xs border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 bg-slate-50 border-b border-slate-200/90 shadow-xs select-none">
              <tr>
                <th className="px-4 py-3 text-left font-bold text-[11px] uppercase tracking-wider text-slate-500 whitespace-nowrap bg-slate-50 border-b border-slate-200/80">
                  APPLICANT PROFILE
                </th>
                <th className="px-4 py-3 text-left font-bold text-[11px] uppercase tracking-wider text-slate-500 whitespace-nowrap bg-slate-50 border-b border-slate-200/80">
                  CITY / OCCUPATION
                </th>
                <th className="px-4 py-3 text-left font-bold text-[11px] uppercase tracking-wider text-slate-500 whitespace-nowrap bg-slate-50 border-b border-slate-200/80">
                  AREAS OF INTEREST
                </th>
                <th className="px-4 py-3 text-left font-bold text-[11px] uppercase tracking-wider text-slate-500 whitespace-nowrap bg-slate-50 border-b border-slate-200/80">
                  AVAILABILITY
                </th>
                <th className="px-4 py-3 text-left font-bold text-[11px] uppercase tracking-wider text-slate-500 whitespace-nowrap bg-slate-50 border-b border-slate-200/80">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left font-bold text-[11px] uppercase tracking-wider text-slate-500 whitespace-nowrap bg-slate-50 border-b border-slate-200/80">
                  APPLIED DATE
                </th>
                <th className="px-4 py-3 text-right font-bold text-[11px] uppercase tracking-wider text-slate-500 whitespace-nowrap bg-slate-50 border-b border-slate-200/80">
                  ACTIONS
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {filteredVolunteers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p className="font-semibold text-sm text-slate-700">No volunteer applications found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try clearing your search query or filters</p>
                  </td>
                </tr>
              ) : (
                filteredVolunteers.map((v) => {
                  const initialLetter = (v.fullName || 'V').trim().charAt(0).toUpperCase();
                  const isBookmarked = bookmarkedIds.includes(v._id);

                  return (
                    <tr key={v._id} className="hover:bg-slate-50/70 transition-colors group">
                      {/* 1. Applicant Profile */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 border border-red-200/60 shadow-2xs">
                            {initialLetter}
                          </div>
                          <div className="min-w-0">
                            <span className="block font-bold text-xs sm:text-sm text-slate-900 leading-snug truncate max-w-xs sm:max-w-md">
                              {v.fullName}
                            </span>
                            <div className="flex items-center gap-2 text-slate-500 text-[11px] mt-0.5 whitespace-nowrap">
                              <span className="inline-flex items-center gap-1 truncate max-w-[180px]">
                                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                                {v.email}
                              </span>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1">
                                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                                {v.phone}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* 2. City / Occupation */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle">
                        <div className="space-y-0.5 min-w-[150px]">
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                            <MapPin className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
                            <span className="truncate max-w-[200px]">{v.city}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                            <span className="truncate max-w-[200px]">{v.occupation || 'N/A'}</span>
                          </div>
                        </div>
                      </td>

                      {/* 3. Areas of Interest */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle">
                        <span className="text-xs text-slate-600 font-medium">
                          {Array.isArray(v.areasOfInterest) && v.areasOfInterest.length > 0
                            ? v.areasOfInterest.join(', ')
                            : 'General Community'}
                        </span>
                      </td>

                      {/* 4. Availability */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-medium text-slate-700">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{v.availableHoursPerWeek || 'Weekends'}</span>
                        </div>
                      </td>

                      {/* 5. Status Badge */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle whitespace-nowrap">
                        {v.status === 'pending' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200/90 text-[10px] font-extrabold uppercase tracking-wide text-amber-700">
                            <Clock className="w-3 h-3" />
                            <span>PENDING</span>
                          </span>
                        )}
                        {v.status === 'approved' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 border border-emerald-200/90 text-[10px] font-extrabold uppercase tracking-wide text-emerald-700">
                            <Check className="w-3 h-3 stroke-[3]" />
                            <span>APPROVED</span>
                          </span>
                        )}
                        {v.status === 'contacted' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/90 text-[10px] font-extrabold uppercase tracking-wide text-blue-700">
                            <Phone className="w-3 h-3" />
                            <span>CONTACTED</span>
                          </span>
                        )}
                        {v.status === 'rejected' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/90 text-[10px] font-extrabold uppercase tracking-wide text-rose-700">
                            <X className="w-3 h-3" />
                            <span>REJECTED</span>
                          </span>
                        )}
                      </td>

                      {/* 6. Applied Date */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle whitespace-nowrap text-xs font-medium text-slate-600">
                        {v.appliedDate || '12 Nov 2026'}
                      </td>

                      {/* 7. Actions */}
                      <td className="px-4 py-3.5 border-b border-slate-100/90 align-middle text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2 justify-end">
                          {/* Bookmark Toggle */}
                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(v._id, e)}
                            className={`p-1.5 rounded-lg transition cursor-pointer hover:bg-slate-100 ${
                              isBookmarked
                                ? 'text-emerald-600 fill-emerald-600'
                                : 'text-emerald-600 hover:text-emerald-700'
                            }`}
                            title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Application'}
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-600' : ''}`} />
                          </button>

                          {/* Review Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedVolunteer(v)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0F172A] hover:bg-black text-white text-xs font-semibold shadow-xs transition cursor-pointer"
                          >
                            <Edit2 className="w-3 h-3" />
                            <span>Review</span>
                          </button>

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDelete(v._id, v.fullName)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                            title="Delete Application"
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
            Displaying <strong className="text-slate-700">{filteredVolunteers.length}</strong> active applications
          </span>
          <span className="text-[11px] text-slate-400">
            RK Foundation Volunteer Orientation CMS • 2026
          </span>
        </div>
      </div>

      {/* ── Review Application Modal ── */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">Volunteer Application Profile</h3>
              </div>
              <button
                onClick={() => setSelectedVolunteer(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center"
              >
                ×
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-[#0F172A]">{selectedVolunteer.fullName}</h4>
                  <p className="text-slate-600 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedVolunteer.email}</span>
                    <span className="text-slate-300">|</span>
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedVolunteer.phone}</span>
                  </p>
                  <p className="text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-red-500" />
                    <span>
                      {selectedVolunteer.city}, {selectedVolunteer.state || 'Delhi NCR'}
                    </span>
                  </p>
                </div>

                <div>
                  {selectedVolunteer.status === 'pending' && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> PENDING
                    </span>
                  )}
                  {selectedVolunteer.status === 'approved' && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <Check className="w-3 h-3 stroke-[3]" /> APPROVED
                    </span>
                  )}
                  {selectedVolunteer.status === 'contacted' && (
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <Phone className="w-3 h-3" /> CONTACTED
                    </span>
                  )}
                  {selectedVolunteer.status === 'rejected' && (
                    <span className="px-2.5 py-1 rounded-md bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                      <X className="w-3 h-3" /> REJECTED
                    </span>
                  )}
                </div>
              </div>

              {/* Occupation & Availability Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    Occupation
                  </span>
                  <p className="text-slate-800 font-semibold mt-0.5">{selectedVolunteer.occupation || 'N/A'}</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    Availability
                  </span>
                  <p className="text-emerald-700 font-bold mt-0.5">
                    {selectedVolunteer.availableHoursPerWeek || 'Weekends'}
                  </p>
                </div>
              </div>

              {/* Areas of Interest */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1.5">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Areas of Interest
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedVolunteer.areasOfInterest || ['General Community']).map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-[11px]"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Motivation */}
              <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                  Applicant Motivation
                </span>
                <p className="text-slate-700 leading-relaxed italic">
                  "{selectedVolunteer.motivation || 'Committed to humanitarian and community support.'}"
                </p>
              </div>

              {/* Previous Experience */}
              {selectedVolunteer.previousExperience && (
                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-1">
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">
                    Prior Experience
                  </span>
                  <p className="text-slate-700 leading-relaxed">{selectedVolunteer.previousExperience}</p>
                </div>
              )}

              {/* Coordinator Notes */}
              <div className="pt-2">
                <label className="block text-slate-700 font-bold mb-1">
                  Coordinator Notes & Onboarding Log:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Assigned to Sunday bridge school math coaching in Sector 62..."
                  defaultValue={selectedVolunteer.adminNotes || ''}
                  onChange={(e) => {
                    const notes = e.target.value;
                    setSelectedVolunteer((prev) => ({ ...prev, adminNotes: notes }));
                  }}
                  onBlur={(e) => handleStatusChange(selectedVolunteer._id, selectedVolunteer.status, e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 justify-end">
              <button
                type="button"
                onClick={() => handleStatusChange(selectedVolunteer._id, 'approved', selectedVolunteer.adminNotes)}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-xs transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Approve Application</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(selectedVolunteer._id, 'contacted', selectedVolunteer.adminNotes)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-black transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Mark Contacted</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(selectedVolunteer._id, 'rejected', selectedVolunteer.adminNotes)}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs hover:bg-rose-100 border border-rose-200 transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedVolunteer(null)}
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
