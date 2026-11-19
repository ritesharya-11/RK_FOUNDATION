import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWebsite } from '../../context/WebsiteContext';
import {
  Search,
  ExternalLink,
  Download,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ChevronRight,
  LayoutGrid,
  SlidersHorizontal,
  HeartHandshake,
  Layers,
  Target,
  Heart,
  Award,
  FileCheck,
  Video,
  Image,
  FileText,
  Users,
  Mail,
  Settings,
  History,
  ShieldCheck,
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout, isSuperAdmin } = useAuth();
  const { settings } = useWebsite();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleExport = () => {
    const token = localStorage.getItem('rk_token');
    window.open(
      `${import.meta.env.VITE_API_BASE_URL || '/api'}/donations/export/csv?token=${token}`,
      '_blank'
    );
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutGrid, end: true },
    { name: 'Hero Banners', path: '/admin/hero-banners', icon: SlidersHorizontal },
    { name: 'Donations & Receipts', path: '/admin/donations', icon: HeartHandshake },
    { name: 'Programs CMS', path: '/admin/programs', icon: Layers },
    { name: 'Campaigns', path: '/admin/campaigns', icon: Target },
    { name: 'Live Cases', path: '/admin/live-cases', icon: Heart },
    { name: 'Our Impact CMS', path: '/admin/impact', icon: Award },
    { name: 'Appreciation Letters', path: '/admin/appreciation-letters', icon: FileCheck },
    { name: 'Parents Video', path: '/admin/parents-video', icon: Video },
    { name: 'Media Library', path: '/admin/gallery', icon: Image },
    { name: 'Page Sections', path: '/admin/page-sections', icon: FileText },
    { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
    { name: 'Inquiries Inbox', path: '/admin/contact-messages', icon: Mail },
    { name: 'Trust Settings', path: '/admin/settings', icon: Settings },
    { name: 'Audit Trail', path: '/admin/audit-trail', icon: History },
  ];

  if (isSuperAdmin) {
    navItems.push({ name: 'Admin Users', path: '/admin/users', icon: ShieldCheck });
  }

  const navLinkStyle = ({ isActive }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 select-none cursor-pointer group ${isActive
      ? 'bg-[#DC2626] text-white shadow-sm shadow-red-200'
      : 'text-slate-600 hover:text-[#DC2626] hover:bg-red-50 font-medium'
    }`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      {/* Top Banner Bar matching screenshot */}
      <div className="sticky top-0 z-30 h-10 bg-[#DC2626] text-white px-4 sm:px-6 flex items-center justify-between text-xs font-medium select-none shadow-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-200">
            {settings.siteName || 'RK Foundation'} – Admin Dashboard (clean)
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition cursor-pointer"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
          <span className="hidden sm:inline text-slate-400 text-[11px]">Show chat</span>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200/80 fixed top-10 bottom-0 z-20 shadow-2xs">
          {/* Logo Brand Header */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#DC2626] text-white flex items-center justify-center font-black text-sm tracking-tight shadow-sm group-hover:scale-105 transition-transform">
                RK
              </div>
              <div className="leading-tight">
                <span className="block text-sm font-bold text-[#0F172A]">
                  {settings.siteName || 'RK Foundation'}
                </span>
                <span className="block text-[11px] text-slate-400 font-medium">
                  Admin
                </span>
              </div>
            </Link>
          </div>

          {/* Clean Flat Navigation matching uploaded format */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-admin-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={navLinkStyle}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3 min-w-0">
                      <item.icon
                        className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-800'
                          }`}
                      />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 shrink-0 text-white" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* User Profile in Sidebar Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/60">
            <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200/70">
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                  {user?.name ? user.name[0].toUpperCase() : 'A'}
                </div>
                <div className="overflow-hidden">
                  <span className="block text-xs font-bold text-slate-900 truncate">
                    {user?.name || 'Administrator'}
                  </span>
                  <span className="block text-[10px] text-slate-500 capitalize">
                    {user?.role || 'Super Admin'}
                  </span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0 w-full">
          {/* Sub-Header Navigation Bar matching screenshot */}
          <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-10 z-20 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-3 flex-1">
              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Central Search Input matching screenshot */}
              <div className="relative w-full max-w-sm sm:max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search donors, receipts, volunteers..."
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="w-full bg-[#F1F5F9]/80 border border-slate-200/70 rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#F59E0B] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Right: View Website Link */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs transition"
              >
                <span>View website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </header>

          {/* Mobile Sidebar Drawer */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className="w-64 h-full bg-white p-4 space-y-3 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#DC2626] text-white flex items-center justify-center font-black text-xs">
                      RK
                    </div>
                    <span className="font-bold text-sm text-[#DC2626]">
                      {settings.siteName || 'RK Foundation'}
                    </span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={navLinkStyle}
                    >
                      {({ isActive }) => (
                        <>
                          <div className="flex items-center gap-3 min-w-0">
                            <item.icon
                              className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-500'
                                }`}
                            />
                            <span className="truncate">{item.name}</span>
                          </div>
                          {isActive && (
                            <ChevronRight className="w-4 h-4 shrink-0 text-white" />
                          )}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Nested Content Outlet */}
          <main className="flex-1 p-4 sm:p-8 bg-[#F8FAFC] min-w-0 w-full pb-32">
            <Outlet context={{ globalSearch }} />
          </main>
        </div>
      </div>
    </div>
  );
};
