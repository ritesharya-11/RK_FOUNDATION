import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import {
  Heart,
  ChevronDown,
  Menu,
  X,
  Phone,
  ShieldCheck,
  FileText,
  ArrowRight,
  Sparkles,
  GraduationCap,
  BookOpen,
  Droplets,
  Shield,
  HeartPulse,
  Leaf,
  LifeBuoy,
} from 'lucide-react';

// Lightweight Brand Social SVG Icons
const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const TwitterIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

export const Navbar = () => {
  const { settings } = useWebsite();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileProgramsOpen(false);
    setProgramsDropdownOpen(false);
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  const phone = settings.contact?.phone || '+91-9876543210';
  const uid = settings.compliance?.ngoDarpanUid || 'DL/2021/0298412';
  const pan = settings.compliance?.panNumber || 'AAETR5566K';
  const regNo = settings.compliance?.trustRegistrationNo || 'TRUST/DL/2021/887412';

  const navLinkClasses = (path, exact = false) => {
    const isActive = exact
      ? location.pathname === path
      : location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    return `text-[13px] lg:text-[14px] font-semibold transition-all duration-150 px-3 py-1.5 rounded-full flex items-center gap-1 ${
      isActive
        ? 'bg-[#0B0D17] text-white shadow-xs'
        : 'text-[#151A2D] hover:text-[#0B0D17] hover:bg-[#F7F7F5]'
    }`;
  };

  // Operational Charitable Programs matching exact reference UI (Column 1 & Column 2)
  const operationalProgramsCol1 = [
    {
      title: 'Children Development',
      category: 'Children Development',
      icon: GraduationCap,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200',
    },
    {
      title: 'Aged / Elderly Care',
      category: 'Aged / Elderly Care',
      icon: Heart,
      iconBg: 'bg-amber-50 text-amber-500 border border-amber-100',
    },
    {
      title: 'Education and Literacy',
      category: 'Education and Literacy',
      icon: BookOpen,
      iconBg: 'bg-blue-50 text-blue-500 border border-blue-100',
    },
    {
      title: 'Dalit Upliftment & Rights',
      category: 'Dalit Upliftment & Rights',
      icon: ShieldCheck,
      iconBg: 'bg-purple-50 text-purple-500 border border-purple-100',
    },
    {
      title: 'Drinking Water & Sanitation',
      category: 'Drinking Water & Sanitation',
      icon: Droplets,
      iconBg: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
    },
  ];

  const operationalProgramsCol2 = [
    {
      title: "Women's Development and Empowerment",
      category: "Women's Development and Empowerment",
      icon: Sparkles,
      iconBg: 'bg-amber-50 text-amber-600 border border-amber-200',
    },
    {
      title: 'Differently Abled Support',
      category: 'Differently Abled Support',
      icon: Shield,
      iconBg: 'bg-indigo-50 text-indigo-500 border border-indigo-100',
    },
    {
      title: 'Health and Family Welfare',
      category: 'Health and Family Welfare',
      icon: HeartPulse,
      iconBg: 'bg-emerald-50 text-emerald-500 border border-emerald-100',
    },
    {
      title: 'Environment and Forest Protection',
      category: 'Environment and Forest Protection',
      icon: Leaf,
      iconBg: 'bg-teal-50 text-teal-600 border border-teal-100',
    },
    {
      title: 'Disaster Management & Emergency Relief',
      category: 'Disaster Management & Emergency Relief',
      icon: LifeBuoy,
      iconBg: 'bg-orange-50 text-orange-600 border border-orange-200',
    },
  ];

  return (
    <div className="w-full">
      {/* ========================================================
          1. TOP UTILITY & COMPLIANCE BAR (Dark Navy #0B0D17)
          Matches the reference layout without harsh red
      ======================================================== */}
      <div className="bg-[#0B0D17] text-white text-[11px] sm:text-xs font-medium border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
          {/* Left: Contact Phone | UID | PAN */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3 text-slate-200">
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 hover:text-[#FFC43D] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC43D]" />
              <span>{phone}</span>
            </a>

            <span className="text-white/20 hidden sm:inline">|</span>

            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC43D]" />
              <span>UID: <strong className="text-white font-mono">{uid}</strong></span>
            </span>

            <span className="text-white/20 hidden md:inline">|</span>

            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <FileText className="w-3.5 h-3.5 text-[#FFC43D]" />
              <span>PAN: <strong className="text-white font-mono">{pan}</strong></span>
            </span>
          </div>

          {/* Right: Social Media Icons + Quick Donate Button */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden sm:flex items-center gap-2.5 text-slate-300">
              <a
                href={settings.socialLinks?.facebook || 'https://facebook.com'}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center transition-all"
              >
                <FacebookIcon />
              </a>
              <a
                href={settings.socialLinks?.twitter || 'https://x.com'}
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter)"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center transition-all"
              >
                <TwitterIcon />
              </a>
              <a
                href={settings.socialLinks?.youtube || 'https://youtube.com'}
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center transition-all"
              >
                <YoutubeIcon />
              </a>
              <a
                href={settings.socialLinks?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center transition-all"
              >
                <InstagramIcon />
              </a>
            </div>

            <Link
              to="/donate"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-[#FFC43D] text-[#0B0D17] font-bold text-[11px] transition-all duration-200 shadow-sm"
            >
              <Heart className="w-3 h-3 fill-[#FFC43D] text-[#0B0D17]" />
              <span>Quick Donate</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. MAIN NAVIGATION BAR (Crisp White #FFFFFF)
          Logo with Reg/PAN on left, Nav in center, Donate on right
      ======================================================== */}
      <nav className="bg-white/98 backdrop-blur-md border-b border-[#E8E8E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Left: Trust Logo + Reg/PAN Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/" className="flex items-center group py-0.5">
              <img
                src="/logo.png"
                alt={settings.siteName || 'RK FOUNDATION'}
                className="h-10 sm:h-11 md:h-12 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              />
            </Link>

            <div className="hidden sm:flex flex-col justify-center px-2.5 py-1 rounded-lg bg-[#F7F7F5] border border-[#E8E8E5] text-[10.5px] leading-tight font-medium text-[#151A2D] select-none">
              <div className="flex items-center gap-1.5">
                <span className="text-[#697386]">Reg:</span>
                <span className="font-bold text-[#151A2D] font-mono tracking-wide">887412</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#697386]">PAN:</span>
                <span className="font-bold text-[#151A2D] font-mono tracking-wide">AAETR5566K</span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 text-[#151A2D]">
            {/* Home */}
            <NavLink to="/" end className={() => navLinkClasses('/', true)}>
              Home
            </NavLink>

            {/* Our Programs Dropdown (2-Column Mega Menu matching reference) */}
            <div
              className="relative"
              onMouseEnter={() => setProgramsDropdownOpen(true)}
              onMouseLeave={() => setProgramsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => setProgramsDropdownOpen(!programsDropdownOpen)}
                className={`text-[13px] lg:text-[14px] font-semibold transition-all duration-150 px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer ${
                  location.pathname.startsWith('/programs')
                    ? 'bg-[#0B0D17] text-white shadow-xs'
                    : 'text-[#151A2D] hover:text-[#0B0D17] hover:bg-[#F7F7F5]'
                }`}
              >
                <span>Our Programs</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    programsDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {programsDropdownOpen && (
                <div className="absolute top-full -left-12 xl:-left-16 mt-2 w-[600px] xl:w-[650px] bg-white rounded-2xl shadow-2xl border border-[#E8E8E5] overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Top Header: OPERATIONAL CHARITABLE PROGRAMS + 10 Programs Badge */}
                  <div className="px-5 py-3 border-b border-[#E8E8E5] bg-white flex items-center justify-between">
                    <span className="text-[11px] font-extrabold tracking-wider text-[#151A2D] uppercase">
                      OPERATIONAL CHARITABLE PROGRAMS
                    </span>
                    <span className="text-[11px] font-bold text-[#697386] bg-[#F7F7F5] border border-[#E8E8E5] px-2.5 py-0.5 rounded">
                      10 Programs
                    </span>
                  </div>

                  {/* 2-Column Grid */}
                  <div className="p-4 grid grid-cols-2 gap-x-5 gap-y-1 bg-white">
                    {/* Left Column (5 items) */}
                    <div className="space-y-1">
                      {operationalProgramsCol1.map((prog, idx) => {
                        const IconComp = prog.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/programs?category=${encodeURIComponent(prog.category)}`}
                            onClick={() => setProgramsDropdownOpen(false)}
                            className="flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-[#F7F7F5] transition-colors group"
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${prog.iconBg}`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[12.5px] font-semibold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors truncate">
                              {prog.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    {/* Right Column (5 items) */}
                    <div className="space-y-1">
                      {operationalProgramsCol2.map((prog, idx) => {
                        const IconComp = prog.icon;
                        return (
                          <Link
                            key={idx}
                            to={`/programs?category=${encodeURIComponent(prog.category)}`}
                            onClick={() => setProgramsDropdownOpen(false)}
                            className="flex items-center gap-3 px-2.5 py-2 rounded-xl hover:bg-[#F7F7F5] transition-colors group"
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${prog.iconBg}`}
                            >
                              <IconComp className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-[12.5px] font-semibold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors truncate">
                              {prog.title}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="px-5 py-3 border-t border-[#E8E8E5] bg-[#F7F7F5]/50 flex items-center justify-between text-xs">
                    <span className="text-[#697386] text-[11px]">
                      Direct on-ground NGO initiatives across Delhi-NCR
                    </span>
                    <Link
                      to="/programs"
                      onClick={() => setProgramsDropdownOpen(false)}
                      className="text-[12px] font-bold text-[#0B0D17] hover:text-[#EBAF20] flex items-center gap-1 transition"
                    >
                      <span>Explore All Programs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Live Cases */}
            <NavLink to="/projects" className={() => navLinkClasses('/projects')}>
              Live Cases
            </NavLink>

            {/* Successful Stories (News / Articles) */}
            <NavLink to="/news" className={() => navLinkClasses('/news')}>
              Successful Stories
            </NavLink>

            {/* Parents Video / Field Activities */}
            <NavLink to="/activities" className={() => navLinkClasses('/activities')}>
              Field Activities
            </NavLink>

            {/* Gallery */}
            <NavLink to="/gallery" className={() => navLinkClasses('/gallery')}>
              Gallery
            </NavLink>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setAboutDropdownOpen(true)}
              onMouseLeave={() => setAboutDropdownOpen(false)}
            >
              <button
                className={`text-[13px] lg:text-[14px] font-semibold transition-all duration-150 px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer ${
                  location.pathname === '/about' || location.pathname === '/mission-and-vision'
                    ? 'bg-[#0B0D17] text-white shadow-xs'
                    : 'text-[#151A2D] hover:text-[#0B0D17] hover:bg-[#F7F7F5]'
                }`}
              >
                <span>About</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200" />
              </button>

              {aboutDropdownOpen && (
                <div className="absolute top-full left-0 mt-1.5 w-52 bg-white rounded-2xl shadow-elevated border border-[#E8E8E5] py-2 z-50">
                  <Link
                    to="/about"
                    className="block px-4 py-2 text-xs font-semibold text-[#151A2D] hover:bg-[#F7F7F5]"
                  >
                    About RK FOUNDATION
                  </Link>
                  <Link
                    to="/mission-and-vision"
                    className="block px-4 py-2 text-xs font-semibold text-[#151A2D] hover:bg-[#F7F7F5]"
                  >
                    Mission & Vision
                  </Link>
                  <Link
                    to="/receipt/verify"
                    className="block px-4 py-2 text-xs font-semibold text-[#151A2D] hover:bg-[#F7F7F5]"
                  >
                    Verify 80G Receipt
                  </Link>
                </div>
              )}
            </div>

            {/* Contact */}
            <NavLink to="/contact" className={() => navLinkClasses('/contact')}>
              Contact
            </NavLink>
          </div>

          {/* Right: Golden-Yellow CTA Button (Following Website Color Sequence) */}
          <div className="flex items-center gap-3">
            <Link
              to="/donate"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFC43D] hover:bg-[#EBAF20] text-[#0B0D17] font-extrabold text-xs sm:text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#FFC43D]/25 cursor-pointer transform hover:-translate-y-0.5"
            >
              <Heart className="w-4 h-4 fill-[#0B0D17] text-[#0B0D17]" />
              <span>Donate Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0B0D17]" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0B0D17] hover:bg-[#F7F7F5] transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ========================================================
            3. RESPONSIVE MOBILE MENU DRAWER
        ======================================================== */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#E8E8E5] px-5 py-6 space-y-5 animate-in slide-in-from-top-2 duration-200">
            {/* Compliance snippet for mobile */}
            <div className="p-3 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5] flex items-center justify-between text-[11px] text-[#697386]">
              <span>UID: <strong className="text-[#0B0D17] font-mono">{uid}</strong></span>
              <span>PAN: <strong className="text-[#0B0D17] font-mono">{pan}</strong></span>
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                to="/"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Home
              </Link>

              {/* Mobile Our Programs Accordion */}
              <div className="rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
                >
                  <span>Our Programs</span>
                  <div className="flex items-center gap-1.5 text-xs text-[#697386]">
                    <span className="px-1.5 py-0.5 rounded bg-[#F7F7F5] border border-[#E8E8E5] text-[10px] font-semibold">
                      10
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileProgramsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {mobileProgramsOpen && (
                  <div className="p-2 space-y-1 bg-[#F7F7F5] rounded-xl my-1 border border-[#E8E8E5]">
                    {[...operationalProgramsCol1, ...operationalProgramsCol2].map((prog, idx) => {
                      const IconComp = prog.icon;
                      return (
                        <Link
                          key={idx}
                          to={`/programs?category=${encodeURIComponent(prog.category)}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#151A2D] hover:text-[#0B0D17] hover:bg-white rounded-lg transition"
                        >
                          <div
                            className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${prog.iconBg}`}
                          >
                            <IconComp className="w-3 h-3" />
                          </div>
                          <span className="truncate">{prog.title}</span>
                        </Link>
                      );
                    })}
                    <Link
                      to="/programs"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-bold text-[#0B0D17] hover:text-[#FFC43D] border-t border-[#E8E8E5] mt-1 text-center"
                    >
                      Explore All Programs →
                    </Link>
                  </div>
                )}
              </div>
              <Link
                to="/projects"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Live Cases
              </Link>
              <Link
                to="/news"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Successful Stories
              </Link>
              <Link
                to="/activities"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Field Activities
              </Link>
              <Link
                to="/gallery"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Gallery
              </Link>
              <Link
                to="/about"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                About Us
              </Link>
              <Link
                to="/mission-and-vision"
                className="px-4 py-2.5 rounded-xl font-medium text-xs text-[#697386] hover:bg-[#F7F7F5] pl-8"
              >
                ↳ Mission & Vision
              </Link>
              <Link
                to="/volunteer"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Join as Volunteer
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Contact Us
              </Link>
              <Link
                to="/receipt/verify"
                className="px-4 py-2.5 rounded-xl font-bold text-sm text-[#151A2D] hover:bg-[#F7F7F5]"
              >
                Verify 80G Receipt
              </Link>
            </div>

            <div className="pt-2">
              <Link
                to="/donate"
                className="w-full py-3.5 rounded-full bg-[#FFC43D] text-[#0B0D17] font-black text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <Heart className="w-4 h-4 fill-[#0B0D17] text-[#0B0D17]" />
                <span>Donate Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};
