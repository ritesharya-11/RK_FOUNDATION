import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWebsite } from '../../context/WebsiteContext';
import {
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
  Settings,
  History,
  ChevronRight,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Calendar,
  Newspaper,
  MessageSquareQuote,
  Mail,
} from 'lucide-react';

export const AdminLayout = () => {
  const { user, logout, isSuperAdmin } = useAuth();
  const { settings } = useWebsite();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  // The 14 exact menu items from the user's screenshots
  const primaryMenuItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutGrid,
      end: true,
    },
    {
      to: '/admin/hero-banners',
      label: 'Hero Banners',
      icon: SlidersHorizontal,
    },
    {
      to: '/admin/donations',
      label: 'Donations & Receipts',
      icon: HeartHandshake,
    },
    {
      to: '/admin/programs',
      label: 'Programs CMS',
      icon: Layers,
    },
    {
      to: '/admin/campaigns',
      label: 'Campaigns',
      icon: Target,
    },
    {
      to: '/admin/live-cases',
      label: 'Live Cases',
      icon: Heart,
    },
    {
      to: '/admin/impact',
      label: 'Our Impact CMS',
      icon: Award,
    },
    {
      to: '/admin/appreciation-letters',
      label: 'Appreciation Letters',
      icon: FileCheck,
    },
    {
      to: '/admin/parents-video',
      label: 'Parents Video',
      icon: Video,
    },
    {
      to: '/admin/gallery',
      label: 'Media Library',
      icon: Image,
    },
    {
      to: '/admin/page-sections',
      label: 'Page Sections',
      icon: FileText,
    },
    {
      to: '/admin/volunteers',
      label: 'Volunteers',
      icon: Users,
    },
    {
      to: '/admin/settings',
      label: 'Trust Settings',
      icon: Settings,
    },
    {
      to: '/admin/audit-trail',
      label: 'Audit Trail',
      icon: History,
    },
  ];

  // Additional utilities
  const secondaryMenuItems = [
    { to: '/admin/activities', label: 'Field Activities', icon: Calendar },
    { to: '/admin/news', label: 'News & Press', icon: Newspaper },
    { to: '/admin/testimonials', label: 'Beneficiary Stories', icon: MessageSquareQuote },
    { to: '/admin/contact-messages', label: 'Inquiries & Contact', icon: Mail },
  ];

  const navLinkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 group select-none ${
      isActive
        ? 'bg-[#DC2626] text-white shadow-sm font-bold'
        : 'text-[#334155] hover:text-[#0F172A] hover:bg-slate-200/70'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 sm:w-72 bg-[#F8FAFC] border-r border-slate-200/90 fixed inset-y-0 z-30 shadow-xs">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-200/80 flex items-center justify-between bg-white">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <img
              src="/logo-icon.png"
              alt="RK Foundation"
              className="w-8 h-8 rounded-xl object-contain shrink-0 shadow-2xs"
            />
            <div>
              <span className="block text-sm font-black text-[#0B0D17] leading-none tracking-tight">
                {settings.siteName || 'RK FOUNDATION'}
              </span>
              <span className="block text-[10px] text-red-600 font-bold uppercase tracking-wider mt-0.5">
                Admin Control Center
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items (The exact 14 items) */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1 custom-admin-scrollbar">
          {primaryMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkStyle}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto text-white shrink-0" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Secondary More Section */}
          <div className="pt-3 pb-1">
            <span className="block px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              More Tools
            </span>
          </div>

          {secondaryMenuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkStyle}
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto text-white shrink-0" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {isSuperAdmin && (
            <NavLink
              to="/admin/users"
              className={navLinkStyle}
            >
              {({ isActive }) => (
                <>
                  <ShieldCheck
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                    }`}
                  />
                  <span className="truncate">Admin Users & Access</span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 ml-auto text-white shrink-0" />
                  )}
                </>
              )}
            </NavLink>
          )}
        </div>

        {/* User Card & Logout in Sidebar Footer */}
        <div className="p-3 border-t border-slate-200/90 bg-white">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100/80 border border-slate-200/80">
            <div className="overflow-hidden">
              <span className="block text-xs font-bold text-[#0B0D17] truncate">{user?.name}</span>
              <span className="block text-[10px] text-red-600 font-semibold capitalize">{user?.role}</span>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-slate-200/80 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 sm:lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-16 bg-slate-900/95 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-sm sm:text-base font-extrabold text-white">
              RK FOUNDATION Management Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-600/20 text-red-400 border border-red-500/30 capitalize">
              {user?.role}
            </span>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-xs"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="w-72 h-full bg-[#F8FAFC] p-4 space-y-4 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold text-[#0B0D17] text-sm">Navigation</span>
                <button onClick={() => setSidebarOpen(false)} className="text-slate-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {primaryMenuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setSidebarOpen(false)}
                      className={navLinkStyle}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${
                              isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                          {isActive && (
                            <ChevronRight className="w-4 h-4 ml-auto text-white shrink-0" />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-slate-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Nested Page Content */}
        <main className="flex-1 p-4 sm:p-8 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
