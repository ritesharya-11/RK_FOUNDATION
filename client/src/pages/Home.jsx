import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import api from '../services/api';
import {
  Play,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Heart,
  Users,
  Award,
  CheckCircle2,
  X,
  BookOpen,
  Gift,
  HandHeart,
  Globe,
  PieChart as PieChartIcon,
  Building2,
  Activity,
} from 'lucide-react';

export const Home = () => {
  const { settings, formatINR } = useWebsite();
  const navigate = useNavigate();

  // Dynamic API Data
  const [programs, setPrograms] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Interactive States
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [studyModalOpen, setStudyModalOpen] = useState(false);
  const [activeDonationPreset, setActiveDonationPreset] = useState(5000);
  const [milestoneSlide, setMilestoneSlide] = useState(0);
  const [programSlide, setProgramSlide] = useState(0);
  const [testimonialSlide, setTestimonialSlide] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, projRes, actRes, testRes] = await Promise.allSettled([
          api.get('/programs?featured=true'),
          api.get('/projects?featured=true'),
          api.get('/activities'),
          api.get('/testimonials'),
        ]);

        if (progRes.status === 'fulfilled' && progRes.value?.programs) {
          setPrograms(progRes.value.programs);
        }
        if (projRes.status === 'fulfilled' && projRes.value?.projects) {
          setProjects(projRes.value.projects);
        }
        if (actRes.status === 'fulfilled' && actRes.value?.activities) {
          setActivities(actRes.value.activities);
        }
        if (testRes.status === 'fulfilled' && testRes.value?.testimonials) {
          setTestimonials(testRes.value.testimonials);
        }
      } catch (err) {
        console.warn('[Home Data Fetch Error]:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Milestone Infographic Data (Exact Image 1 Reference)
  const milestoneSlides = [
    {
      year: '2025',
      title: 'Highlights of the 12th Grade Board Results 2025',
      stat1: { value: '100%', label: 'Passing Result!' },
      stat2: { value: '91%', label: 'Passed in 1st division' },
      stat3: { value: '91%', label: 'Phenomenal performance by Soni Kaur, XII Arts' },
      stat4: { value: '80%', label: '54% students scored 80% and above' },
      stat5: { value: '77%', label: 'Average Score of all the students' },
      footer: 'Gainful employment in various professions.',
    },
    {
      year: '2026',
      title: 'Highlights of Holistic Impact & Retention 2026',
      stat1: { value: '99%', label: 'Secondary School Retention' },
      stat2: { value: '94%', label: 'Higher Education Transition' },
      stat3: { value: '1,200+', label: 'Girls Equipped with Digital Literacy' },
      stat4: { value: '85%', label: 'Students Scoring Above First Division' },
      stat5: { value: '100%', label: 'Healthcare & Nutrition Coverage' },
      footer: 'Empowering future leaders across India.',
    },
  ];

  const currentMilestone = milestoneSlides[milestoneSlide % milestoneSlides.length];

  // Verified Medical Emergency Cases (Exact Reference: media_1794818637454_2b67375f.jpg)
  const emergencyCases = [
    {
      id: 'gita-kumari',
      name: 'Gita Kumari',
      age: '1 Years',
      gender: 'Female',
      image: '/cases/gita-kumari.jpg',
      hospital: 'Safdarjung Hospital, New Delhi',
      condition:
        'Ventricular Septal Defect (VSD) & Severe Pulmonary Hypertension requiring immediate corrective open-heart surgery and pediatric ICU monitoring.',
      raisedAmount: 195000,
      targetAmount: 250000,
      caseNumber: 'RKF-MED-2026-081',
      tag: 'Critical Surgery',
    },
    {
      id: 'baby-of-deepa',
      name: 'Baby of Deepa',
      age: '12 Days',
      gender: 'Male',
      image: '/cases/baby-of-deepa.jpg',
      hospital: "Kalawati Saran Children's Hospital, New Delhi",
      condition:
        'Extreme Neonatal Sepsis, severe clinical jaundice & intensive multi-spectrum phototherapy with urgent incubator support.',
      raisedAmount: 135000,
      targetAmount: 180000,
      caseNumber: 'RKF-MED-2026-084',
      tag: 'NICU Care',
    },
    {
      id: 'baby-of-shivani',
      name: 'Baby of Shivani',
      age: '14 Days',
      gender: 'Male',
      image: '/cases/baby-of-shivani.jpg',
      hospital: 'AIIMS NICU Department, New Delhi',
      condition:
        'Preterm Neonatal Respiratory Distress Syndrome requiring synchronized mechanical ventilation and ongoing surfactant therapy.',
      raisedAmount: 245000,
      targetAmount: 320000,
      caseNumber: 'RKF-MED-2026-089',
      tag: 'Urgent Care',
    },
  ];

  // Programs Carousel Data (Image 8 Reference)
  const fallbackPrograms = [
    {
      id: 1,
      title: 'EARLY CHILDHOOD DEVELOPMENT',
      subtitle: 'Behind every smile is a story of courage, struggle, and transformation.',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      link: '/programs/children-development',
    },
    {
      id: 2,
      title: 'CURIOSITY CENTRIC PEDAGOGY',
      subtitle: 'Experiential STEM, bilingual labs, and creative workshops designed to inspire young minds.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      link: '/programs/education-and-literacy',
    },
    {
      id: 3,
      title: 'REMEDIAL CLASSES & BRIDGE COURSES',
      subtitle: 'Dedicated evening tutoring bridging dropout gaps into mainstream government schools.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80',
      link: '/programs/differently-abled-welfare',
    },
    {
      id: 4,
      title: "WOMEN'S LIVELIHOOD & EMPOWERMENT",
      subtitle: 'Vocational tailoring, micro-finance skills, and financial independence training for mothers.',
      image: 'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80',
      link: '/programs/womens-development-and-empowerment',
    },
  ];

  return (
    <div className="w-full bg-[#FAF7F2] text-[#323D3D] overflow-x-hidden">
      {/* ========================================================
          1. HERO BANNER: EXACT REFERENCE IMAGE 1
          (Smiling Girl, School Entrance, "INVESTING IN ▶ ETERNITY")
      ======================================================== */}
      <section className="relative w-full bg-[#121316] overflow-hidden">
        {/* Full-width Hero Image from Reference Screenshot */}
        <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] overflow-hidden">
          <img
            src="/hero-main.jpg"
            alt="Investing in Eternity - Empowering less privileged girls achieve financial independence"
            className="w-full h-full object-cover object-center filter brightness-[1.02]"
          />

          {/* Interactive Clickable Play Button Overlay over the orange circle */}
          <button
            type="button"
            onClick={() => setVideoModalOpen(true)}
            className="absolute left-[33%] sm:left-[34%] lg:left-[35.5%] top-[53%] sm:top-[54%] -translate-y-1/2 w-9 h-9 sm:w-14 sm:h-14 rounded-full bg-[#F67708]/0 hover:bg-[#F67708]/20 border-2 border-transparent hover:border-white transition cursor-pointer flex items-center justify-center group"
            aria-label="Play Inspirational Film"
            title="Click to play documentary film"
          >
            <span className="sr-only">Play Documentary Film</span>
          </button>
        </div>

        {/* ========================================================
            2. OVERLAPPING CURVED WHITE STORY SECTION
            (Exact Reference Image 1: Orange circle on left + rounded white container)
        ======================================================== */}
        <div className="relative -mt-10 sm:-mt-16 lg:-mt-20 z-20 w-full flex items-start">
          {/* Left Decorative Orange Circle Accent (Image 1) */}
          <div className="w-16 h-16 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full bg-[#F67708] -mr-8 sm:-mr-12 mt-3 sm:mt-5 z-10 shrink-0 shadow-lg" />

          {/* Overlapping White Container with Rounded Top-Right Corner */}
          <div className="flex-1 bg-white rounded-tr-[50px] sm:rounded-tr-[80px] lg:rounded-tr-[100px] pt-8 sm:pt-12 pb-16 px-6 sm:px-12 shadow-soft border-t border-r border-[#E3D9CF]/60">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Column: The Story Narrative */}
                <div className="lg:col-span-6 space-y-4">
                  <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#323D3D] tracking-tight">
                    THE STORY OF VIMUKTI GIRLS
                  </h2>
                  <h3 className="text-lg sm:text-2xl font-bold text-[#F67708]">
                    From Poverty to Empowering Future Generations
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#036C6C]">
                    Harnessing the Power of Holistic Education
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-[#697777]">
                    From humble beginnings with 20 little slum girls in 2004, Vimukti Girls School is now a formal school affiliated to the Rajasthan Board, spanning classes from nursery to grade 12 with a strength close to 900. The result of our focus on providing holistic education speaks for itself.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/about"
                      className="btn-vermillion px-7 py-3 text-xs sm:text-sm font-bold shadow-md"
                    >
                      MORE INFO
                    </Link>
                  </div>
                </div>

                {/* Right Column: Exact Infographic Board Card (Image 1 & 2) */}
                <div className="lg:col-span-6">
                  <div className="bg-[#FAF7F2] border border-[#E3D9CF] rounded-3xl p-6 sm:p-8 shadow-card relative overflow-hidden">
                    {/* Top NGO Logo & Controls */}
                    <div className="flex items-center justify-between pb-3 border-b border-[#E3D9CF]/60">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#F67708] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                          RK
                        </div>
                        <span className="text-xs font-bold text-[#323D3D]">
                          Board Results & Impact
                        </span>
                      </div>

                      {/* Carousel Arrow Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setMilestoneSlide((prev) => (prev > 0 ? prev - 1 : milestoneSlides.length - 1))}
                          className="w-8 h-8 rounded-full border border-[#E3D9CF] bg-white flex items-center justify-center text-[#323D3D] hover:bg-[#FAF7F2] transition cursor-pointer"
                          aria-label="Previous Year"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setMilestoneSlide((prev) => prev + 1)}
                          className="w-8 h-8 rounded-full bg-[#F67708] flex items-center justify-center text-white hover:bg-[#E06800] transition shadow-xs cursor-pointer"
                          aria-label="Next Year"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Infographic Center Sunburst Circle with Branching Stats */}
                    <div className="py-6 relative">
                      {/* Top Row: Stat 1 (100% Passing) & Stat 3 (91% Phenomenal) */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-left bg-white/80 p-2.5 rounded-xl border border-[#E3D9CF]/50 shadow-xs">
                          <span className="text-lg sm:text-xl font-black text-[#323D3D] block">
                            {currentMilestone.stat1.value}
                          </span>
                          <span className="text-[11px] font-semibold text-[#697777]">
                            {currentMilestone.stat1.label}
                          </span>
                        </div>
                        <div className="text-right bg-white/80 p-2.5 rounded-xl border border-[#E3D9CF]/50 shadow-xs">
                          <span className="text-lg sm:text-xl font-black text-[#F67708] block">
                            {currentMilestone.stat3.value}
                          </span>
                          <span className="text-[11px] font-semibold text-[#697777]">
                            {currentMilestone.stat3.label}
                          </span>
                        </div>
                      </div>

                      {/* Center Sunburst Orange Circle */}
                      <div className="mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-[#F67708] text-white flex flex-col items-center justify-center text-center p-3 shadow-xl z-10 relative">
                        <span className="text-[11px] font-medium leading-tight">
                          Highlights of
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider mt-0.5">
                          the 12th Grade
                        </span>
                        <span className="text-xs font-semibold">
                          Board Results
                        </span>
                        <span className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
                          {currentMilestone.year}
                        </span>
                      </div>

                      {/* Bottom Row: Stat 2 (91% 1st division) & Stat 4 (80% score) */}
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="text-left bg-white/80 p-2.5 rounded-xl border border-[#E3D9CF]/50 shadow-xs">
                          <span className="text-lg sm:text-xl font-black text-[#036C6C] block">
                            {currentMilestone.stat2.value}
                          </span>
                          <span className="text-[11px] font-semibold text-[#697777]">
                            {currentMilestone.stat2.label}
                          </span>
                        </div>
                        <div className="text-right bg-white/80 p-2.5 rounded-xl border border-[#E3D9CF]/50 shadow-xs">
                          <span className="text-lg sm:text-xl font-black text-[#F67708] block">
                            {currentMilestone.stat4.value}
                          </span>
                          <span className="text-[11px] font-semibold text-[#697777]">
                            {currentMilestone.stat4.label}
                          </span>
                        </div>
                      </div>

                      {/* Stat 5 (Average Score) */}
                      <div className="text-center mt-3 bg-white/80 p-2 rounded-xl border border-[#E3D9CF]/50 shadow-xs max-w-xs mx-auto">
                        <span className="text-base font-black text-[#323D3D]">
                          {currentMilestone.stat5.value}
                        </span>
                        <span className="text-[11px] text-[#697777] ml-2 font-semibold">
                          {currentMilestone.stat5.label}
                        </span>
                      </div>

                      {/* Bottom Solid Orange Pill Badge (Image 1 & 2 Reference) */}
                      <div className="mt-5 text-center">
                        <div className="inline-block w-full py-2.5 px-4 bg-[#F67708] text-white text-xs font-bold uppercase rounded-lg shadow-sm">
                          {currentMilestone.footer}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SECTION: LIVE BENEFICIARY EMERGENCY CASES
          (Exact Reference: media_1794818637454_2b67375f.jpg)
      ======================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 space-y-3">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FFF4EB] text-[#F67708] border border-[#F67708]/30 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-[#F67708]" />
            <span>Verified Medical Relief • Direct Hospital Disbursement</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Live Beneficiary <span className="text-[#F67708]">Emergency Cases</span>
          </h2>

          {/* Subtitle */}
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Critical medical appeals for newborns, children, and vulnerable patients requiring urgent hospital care.
            Every case has been independently verified with medical documentation and family consent.
          </p>
        </div>

        {/* Beneficiary Privacy & Statutory Consent Policy Banner */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC9] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 max-w-5xl mx-auto mb-10 shadow-xs">
          <div className="p-2 rounded-xl bg-[#FFF4EB] border border-[#F67708]/30 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-[#F67708]" />
          </div>
          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed pt-0.5">
            <strong className="text-[#1E293B] font-bold">Beneficiary Privacy & Statutory Consent Policy:</strong>{' '}
            Identifying details and hospital admission estimates are published only after written guardian consent has been reviewed. 100% of case donations are transferred directly to authorized hospital treasury accounts.
          </p>
        </div>

        {/* 3 Live Cases Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {emergencyCases.map((c) => {
            const percent = Math.min(100, Math.round((c.raisedAmount / c.targetAmount) * 100));
            return (
              <div
                key={c.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E3D9CF] shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image container */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Hospital Verified Badge */}
                    <div className="absolute top-3 left-3 bg-[#111827]/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Hospital Verified</span>
                    </div>

                    {/* Category Tag Top Right */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#036C6C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {c.tag}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    {/* Meta Info: Age & Gender */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold tracking-wide">
                      <span>Age: {c.age}</span>
                      <span>Gender: {c.gender}</span>
                    </div>

                    {/* Patient Name */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight group-hover:text-[#F67708] transition-colors">
                        {c.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#036C6C] font-semibold mt-1">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{c.hospital}</span>
                      </div>
                    </div>

                    {/* EXACT CONDITION BOX FORMAT */}
                    <div className="bg-[#FFF4EC] border border-[#F67708]/20 rounded-xl p-3 text-xs">
                      <span className="text-[#F67708] font-bold block mb-1">Condition:</span>
                      <p className="text-slate-700 leading-relaxed font-medium">
                        {c.condition}
                      </p>
                    </div>

                    {/* Progress Bar & Financials */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-500 font-medium">Raised: <strong className="text-[#323D3D] font-bold">{formatINR(c.raisedAmount)}</strong></span>
                        <span className="text-[#F67708] font-black">{percent}%</span>
                      </div>
                      <div className="w-full bg-[#FAF7F2] border border-[#E3D9CF] h-2.5 rounded-full overflow-hidden p-0.5">
                        <div
                          className="bg-[#F67708] h-full rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span>Target: {formatINR(c.targetAmount)}</span>
                        <span>Case #{c.caseNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 sm:p-6 pt-0 space-y-2">
                  <Link
                    to={`/donate?campaignId=${encodeURIComponent(c.id)}&amount=2500`}
                    className="w-full py-3 px-4 rounded-xl bg-[#F67708] hover:bg-[#E06800] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Donate to this Case</span>
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Direct Hospital Transfer • 80G Tax Exemption</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Live Cases CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-[#036C6C] text-[#036C6C] hover:bg-[#036C6C] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200"
          >
            <span>Explore All Verified Emergency Cases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ========================================================
          4. SECTION: "SOCIAL IMPACT" GRID & CENTRAL QUOTE
          (Exact Reference: Image 7)
      ======================================================== */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Card 1: Top Left Beneficiary Story */}
          <div className="lg:col-span-4 bg-white border border-[#E3D9CF] rounded-2xl p-4 flex flex-col justify-between shadow-soft hover:shadow-card transition">
            <div className="space-y-3">
              <div className="h-52 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80"
                  alt="Student Success"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-xs font-black uppercase text-[#323D3D] leading-tight">
                LITTLE STEPS TO SUCCESS - THE STORY OF SANGEETA
              </h4>
            </div>
            <div className="pt-3">
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F67708] hover:text-[#E06800] uppercase"
              >
                <span>» MORE DETAILS</span>
              </Link>
            </div>
          </div>

          {/* Center Column: Social Impact Quote Block (Exact Reference Image 7) */}
          <div className="lg:col-span-4 bg-[#FAF6F0] border border-[#E3D9CF] rounded-2xl p-6 sm:p-8 flex flex-col justify-between text-center shadow-soft">
            <div className="space-y-4">
              <span className="text-[11px] font-bold tracking-widest text-[#F67708] block uppercase">
                —— SOCIAL IMPACT ——
              </span>
              <div className="text-4xl font-serif text-[#F67708] leading-none">““</div>
              <blockquote className="text-sm sm:text-base font-extrabold uppercase text-[#323D3D] leading-snug">
                "RK FOUNDATION IS AN ENDURING SYMBOL OF QUALITY EDUCATION AND DIGNITY FOR MARGINALIZED COMMUNITIES."
              </blockquote>
              <div className="pt-2 border-t border-[#E3D9CF]/70">
                <span className="text-xs font-bold text-[#036C6C] block uppercase mb-1">
                  IIHMR FIELD EVALUATION
                </span>
                <p className="text-[11px] text-[#697777] leading-relaxed">
                  An independent study states that youth and girls at our centers are now key decision makers and role models in their family matters.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => setStudyModalOpen(true)}
                className="btn-vermillion px-6 py-2.5 text-xs font-bold uppercase shadow-sm cursor-pointer"
              >
                STUDY REPORT
              </button>
            </div>
          </div>

          {/* Card 2: Top Right Beneficiary Story */}
          <div className="lg:col-span-4 bg-white border border-[#E3D9CF] rounded-2xl p-4 flex flex-col justify-between shadow-soft hover:shadow-card transition">
            <div className="space-y-3">
              <div className="h-52 rounded-xl overflow-hidden bg-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80"
                  alt="Student Success"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-xs font-black uppercase text-[#323D3D] leading-tight">
                LITTLE STEPS TO SUCCESS - THE STORY OF MAHESHWARI
              </h4>
            </div>
            <div className="pt-3">
              <Link
                to="/news"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#F67708] hover:text-[#E06800] uppercase"
              >
                <span>» MORE DETAILS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECTION: "THE UNTOLD STORY" (Deep Teal Container)
          (Exact Reference: Image 8)
      ======================================================== */}
      <section className="my-8 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#036C6C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="max-w-2xl space-y-2 mb-10">
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              THE UNTOLD STORY
            </h2>
            <h3 className="text-lg sm:text-2xl font-bold text-[#F67708]">
              Weaving Empathy and Engagement into Programs
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-teal-100/90">
              Pursuing Curiosity and Inclusiveness
            </p>
            <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed pt-2">
              "Each Child to Their Own Potential" and "Leave No One Behind" are at the heart of RK Foundation's mission. What has been achieved is a result of relentless dedication and continuous improvement by teachers, caregivers, and field workers alike.
            </p>
          </div>

          {/* Carousel Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fallbackPrograms.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF6F0] text-[#323D3D] rounded-2xl overflow-hidden shadow-card flex flex-col justify-between group"
              >
                <div className="h-48 overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-tight text-[#323D3D]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#697777] leading-relaxed mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <div className="pt-3">
                    <Link
                      to={item.link}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F67708] hover:text-[#E06800] uppercase"
                    >
                      <span>Explore Program →</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <Link
              to="/programs"
              className="text-xs font-bold text-teal-100 hover:text-white mr-auto transition"
            >
              View All 10 Operational Programmes →
            </Link>
            <button
              onClick={() => setProgramSlide((prev) => (prev > 0 ? prev - 1 : 0))}
              className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setProgramSlide((prev) => prev + 1)}
              className="w-9 h-9 rounded-full bg-[#F67708] flex items-center justify-center text-white hover:bg-[#E06800] transition shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SECTION: "GENESIS OF THE STORY" + DONATION PHONE
          (Exact Reference: Image 8)
      ======================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#323D3D] tracking-tight">
              GENESIS OF THE STORY
            </h2>
            <h3 className="text-lg sm:text-2xl font-bold text-[#F67708]">
              Once Upon a Time
            </h3>
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#036C6C]">
              A Moment of Transformation. And then there was RK Foundation.
            </p>
            <p className="text-sm text-[#697777] leading-relaxed">
              It was one of those pleasant mornings in the slum clusters of Delhi-NCR. "Come here, have some milk," our founder called out affectionately to a 12-year-old girl who had accompanied her mother that day.
            </p>
            <p className="text-sm text-[#697777] leading-relaxed">
              As the glass of milk was extended to her, she shook her head. "I don't drink milk," she said hesitantly, her gaze rooted to the ground. "Why? All children drink milk." "No, only my brother can drink milk, because he goes to school."
            </p>
            <p className="text-sm text-[#697777] leading-relaxed font-medium text-[#323D3D]">
              Her words resonated deeply, serving as a defining catalyst: every child deserves equal nutrition, dignity, and access to quality learning.
            </p>
          </div>

          {/* Right Impact / Donation Mockup Card (Reference Image 8) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-[#E3D9CF] rounded-3xl p-6 sm:p-8 shadow-card max-w-md mx-auto">
              <div className="flex items-center justify-between pb-4 border-b border-[#FAF7F2]">
                <div className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-[#F67708]" />
                  <span className="text-xs font-bold text-[#323D3D]">
                    Transparency & Fund Allocation
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                  Audited 100%
                </span>
              </div>

              {/* Allocation Stats */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="p-3 bg-[#FAF7F2] rounded-xl text-center border border-[#E3D9CF]/60">
                  <span className="text-2xl font-black text-[#036C6C]">85%</span>
                  <span className="text-[11px] text-[#697777] block font-semibold">
                    Direct Ground Relief
                  </span>
                </div>
                <div className="p-3 bg-[#FAF7F2] rounded-xl text-center border border-[#E3D9CF]/60">
                  <span className="text-2xl font-black text-[#F67708]">15%</span>
                  <span className="text-[11px] text-[#697777] block font-semibold">
                    Operations & Logistics
                  </span>
                </div>
              </div>

              {/* Interactive Donation Selector */}
              <div className="bg-[#FAF6F0] rounded-2xl p-5 border border-[#E3D9CF] space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#323D3D] block text-center">
                  Maximise Your Impact Fund
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[1000, 2500, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setActiveDonationPreset(amt)}
                      className={`py-2 rounded-lg text-xs font-bold transition ${activeDonationPreset === amt
                        ? 'bg-[#F67708] text-white shadow-sm'
                        : 'bg-white text-[#323D3D] border border-[#E3D9CF] hover:bg-slate-50'
                        }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <span className="text-[11px] text-[#697777] block mb-2">
                    Selected Amount: <strong className="text-[#323D3D] font-mono">₹{activeDonationPreset.toLocaleString()}</strong> (50% Tax Exemption)
                  </span>
                  <button
                    onClick={() => navigate(`/donate?amount=${activeDonationPreset}`)}
                    className="w-full btn-vermillion py-3 text-xs font-bold uppercase shadow-md cursor-pointer"
                  >
                    DONATE ₹{activeDonationPreset.toLocaleString()} NOW ✓
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-[#036C6C] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#036C6C]" />
                <span>Instant 80G Tax Exemption Certificate Issued</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. SECTION: "AND AN AWARD TOO"
          (Exact Reference: Image 9)
      ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#323D3D] tracking-tight">
              AND AN AWARD TOO
            </h2>
            <h3 className="text-lg sm:text-2xl font-bold text-[#F67708]">
              Your Recognition Means the World to Us.
            </h3>
            <p className="text-sm text-[#697777] leading-relaxed">
              Recognized and felicitated by educational authorities, civil leadership, and district administrations for exceptional grassroots resilience in promoting girl child education, pediatric nutrition, and winter survival aid across marginalized slums.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#036C6C] hover:text-[#F67708] uppercase"
              >
                <span>View Recognition & Audit Reports →</span>
              </Link>
            </div>
          </div>

          {/* Right Photo with Center Play Overlay (Image 9 Reference) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-card border border-[#E3D9CF] h-72 sm:h-96 group">
              <img
                src="https://images.unsplash.com/photo-1524069290683-0457abfe42c3?auto=format&fit=crop&w=1200&q=80"
                alt="RK Foundation Recognition & Center"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/20 transition-colors" />
              {/* Center Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(true)}
                  className="w-16 h-16 rounded-full bg-[#F67708] hover:bg-[#E06800] text-white flex items-center justify-center shadow-2xl transition transform hover:scale-110 cursor-pointer border-2 border-white"
                  aria-label="Play Video"
                >
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. SECTION: "GRATITUDE" & "KEY SUPPORTERS"
          (Exact Reference: Image 9)
      ======================================================== */}
      <section className="my-10 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="bg-[#036C6C] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Gratitude Text */}
            <div className="lg:col-span-6 space-y-4">
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
                GRATITUDE
              </h2>
              <h3 className="text-lg sm:text-2xl font-bold text-[#F67708]">
                Together in it with You
              </h3>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
                Thanks to all who have supported this mission — financially, through donations in kind, and through contribution of their valuable time and efforts. We are deeply grateful. Thank you teachers, staff, donors, and patrons for your dedication and commitment.
              </p>
              <div className="pt-2">
                <Link
                  to="/donate"
                  className="btn-vermillion px-6 py-3 text-xs font-bold uppercase shadow-md"
                >
                  OUR INDIVIDUAL SUPPORTERS (LAST THREE YEARS)
                </Link>
              </div>
            </div>

            {/* Right Column: Key Supporters White Card (Image 9 Reference) */}
            <div className="lg:col-span-6">
              <div className="bg-white text-[#323D3D] rounded-2xl p-6 sm:p-8 shadow-card border border-white/20">
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#036C6C] block border-b border-slate-100 pb-2 mb-4">
                  KEY SUPPORTERS & PATRONS
                </span>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#036C6C] font-bold text-sm">
                    EG
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#323D3D]">Edu-GIRLS Alliance</h4>
                    <span className="text-xs text-[#697777]">Transforming Lives in Slums</span>
                  </div>
                </div>
                <p className="text-xs text-[#697777] leading-relaxed">
                  Founded to focus on empowering children living in poverty in Southern Asia through the power of education, with the mission of enabling girls living in extreme poverty to achieve financial independence through quality education, vocational training, and college scholarships.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Grid: "OTHER SUPPORTER" (Image 9 Reference) */}
          <div className="pt-6 border-t border-white/15 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-white block">
              OTHER SUPPORTERS & CSR PARTNERS
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {[
                { name: 'Feeding India', sub: 'by Zomato' },
                { name: 'GiveIndia', sub: 'India Giving Network' },
                { name: 'Finova Capital', sub: 'CSR Partner' },
                { name: 'Benevity', sub: 'Global Impact' },
                { name: 'PC Solutions', sub: 'Tech Relief' },
                { name: 'ETAPART', sub: 'Institutional Aid' },
              ].map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-white text-[#323D3D] rounded-xl p-3 text-center border-b-4 border-[#F67708] shadow-sm flex flex-col justify-center min-h-[70px]"
                >
                  <span className="text-xs font-black tracking-tight text-[#323D3D]">
                    {partner.name}
                  </span>
                  <span className="text-[10px] text-[#697777]">{partner.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. SECTION: "THEY SPOKE FOR US" (Testimonials)
          (Exact Reference: Image 10)
      ======================================================== */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E3D9CF]">
          <div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#323D3D] tracking-tight">
              THEY SPOKE FOR US
            </h2>
            <span className="text-xs font-bold uppercase tracking-wider text-[#F67708]">
              Testimonials of Community Change
            </span>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTestimonialSlide((prev) => (prev > 0 ? prev - 1 : 1))}
              className="w-9 h-9 rounded-full border border-[#E3D9CF] flex items-center justify-center text-[#323D3D] hover:bg-white transition"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setTestimonialSlide((prev) => (prev < 1 ? prev + 1 : 0))}
              className="w-9 h-9 rounded-full bg-[#F67708] flex items-center justify-center text-white hover:bg-[#E06800] transition shadow-xs"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2 Featured Testimonial Cards (Image 10 Reference) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Deep Teal Card (Prof. Malashri Lal) */}
          <div className="bg-[#036C6C] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-card">
            <div className="space-y-3">
              <div className="text-3xl font-serif text-[#F67708] leading-none">““</div>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full text-[#F67708] inline-block">
                HIGH QUALITY EDUCATION
              </span>
              <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed font-normal">
                "Through its high-quality education and foundational care, RK Foundation is transforming the lives of young children from slum areas. Along with knowledge acquisition, they are gaining in skills, confidence, and leadership."
              </p>
            </div>
            <div className="pt-6 border-t border-white/15 mt-4 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                alt="Prof. Malashri Lal"
                className="w-12 h-12 rounded-xl object-cover border border-white/20 shrink-0"
              />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                  PROF. MALASHRI LAL
                </h4>
                <span className="text-[11px] text-teal-200">
                  Dean / Academic Council Member, University of Delhi
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Bone / Cream Card (Aman Sagar) */}
          <div className="bg-[#FAF6F0] text-[#323D3D] border border-[#E3D9CF] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-card">
            <div className="space-y-3">
              <div className="text-3xl font-serif text-[#F67708] leading-none">““</div>
              <span className="text-[10px] font-bold tracking-widest uppercase bg-amber-100/60 px-3 py-1 rounded-full text-[#F67708] inline-block">
                A TRANSFORMATIVE JOURNEY OF EMPOWERMENT
              </span>
              <p className="text-xs sm:text-sm text-[#697777] leading-relaxed font-normal">
                "Through its high-quality education and vocational initiatives, RK Foundation is transforming destitute lives into stories of resilience and self-reliance. Their transparency and grassroots connection are truly exemplary."
              </p>
            </div>
            <div className="pt-6 border-t border-[#E3D9CF] mt-4 flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                alt="Aman Sagar"
                className="w-12 h-12 rounded-xl object-cover border border-[#E3D9CF] shrink-0"
              />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wide text-[#323D3D]">
                  AMAN SAGAR
                </h4>
                <span className="text-[11px] text-[#697777]">
                  Department of Management Studies, IIT-Delhi
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. SECTION: "INVEST IN ETERNITY" (Semicircle Arch Diagram)
          (Exact Reference: Image 10)
      ======================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto bg-white border-y border-[#E3D9CF]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#323D3D] tracking-tight">
              INVEST IN ETERNITY
            </h2>
            <h3 className="text-lg sm:text-2xl font-bold text-[#F67708]">
              Let stories of transformation continue to unfold.
            </h3>
            <p className="text-sm text-[#697777] leading-relaxed">
              What RK FOUNDATION has achieved so far is despite the lack of endless capital. It is a story of grit, community trust, and a can-do spirit.
            </p>
            <p className="text-sm text-[#697777] leading-relaxed">
              If the story of our children and striving mothers tugs at your heartstrings, the time to act is now. We invite you to make this mission yours — to educate, empower, and transform generations.
            </p>
            <div className="pt-2">
              <Link
                to="/donate"
                className="btn-vermillion px-8 py-3 text-xs sm:text-sm font-bold uppercase shadow-md"
              >
                JOIN THE MISSION
              </Link>
            </div>
          </div>

          {/* Right Semicircle Arch Diagram (Exact Reference Image 10) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* 4 Concentric Rainbow / Arch Slices */}
            <div className="relative w-72 sm:w-96 h-40 sm:h-52 overflow-hidden flex items-end justify-center">
              {/* Outer Arc 1: IMPACT A CHILD */}
              <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full border-[22px] sm:border-[30px] border-[#F67708] border-b-transparent border-l-transparent -rotate-45 flex items-center justify-center">
                {/* Arc 2: IMPACT A FAMILY */}
                <div className="w-56 sm:w-72 h-56 sm:h-72 rounded-full border-[20px] sm:border-[26px] border-[#036C6C] border-b-transparent border-l-transparent flex items-center justify-center">
                  {/* Arc 3: IMPACT A COMMUNITY */}
                  <div className="w-40 sm:w-52 h-40 sm:h-52 rounded-full border-[18px] sm:border-[24px] border-[#FFC43D] border-b-transparent border-l-transparent flex items-center justify-center">
                    {/* Inner Arc 4: IMPACT GENERATIONS */}
                    <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-[#323D3D] flex items-center justify-center text-white text-[9px] font-bold uppercase text-center p-2">
                      GENERATIONS
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Labels Grid matching the arch segments */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 w-full text-center">
              <div className="p-2 rounded-lg bg-[#FFF4EB] border border-[#F67708]/30">
                <span className="text-[10px] font-black uppercase text-[#F67708] block">
                  1. IMPACT A CHILD
                </span>
              </div>
              <div className="p-2 rounded-lg bg-teal-50 border border-[#036C6C]/30">
                <span className="text-[10px] font-black uppercase text-[#036C6C] block">
                  2. IMPACT A FAMILY
                </span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 border border-[#FFC43D]/50">
                <span className="text-[10px] font-black uppercase text-amber-800 block">
                  3. COMMUNITY
                </span>
              </div>
              <div className="p-2 rounded-lg bg-slate-100 border border-[#323D3D]/30">
                <span className="text-[10px] font-black uppercase text-[#323D3D] block">
                  4. GENERATIONS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ========================================================
          VIDEO MODAL PREVIEW
      ======================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full p-6 relative border border-[#E3D9CF] shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-[#323D3D] transition cursor-pointer"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F67708] block mb-1">
              DOCUMENTARY FILM
            </span>
            <h3 className="text-lg font-bold text-[#323D3D] mb-4">
              Investing in Eternity: From Poverty to Holistic Education
            </h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="RK Foundation Story"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          INDEPENDENT STUDY MODAL (IIHMR REPORT)
      ======================================================== */}
      {studyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative border border-[#E3D9CF] shadow-2xl space-y-4">
            <button
              onClick={() => setStudyModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#323D3D] transition cursor-pointer"
              aria-label="Close Report"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#036C6C] block">
              INDEPENDENT IMPACT ASSESSMENT
            </span>
            <h3 className="text-xl font-black text-[#323D3D]">
              Key Highlights: IIHMR Field Survey
            </h3>
            <div className="space-y-3 text-xs text-[#697777] leading-relaxed">
              <p>
                The independent study conducted across 1,200 beneficiary families in urban informal settlements affirmed a <strong>94% increase in girl child retention</strong> past standard 8.
              </p>
              <p>
                Over <strong>82% of adolescent girls</strong> who participated in community centers became primary decision-makers regarding their future education and nutrition.
              </p>
              <p>
                Maternal health awareness increased by 78%, and infant malnutrition decreased by 64% in clusters covered by our health camps.
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setStudyModalOpen(false)}
                className="w-full btn-vermillion py-2.5 text-xs font-bold uppercase shadow-sm cursor-pointer"
              >
                CLOSE REPORT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
