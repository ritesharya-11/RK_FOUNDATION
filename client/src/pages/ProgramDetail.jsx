import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import api from '../services/api';
import {
  Home,
  Share2,
  Heart,
  Building2,
  Target,
  Activity,
  FileText,
  BookOpen,
  CheckCircle2,
  MapPin,
  Check,
  ArrowLeft,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { operationalProgramsData } from '../data/programsData';

export const ProgramDetail = () => {
  const { slug } = useParams();
  const { formatINR, showToast } = useWebsite();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await api.get(`/programs/${slug}`);
        if (res?.program) {
          setProgram(res.program);
        } else {
          const fallback = operationalProgramsData.find((p) => p.slug === slug);
          if (fallback) setProgram(fallback);
        }
      } catch (err) {
        console.warn('Error fetching program detail, using fallback:', err.message);
        const fallback = operationalProgramsData.find((p) => p.slug === slug);
        if (fallback) setProgram(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [slug]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      if (showToast) showToast('Program link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-36 text-center text-[#A0A4AE] font-medium">
        Loading program details...
      </div>
    );
  }

  if (!program) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-36 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#323D3D]">Program Not Found</h2>
        <Link to="/programs" className="text-[#036C6C] font-semibold underline hover:text-[#F67708]">
          Back to all programs
        </Link>
      </div>
    );
  }

  // Is this the Children Development program?
  const isChildrenDevelopment = slug === 'children-development';

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#323D3D] py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* ========================================================
            1. BREADCRUMBS & SHARE BUTTON (Exact Reference)
        ======================================================== */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <nav className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link to="/" className="hover:text-[#F67708] flex items-center gap-1 transition">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-300">›</span>
            <Link to="/programs" className="hover:text-[#F67708] transition">
              Our Programs
            </Link>
            <span className="text-slate-300">›</span>
            <span className="text-[#323D3D] font-semibold">{program.title}</span>
          </nav>

          <button
            onClick={handleShare}
            className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow-2xs cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Share Program</span>
              </>
            )}
          </button>
        </div>

        {/* ========================================================
            2. MAIN HERO CARD (Exact Reference: media_1794892603884_c38da316.jpg)
        ======================================================== */}
        <div className="bg-white border border-[#E3D9CF] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-soft">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              {/* Top Category Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFF4EB] text-[#F67708] border border-[#F67708]/30">
                  {program.category || 'Child Welfare'}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Active Grassroots Initiative</span>
                </span>
              </div>

              {/* Program Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
                {program.title.split(' ')[0]}{' '}
                <span className="text-[#F67708]">
                  {program.title.split(' ').slice(1).join(' ') || 'Development'}
                </span>
              </h1>

              {/* Short Description */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {isChildrenDevelopment
                  ? 'Protecting child rights, fighting infant mortality, eliminating child labor, and providing free meals, clothes, and medicines.'
                  : program.shortDescription}
              </p>

              {/* 3 Verification Check Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> Direct Field Execution
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> 80G Tax Deductible
                </span>
                <span className="px-3.5 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-semibold flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✓</span> Field Verified Roster
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={`/donate?program=${encodeURIComponent(program.title)}`}
                  className="px-6 py-3 rounded-xl bg-[#F67708] hover:bg-[#E06800] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm hover:shadow transition"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Sponsor This Program</span>
                </Link>

                <Link
                  to="/contact"
                  className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span>CSR & Institutional Inquiry</span>
                </Link>
              </div>
            </div>

            {/* Right Media Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 aspect-[16/11] sm:aspect-[4/3] bg-slate-950 group ring-1 ring-slate-900/5">
                <img
                  src={
                    isChildrenDevelopment
                      ? '/programs/children-development-relief.jpg'
                      : (program.coverImage && !program.coverImage.includes('photo-1542838132-92c53300491e')
                          ? program.coverImage
                          : 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&auto=format&fit=crop&q=80')
                  }
                  alt={program.title}
                  className="w-full h-full object-cover object-[center_16%] group-hover:scale-105 transition-transform duration-700 ease-out contrast-[1.03] saturate-[1.05]"
                  onError={(e) => {
                    e.currentTarget.src = '/programs/children-development.jpg';
                  }}
                />

                {/* Subtle Protective Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Top Field Verification Badge */}
                <div className="absolute top-3 right-3 bg-black/65 backdrop-blur-md text-white text-[10.5px] font-semibold px-2.5 py-1 rounded-full border border-white/20 shadow-xs z-10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Field Relief Action</span>
                </div>

                {/* Location Overlay Tag Bottom Left */}
                <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md text-white text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20 shadow-sm z-10">
                  <MapPin className="w-3.5 h-3.5 text-[#F67708]" />
                  <span>Delhi-NCR • Urban Settlements</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. THREE CORE FOCUS PILLARS (Exact Reference: media_1794892642503_ea8a8906.png)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Target Beneficiary Group */}
          <div className="bg-white border border-[#E3D9CF] rounded-3xl p-6 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFF4EB] border border-[#F67708]/30 flex items-center justify-center text-[#F67708]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
              Target Beneficiary Group
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Reaching out-of-school children, destitute women, underprivileged families, and patients across underserved colonies.
            </p>
          </div>

          {/* Pillar 2: On-Ground Execution */}
          <div className="bg-white border border-[#E3D9CF] rounded-3xl p-6 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
              On-Ground Execution
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Conducted by dedicated field volunteers via continuous weekly camps, food hubs, learning bridge centers, and clinic aid.
            </p>
          </div>

          {/* Pillar 3: Statutory Oversight */}
          <div className="bg-white border border-[#E3D9CF] rounded-3xl p-6 shadow-soft space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-black text-sm sm:text-base text-[#1E293B]">
              Statutory Oversight
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% of donor contributions are verified against procurement receipts and hospital admissions under 80G tax audit laws.
            </p>
          </div>
        </div>

        {/* ========================================================
            4. OPERATIONAL SCOPE & IMPLEMENTATION BLUEPRINT (Exact Reference)
        ======================================================== */}
        <div className="bg-white border border-[#E3D9CF] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-soft space-y-6">
          {/* Section Header */}
          <div className="flex items-center gap-2.5 text-base sm:text-lg font-black text-[#1E293B] border-b border-slate-100 pb-4">
            <BookOpen className="w-5 h-5 text-[#F67708]" />
            <span>Operational Scope & Implementation Blueprint</span>
          </div>

          {/* Mission for Every Child */}
          <div className="space-y-2">
            <h4 className="font-black text-sm sm:text-base text-[#1E293B]">
              Mission for Every Child
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To take up child health care issues as a major priority along with holistic child development and education. We aspire to take every possible step to fight infant mortality, child abuse, child labor, and trafficking across Delhi NCR and marginalized rural areas.
            </p>
          </div>

          {/* Our Active Interventions */}
          <div className="space-y-3 pt-2">
            <h5 className="font-black text-xs sm:text-sm text-[#1E293B]">
              Our Active Interventions:
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F67708] mt-2 shrink-0" />
                <span>
                  Provide free nutritious meals, clean clothing, essential medicines, and hygiene kits to homeless and daily-wage migrant children.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F67708] mt-2 shrink-0" />
                <span>
                  Operate non-formal learning centers bridging out-of-school children back into formal academic schools.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F67708] mt-2 shrink-0" />
                <span>
                  Conduct routine pediatric health screening and immunization drives in underserved settlements.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F67708] mt-2 shrink-0" />
                <span>
                  Sponsor school fees, books, and uniforms for bright children from economically vulnerable families.
                </span>
              </li>
            </ul>
          </div>

          {/* Blueprint Footer Links */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <Link
              to="/programs"
              className="text-xs font-bold text-[#F67708] hover:text-[#E06800] flex items-center gap-1.5 transition"
            >
              <span>← Explore Other Institutional Programs</span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Registered Under Indian Trusts Act • 80G Tax Deductible</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            5. SUPPORT CALL-TO-ACTION BANNER (Exact Reference: media_1794892668501_9119a2e5.jpg)
        ======================================================== */}
        <div className="bg-[#FFF6EF] border border-[#F67708]/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          {/* Left Text */}
          <div className="space-y-1.5 text-left w-full md:w-auto">
            <h3 className="text-xl sm:text-2xl font-black text-[#1E293B]">
              Support Children Development
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
              Whether you are an individual donor sponsoring nutrition and learning supplies or a corporate CSR entity funding sustained intervention drives, 100% of your aid directly benefits verified families.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              to={`/donate?program=children-development`}
              className="px-6 py-3 rounded-xl bg-[#F67708] hover:bg-[#E06800] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Make a Contribution</span>
            </Link>

            <Link
              to="/contact"
              className="px-5 py-3 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Contact Program Cell</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
