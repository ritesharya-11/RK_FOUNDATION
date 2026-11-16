import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import {
  Heart,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Shield,
  Droplets,
  Sparkles,
  ShieldCheck,
  HeartPulse,
  Leaf,
  LifeBuoy,
} from 'lucide-react';

export const Navbar = () => {
  const { settings } = useWebsite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileProgramsOpen(false);
    setProgramsDropdownOpen(false);
  }, [location.pathname]);

  // 10 Core Operational Charitable Programs (Exact Image Reference)
  const operationalProgramsCol1 = [
    {
      title: 'Children Development',
      slug: 'children-development',
      icon: GraduationCap,
      iconBg: 'bg-rose-50 text-rose-500 border border-rose-100',
    },
    {
      title: 'Aged / Elderly Care',
      slug: 'aged-elderly-care',
      icon: Heart,
      iconBg: 'bg-amber-50 text-amber-500 border border-amber-100',
    },
    {
      title: 'Education and Literacy',
      slug: 'education-and-literacy',
      icon: BookOpen,
      iconBg: 'bg-blue-50 text-blue-500 border border-blue-100',
    },
    {
      title: 'Dalit Upliftment & Rights',
      slug: 'dalit-upliftment-and-rights',
      icon: Shield,
      iconBg: 'bg-purple-50 text-purple-500 border border-purple-100',
    },
    {
      title: 'Drinking Water & Sanitation',
      slug: 'drinking-water-and-sanitation',
      icon: Droplets,
      iconBg: 'bg-rose-50 text-rose-500 border border-rose-100',
    },
  ];

  const operationalProgramsCol2 = [
    {
      title: "Women's Development and Empowerment",
      slug: 'womens-development-and-empowerment',
      icon: Sparkles,
      iconBg: 'bg-pink-50 text-pink-500 border border-pink-100',
    },
    {
      title: 'Differently Abled Support',
      slug: 'differently-abled-support',
      icon: ShieldCheck,
      iconBg: 'bg-indigo-50 text-indigo-500 border border-indigo-100',
    },
    {
      title: 'Health and Family Welfare',
      slug: 'health-and-family-welfare',
      icon: HeartPulse,
      iconBg: 'bg-emerald-50 text-emerald-500 border border-emerald-100',
    },
    {
      title: 'Environment and Forest Protection',
      slug: 'environment-and-forest-protection',
      icon: Leaf,
      iconBg: 'bg-teal-50 text-teal-500 border border-teal-100',
    },
    {
      title: 'Disaster Management & Emergency Relief',
      slug: 'disaster-management-and-emergency-relief',
      icon: LifeBuoy,
      iconBg: 'bg-rose-50 text-rose-500 border border-rose-100',
    },
  ];

  // Helper for active link matching reference format
  const getNavLinkClass = (path, exact = false) => {
    const isActive = exact
      ? location.pathname === path
      : location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    if (isActive) {
      return 'px-3.5 py-1.5 rounded-lg bg-[#FFF4EB] border border-[#F67708]/30 text-[#F67708] font-bold text-[13px] transition shadow-xs flex items-center gap-1';
    }
    return 'px-2.5 py-1.5 text-[13px] font-semibold text-[#323D3D] hover:text-[#F67708] transition flex items-center gap-1';
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-xs transition-all">
      {/* 1. Top Colored Accent Stripe */}
      <div className="w-full h-1 bg-[#F67708]" />

      {/* 2. Main Navbar Bar */}
      <div className="w-full border-b border-[#E3D9CF]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between">
          {/* Left Brand Area (Logo + Foundation Title) */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#E3D9CF] flex items-center justify-center p-1.5 shadow-xs group-hover:scale-105 transition-transform">
                <img
                  src="/logo-icon.png"
                  alt="RK Foundation Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-base sm:text-lg tracking-tight text-[#323D3D] leading-none group-hover:text-[#F67708] transition-colors">
                    RK FOUNDATION
                  </span>
                </div>
                <span className="text-[10px] font-medium text-[#697777] italic tracking-wide mt-0.5">
                  A belief in humanity
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links (Matching Screenshot Format) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* Home */}
            <NavLink to="/" className={getNavLinkClass('/', true)}>
              Home
            </NavLink>

            {/* Our Programs (Mega Dropdown Menu) */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsDropdownOpen(true)}
              onMouseLeave={() => setProgramsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                className={`cursor-pointer ${getNavLinkClass('/programs')}`}
              >
                <span>Our Programs</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    programsDropdownOpen ? 'rotate-180 text-[#F67708]' : 'opacity-70'
                  }`}
                />
              </button>

              {/* Exact Mega Dropdown matching uploaded screenshot */}
              {programsDropdownOpen && (
                <div
                  className="absolute top-full -left-20 sm:-left-36 w-[640px] xl:w-[720px] bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 mt-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseEnter={() => setProgramsDropdownOpen(true)}
                  onMouseLeave={() => setProgramsDropdownOpen(false)}
                >
                  {/* Top Header Strip */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                    <span className="text-[11px] font-black uppercase tracking-wider text-slate-700">
                      OPERATIONAL CHARITABLE PROGRAMS
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-500">
                      10 Programs
                    </span>
                  </div>

                  {/* 2-Column Grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 py-3.5">
                    {/* Column 1 */}
                    <div className="space-y-1">
                      {operationalProgramsCol1.map((prog, idx) => {
                        const IconComponent = prog.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/programs/${prog.slug}`}
                            onClick={() => setProgramsDropdownOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${prog.iconBg} group-hover:scale-105 transition-transform`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#F67708] transition truncate">
                              {prog.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-1">
                      {operationalProgramsCol2.map((prog, idx) => {
                        const IconComponent = prog.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/programs/${prog.slug}`}
                            onClick={() => setProgramsDropdownOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition group"
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${prog.iconBg} group-hover:scale-105 transition-transform`}
                            >
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-xs sm:text-[13px] font-semibold text-slate-800 group-hover:text-[#F67708] transition truncate">
                              {prog.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Footer Strip */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-normal">
                      Direct on-ground NGO initiatives across Delhi-NCR
                    </span>
                    <Link
                      to="/programs"
                      onClick={() => setProgramsDropdownOpen(false)}
                      className="font-bold text-[#F67708] hover:text-[#E06800] flex items-center gap-1 transition"
                    >
                      <span>Explore All Programs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Live Cases */}
            <NavLink to="/projects" className={getNavLinkClass('/projects')}>
              Live Cases
            </NavLink>

            {/* Successful Stories */}
            <NavLink to="/news" className={getNavLinkClass('/news')}>
              Successful Stories
            </NavLink>

            {/* Parents Video */}
            <NavLink to="/parents-video" className={getNavLinkClass('/parents-video')}>
              Parents Video
            </NavLink>

            {/* Gallery */}
            <NavLink to="/gallery" className={getNavLinkClass('/gallery')}>
              Gallery
            </NavLink>

            {/* About */}
            <NavLink to="/about" className={getNavLinkClass('/about')}>
              About
            </NavLink>

            {/* Contact */}
            <NavLink to="/contact" className={getNavLinkClass('/contact')}>
              Contact
            </NavLink>
          </nav>

          {/* Right Action: Red/Vermillion Pill Button with Heart & Arrow */}
          <div className="flex items-center gap-3">
            <Link
              to="/donate"
              className="px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#F67708] hover:bg-[#E06800] shadow-md hover:shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-current text-white shrink-0" />
              <span>Donate Now</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#323D3D] hover:text-[#F67708] rounded-lg transition cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E3D9CF] px-6 py-5 space-y-3 shadow-xl">
          <Link
            to="/"
            className="block text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2 border-b border-slate-100"
          >
            Home
          </Link>

          {/* Collapsible Mobile Programs */}
          <div>
            <button
              type="button"
              onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
              className="w-full flex items-center justify-between text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2 border-b border-slate-100"
            >
              <span>Our Programs (10)</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  mobileProgramsOpen ? 'rotate-180 text-[#F67708]' : ''
                }`}
              />
            </button>

            {mobileProgramsOpen && (
              <div className="pl-2 py-2 space-y-1 bg-slate-50/70 rounded-xl mt-1">
                {[...operationalProgramsCol1, ...operationalProgramsCol2].map((prog, idx) => {
                  const Icon = prog.icon;
                  return (
                    <Link
                      key={idx}
                      to={`/programs/${prog.slug}`}
                      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#F67708] transition"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#F67708]" />
                      <span className="truncate">{prog.title}</span>
                    </Link>
                  );
                })}
                <div className="pt-2 px-3 border-t border-slate-200">
                  <Link
                    to="/programs"
                    className="text-xs font-bold text-[#F67708] hover:underline block"
                  >
                    Explore All Programs →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/projects"
            className="block text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2 border-b border-slate-100"
          >
            Live Cases
          </Link>
          <Link
            to="/news"
            className="block text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2 border-b border-slate-100"
          >
            Successful Stories
          </Link>
          <Link
            to="/parents-video"
            className="block text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2 border-b border-slate-100"
          >
            Parents Video
          </Link>
          <Link
            to="/gallery"
            className="block text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2 border-b border-slate-100"
          >
            Gallery
          </Link>
          <Link
            to="/about"
            className="block text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2 border-b border-slate-100"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-sm font-bold text-[#323D3D] hover:text-[#F67708] py-2"
          >
            Contact
          </Link>

          <div className="pt-3">
            <Link
              to="/donate"
              className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#F67708] hover:bg-[#E06800] text-center shadow-md flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-current text-white" />
              <span>Donate Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
