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
      setLoading(true);
      const fallback = operationalProgramsData.find((p) => p.slug === slug);
      try {
        const res = await api.get(`/programs/${slug}`);
        if (res?.program) {
          setProgram({
            ...fallback,
            ...res.program,
            objectives:
              Array.isArray(res.program.objectives) && res.program.objectives.length > 0
                ? res.program.objectives
                : (fallback?.objectives || []),
          });
        } else if (fallback) {
          setProgram(fallback);
        } else {
          setProgram(null);
        }
      } catch (err) {
        console.warn('Error fetching program detail, using fallback:', err.message);
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
      <div className="bg-white min-h-screen py-36 text-center text-slate-400 font-medium">
        Loading program details...
      </div>
    );
  }

  if (!program) {
    return (
      <div className="bg-white min-h-screen py-36 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#121316]">Program Not Found</h2>
        <Link to="/programs" className="text-[#121316] font-semibold underline hover:text-[#121316]">
          Back to all programs
        </Link>
      </div>
    );
  }

  // Is this the Children Development program?
  const isChildrenDevelopment = slug === 'children-development';
  const titleWords = (program.title || '').trim().split(/\s+/);
  const titleLead = titleWords.slice(0, -1).join(' ');
  const titleHighlight = titleWords.slice(-1)[0] || '';
  const descriptionParagraphs = (program.fullDescription || program.shortDescription || '')
    .split(/\n\s*\n/)
    .filter(Boolean);

  return (
    <div className="bg-white min-h-screen text-[#121316] py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8 sm:space-y-10">
        {/* ========================================================
            1. BREADCRUMBS & SHARE BUTTON
        ======================================================== */}
        <div className="flex items-center justify-between gap-4 text-xs sm:text-[13px] text-slate-500">
          <nav className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <Link to="/" className="hover:text-[#14382C] flex items-center gap-1 transition font-medium">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span className="text-slate-300">›</span>
            <Link to="/programs" className="hover:text-[#14382C] transition font-medium">
              Our Programs
            </Link>
            <span className="text-slate-300">›</span>
            <span className="text-[#14382C] font-semibold">{program.title}</span>
          </nav>

          <button
            onClick={handleShare}
            className="border border-[#14382C]/20 bg-white hover:bg-[#F2F8F5] text-[#14382C] px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition shadow-sm cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#14382C]" />
                <span className="text-[#14382C]">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-[#14382C]" />
                <span>Share Program</span>
              </>
            )}
          </button>
        </div>

        {/* ========================================================
            2. MAIN HERO CARD (Modern NGO Layout + Large Photo)
        ======================================================== */}
        <div className="bg-[#F6FAF7] border border-[#14382C]/15 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content (6 cols) */}
            <div className="lg:col-span-6 space-y-5">
              {/* Top Category Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs sm:text-[13px] font-bold uppercase tracking-wider bg-[#14382C] text-[#F2D869] shadow-sm">
                  {program.category || 'Child Welfare'}
                </span>
                <span className="px-3.5 py-1 rounded-full text-xs sm:text-[13px] font-semibold bg-white text-[#14382C] border border-[#14382C]/15 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14382C]" />
                  <span>Active Grassroots Initiative</span>
                </span>
              </div>

              {/* Program Title (Lora Editorial Serif) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.15]">
                {titleLead ? `${titleLead} ` : ''}
                <span className="italic text-[#14382C]">{titleHighlight}</span>
              </h1>

              {/* Short Description */}
              <p className="text-base sm:text-[17px] text-slate-600 leading-[1.7] font-normal">
                {program.shortDescription ||
                  (isChildrenDevelopment
                    ? 'Protecting child rights, fighting infant mortality, eliminating child labor, and providing free meals, clothes, and medicines.'
                    : '')}
              </p>

              {/* 3 Verification Check Pills */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#14382C]/15 text-xs sm:text-[13px] text-[#121316] font-semibold flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14382C]" />
                  <span>Direct Field Execution</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#14382C]/15 text-xs sm:text-[13px] text-[#121316] font-semibold flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14382C]" />
                  <span>80G Tax Deductible</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-lg bg-white border border-[#14382C]/15 text-xs sm:text-[13px] text-[#121316] font-semibold flex items-center gap-1.5 shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#14382C]" />
                  <span>Field Verified Roster</span>
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Link
                  to={`/donate?program=${encodeURIComponent(program.title)}`}
                  className="px-6 sm:px-7 py-3.5 rounded-full bg-[#14382C] hover:bg-[#1B4D3E] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wider flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <Heart className="w-4 h-4 text-[#F2D869]" />
                  <span>Sponsor This Program</span>
                </Link>

                <Link
                  to="/contact"
                  className="px-5 sm:px-6 py-3.5 rounded-full bg-white border border-[#14382C]/25 hover:bg-[#F2F8F5] text-[#14382C] font-bold text-xs sm:text-[13px] uppercase tracking-wider flex items-center gap-2 transition-all shadow-sm"
                >
                  <Building2 className="w-4 h-4 text-[#14382C]" />
                  <span>CSR &amp; Institutional Inquiry</span>
                </Link>
              </div>
            </div>

            {/* Right Large Media Preview (6 cols) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#14382C]/15 aspect-[4/3] lg:aspect-[5/4] w-full bg-slate-900 group">
                <img
                  src={
                    program.coverImage &&
                    !program.coverImage.includes('photo-1542838132-92c53300491e') &&
                    !(isChildrenDevelopment && program.coverImage === '/programs/children-development.jpg')
                      ? program.coverImage
                      : isChildrenDevelopment
                        ? '/programs/children-development-relief.jpg'
                        : 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&auto=format&fit=crop&q=80'
                  }
                  alt={program.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out contrast-[1.03] saturate-[1.05]"
                  onError={(e) => {
                    e.currentTarget.src = isChildrenDevelopment
                      ? '/programs/children-development-relief.jpg'
                      : '/programs/children-development.jpg';
                  }}
                />

                {/* Subtle Protective Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Top Field Verification Badge */}
                <div className="absolute top-3.5 right-3.5 bg-[#14382C]/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-[#F2D869]/30 shadow-sm z-10 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F2D869]"></span>
                  <span>Field Relief Action</span>
                </div>

                {/* Location Overlay Tag Bottom Left */}
                <div className="absolute bottom-3.5 left-3.5 bg-[#14382C]/90 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20 shadow-sm z-10">
                  <MapPin className="w-3.5 h-3.5 text-[#F2D869]" />
                  <span>Delhi-NCR • Urban Settlements</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. PROGRAM EXPLANATION & KEY OBJECTIVES
        ======================================================== */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Program Narrative Explanation */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F8F5] border border-[#14382C]/15 text-[#14382C] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#14382C]" />
                <span>About This Program</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.2]">
                How <span className="italic text-[#14382C]">{program.title}</span> Creates Lasting Impact
              </h2>

              <div className="space-y-4 pt-1">
                {descriptionParagraphs.map((para, idx) => (
                  <p key={idx} className="text-[15.5px] sm:text-[17px] text-slate-600 leading-[1.75] font-normal">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Column: Impact Metrics & Objectives */}
            <div className="lg:col-span-5 space-y-4">
              {(program.beneficiariesCount || program.budgetOrCostPerChild) && (
                <div className="grid grid-cols-2 gap-3.5">
                  {program.beneficiariesCount && (
                    <div className="bg-[#14382C] text-white rounded-xl p-4 sm:p-5 shadow-sm">
                      <div className="flex items-center gap-2 text-emerald-200/80 text-xs font-semibold uppercase tracking-wider">
                        <Users className="w-4 h-4 text-[#F2D869]" />
                        <span>Lives Reached</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#F2D869] mt-2 leading-none">
                        {Number(program.beneficiariesCount).toLocaleString('en-IN')}+
                      </p>
                    </div>
                  )}
                  {program.budgetOrCostPerChild && (
                    <div className="bg-[#F6FAF7] border border-[#14382C]/15 rounded-xl p-4 sm:p-5 shadow-sm">
                      <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                        <Heart className="w-4 h-4 text-[#14382C]" />
                        <span>Support Unit</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-extrabold text-[#14382C] mt-2 leading-none">
                        {formatINR ? formatINR(program.budgetOrCostPerChild) : `₹${program.budgetOrCostPerChild}`}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {Array.isArray(program.objectives) && program.objectives.length > 0 && (
                <div className="bg-[#F6FAF7] border border-[#14382C]/15 rounded-xl p-5 sm:p-6 space-y-3.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#121316]">
                    Core Field Objectives
                  </h3>
                  <ul className="space-y-3">
                    {program.objectives.map((obj, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-[#14382C] shrink-0 mt-1" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            4. THREE CORE FOCUS PILLARS
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1: Target Beneficiary Group */}
          <div className="bg-white border border-slate-200/90 hover:border-[#14382C]/35 rounded-2xl p-6 shadow-sm space-y-3 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#F2F8F5] border border-[#14382C]/15 flex items-center justify-center text-[#14382C]">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg sm:text-[19px] text-[#121316]">
              Target Beneficiary Group
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-[1.7]">
              Reaching out-of-school children, destitute women, underprivileged families, and patients across underserved colonies.
            </p>
          </div>

          {/* Pillar 2: On-Ground Execution */}
          <div className="bg-white border border-slate-200/90 hover:border-[#14382C]/35 rounded-2xl p-6 shadow-sm space-y-3 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#F2F8F5] border border-[#14382C]/15 flex items-center justify-center text-[#14382C]">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg sm:text-[19px] text-[#121316]">
              On-Ground Execution
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-[1.7]">
              Conducted by dedicated field volunteers via continuous weekly camps, food hubs, learning bridge centers, and clinic aid.
            </p>
          </div>

          {/* Pillar 3: Statutory Oversight */}
          <div className="bg-white border border-slate-200/90 hover:border-[#14382C]/35 rounded-2xl p-6 shadow-sm space-y-3 transition-colors">
            <div className="w-11 h-11 rounded-xl bg-[#F2F8F5] border border-[#14382C]/15 flex items-center justify-center text-[#14382C]">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg sm:text-[19px] text-[#121316]">
              Statutory Oversight
            </h3>
            <p className="text-sm sm:text-[15px] text-slate-600 leading-[1.7]">
              100% of donor contributions are verified against procurement receipts and hospital admissions under 80G tax audit laws.
            </p>
          </div>
        </div>

        {/* ========================================================
            5. SUPPORT CALL-TO-ACTION BANNER
        ======================================================== */}
        <div className="bg-[#F6FAF7] border border-[#14382C]/15 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          {/* Left Text */}
          <div className="space-y-2 text-left w-full md:w-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#121316] leading-tight">
              Support <span className="italic text-[#14382C]">{program.title}</span>
            </h3>
            <p className="text-[15px] sm:text-base text-slate-600 leading-[1.7] max-w-xl">
              Whether you are an individual donor sponsoring nutrition and learning supplies or a corporate CSR entity funding sustained intervention drives, 100% of your aid directly benefits verified families.
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 shrink-0 w-full md:w-auto">
            <Link
              to={`/donate?program=${encodeURIComponent(program.title)}`}
              className="px-6 sm:px-7 py-3.5 rounded-full bg-[#14382C] hover:bg-[#1B4D3E] text-white font-bold text-xs sm:text-[13px] uppercase tracking-wider flex items-center gap-2 shadow-md transition"
            >
              <Heart className="w-4 h-4 text-[#F2D869]" />
              <span>Make a Contribution</span>
            </Link>

            <Link
              to="/contact"
              className="px-5 sm:px-6 py-3.5 rounded-full bg-white border border-[#14382C]/25 hover:bg-[#F2F8F5] text-[#14382C] font-bold text-xs sm:text-[13px] uppercase tracking-wider flex items-center gap-2 transition shadow-sm"
            >
              <FileText className="w-4 h-4 text-[#14382C]" />
              <span>Contact Program Cell</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
