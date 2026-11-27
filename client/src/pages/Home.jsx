import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Heart,
  Building2,
  BookOpen,
  Users,
  Lightbulb,
  Briefcase,
  Award,
  Calendar,
  Clock,
  Layers,
  Globe,
  MapPin,
  Landmark,
  ShieldCheck,
} from 'lucide-react';

export const Home = () => {
  // Interactive States
  const [openFaq, setOpenFaq] = useState(0);
  const [cmsPrograms, setCmsPrograms] = useState([]);

  useEffect(() => {
    api.get('/programs')
      .then((res) => {
        if (Array.isArray(res?.programs)) setCmsPrograms(res.programs);
      })
      .catch(() => {});
  }, []);

  const getCmsProgramImage = (slug, fallbackImg) => {
    const match = cmsPrograms.find(
      (p) => p.slug === slug && p.coverImage && !p.coverImage.includes('photo-1542838132-92c53300491e')
    );
    return match ? match.coverImage : fallbackImg;
  };

  // "WHAT WE DO" - 5-Stage Educational & Child Empowerment Pathway (Modern Premium Architecture)
  const whatWeDoSteps = [
    {
      step: '01',
      title: 'Access to Quality Education',
      subtitle: 'Foundational learning kits & school admissions',
      icon: BookOpen,
      desc: 'Enabling foundational learning, school kits, and enrollment for every underprivileged child.',
    },
    {
      step: '02',
      title: 'Bridge Course for Drop-out Children',
      subtitle: 'Accelerated re-entry into formal classrooms',
      icon: Users,
      desc: 'Specialized accelerated learning to help out-of-school and drop-out children re-enter formal schooling.',
    },
    {
      step: '03',
      title: 'Remedial Education Support',
      subtitle: 'After-school tutoring & academic coaching',
      icon: Lightbulb,
      desc: 'Customized after-school coaching and mentorship to bridge academic gaps and strengthen conceptual clarity.',
    },
    {
      step: '04',
      title: 'Vocational Training',
      subtitle: 'Practical job skills & digital literacy',
      icon: Briefcase,
      desc: 'Practical skill-building, digital literacy, and career readiness for older children and youth.',
    },
    {
      step: '05',
      title: 'Scholarship Support',
      subtitle: 'Higher education & college grant assistance',
      icon: Award,
      desc: 'Financial grants and institutional fee assistance so meritorious students never drop out.',
    },
  ];

  // Featured Programs (Square, Simple & Modern Architecture, synced with CMS cover images)
  const featuredPrograms = [
    {
      number: '01',
      title: 'Community Child Care & Nutrition',
      category: 'Nutrition & Care',
      desc: 'Providing daily wholesome meals, fresh fruit, and safe daycare support for children of daily-wage laborers.',
      image: getCmsProgramImage(
        'children-development',
        'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80'
      ),
      fallbackImage: '/programs/children-development.jpg',
      link: '/programs',
    },
    {
      number: '02',
      title: 'Child Education & Bridge Schools',
      category: 'Education & Literacy',
      desc: 'Remedial evening tutoring, free learning kits, textbooks, and formal mainstream school enrollment assistance.',
      image: getCmsProgramImage(
        'education-and-literacy',
        'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
      ),
      fallbackImage: '/programs/education-literacy.jpg',
      link: '/programs',
    },
    {
      number: '03',
      title: 'Emergency Pediatric Healthcare',
      category: 'Pediatric Healthcare',
      desc: 'Sponsoring critical pediatric heart surgeries, neonatal incubators, and emergency treatments in public hospitals.',
      image: getCmsProgramImage(
        'health-and-family-welfare',
        'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80'
      ),
      fallbackImage: '/programs/health-welfare.jpg',
      link: '/projects',
    },
  ];

  // "REACH & PRESENCE" - Pan-India Grassroots Footprint Metrics
  const reachMetrics = [
    {
      value: '261',
      suffix: '+',
      label: 'Projects',
      desc: 'Community learning centers, bridge schools, and emergency pediatric healthcare initiatives.',
      icon: Layers,
    },
    {
      value: '27',
      suffix: '',
      label: 'States & UTs',
      desc: 'Pan-India operational presence with verified field volunteers and community workers.',
      icon: Globe,
    },
    {
      value: '12',
      suffix: '',
      label: 'Aspirational Districts',
      desc: 'Targeted interventions prioritizing remote, rural, and underserved tribal regions.',
      icon: MapPin,
    },
    {
      value: '8',
      suffix: '',
      label: 'Govt Connect States',
      desc: 'Institutional alliances and coordination with public departments & local administrations.',
      icon: Landmark,
    },
  ];

  // Editorial Stories & Latest Field Chronicles (Live Cases & Ground Updates)
  const stories = [
    {
      id: 1,
      title: 'Baby of Deepa: Critical Phototherapy & Incubator Care',
      category: 'NICU Care',
      desc: 'Receiving intensive neonatal phototherapy and specialized incubator care for newborn clinical complications at Kalawati Saran Hospital.',
      date: 'May 18',
      readTime: '3 min read',
      image: '/cases/baby-of-deepa.jpg',
      fallback: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=85&w=800&auto=format&fit=crop',
      link: '/projects',
    },
    {
      id: 2,
      title: 'Saving Baby Gita: A Journey of Corrective Heart Surgery',
      category: 'Critical Surgery',
      desc: 'Direct hospital disbursement and intensive pediatric ICU monitoring for a 1-year-old child undergoing cardiac care at Safdarjung Hospital.',
      date: 'April 28',
      readTime: '5 min read',
      image: '/cases/gita-kumari.jpg',
      fallback: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=85&w=800&auto=format&fit=crop',
      link: '/projects',
    },
    {
      id: 3,
      title: 'Baby of Shivani: Urgent Neonatal Life-Support at AIIMS',
      category: 'Urgent Care',
      desc: 'Continuous neonatal respiratory monitoring and vital pediatric incubator life-support funded directly to AIIMS hospital accounts.',
      date: 'April 15',
      readTime: '4 min read',
      image: '/cases/baby-of-shivani.jpg',
      fallback: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=85&w=800&auto=format&fit=crop',
      link: '/projects',
    },
  ];

  // FAQ Items (Exact Carenest Layout)
  const faqs = [
    {
      q: 'How does RK Foundation ensure 100% transparency in donations?',
      a: 'We operate on a direct disbursement model where medical appeal donations are transferred directly to authorized government hospital treasury accounts, and education materials are handed over directly to beneficiaries with photo and receipt logs.',
    },
    {
      q: 'Will I receive an official 80G tax exemption certificate?',
      a: 'Yes. RK Foundation is registered under Section 80G and 12A of the Income Tax Act. Every donor receives an instant downloadable 80G tax receipt valid for a 50% tax deduction under Indian IT laws.',
    },
    {
      q: 'How are emergency pediatric hospital cases verified?',
      a: 'Each medical case is independently validated through hospital admission estimates, attending physician prescriptions, diagnostic scans, and guardian written consent before being published.',
    },
    {
      q: 'Can I volunteer in person at your Delhi-NCR community learning centers?',
      a: 'Absolutely! We welcome passionate volunteers for teaching evening remedial classes, assisting during doctor-led health camps, and participating in ration distribution drives.',
    },
  ];

  // Unique High-Resolution Hero Slides
  const heroSlides = [
    {
      id: 1,
      image: '/hero-carenest.jpg',
      alt: 'Helping Children Grow With Care - RK Foundation',
      position: 'center 55%',
      fallback: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=85&w=2048&auto=format&fit=crop',
    },
    {
      id: 2,
      image: '/hero-indian-students.jpg',
      alt: 'Children Education and Remedial Schooling - RK Foundation',
      position: 'center 40%',
      fallback: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=85&w=2048&auto=format&fit=crop',
    },
    {
      id: 3,
      image: '/hero-children-hope.jpg',
      alt: 'Smiling Children Supported by RK Foundation',
      position: 'center top',
      fallback: '/hero-carenest.jpg',
    },
    {
      id: 4,
      image: '/hero-three-children.jpg',
      alt: 'Joyful Childhood and Community Care - RK Foundation',
      position: 'center 55%',
      fallback: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=85&w=2048&auto=format&fit=crop',
    },
    {
      id: 5,
      image: '/hero-community-health.jpg',
      alt: 'Rural Community Medical Camp & Outreach - RK Foundation',
      position: 'center 55%',
      fallback: '/hero-carenest.jpg',
    },
  ];

  return (
    <div className="w-full bg-white text-[#121316] overflow-x-hidden selection:bg-[#121316] selection:text-white">
      {/* ========================================================
          1. HERO SECTION: "HELPING CHILDREN GROW WITH CARE"
          (Full-Bleed Image Slider from Right to Left, No Black Band)
      ======================================================== */}
      <section className="relative w-full flex flex-col justify-end overflow-hidden hero-swiper-section">
        {/* Swiper Full-Height & Bullet Styling */}
        <style>{`
          .hero-swiper-section {
            min-height: min(calc(100vh - 124px), 820px);
            min-height: min(calc(100dvh - 124px), 820px);
          }
          @media (min-width: 1024px) {
            .hero-swiper-section {
              min-height: min(calc(100vh - 100px), 820px);
              min-height: min(calc(100dvh - 100px), 820px);
            }
          }
          .hero-swiper-section .swiper {
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            height: 100% !important;
            z-index: 0 !important;
          }
          .hero-swiper-section .swiper-wrapper {
            width: 100% !important;
            height: 100% !important;
          }
          .hero-swiper-section .swiper-slide {
            width: 100% !important;
            height: 100% !important;
          }
          .hero-swiper-section .swiper-slide img {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          .hero-swiper-section .swiper-pagination {
            bottom: 12px !important;
            z-index: 25 !important;
          }
          .hero-swiper-section .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.7) !important;
            width: 8px !important;
            height: 8px !important;
            opacity: 1 !important;
            transition: all 0.3s ease !important;
          }
          .hero-swiper-section .swiper-pagination-bullet-active {
            background: #F2D869 !important;
            width: 24px !important;
            border-radius: 9999px !important;
          }
        `}</style>

        {/* Swiper JS Carousel: Sliding Right to Left across 100% of hero */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={0}
          loop={true}
          speed={1000}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id} style={{ width: '100%', height: '100%' }} className="overflow-hidden">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover brightness-[1.04] contrast-[1.03]"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: slide.position || 'center center' }}
                onError={(e) => {
                  e.currentTarget.src = slide.fallback;
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Cinematic Vignette Overlay so images remain visible while text is 100% legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 pointer-events-none z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

        {/* Hero Editorial Inspirational Quote Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-8 w-full pt-10 sm:pt-14 pb-14 sm:pb-16 text-center space-y-4 sm:space-y-5">
          {/* Main Serif Quote Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-normal tracking-normal text-white leading-[1.18] max-w-3xl mx-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
            Because every child deserves to <br className="hidden sm:inline" />
            learn, heal, and <span className="italic text-[#C5E4CC]">dream fearlessly</span>.
          </h1>

          {/* Professional Narrative Subtitle */}
          <p className="text-sm sm:text-base md:text-[17px] text-slate-200/95 max-w-2xl mx-auto leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            From grassroots bridge classrooms to emergency pediatric hospital wards, RK Foundation turns collective generosity into immediate, verifiable care for children in urgent need.
          </p>

          {/* Dual Action Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2">
            {/* Primary Pill: Deep Emerald Green with Heart Icon */}
            <Link
              to="/donate"
              className="inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-[13px] uppercase tracking-wider text-white bg-[#14382C] hover:bg-[#1B4D3E] border border-emerald-500/40 shadow-xl shadow-black/40 hover:scale-105 transition-all group cursor-pointer"
            >
              <Heart className="w-4 h-4 text-emerald-300 stroke-[2] group-hover:scale-110 transition-transform" />
              <span>Donate to a Child</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary Pill: Frosted Glass */}
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-[13px] uppercase tracking-wider text-white bg-black/40 hover:bg-black/60 border border-white/30 backdrop-blur-md shadow-xl shadow-black/40 hover:scale-105 transition-all cursor-pointer"
            >
              <span>Explore Our Programs</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SECTION: "WHAT WE DO" (Flagship Empowerment & 5-Step Educational Pathway)
          (Open Page Architecture with Legacy Colors: #14382C Emerald & #F2D869 Warm Gold)
      ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100 relative">
        <div className="space-y-8 sm:space-y-10">
          {/* Section Header: Title & Narrative */}
          <div className="space-y-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.15]">
                What We <span className="italic text-[#14382C]">Do</span>
              </h2>
            </div>

            {/* Concise Professional Quote */}
            <p className="text-base sm:text-lg md:text-[21px] font-serif text-slate-700 leading-[1.65] max-w-3xl font-normal">
              <span className="text-[#14382C] font-semibold">&ldquo;Transforming vulnerability into opportunity</span>
              —equipping every underprivileged child with the education, nutrition, and guidance to build a life of dignity.&rdquo;
            </p>
          </div>

          {/* Stepper Flow: 5 Interconnected Circular Nodes (Enlarged Size & High-Definition Typography) */}
          <div className="overflow-x-auto pb-6 pt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="min-w-[860px] max-w-5xl mx-auto flex items-center justify-between">
              {whatWeDoSteps.map((item, index) => {
                const IconComponent = item.icon;
                const isEven = index % 2 === 1; // index 1 (Step 02) & index 3 (Step 04) are 'top'

                return (
                  <React.Fragment key={item.step}>
                    {/* Stepper Node Column */}
                    <div className="flex-1 flex flex-col items-center group cursor-pointer">
                      {/* Top Label Zone */}
                      <div className="h-24 sm:h-28 flex flex-col items-center justify-end pb-3 text-center px-1">
                        {isEven ? (
                          <>
                            <span className="font-extrabold text-[#121316] text-[15px] sm:text-base lg:text-[17px] leading-snug tracking-tight group-hover:text-[#14382C] transition-colors max-w-[180px] sm:max-w-[210px]">
                              {item.title}
                            </span>
                            <span className="text-xs sm:text-[13px] text-slate-500 font-medium leading-snug mt-1 max-w-[170px] sm:max-w-[200px] group-hover:text-slate-700 transition-colors">
                              {item.subtitle}
                            </span>
                          </>
                        ) : (
                          <div className="h-6" />
                        )}
                      </div>

                      {/* Circle Node with Concentric Rings (Enlarged Scale: 128px-144px) */}
                      <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
                        {/* Step Number Badge */}
                        <div className="absolute -top-1 right-2 sm:right-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#14382C] text-[#F2D869] font-mono font-black text-xs sm:text-sm flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-115 group-hover:bg-[#F2D869] group-hover:text-[#14382C] transition-all duration-300 z-20">
                          {item.step}
                        </div>

                        {/* Concentric Decorative SVG Orbit */}
                        <svg className="absolute inset-0 w-full h-full -rotate-45 pointer-events-none" viewBox="0 0 120 120">
                          {/* Dashed Outer Ring */}
                          <circle
                            cx="60"
                            cy="60"
                            r="54"
                            fill="none"
                            stroke="#14382C"
                            strokeWidth="2.2"
                            strokeDasharray="5 5"
                            className="opacity-35 group-hover:opacity-85 transition-opacity duration-300"
                          />
                          {/* Decorative Outer Solid Arc on Right */}
                          <path
                            d="M 60,6 A 54,54 0 0,1 114,60"
                            fill="none"
                            stroke="#14382C"
                            strokeWidth="4"
                            strokeLinecap="round"
                            className="opacity-70 group-hover:stroke-[#F2D869] group-hover:opacity-100 transition-all duration-300"
                          />
                        </svg>

                        {/* Inner Filled Circle with Icon (Large 88px-104px) */}
                        <div className="w-[88px] h-[88px] sm:w-[104px] sm:h-[104px] rounded-full bg-gradient-to-br from-white via-[#E8F4EE] to-[#DCEDE4] border-2 border-[#14382C]/30 group-hover:border-[#14382C] group-hover:bg-[#14382C] flex items-center justify-center shadow-lg shadow-emerald-950/5 group-hover:shadow-xl group-hover:shadow-[#14382C]/20 transition-all duration-300 group-hover:scale-105">
                          <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 text-[#14382C] group-hover:text-[#F2D869] transition-colors duration-300 stroke-[1.9]" />
                        </div>
                      </div>

                      {/* Bottom Label Zone */}
                      <div className="h-24 sm:h-28 flex flex-col items-center justify-start pt-3 text-center px-1">
                        {!isEven ? (
                          <>
                            <span className="font-extrabold text-[#121316] text-[15px] sm:text-base lg:text-[17px] leading-snug tracking-tight group-hover:text-[#14382C] transition-colors max-w-[180px] sm:max-w-[210px]">
                              {item.title}
                            </span>
                            <span className="text-xs sm:text-[13px] text-slate-500 font-medium leading-snug mt-1 max-w-[170px] sm:max-w-[200px] group-hover:text-slate-700 transition-colors">
                              {item.subtitle}
                            </span>
                          </>
                        ) : (
                          <div className="h-6" />
                        )}
                      </div>
                    </div>

                    {/* Forward Arrow Pill Between Circles */}
                    <div className="flex items-center justify-center px-1 sm:px-2 flex-shrink-0 z-10">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-[#14382C]/20 shadow-xs flex items-center justify-center text-[#14382C] group-hover:bg-[#14382C] group-hover:text-[#F2D869] group-hover:scale-110 transition-all duration-300">
                        <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
            {/* Mobile swipe hint */}
            <p className="text-[11px] text-slate-400 text-center md:hidden pt-3 font-medium">
              ← Swipe horizontally to view all 5 stages →
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SECTION: "PROGRAMS THAT SUPPORT AND PROTECT CHILDREN"
          (Square, Simple Cards with Modern Font Scale)
      ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.15]">
              Programs That Support And <span className="italic text-[#14382C]">Protect Children</span>
            </h2>
            <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-[1.65] mt-2">
              Direct, verified grassroots interventions across healthcare, schooling, and nutrition.
            </p>
          </div>

          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#14382C] hover:text-emerald-700 transition shrink-0 group"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {featuredPrograms.map((prog) => (
            <Link
              key={prog.number}
              to={prog.link}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/90 hover:border-[#14382C] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Square-proportioned framed image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = prog.fallbackImage;
                    }}
                  />
                  {/* Square Number & Category Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-md bg-[#14382C] text-[#F2D869] font-mono font-bold text-xs flex items-center justify-center shadow-xs">
                      {prog.number}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#14382C] font-semibold text-[11px] shadow-xs border border-slate-200/60 uppercase tracking-wide">
                      {prog.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#121316] group-hover:text-[#14382C] transition-colors leading-snug tracking-tight">
                    {prog.title}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-slate-600 leading-[1.7] font-normal">
                    {prog.desc}
                  </p>
                </div>
              </div>

              {/* Simple Bottom Action */}
              <div className="p-5 sm:p-6 pt-0">
                <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#14382C] group-hover:text-emerald-700 transition">
                  <span>Explore Program</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          4. SECTION: "REACH & PRESENCE" (Pan-India Geographic Footprint)
      ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="bg-[#F6FAF7] border border-slate-200/80 rounded-2xl p-6 sm:p-10 lg:p-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-slate-200/80">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#14382C]/15 text-[#14382C] text-xs sm:text-[13px] font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14382C]" />
                Pan-India Footprint
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.15]">
                Reach &amp; <span className="italic text-[#14382C]">Presence</span>
              </h2>
              <p className="text-base sm:text-[17px] text-slate-600 leading-[1.65] font-normal">
                Delivering transparent, verified child healthcare, bridge education, and family nutrition across high-priority districts and state networks.
              </p>
            </div>

            <div className="shrink-0 text-xs sm:text-[13px] text-slate-500 font-medium font-mono">
              Verified Field Operations • FY 2024–25
            </div>
          </div>

          {/* 4 Simple Light Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {reachMetrics.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200/90 hover:border-[#14382C]/40 rounded-xl p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    {/* Top icon and index */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-[#F2F8F5] border border-[#14382C]/15 flex items-center justify-center text-[#14382C]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
                        0{idx + 1}
                      </span>
                    </div>

                    {/* Number */}
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#121316] tracking-tight font-sans">
                        {item.value}
                      </span>
                      {item.suffix && (
                        <span className="text-xl sm:text-2xl font-bold text-[#14382C]">
                          {item.suffix}
                        </span>
                      )}
                    </div>

                    {/* Label */}
                    <h4 className="text-lg sm:text-[18px] font-bold text-[#121316] tracking-tight mt-1 group-hover:text-[#14382C] transition-colors">
                      {item.label}
                    </h4>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-[14.5px] text-slate-600 leading-[1.65] font-normal mt-3 pt-3 border-t border-slate-100">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SECTION: "LATEST STORIES AND UPDATES FOR CHILDREN"
          (Clean, Square Cards with Modern Font Scale)
      ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.15]">
              Latest Stories And Updates For <span className="italic text-[#14382C]">Children</span>
            </h2>
            <p className="text-base sm:text-[17px] text-slate-600 font-normal leading-[1.65] mt-2">
              Field chronicles, medical milestones, and transparent relief reports from the ground.
            </p>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#14382C] hover:text-emerald-700 transition shrink-0 group"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {stories.map((st) => (
            <Link
              key={st.id}
              to={st.link}
              className="bg-white rounded-xl overflow-hidden border border-slate-200/90 hover:border-[#14382C] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Square-proportioned framed image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = st.fallback;
                    }}
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-[#14382C] font-semibold text-[11px] shadow-xs border border-slate-200/60 uppercase tracking-wide">
                      {st.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {st.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {st.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#121316] group-hover:text-[#14382C] transition-colors leading-snug tracking-tight">
                    {st.title}
                  </h3>

                  <p className="text-sm sm:text-[15px] text-slate-600 leading-[1.7] font-normal line-clamp-2">
                    {st.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="p-5 sm:p-6 pt-0">
                <span className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#14382C] group-hover:text-emerald-700 transition">
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ========================================================
          6. SECTION: "FREQUENTLY ASKED QUESTIONS" (Above Footer)
      ======================================================== */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5 cols): NGO Heading & Field Photo */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28 self-start">
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F2F8F5] border border-[#14382C]/15 text-[#14382C] text-xs sm:text-[13px] font-semibold tracking-wider uppercase">
                <ShieldCheck className="w-4 h-4 text-[#14382C]" />
                <span>Donor Transparency &amp; Support</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.15]">
                Frequently Asked <span className="italic text-[#14382C]">Questions</span>
              </h2>
              <p className="text-base sm:text-[17px] text-slate-600 leading-[1.65] font-normal max-w-md">
                Clear answers about our 80G tax exemptions, verified pediatric hospital disbursements, and grassroots volunteering.
              </p>
            </div>

            {/* NGO Field Image Card (Square) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm max-w-[440px] w-full">
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                <img
                  src="/donor-support-card.jpg"
                  alt="RK Foundation field coordinator supporting children at a community learning center"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Numbered NGO Accordion Cards */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                    ? 'bg-[#FAFCFB] border-[#14382C]/45 ring-1 ring-[#14382C]/15 shadow-md'
                    : 'bg-white border-slate-200/90 hover:border-[#14382C]/35 shadow-sm'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 min-w-0">
                      <span
                        className={`w-9 h-9 rounded-xl font-mono text-xs sm:text-[13px] font-bold flex items-center justify-center shrink-0 transition-colors ${isOpen
                          ? 'bg-[#14382C] text-[#F2D869]'
                          : 'bg-[#F2F8F5] text-[#14382C] border border-[#14382C]/15'
                          }`}
                      >
                        0{idx + 1}
                      </span>
                      <span
                        className={`text-base sm:text-lg lg:text-[19px] font-semibold leading-[1.35] tracking-[-0.01em] transition-colors ${isOpen ? 'text-[#14382C]' : 'text-[#121316] group-hover:text-[#14382C]'
                          }`}
                      >
                        {faq.q}
                      </span>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${isOpen
                        ? 'bg-[#14382C] text-white rotate-180'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-[#14382C]/10 group-hover:text-[#14382C]'
                        }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-0">
                      <div className="pl-[50px] sm:pl-[52px] pt-3.5 border-t border-slate-200/70 text-[15px] sm:text-base text-slate-600 leading-[1.75] font-normal">
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
