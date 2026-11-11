import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import {
  ShieldCheck,
  CheckCircle2,
  Award,
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
  const [activeCert, setActiveCert] = useState(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const trustReg = settings.compliance?.trustRegistrationNo || 'TRUST/DL/2021/887412';
  const panNumber = settings.compliance?.panNumber || 'AAETR5566K';
  const darpanUid = settings.compliance?.ngoDarpanUid || 'DL/2021/0298412';
  const sec80G = settings.compliance?.section80GRegNo || 'CIT(E)/DELHI/80G/2021-22/A/1045';

  // Key Milestones in Foundation History
  const milestones = [
    {
      year: '2021',
      title: 'Foundation Inception & Trust Registration',
      description:
        'Established by socially conscious educators and healthcare advocates in Delhi-NCR. Formally registered under the Indian Trusts Act, 1882 (Reg: 887412) and enrolled on NITI Aayog NGO Darpan.',
      tag: 'Establishment',
    },
    {
      year: '2022',
      title: 'First Bridge Schools & Food Security Relief',
      description:
        'Opened first community remedial bridge schools for out-of-school slum dropouts in East Delhi and initiated regular hot meal distribution drives reaching over 5,000 migrant families.',
      tag: 'Education & Relief',
    },
    {
      year: '2023',
      title: 'Section 80G Approval & Women Tailoring Hubs',
      description:
        'Granted Income Tax 80G & 12A certifications, providing donors with 50% tax deductions. Inaugurated certified vocational tailoring centers empowering over 1,200 single mothers.',
      tag: 'Tax Exemption & Skills',
    },
    {
      year: '2024',
      title: 'Differently Abled Mobility & Elder Dignity',
      description:
        'Launched custom wheelchair and mobility aid distribution drives for citizens with special needs, alongside chronic medicine support for destitute and abandoned senior citizens.',
      tag: 'Inclusion & Health',
    },
    {
      year: '2025 - 2026',
      title: 'Scaling 10 Operational Initiatives Across India',
      description:
        'Expanded field taskforces to 10 comprehensive charitable initiatives across education, maternal health, forest conservation, clean water, and 24/7 disaster emergency response.',
      tag: 'Pan-India Scale',
    },
  ];

  // Core Impact Metrics
  const impactMetrics = [
    { value: '48,500+', label: 'Lives Impacted', sublabel: 'Across Delhi-NCR & rural settlements' },
    { value: '12,400+', label: 'Children Educated', sublabel: 'Mainstreamed into formal schools' },
    { value: '4,200+', label: 'Women Empowered', sublabel: 'Vocational tailoring & self-help' },
    { value: '1,85,000+', label: 'Nutritious Meals', sublabel: 'Zero child hunger in bastis' },
    { value: '340+', label: 'Free Health Camps', sublabel: 'Doctors, diagnostic tests & medicines' },
    { value: '1,250+', label: 'Active Volunteers', sublabel: 'Mobilized ground change champions' },
  ];

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

  // Leadership & Governance Committee
  const trustees = [
    {
      name: 'R. K. Sharma',
      role: 'Managing Trustee & Founder',
      qualification: 'Social Advocate & Philanthropist',
      bio: 'Dedicated over 18 years to grassroots community empowerment, slum child education, and non-profit governance across northern India.',
      badge: 'Board of Trustees',
    },
    {
      name: 'Dr. Anita Verma',
      role: 'Director of Healthcare Relief',
      qualification: 'MD (Pediatrics), Public Health Specialist',
      bio: 'Spearheads community health camps, diagnostic mobile clinics, and subsidized surgery partnerships for malnourished children.',
      badge: 'Medical Advisory',
    },
    {
      name: 'Pooja Kashyap',
      role: 'Head of Women Empowerment',
      qualification: 'Vocational Training Specialist',
      bio: 'Manages certified tailoring hubs and self-help groups, helping thousands of underprivileged women achieve financial independence.',
      badge: 'Livelihood Operations',
    },
    {
      name: 'Vikramaditya Rao',
      role: 'Head of Field Operations & Relief',
      qualification: 'Disaster Logistics & Youth Mobilizer',
      bio: 'Coordinates 1,200+ on-ground volunteers during emergency flood drives, winter cold wave relief, and bridge schooling operations.',
      badge: 'Field Operations',
    },
  ];

  // Official Certificates Data
  const certificates = [
    {
      id: 'trust-deed',
      title: 'Trust Registration Deed',
      authority: 'Government of NCT Delhi (Indian Trusts Act, 1882)',
      code: trustReg,
      shortCode: 'Reg: 887412',
      date: '14 May 2021',
      description:
        'Legally constitutes RK FOUNDATION as an irrevocable Public Charitable Trust operating for child welfare, healthcare, and humanitarian relief.',
    },
    {
      id: 'darpan',
      title: 'NITI Aayog NGO Darpan Registration',
      authority: 'NITI Aayog, Government of India',
      code: darpanUid,
      shortCode: 'UID: DL/2021/0298412',
      date: '28 July 2021',
      description:
        'Official Government of India portal endorsement validating organizational governance, track record, and pan-India project execution.',
    },
    {
      id: '80g',
      title: 'Section 80G Tax Exemption Certificate',
      authority: 'Income Tax Department (Exemptions), New Delhi',
      code: sec80G,
      shortCode: 'Order No: CIT(E)/80G/2021-22/1045',
      date: '11 October 2021',
      description:
        'Grants all individual and corporate donors a 50% tax deduction on donations under Section 80G of the Indian Income Tax Act, 1961.',
    },
    {
      id: 'pan-12a',
      title: 'Section 12A & Permanent Account (PAN)',
      authority: 'Ministry of Finance, Government of India',
      code: panNumber,
      shortCode: 'PAN: AAETR5566K',
      date: '19 August 2021',
      description:
        'Certifies 100% tax-free foundation operational status and formal financial auditing compliance.',
    },
  ];

  return (
    <div className="bg-[#F7F7F5] min-h-screen text-[#151A2D]">
      {/* ========================================================
          1. STANDARDIZED PAGE HERO (Deep Dark Navy #0B0D17)
      ======================================================== */}
      <PageHero
        badge="About RK FOUNDATION"
        title="Restoring Hope & Dignity to Vulnerable Lives"
        subtitle="A registered public charitable trust dedicated to child schooling, women self-reliance, elder care, and emergency healthcare relief across Delhi-NCR and rural India."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* ========================================================
          2. ORIGIN & GRASSROOTS MISSION (Story + Authentic Photos)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFC43D]/20 text-[#0B0D17] border border-[#FFC43D]/40 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0B0D17]" />
                <span>Our Grassroots Journey</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A2D] tracking-tight leading-tight">
              Rooted in Compassion, Driven by Measurable Ground Change
            </h2>

            <p className="text-[#697386] leading-relaxed text-sm sm:text-base">
              <strong>RK FOUNDATION</strong> was established by a collective of passionate educators, healthcare workers, and social advocates who witnessed firsthand the severe neglect of children of daily-wage migrant workers, abandoned elderly citizens, and impoverished mothers in urban clusters.
            </p>

            <p className="text-[#697386] leading-relaxed text-sm sm:text-base">
              Starting from a single makeshift evening classroom in an East Delhi resettlement colony, our grassroots platform has grown into an accredited public charitable trust delivering 10 operational initiatives. We deliver food directly to malnourished children, provide certified sewing machines to single mothers, supply mobility kits to differently-abled citizens, and deploy mobile medical checkups directly into unserved settlements.
            </p>

            {/* Checklist of Trust Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0B0D17] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#151A2D]">
                  Direct Doorstep Relief (Zero Middlemen)
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0B0D17] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#151A2D]">
                  NITI Aayog Darpan UID: <strong className="font-mono text-[#0B0D17]">{darpanUid}</strong>
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0B0D17] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#151A2D]">
                  50% Tax Deduction Under Section 80G
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#0B0D17] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-semibold text-[#151A2D]">
                  100% Audited Financials & Instant Receipts
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-bold text-xs sm:text-sm text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-md transition transform hover:-translate-y-0.5 group"
              >
                <span>Explore Our 10 Programs</span>
                <ArrowRight className="w-4 h-4 text-[#0B0D17] group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#compliance"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-[#151A2D] bg-white border border-[#E8E8E5] hover:bg-slate-50 transition shadow-xs"
              >
                <ShieldCheck className="w-4 h-4 text-[#0B0D17]" />
                <span>Verify Trust Registrations</span>
              </a>
            </div>
          </div>

          {/* Right Image Showcase with Real On-Ground Photos */}
          <div className="lg:col-span-5 relative">
            <div className="space-y-4">
              {/* Primary Real Photo Card */}
              <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white bg-white group">
                <div className="h-64 sm:h-72 overflow-hidden relative">
                  <img
                    src="/programs/children-development.jpg"
                    alt="RK Foundation child welfare on-ground field distribution"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B0D17]/85 backdrop-blur-md text-[#FFC43D] text-[11px] font-bold px-3 py-1 rounded-full border border-white/10 shadow-xs">
                    Child Welfare & Field Drives
                  </span>
                </div>
                <div className="p-4 bg-white border-t border-[#E8E8E5] flex items-center justify-between text-xs">
                  <span className="text-[#697386] font-medium">Volunteers distributing food & study kits</span>
                  <span className="font-bold text-[#151A2D]">Delhi-NCR Bastis</span>
                </div>
              </div>

              {/* Secondary Real Photo Card */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden shadow-soft border-2 border-white bg-white group">
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src="/programs/womens-empowerment.jpg"
                      alt="Women empowerment vocational kit distribution"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 bg-white/95 text-[#151A2D] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      Women Tailoring
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden shadow-soft border-2 border-white bg-white group">
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src="/programs/elderly-care.jpg"
                      alt="Elderly care nutrition and medicine kits"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute bottom-2 left-2 bg-white/95 text-[#151A2D] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                      Elderly Support
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Card Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#0B0D17] text-white p-4 sm:p-5 rounded-2xl shadow-2xl border border-white/10 hidden sm:flex items-center gap-3.5 max-w-xs">
              <div className="w-11 h-11 rounded-xl bg-[#FFC43D] text-[#0B0D17] flex items-center justify-center font-black text-lg shrink-0">
                <Award className="w-6 h-6 text-[#0B0D17]" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">100% Verified Transparency</p>
                <p className="text-[11px] text-[#A0A4AE]">
                  Audited annual returns and instant 80G tax receipts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR WORK IN ACTION (VIDEO DOCUMENTARY & FIELD EVIDENCE)
          Matching Reference Screenshot UI
      ======================================================== */}
      <section className="bg-white py-16 sm:py-24 border-y border-[#E8E8E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#FFC43D] rounded-full inline-block" />
                <span className="text-xs font-bold text-[#151A2D] uppercase tracking-wider">
                  Our Work in Action
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151A2D] tracking-tight leading-tight">
                Documentary Field Evidence Across Slum Clusters
              </h2>

              <p className="text-sm sm:text-base text-[#697386] leading-relaxed">
                Watch our dedicated ground taskforce in motion. From organizing morning remedial bridge classes to distributing cooked nutritious meals and deploying mobile clinics, our impact is 100% visible and verifiable.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#151A2D]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Real-time photo and video distribution logs</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#151A2D]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Recorded video testimonials from beneficiary mothers</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#151A2D]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero administrative leakage guarantee</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/activities"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B0D17] hover:text-[#EBAF20] transition group"
                >
                  <span>Watch Parents Video Reviews</span>
                  <span className="text-[#EBAF20] font-black group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive Video Preview Card */}
            <div className="lg:col-span-7">
              <div
                onClick={() => setVideoModalOpen(true)}
                className="bg-[#0B0D17] rounded-3xl overflow-hidden border border-slate-200 shadow-2xl relative group cursor-pointer"
              >
                <div className="h-72 sm:h-96 w-full relative overflow-hidden">
                  <img
                    src="/programs/children-development.jpg"
                    alt="RK Foundation ground relief documentary"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0B0D17]/90 text-white backdrop-blur-md border border-white/15">
                        RK Foundation | Public Charitable Trust
                      </span>
                      <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-600 text-white flex items-center gap-1.5 shadow-md">
                        <Play className="w-3 h-3 fill-white" />
                        <span>Field Documentary</span>
                      </span>
                    </div>

                    {/* Big YouTube Play Button */}
                    <div className="self-center">
                      <div className="w-16 h-12 sm:w-20 sm:h-14 bg-red-600 group-hover:bg-red-700 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all transform group-hover:scale-110">
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
          4. MEASURABLE GROUND IMPACT (Dark Navy Banner #0B0D17)
          Harmonizes with Hero & Footer Design Language
      ======================================================== */}
      <section className="bg-[#0B0D17] text-white py-16 sm:py-20 relative overflow-hidden border-y border-[#171923]">
        {/* Subtle geometric dot pattern overlay */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#FFC43D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 right-10 w-80 h-80 bg-[#FFC43D]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-[#FFC43D]/10 text-[#FFC43D] border border-[#FFC43D]/30 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FFC43D]" />
                <span>Measurable Change on the Ground</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our Community Impact Across India
            </h2>
            <p className="text-xs sm:text-sm text-[#A0A4AE] leading-relaxed">
              Every single rupee contributed is translated directly into meals, textbooks, assistive wheelchairs, and life-saving pediatric healthcare.
            </p>
          </div>

          {/* 6 Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {impactMetrics.map((stat, i) => (
              <div
                key={i}
                className="bg-[#171923] p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-[#FFC43D]/50 transition-all text-center flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFC43D] tracking-tight group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 leading-snug">
                    {stat.label}
                  </h4>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#A0A4AE] mt-2 pt-2 border-t border-white/5 leading-relaxed">
                  {stat.sublabel}
                </p>
              </div>
            ))}
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
              className="bg-white rounded-2xl overflow-hidden border border-[#E8E8E5] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              <div className="h-48 overflow-hidden relative bg-slate-100">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 bg-[#0B0D17]/85 backdrop-blur-md text-[#FFC43D] border border-white/15 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {pillar.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-[#697386] mt-2.5 leading-relaxed line-clamp-3">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {pillar.highlight}
                  </span>
                  <Link
                    to={`/programs/${pillar.slug}`}
                    className="text-xs font-bold text-[#0B0D17] hover:text-[#EBAF20] flex items-center gap-1 group/btn"
                  >
                    <span>Details</span>
                    <span className="text-[#EBAF20] font-black group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. OUR JOURNEY & GROWTH TIMELINE
      ======================================================== */}
      <section className="bg-white py-16 sm:py-24 border-y border-[#E8E8E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Milestones & Evolution"
            title="Our Path of Impact (2021 – 2026)"
            description="How a humble single-room evening bridge class transformed into a recognized public charitable platform supporting thousands yearly."
          />

          <div className="mt-14 relative">
            {/* Center line for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-[#E8E8E5] -translate-x-1/2" />

            <div className="space-y-8 lg:space-y-12">
              {milestones.map((m, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={idx}
                    className={`relative flex flex-col lg:flex-row items-center gap-6 lg:gap-12 ${
                      isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full lg:w-1/2">
                      <div className="bg-[#F7F7F5] p-6 sm:p-7 rounded-2xl border border-[#E8E8E5] shadow-xs hover:shadow-card transition-all group">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#FFC43D] text-[#0B0D17]">
                            {m.year}
                          </span>
                          <span className="text-[11px] font-semibold text-[#697386] bg-white px-2.5 py-0.5 rounded-full border border-[#E8E8E5]">
                            {m.tag}
                          </span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors">
                          {m.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-[#697386] leading-relaxed mt-2">
                          {m.description}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Dot Badge */}
                    <div className="hidden lg:flex w-10 h-10 rounded-full bg-[#0B0D17] text-[#FFC43D] border-4 border-white shadow-md items-center justify-center font-bold text-xs shrink-0 z-10">
                      {idx + 1}
                    </div>

                    {/* Spacer for desktop symmetry */}
                    <div className="hidden lg:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. LEGAL COMPLIANCE, GOVERNANCE & TAX EXEMPTION
          Includes "View Certificates" Modal
      ======================================================== */}
      <section id="compliance" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <SectionHeading
          badge="100% Legal Accountability"
          title="Government Certifications & Registrations"
          description="We operate under rigorous financial disclosures and strict governance frameworks to guarantee every single rupee is transparently utilized."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white p-6 rounded-2xl border border-[#E8E8E5] shadow-xs hover:shadow-card transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-[#F7F7F5] flex items-center justify-center text-[#0B0D17] mb-4 border border-[#E8E8E5] group-hover:bg-[#FFC43D] transition-colors">
                  <ShieldCheck className="w-6 h-6 text-[#0B0D17]" />
                </div>
                <h3 className="text-base font-bold text-[#151A2D]">{cert.title}</h3>
                <p className="text-xs text-[#697386] mt-1">{cert.authority}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-3">
                <div>
                  <span className="text-[11px] text-[#697386] font-medium block">Official Reg Code:</span>
                  <p className="text-xs font-mono font-bold text-[#151A2D] bg-[#F7F7F5] p-2.5 rounded-lg border border-[#E8E8E5] mt-1 select-all truncate" title={cert.code}>
                    {cert.code}
                  </p>
                </div>

                <button
                  onClick={() => setActiveCert(cert)}
                  className="w-full py-2 px-3 rounded-xl bg-[#0B0D17] hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5 text-[#FFC43D]" />
                  <span>Inspect Certificate</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Link Banner */}
        <div className="mt-8 bg-[#F7F7F5] rounded-2xl p-5 border border-[#E8E8E5] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
            </div>
            <p className="text-xs sm:text-sm text-[#151A2D]">
              Formal 80G tax exemption certificates are generated instantly upon receipt of donations and dispatched via email.
            </p>
          </div>
          <Link
            to="/receipt-verify"
            className="shrink-0 text-xs font-bold text-[#0B0D17] hover:text-[#FFC43D] underline transition flex items-center gap-1.5"
          >
            <span>Verify An Existing 80G Tax Receipt</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Full Statutory Notice Callout Banner */}
        <div className="mt-6 bg-white border border-[#E8E8E5] rounded-2xl p-5 flex items-start sm:items-center gap-3.5 text-xs text-[#697386] shadow-xs">
          <div className="w-7 h-7 rounded-full bg-[#FFC43D]/20 text-[#0B0D17] flex items-center justify-center shrink-0">
            <Info className="w-4 h-4 text-[#0B0D17]" />
          </div>
          <p className="leading-relaxed">
            <strong className="text-[#151A2D]">Statutory Notice:</strong> RK FOUNDATION is registered under the Indian Trusts Act with NGO Darpan UID <strong className="text-[#151A2D] font-mono">{darpanUid}</strong> and PAN <strong className="text-[#151A2D] font-mono">{panNumber}</strong>. Official computer-generated receipts are issued for all contributions. Tax exemption eligibility is subject to prevailing provisions of the Income Tax Act, 1961.
          </p>
        </div>
      </section>

      {/* ========================================================
          8. TRUSTEES & LEADERSHIP COMMITTEE
      ======================================================== */}
      <section className="bg-white py-16 sm:py-24 border-y border-[#E8E8E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Dedicated Leadership"
            title="Board of Trustees & Committee"
            description="Our leadership team is composed of seasoned educators, doctors, and logistics leaders serving without private enrichment."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {trustees.map((t, idx) => (
              <div
                key={idx}
                className="bg-[#F7F7F5] rounded-2xl p-6 border border-[#E8E8E5] shadow-xs hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center font-extrabold text-xl shadow-md mb-4 group-hover:scale-105 transition-transform">
                    {t.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC43D] bg-[#0B0D17] px-2.5 py-0.5 rounded-full inline-block">
                    {t.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#151A2D] mt-2">
                    {t.name}
                  </h3>
                  <p className="text-xs font-bold text-[#0B0D17] mt-0.5">
                    {t.role}
                  </p>
                  <p className="text-[11px] text-[#697386] font-medium mt-0.5">
                    {t.qualification}
                  </p>
                  <p className="text-xs text-[#697386] leading-relaxed mt-3">
                    {t.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
          <div className="bg-white p-7 rounded-2xl border border-[#E8E8E5] shadow-xs hover:shadow-card space-y-4 hover:border-[#FFC43D] transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center font-black text-sm">
              01
            </span>
            <h3 className="text-base font-bold text-[#151A2D]">Zero Discrimination</h3>
            <p className="text-xs text-[#697386] leading-relaxed">
              Assistance is extended unconditionally regardless of religion, caste, gender, or geographic origin. We serve human beings in their most vulnerable hours.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E8E8E5] shadow-xs hover:shadow-card space-y-4 hover:border-[#FFC43D] transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center font-black text-sm">
              02
            </span>
            <h3 className="text-base font-bold text-[#151A2D]">Open-Book Accountability</h3>
            <p className="text-xs text-[#697386] leading-relaxed">
              Every donor receives immediate 80G tax receipts, verified photographic progress proof, and access to audited annual balance sheets.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E8E8E5] shadow-xs hover:shadow-card space-y-4 hover:border-[#FFC43D] transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center font-black text-sm">
              03
            </span>
            <h3 className="text-base font-bold text-[#151A2D]">Sustainable Self-Reliance</h3>
            <p className="text-xs text-[#697386] leading-relaxed">
              We go beyond temporary hand-outs by providing certified vocational tailoring, digital tablets, and academic bridging to permanently break poverty cycles.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-[#E8E8E5] shadow-xs hover:shadow-card space-y-4 hover:border-[#FFC43D] transition-colors">
            <span className="w-12 h-12 rounded-xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center font-black text-sm">
              04
            </span>
            <h3 className="text-base font-bold text-[#151A2D]">Dignity-First Human Aid</h3>
            <p className="text-xs text-[#697386] leading-relaxed">
              Every child, destitute senior citizen, and mother is treated with utmost reverence, respect, and human dignity during all field interactions.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          10. CERTIFICATE INSPECTION MODAL
      ======================================================== */}
      {activeCert && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveCert(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E8E8E5] space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#0B0D17] text-[#FFC43D] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#FFC43D]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#151A2D]">
                    {activeCert.title}
                  </h3>
                  <span className="text-[11px] text-[#697386]">Official Government Accreditation</span>
                </div>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F7F7F5] rounded-2xl p-5 border border-[#E8E8E5] space-y-3 text-xs">
              <div>
                <span className="text-[#697386] font-medium block">Issuing Authority:</span>
                <p className="font-bold text-[#151A2D] mt-0.5">{activeCert.authority}</p>
              </div>
              <div>
                <span className="text-[#697386] font-medium block">Registration / Order Identifier:</span>
                <p className="font-mono font-bold text-sm text-[#0B0D17] bg-white p-2 rounded-lg border border-[#E8E8E5] mt-0.5 select-all">
                  {activeCert.code}
                </p>
              </div>
              <div>
                <span className="text-[#697386] font-medium block">Accreditation Scope:</span>
                <p className="text-[#697386] leading-relaxed mt-0.5">{activeCert.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <Link
                to="/receipt-verify"
                className="text-xs font-bold text-[#0B0D17] hover:text-[#FFC43D] underline"
              >
                Verify In Government Database →
              </Link>
              <button
                onClick={() => setActiveCert(null)}
                className="px-5 py-2.5 rounded-full bg-[#0B0D17] text-white font-bold text-xs hover:bg-black transition"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-[#171923] border border-white/20 rounded-3xl p-6 max-w-2xl w-full text-white space-y-4 shadow-2xl"
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
            <p className="text-xs text-[#A0A4AE]">
              Documentary footage of ongoing food distribution drives, non-formal bridge schooling, and medical aid camps conducted across Delhi-NCR bastis.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
