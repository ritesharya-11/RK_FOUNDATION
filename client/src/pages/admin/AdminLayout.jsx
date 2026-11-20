import React, { useState } from 'react';
import { NavLink, Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
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

  const location = useLocation();
  const currentNav = navItems.find((item) =>
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );
  const currentTitle = currentNav ? currentNav.name : 'Donations & Receipts';

  const navLinkStyle = ({ isActive }) =>
    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] leading-tight transition-all duration-150 select-none cursor-pointer group ${isActive
      ? 'bg-[#DC2626] text-white font-semibold shadow-xs'
      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/80 font-medium'
    }`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans">
      <div className="flex-1 flex">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-slate-200/80 fixed top-0 bottom-0 z-20 shadow-2xs">
          {/* Logo Brand Header */}
          <div className="p-4 border-b border-slate-100 flex flex-col items-start gap-1.5">
            <Link to="/admin/dashboard" className="flex items-center gap-2 group">
              <img
                src="/logo.png"
                alt="Rebirth Care Trust"
                className="h-9 w-auto object-contain max-w-[190px]"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallback = document.getElementById('sidebar-logo-fallback');
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div id="sidebar-logo-fallback" className="hidden items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#DC2626] text-white flex items-center justify-center font-black text-xs shadow-sm">
                  RCT
                </div>
                <span className="font-bold text-sm text-[#0F172A]">Rebirth Care Trust</span>
              </div>
            </Link>
            <span className="text-[9px] font-bold text-slate-500 bg-slate-100 border border-slate-200/80 px-1.5 py-0.5 rounded tracking-tight">
              Reg No. 769 PAN No. AAETR1098J
            </span>
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
                      <span className="truncate tracking-[-0.01em]">{item.name}</span>
                    </div>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 shrink-0 text-white/90" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* User Profile in Sidebar Footer */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80">
              <div className="overflow-hidden min-w-0 pr-1">
                <span className="block text-xs font-bold text-slate-900 truncate">
                  {user?.name || 'Trust Administrator'}
                </span>
                <span className="block text-[11px] text-slate-400 truncate">
                  {user?.email || 'info@rebirthcaretrust.o...'}
                </span>
              </div>
              <span className="text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 px-1.5 py-0.5 rounded shrink-0">
                SUPER ADMIN
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                target="_blank"
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                <span>Public Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-semibold text-rose-600 bg-white hover:bg-rose-50 border border-slate-200 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0 w-full">
          {/* Top Header Bar matching screenshot: Breadcrumbs on Left, Admin Avatar on Right */}
          <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-20 px-4 sm:px-8 flex items-center justify-between gap-4 shadow-2xs">
            <div className="flex items-center gap-2.5">
              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Breadcrumb Path matching screenshot: Admin > Donations & Receipts */}
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                <Link to="/admin/dashboard" className="hover:text-slate-600 transition">
                  Admin
                </Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-slate-700 font-semibold">{currentTitle}</span>
              </div>
            </div>

            {/* Right: Administrator Avatar & Profile badge */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-[#DC2626] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {user?.name ? user.name[0].toUpperCase() : 'R'}
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <span className="block text-xs font-bold text-slate-900">
                  {user?.name || 'RK Foundation Super Admin'}
                </span>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">
                  SUPER ADMIN
                </span>
              </div>
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
                            <span className="truncate tracking-[-0.01em]">{item.name}</span>
                          </div>
                          {isActive && (
                            <ChevronRight className="w-3.5 h-3.5 shrink-0 text-white/90" />
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
          <main className="flex-1 p-4 sm:p-8 bg-[#F8FAFC] min-w-0 w-full pb-32 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] [background-size:24px_24px]">
            <Outlet context={{ globalSearch }} />
          </main>
        </div>
      </div>
    </div>
  );
};
