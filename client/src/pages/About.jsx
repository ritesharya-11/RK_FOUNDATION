import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { SectionHeading } from '../components/SectionHeading';
import {
  ShieldCheck,
  CheckCircle2,
  Users,
  Heart,
  FileText,
  Target,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Clock,
  Calendar,
  Building2,
  GraduationCap,
  Eye,
  BookOpen,
  HeartHandshake,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Play,
  Info,
  Download,
  X,
} from 'lucide-react';

export const About = () => {
  const { settings, formatINR } = useWebsite();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const darpanUid = settings.compliance?.ngoDarpanUid || 'DL/2021/0298412';

  // 4 Primary Pillars of Action
  const actionPillars = [
    {
      title: 'Children Development & Literacy',
      category: 'Child Welfare',
      image: '/programs/children-development.jpg',
      slug: 'children-development',
      description:
        'Protecting child rights, fighting infant malnutrition, and providing non-formal bridge schooling, books, uniforms, and hot meals.',
      highlight: 'Direct government school admissions',
    },
    {
      title: "Women's Vocational Empowerment",
      category: 'Women Empowerment',
      image: '/programs/womens-empowerment.jpg',
      slug: 'womens-development-and-empowerment',
      description:
        'Certified tailoring hubs, sewing machine distribution, and micro-business guidance that empower mothers to earn with pride and dignity.',
      highlight: 'Sustainable household income generation',
    },
    {
      title: 'Aged / Elderly Compassion Care',
      category: 'Elderly Support',
      image: '/programs/elderly-care.jpg',
      slug: 'aged-elderly-care',
      description:
        'Providing regular chronic disease medicines, warm winter blankets, adult hygiene kits, and companionship to destitute senior citizens.',
      highlight: 'Doorstep medical aid and dignity',
    },
    {
      title: 'Differently Abled Rehabilitation',
      category: 'Special Needs',
      image: '/programs/differently-abled.jpg',
      slug: 'differently-abled-support',
      description:
        'Ensuring differently-abled citizens receive wheelchairs, assistive devices, UDID linkages, and inclusive vocational opportunities.',
      highlight: 'Universal accessibility and equal rights',
    },
  ];

  return (
    <div className="bg-white min-h-screen text-[#121316]">
      {/* ========================================================
          2. ORIGIN & GRASSROOTS MISSION (Story + Authentic Photos)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#121316]/20 text-[#121316] border border-slate-300 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#121316]" />
                <span>Our Grassroots Journey</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121316] tracking-tight leading-tight">
              Rooted in Compassion, Driven by Measurable Ground Change
            </h2>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              <strong>RK FOUNDATION</strong> was established by a collective of passionate educators, healthcare workers, and social advocates who witnessed firsthand the severe neglect of children of daily-wage migrant workers, abandoned elderly citizens, and impoverished mothers in urban clusters.
            </p>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Starting from a single makeshift evening classroom in an East Delhi resettlement colony, our grassroots platform has grown into an accredited public charitable trust delivering 10 operational initiatives. We deliver food directly to malnourished children, provide certified sewing machines to single mothers, supply mobility kits to differently-abled citizens, and deploy mobile medical checkups directly into unserved settlements.
            </p>

            {/* Checklist of Trust Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#121316] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#121316]">
                  Direct Doorstep Relief (Zero Middlemen)
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#121316] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#121316]">
                  NITI Aayog Darpan UID: <strong className="font-mono text-[#121316]">{darpanUid}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#121316] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#121316]">
                  50% Tax Deduction Under Section 80G
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#121316] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#121316]">
                  100% Audited Financials & Instant Receipts
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-[#121316] hover:bg-[#252830] shadow-md transition transform hover:-translate-y-0.5 group"
              >
                <span>Explore Our 10 Programs</span>
                <ArrowRight className="w-4 h-4 text-[#121316] group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/receipt-verify"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-[#121316] bg-white border border-slate-200 hover:bg-slate-50 transition shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-[#121316]" />
                <span>Verify Trust Registrations</span>
              </Link>
            </div>
          </div>

          {/* Right Image Showcase with Real On-Ground Photos */}
          <div className="lg:col-span-5 relative">
            {/* Primary Real Photo Card */}
            <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white bg-white group">
              <div className="h-72 sm:h-80 md:h-96 overflow-hidden relative">
                <img
                  src="/programs/children-development.jpg"
                  alt="RK Foundation child welfare on-ground field distribution"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#121316]/85 backdrop-blur-md text-[#121316] text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                  Child Welfare & Field Drives
                </span>
              </div>
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Volunteers distributing food & study kits</span>
                <span className="font-bold text-[#121316]">Delhi-NCR Bastis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR WORK IN ACTION (VIDEO DOCUMENTARY & FIELD EVIDENCE)
          Matching Reference Screenshot UI
      ======================================================== */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#121316] rounded-full inline-block" />
                <span className="text-xs font-bold text-[#121316] uppercase tracking-wider">
                  Our Work in Action
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#121316] tracking-tight leading-tight">
                Documentary Field Evidence Across Slum Clusters
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Watch our dedicated ground taskforce in motion. From organizing morning remedial bridge classes to distributing cooked nutritious meals and deploying mobile clinics, our impact is 100% visible and verifiable.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#121316]">
                  <CheckCircle2 className="w-4 h-4 text-[#121316] shrink-0" />
                  <span>Real-time photo and video distribution logs</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#121316]">
                  <CheckCircle2 className="w-4 h-4 text-[#121316] shrink-0" />
                  <span>Recorded video testimonials from beneficiary mothers</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#121316]">
                  <CheckCircle2 className="w-4 h-4 text-[#121316] shrink-0" />
                  <span>Zero administrative leakage guarantee</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/activities"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#121316] hover:text-[#121316] transition group"
                >
                  <span>Watch Parents Video Reviews</span>
                  <span className="text-[#121316] font-black group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Video Preview Card */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setVideoModalOpen(true)}
                className="bg-[#121316] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative group cursor-pointer"
              >
                <div className="h-72 sm:h-96 w-full relative overflow-hidden">
                  <img
                    src="/programs/children-development.jpg"
                    alt="RK Foundation ground relief documentary"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#121316]/90 text-white backdrop-blur-md border border-white/15">
                        RK Foundation | Public Charitable Trust
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#121316] text-white flex items-center gap-1.5 shadow-md">
                        <Play className="w-3 h-3 fill-white" />
                        <span>Field Documentary</span>
                      </span>
                    </div>

                    {/* Big YouTube Play Button */}
                    <div className="self-center">
                      <div className="w-16 h-12 sm:w-20 sm:h-14 bg-[#121316] group-hover:bg-[#252830] rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all transform group-hover:scale-110">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1" />
                      </div>
                    </div>

                    <div className="text-white">
                      <h3 className="text-base sm:text-xl font-bold tracking-tight">
                        On-Ground Food Distribution, Education & Health Relief Drives
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 line-clamp-1">
                        Click to watch full verified documentary film of ongoing Delhi-NCR missions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CORE OPERATIONAL PILLARS (Authentic Real Photos)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          badge="Operational Focus Areas"
          title="Four Pillars of Humanitarian Action"
          description="Addressing foundational challenges with dignity-first interventions that transition vulnerable families into permanent self-reliance."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {actionPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-[#121316]/85 backdrop-blur-md text-[#121316] border border-white/15 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {pillar.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#121316] group-hover:text-[#121316] transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#121316] bg-slate-100 px-2 py-0.5 rounded-md">
                    {pillar.highlight}
                  </span>
                  <Link
                    to={`/programs/${pillar.slug}`}
                    className="text-xs font-bold text-[#121316] hover:text-[#121316] flex items-center gap-1 group/btn"
                  >
                    <span>Details</span>
                    <span className="text-[#121316] font-black group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          9. GUIDING CORE PRINCIPLES (4 Pillars)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          badge="Operational Ethics"
          title="Our Non-Negotiable Core Values"
          description="Built upon unshakeable ethics, total transparency, and community self-reliance."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-card space-y-4 hover:border-slate-300 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#121316] text-[#121316] flex items-center justify-center font-black text-sm">
              01
            </span>
            <h3 className="text-base font-bold text-[#121316]">Zero Discrimination</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Assistance is extended unconditionally regardless of religion, caste, gender, or geographic origin. We serve human beings in their most vulnerable hours.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-card space-y-4 hover:border-slate-300 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#121316] text-[#121316] flex items-center justify-center font-black text-sm">
              02
            </span>
            <h3 className="text-base font-bold text-[#121316]">Open-Book Accountability</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every donor receives immediate 80G tax receipts, verified photographic progress proof, and access to audited annual balance sheets.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-card space-y-4 hover:border-slate-300 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#121316] text-[#121316] flex items-center justify-center font-black text-sm">
              03
            </span>
            <h3 className="text-base font-bold text-[#121316]">Sustainable Self-Reliance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We go beyond temporary hand-outs by providing certified vocational tailoring, digital tablets, and academic bridging to permanently break poverty cycles.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-card space-y-4 hover:border-slate-300 transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#121316] text-[#121316] flex items-center justify-center font-black text-sm">
              04
            </span>
            <h3 className="text-base font-bold text-[#121316]">Dignity-First Human Aid</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every child, destitute senior citizen, and mother is treated with utmost reverence, respect, and human dignity during all field interactions.
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-[#18191E] border border-white/20 rounded-3xl p-6 max-w-2xl w-full text-white space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">RK Foundation — Field Operations & Relief</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-white text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="RK Foundation Field Operations Documentary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-slate-400">
              Documentary footage of ongoing food distribution drives, non-formal bridge schooling, and medical aid camps conducted across Delhi-NCR bastis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
