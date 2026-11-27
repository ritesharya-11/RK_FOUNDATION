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

  const panNumber = settings?.compliance?.panNumber || 'AAETR5566K';
  const darpanUid = settings?.compliance?.ngoDarpanUid || 'DL/2021/0298412';
  const displayAdminName = (user?.name || '').trim()
    ? user.name.replace(/RK Foundation/gi, 'Sahyora')
    : 'Sahyora Super Admin';
  const adminInitial = displayAdminName.charAt(0).toUpperCase();

  const navSections = [
    {
      label: 'Operations',
      items: [
        { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutGrid, end: true },
        { name: 'Donations & Receipts', path: '/admin/donations', icon: HeartHandshake },
        { name: 'Volunteers', path: '/admin/volunteers', icon: Users },
        { name: 'Inquiries Inbox', path: '/admin/contact-messages', icon: Mail },
      ],
    },
    {
      label: 'Programs & Media',
      items: [
        { name: 'Hero Banners', path: '/admin/hero-banners', icon: SlidersHorizontal },
        { name: 'Programs CMS', path: '/admin/programs', icon: Layers },
        { name: 'Campaigns', path: '/admin/campaigns', icon: Target },
        { name: 'Live Cases', path: '/admin/live-cases', icon: Heart },
        { name: 'Our Impact CMS', path: '/admin/impact', icon: Award },
        { name: 'Appreciation Letters', path: '/admin/appreciation-letters', icon: FileCheck },
        { name: 'Parents Video', path: '/admin/parents-video', icon: Video },
        { name: 'Media Library', path: '/admin/gallery', icon: Image },
        { name: 'Page Sections', path: '/admin/page-sections', icon: FileText },
      ],
    },
    {
      label: 'Governance',
      items: [
        { name: 'Trust Settings', path: '/admin/settings', icon: Settings },
        { name: 'Audit Trail', path: '/admin/audit-trail', icon: History },
        ...(isSuperAdmin
          ? [{ name: 'Admin Users', path: '/admin/users', icon: ShieldCheck }]
          : []),
      ],
    },
  ];

  const navItems = navSections.flatMap((section) => section.items);

  const location = useLocation();
  const currentNav = navItems.find((item) =>
    item.end ? location.pathname === item.path : location.pathname.startsWith(item.path)
  );
  const currentTitle = currentNav ? currentNav.name : 'Donations & Receipts';

  const navLinkStyle = ({ isActive }) =>
    `flex items-center justify-between px-3 py-2 rounded-sm text-[13px] leading-tight transition-colors duration-150 select-none cursor-pointer group ${isActive
      ? 'bg-[#EAF3EE] text-[#14382C] font-semibold'
      : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] font-medium'
    }`;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#111827] flex flex-col font-sans">
      <div className="flex-1 flex">
        {/* Left Sidebar (Desktop) */}
        <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-[#E5E7EB] fixed top-0 bottom-0 z-20">
          {/* Logo Brand Header */}
          <div className="px-4 py-3.5 border-b border-[#E5E7EB] flex flex-col items-start gap-2">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-sm bg-white border border-[#E5E7EB] flex items-center justify-center p-1 shrink-0">
                <img
                  src="/logo-icon.png"
                  alt="SAHYORA Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <img
                  src="/logo-wordmark.png"
                  alt="SAHYORA"
                  className="h-3.5 w-auto object-contain object-left"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-[11px] font-medium text-[#6B7280] mt-1 leading-none">
                  Admin Control Panel
                </span>
              </div>
            </Link>
            <span className="text-[10.5px] font-medium text-[#4B5563] bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-0.5 rounded-sm font-mono tracking-tight">
              Reg {darpanUid} • PAN {panNumber}
            </span>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 custom-admin-scrollbar">
            {navSections.map((section) => (
              <div key={section.label} className="space-y-1">
                <p className="px-3 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#9CA3AF]">
                  {section.label}
                </p>
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.end}
                    className={navLinkStyle}
                  >
                    {({ isActive }) => (
                      <>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <item.icon
                            className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#14382C]' : 'text-[#6B7280] group-hover:text-[#111827]'
                              }`}
                          />
                          <span className="truncate tracking-[-0.01em]">{item.name}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#14382C] shrink-0" />
                        )}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            ))}
          </div>

          {/* User Profile in Sidebar Footer */}
          <div className="p-3 border-t border-[#E5E7EB] bg-[#F9FAFB] space-y-2">
            <div className="flex items-center justify-between p-2.5 rounded-sm bg-white border border-[#E5E7EB]">
              <div className="overflow-hidden min-w-0 pr-1.5">
                <span className="block text-[12.5px] font-semibold text-[#111827] truncate">
                  {displayAdminName}
                </span>
                <span className="block text-[11px] text-[#6B7280] truncate">
                  {user?.email || 'admin@rkfoundation.org'}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#14382C] bg-[#EAF3EE] border border-[#14382C]/15 px-1.5 py-0.5 rounded-sm uppercase tracking-wider shrink-0">
                {user?.role === 'superadmin' ? 'SUPER' : 'ADMIN'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Link
                to="/"
                target="_blank"
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-sm text-[12px] font-medium text-[#374151] bg-white hover:bg-[#F3F4F6] border border-[#E5E7EB] transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#6B7280]" />
                <span>Public Site</span>
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-sm text-[12px] font-medium text-[#BE123C] bg-white hover:bg-[#FFF1F2] border border-[#E5E7EB] transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 lg:pl-64 flex flex-col min-h-screen min-w-0 w-full">
          {/* Top Header Bar */}
          <header className="h-14 bg-white border-b border-[#E5E7EB] sticky top-0 z-20 px-4 sm:px-7 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-1.5 rounded-sm text-[#4B5563] hover:text-[#111827] hover:bg-[#F3F4F6] cursor-pointer"
                aria-label="Toggle Admin Navigation"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              {/* Current Route Title & Subtle Path */}
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[15px] font-semibold text-[#111827] truncate tracking-[-0.01em]">
                  {currentTitle}
                </span>
                <span className="hidden sm:inline-flex items-center text-[11px] font-medium text-[#6B7280] bg-[#F9FAFB] border border-[#E5E7EB] px-2 py-0.5 rounded-sm">
                  Admin Workspace
                </span>
              </div>
            </div>

            {/* Right: Administrator Avatar & Profile badge */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-sm bg-[#EAF3EE] border border-[#14382C]/15 text-[#14382C] flex items-center justify-center font-semibold text-xs">
                {adminInitial}
              </div>
              <div className="leading-tight text-left hidden sm:block">
                <span className="block text-[12.5px] font-semibold text-[#111827]">
                  {displayAdminName}
                </span>
                <span className="block text-[10.5px] font-medium uppercase tracking-wider text-[#6B7280]">
                  {user?.role === 'superadmin' ? 'SUPER ADMIN' : 'ADMINISTRATOR'}
                </span>
              </div>
            </div>
          </header>

          {/* Mobile Sidebar Drawer */}
          {sidebarOpen && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-[#111827]/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            >
              <div
                className="w-72 h-full bg-white p-4 space-y-3 overflow-y-auto border-r border-[#E5E7EB]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-sm bg-white border border-[#E5E7EB] flex items-center justify-center p-1 shrink-0">
                      <img
                        src="/logo-icon.png"
                        alt="SAHYORA Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <img
                      src="/logo-wordmark.png"
                      alt="SAHYORA"
                      className="h-3.5 w-auto object-contain object-left"
                    />
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-1.5 rounded-sm text-[#6B7280] hover:text-[#111827]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {navSections.map((section) => (
                    <div key={section.label} className="space-y-1">
                      <p className="px-3 pb-1 text-[10.5px] font-semibold uppercase tracking-[0.07em] text-[#9CA3AF]">
                        {section.label}
                      </p>
                      {section.items.map((item) => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          end={item.end}
                          onClick={() => setSidebarOpen(false)}
                          className={navLinkStyle}
                        >
                          {({ isActive }) => (
                            <>
                              <div className="flex items-center gap-2.5 min-w-0">
                                <item.icon
                                  className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#14382C]' : 'text-[#6B7280]'
                                    }`}
                                />
                                <span className="truncate tracking-[-0.01em]">{item.name}</span>
                              </div>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#14382C] shrink-0" />
                              )}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#E5E7EB] grid grid-cols-2 gap-2">
                  <Link
                    to="/"
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 py-2 rounded-sm text-[12px] font-medium text-[#374151] bg-[#F9FAFB] border border-[#E5E7EB]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Public Site</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-1.5 py-2 rounded-sm text-[12px] font-medium text-[#BE123C] bg-[#FFF1F2] border border-[#FECDD3] hover:bg-rose-100 transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Nested Content Outlet */}
          <main className="flex-1 p-4 sm:p-6 lg:p-7 bg-[#F8FAFC] min-w-0 w-full pb-28">
            <Outlet context={{ globalSearch }} />
          </main>
        </div>
      </div>
    </div>
  );
};
