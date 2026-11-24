import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import {
  Heart,
  HeartHandshake,
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
  const isHome = location.pathname === '/';

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileProgramsOpen(false);
    setProgramsDropdownOpen(false);
  }, [location.pathname]);

  // Operational Field Initiatives matching reference dropdown
  const fieldInitiatives = [
    { title: 'CHILDREN DEVELOPMENT', slug: 'children-development' },
    { title: 'HEALTH AND FAMILY WELFARE', slug: 'health-and-family-welfare' },
    { title: 'WOMEN EMPOWERMENT', slug: 'womens-development-and-empowerment' },
    { title: 'EDUCATION AND LITERACY', slug: 'education-and-literacy' },
    { title: 'DISASTER PREPAREDNESS', slug: 'disaster-management-and-emergency-relief' },
    { title: 'ENVIRONMENT AND FOREST', slug: 'environment-and-forest-protection' },
    { title: 'DIFFERENTLY ABLED', slug: 'differently-abled-support' },
    { title: 'DRINKING & SANITATION', slug: 'drinking-water-and-sanitation' },
    { title: 'DALIT UPLIFTMENT', slug: 'dalit-upliftment-and-rights' },
    { title: 'AGED / ELDERLY CARE', slug: 'aged-elderly-care' },
  ];

  // Helper matching reference: active = dark solid pill (#121316), inactive = text-slate-700
  const getNavLinkClass = (path, exact = false) => {
    const isActive = exact
      ? location.pathname === path
      : location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

    if (isActive) {
      return 'px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-[13px] uppercase tracking-wider bg-[#14382C] text-white shadow-md flex items-center gap-1.5 transition-all';
    }
    return 'px-4 sm:px-5 py-2.5 font-bold text-xs sm:text-[13px] uppercase tracking-wider text-slate-700 hover:text-[#14382C] hover:bg-slate-100 rounded-full transition-all flex items-center gap-1.5';
  };

  const contactPhone = settings?.phone || '+91-9650896859';
  const panNumber = settings.compliance?.panNumber || 'AATTA1099H';
  const regNumber = settings.compliance?.ngoDarpanUid || 'DL/2021/0298412';

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* ========================================================
          TIER 1: TOP BLACK ANNOUNCEMENT & COMPLIANCE BAR
      ======================================================== */}
      <div className="w-full bg-[#121316] text-white py-2 px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-black">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-1.5 text-xs">
          {/* Left Compliance Notice */}
          <div className="font-semibold tracking-wide text-white flex items-center gap-2 text-center md:text-left">
            <span className="w-2 h-2 rounded-full bg-white shrink-0" />
            <span>All Donations Are Exempted Under Section 80 G(5)(IV) Of Income Tax Act 1961.</span>
          </div>

          {/* Right Registration & Contact Details */}
          <div className="flex items-center flex-wrap justify-center md:justify-end gap-2.5 sm:gap-4 text-slate-300 font-medium tracking-wide text-xs">
            <span>
              PAN: <strong className="text-white font-mono font-bold">{panNumber}</strong>
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <span>
              Reg: <strong className="text-white font-mono font-bold">{regNumber}</strong>
            </span>
            <span className="text-white/40 hidden sm:inline">•</span>
            <a
              href={`tel:${contactPhone.replace(/\s+/g, '')}`}
              className="text-slate-300 hover:text-white transition-colors"
            >
              Mob: <strong className="text-white hover:text-white font-mono font-bold">{contactPhone}</strong>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================
          TIER 2: MAIN NAVIGATION BAR (Substantial & Spacious)
      ======================================================== */}
      <div className="w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-4 sm:py-4.5 flex items-center justify-between">
          {/* Left Brand Area (Logo + Foundation Title) */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center p-2 shadow-xs group-hover:scale-105 transition-transform">
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
                <span className="font-black text-lg sm:text-xl tracking-tight text-[#121316] leading-none group-hover:text-[#121316] transition-colors">
                  RK FOUNDATION
                </span>
                <span className="text-[11px] font-medium text-slate-400 italic tracking-wide mt-1">
                  A belief in humanity
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links: HOME, ABOUT US, OUR WORK, LIVE CASES, GALLERY, OUR SUCCESS, CONTACT US */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2.5">
            {/* HOME */}
            <NavLink to="/" className={getNavLinkClass('/', true)}>
              HOME
            </NavLink>

            {/* ABOUT US */}
            <NavLink to="/about" className={getNavLinkClass('/about')}>
              ABOUT US
            </NavLink>

            {/* OUR WORK (Mega Dropdown Menu) */}
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
                <span>OUR WORK</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${programsDropdownOpen ? 'rotate-180 text-[#121316]' : 'text-slate-400'
                    }`}
                />
              </button>

              {/* Vertical Dropdown Menu (Exact Reference Format) */}
              {programsDropdownOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white border border-slate-100 rounded-2xl shadow-2xl p-4 sm:p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-150 normal-case"
                  onMouseEnter={() => setProgramsDropdownOpen(true)}
                  onMouseLeave={() => setProgramsDropdownOpen(false)}
                >
                  {/* Header Strip: FIELD INITIATIVES | 10 Programs */}
                  <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      FIELD INITIATIVES
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                      {fieldInitiatives.length} Programs
                    </span>
                  </div>

                  {/* Clean Vertical Links List */}
                  <div className="flex flex-col space-y-0.5">
                    {fieldInitiatives.map((prog, idx) => (
                      <Link
                        key={idx}
                        to={`/programs/${prog.slug}`}
                        onClick={() => setProgramsDropdownOpen(false)}
                        className="px-2.5 py-2 rounded-lg font-bold text-xs sm:text-[12.5px] uppercase tracking-wider text-slate-800 hover:text-black hover:bg-slate-50 transition-colors block text-left leading-snug"
                      >
                        {prog.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* LIVE CASES */}
            <NavLink to="/projects" className={getNavLinkClass('/projects')}>
              LIVE CASES
            </NavLink>

            {/* GALLERY */}
            <NavLink to="/gallery" className={getNavLinkClass('/gallery')}>
              GALLERY
            </NavLink>

            {/* OUR SUCCESS */}
            <NavLink to="/news" className={getNavLinkClass('/news')}>
              OUR SUCCESS
            </NavLink>

            {/* CONTACT US */}
            <NavLink to="/contact" className={getNavLinkClass('/contact')}>
              CONTACT US
            </NavLink>
          </nav>

          {/* Right Action: Clean Forest Green Pill Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/donate"
              className="inline-flex items-center gap-2.5 px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider text-white bg-[#14382C] hover:bg-[#1B4D3E] shadow-md hover:shadow-lg transition-all transform hover:scale-105 group cursor-pointer"
            >
              <Heart className="w-4 h-4 fill-white text-white transition-colors" />
              <span>DONATE NOW</span>
            </Link>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 hover:text-[#121316] rounded-xl hover:bg-slate-100 transition cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Full Width) */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-b border-slate-200 px-6 py-5 space-y-3 shadow-2xl">
          <Link
            to="/"
            className="block text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#121316] py-2 border-b border-slate-100"
          >
            HOME
          </Link>

          <Link
            to="/about"
            className="block text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#121316] py-2 border-b border-slate-100"
          >
            ABOUT US
          </Link>

          {/* Collapsible Mobile Programs */}
          <div>
            <button
              type="button"
              onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
              className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#121316] py-2 border-b border-slate-100"
            >
              <span>OUR WORK (10)</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${mobileProgramsOpen ? 'rotate-180 text-[#121316]' : 'text-slate-400'
                  }`}
              />
            </button>

            {mobileProgramsOpen && (
              <div className="pl-2 py-2 space-y-1 bg-slate-50 rounded-xl mt-1 normal-case">
                {fieldInitiatives.map((prog, idx) => (
                  <Link
                    key={idx}
                    to={`/programs/${prog.slug}`}
                    className="block px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 hover:text-[#121316] hover:bg-slate-100 rounded-lg transition"
                  >
                    {prog.title}
                  </Link>
                ))}
                <div className="pt-2 px-3 border-t border-slate-200">
                  <Link
                    to="/programs"
                    className="text-xs font-bold text-[#121316] hover:underline flex items-center gap-1"
                  >
                    <span>Explore All Programs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/projects"
            className="block text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#121316] py-2 border-b border-slate-100"
          >
            LIVE CASES
          </Link>

          <Link
            to="/gallery"
            className="block text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#121316] py-2 border-b border-slate-100"
          >
            GALLERY
          </Link>

          <Link
            to="/news"
            className="block text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#121316] py-2 border-b border-slate-100"
          >
            OUR SUCCESS
          </Link>

          <Link
            to="/contact"
            className="block text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-[#121316] py-2"
          >
            CONTACT US
          </Link>

          <div className="pt-3">
            <Link
              to="/donate"
              className="w-full py-3 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-[#14382C] hover:bg-[#1B4D3E] text-center shadow-md flex items-center justify-center gap-2 group transition-all"
            >
              <Heart className="w-4 h-4 fill-white text-white transition-colors" />
              <span>DONATE NOW</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
