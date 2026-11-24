import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Search,
  Layers,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';

export const Home = () => {
  // Interactive States
  const [aboutTab, setAboutTab] = useState('mission');
  const [openFaq, setOpenFaq] = useState(0);

  // Verified Medical Emergency Cases (Featured Child Support Campaigns)
  const emergencyCases = [
    {
      id: 'gita-kumari',
      name: 'Gita Kumari',
      age: '1 Year',
      gender: 'Female',
      image: '/cases/gita-kumari.jpg',
      hospital: 'Safdarjung Hospital, New Delhi',
      brief: 'Undergoing treatment for congenital heart defect requiring corrective cardiac surgery and pediatric care.',
      tag: 'Critical Surgery',
    },
    {
      id: 'baby-of-deepa',
      name: 'Baby of Deepa',
      age: '12 Days',
      gender: 'Male',
      image: '/cases/baby-of-deepa.jpg',
      hospital: "Kalawati Saran Children's Hospital, New Delhi",
      brief: 'Receiving intensive phototherapy and specialized incubator care for newborn clinical complications.',
      tag: 'NICU Care',
    },
    {
      id: 'baby-of-shivani',
      name: 'Baby of Shivani',
      age: '14 Days',
      gender: 'Male',
      image: '/cases/baby-of-shivani.jpg',
      hospital: 'AIIMS NICU Department, New Delhi',
      brief: 'Receiving continuous neonatal respiratory monitoring and vital pediatric life-support.',
      tag: 'Urgent Care',
    },
  ];

  // Work Process Steps (Senior Designed 4-Stage Impact Pathway)
  const workProcessSteps = [
    {
      step: '01',
      title: 'Identify Children in Need',
      desc: 'We collaborate with local communities, informal schools, and government hospital wards to identify vulnerable children needing urgent care.',
      icon: Search,
      tag: 'Field Survey',
    },
    {
      step: '02',
      title: 'Plan Focused Programs',
      desc: 'Based on identified needs, our team designs focused interventions in primary bridge schooling, pediatric surgery, and essential nutrition.',
      icon: Layers,
      tag: 'Tailored Solution',
    },
    {
      step: '03',
      title: 'Deliver Care and Support',
      desc: 'Support is delivered directly through trained on-ground educators and hospital partners, ensuring children receive immediate aid safely.',
      icon: HeartHandshake,
      tag: 'Direct Disbursement',
    },
    {
      step: '04',
      title: 'Measure Impact & Updates',
      desc: 'We track outcomes and share transparent verified updates with donors and supporters. Measuring results have helped us improve our outreach.',
      icon: TrendingUp,
      tag: '100% Verified Logs',
    },
  ];

  // Featured Programs (Exact Carenest 01, 02, 03 Numbered Layout)
  const featuredPrograms = [
    {
      number: '01',
      title: 'Community Child Care & Nutrition',
      desc: 'Providing daily wholesome meals, fresh fruit, and safe daycare support for children of daily-wage laborers.',
      image: '/programs/children-development.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      link: '/programs',
    },
    {
      number: '02',
      title: 'Child Education & Bridge Schools',
      desc: 'Remedial evening tutoring, free learning kits, textbooks, and formal mainstream school enrollment assistance.',
      image: '/programs/education-literacy.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      link: '/programs',
    },
    {
      number: '03',
      title: 'Emergency Pediatric Healthcare',
      desc: 'Sponsoring critical pediatric heart surgeries, neonatal incubators, and emergency treatments in public hospitals.',
      image: '/programs/health-welfare.jpg',
      fallbackImage: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
      link: '/projects',
    },
  ];

  // Editorial Stories (3 Cards)
  const stories = [
    {
      id: 1,
      title: 'Illuminating Futures: From Slum Clusters to Classrooms',
      desc: 'How evening bridge learning classes and fresh fruit nutrition are transforming young school dropouts into scholars.',
      date: 'May 12',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      link: '/news',
    },
    {
      id: 2,
      title: 'Saving Baby Gita: A Journey of Corrective Heart Surgery',
      desc: 'Direct hospital disbursement and intensive pediatric ICU monitoring for a 1-year-old child at Safdarjung Hospital.',
      date: 'April 28',
      readTime: '5 min read',
      image: '/cases/gita-kumari.jpg',
      link: '/projects',
    },
    {
      id: 3,
      title: 'Distributing 500+ Dry Ration & Nutritional Kits in Loni Border',
      desc: 'Nutritional staple bags, edible oils, and essential winter blankets delivered directly to destitute daily-wage earners.',
      date: 'April 15',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?auto=format&fit=crop&w=800&q=80',
      link: '/activities',
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
      position: 'center center',
      fallback: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=85&w=2048&auto=format&fit=crop',
    },
    {
      id: 2,
      image: '/hero-indian-students.jpg',
      alt: 'Children Education and Remedial Schooling - RK Foundation',
      position: 'center 25%',
      fallback: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=85&w=2048&auto=format&fit=crop',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=85&w=2048&auto=format&fit=crop',
      alt: 'Pediatric Healthcare and Hope for Children - RK Foundation',
      position: 'center center',
      fallback: '/hero-carenest.jpg',
    },
    {
      id: 4,
      image: '/hero-three-children.jpg',
      alt: 'Joyful Childhood and Community Care - RK Foundation',
      position: 'center center',
      fallback: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=85&w=2048&auto=format&fit=crop',
    },
  ];

  return (
    <div className="w-full bg-white text-[#121316] overflow-x-hidden selection:bg-[#121316] selection:text-white">
      {/* ========================================================
          1. HERO SECTION: "HELPING CHILDREN GROW WITH CARE"
          (Full-Bleed Image Slider from Right to Left, No Black Band)
      ======================================================== */}
      <section className="relative w-full h-[calc(100vh-108px)] min-h-[580px] max-h-[780px] flex flex-col justify-end overflow-hidden hero-swiper-section">
        {/* Swiper Full-Height & Bullet Styling */}
        <style>{`
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

        {/* Ultra-subtle bottom shadow so full image remains 100% visible and vivid */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-10" />

        {/* Content Container: Fixed Stable Position (Exact Left Headline & Right Donate CTA) */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8 w-full pb-8 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-14">
            {/* Left: Main Heading with drop shadow so text pops cleanly over the bright image */}
            <div className="max-w-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] xl:text-6xl font-bold tracking-tight text-white leading-[1.12] drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]">
                Helping Children<br />Grow With Care
              </h1>
            </div>

            {/* Right: Donate Button with Yellow Arrow */}
            <div className="flex items-center lg:justify-end">
              <Link
                to="/donate"
                className="inline-flex items-center gap-3.5 px-6 py-2.5 rounded-full border border-white/60 bg-black/45 hover:bg-black/65 text-white transition text-xs sm:text-sm font-semibold group cursor-pointer backdrop-blur-md shadow-2xl"
              >
                <span>Donate Now</span>
                <div className="w-7 h-7 rounded-full bg-[#F2D869] text-black flex items-center justify-center transition group-hover:scale-105 shadow-sm">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Accent Golden Stripe (Exact Hex #F2D869 from Reference) */}
        <div className="h-2 sm:h-2.5 w-full bg-[#F2D869] relative z-20 shrink-0" />
      </section>

      {/* ========================================================
          2. SECTION: "HOW YOUR SUPPORT CREATES CHANGE" (Work Process)
          (10-Year Senior Designer Award-Winning Architecture)
      ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#121316] tracking-tight leading-[1.12]">
            How Your Support Creates <span className="text-[#14382C]">Real Change</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            From verified field identification to hospital account disbursement, every step is built for 100% transparency, speed, and real-life outcomes.
          </p>
        </div>

        {/* Pathway Cards Grid */}
        <div className="relative">
          {/* Subtle Horizontal Connector Line (Visible on Desktop) */}
          <div className="hidden lg:block absolute top-[50px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-slate-200 to-transparent z-0 pointer-events-none" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 relative z-10">
            {workProcessSteps.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#14382C]/40 shadow-xs hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group overflow-hidden"
                >
                  {/* Subtle Accent Glow Line on Hover */}
                  <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-transparent via-[#14382C] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Large Translucent Watermark Step Number */}
                  <span className="absolute top-3 right-4 text-5xl font-black font-mono text-slate-100 group-hover:text-[#14382C]/10 transition-colors pointer-events-none select-none">
                    {item.step}
                  </span>

                  <div className="space-y-4 relative z-10">
                    {/* Top Icon Badge & Phase Chip */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 text-[#14382C] group-hover:bg-[#14382C] group-hover:text-white group-hover:border-[#14382C] flex items-center justify-center transition-all duration-300 shadow-xs group-hover:scale-110">
                        <IconComponent className="w-5 h-5 transition-transform duration-300" />
                      </div>

                      <span className="text-[10px] font-extrabold font-mono tracking-wider text-[#14382C] bg-[#14382C]/10 border border-[#14382C]/20 px-2.5 py-0.5 rounded-full uppercase">
                        Phase {item.step}
                      </span>
                    </div>

                    {/* Step Title & Description */}
                    <div className="space-y-2 pt-2">
                      <h3 className="text-base sm:text-lg font-bold text-[#121316] group-hover:text-[#14382C] transition-colors tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Verification Tag */}
                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-400 group-hover:text-slate-700 transition-colors relative z-10">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{item.tag}</span>
                    </span>
                    <span className="text-slate-300 group-hover:text-[#14382C] font-mono text-xs transition-colors">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SECTION: "ABOUT OUR CHARITY ORGANIZATION"
          (High-Impact Large Image & Narrative)
      ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Tabs (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              / About Us /
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121316] tracking-tight leading-[1.15]">
              About RK Foundation
            </h2>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
              <button
                onClick={() => setAboutTab('mission')}
                className={`text-sm font-bold pb-2 transition cursor-pointer ${aboutTab === 'mission'
                  ? 'text-[#14382C] border-b-2 border-[#14382C]'
                  : 'text-slate-400 hover:text-[#121316]'
                  }`}
              >
                Our Mission
              </button>
              <button
                onClick={() => setAboutTab('vision')}
                className={`text-sm font-bold pb-2 transition cursor-pointer ${aboutTab === 'vision'
                  ? 'text-[#14382C] border-b-2 border-[#14382C]'
                  : 'text-slate-400 hover:text-[#121316]'
                  }`}
              >
                Our Vision
              </button>
              <button
                onClick={() => setAboutTab('values')}
                className={`text-sm font-bold pb-2 transition cursor-pointer ${aboutTab === 'values'
                  ? 'text-[#14382C] border-b-2 border-[#14382C]'
                  : 'text-slate-400 hover:text-[#121316]'
                  }`}
              >
                Our Values
              </button>
            </div>

            {/* Tab Narrative */}
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 min-h-[90px]">
              {aboutTab === 'mission' && (
                <p>
                  We are a non-profit public charitable trust dedicated to supporting children in need through free bridge education, emergency pediatric healthcare, and community welfare. Our work focuses on creating safe environments where children can learn, heal, grow, and build a stronger future with confidence and dignity.
                </p>
              )}
              {aboutTab === 'vision' && (
                <p>
                  A compassionate society where no child is deprived of schooling due to poverty, and no newborn is denied life-saving emergency medical treatment due to financial distress.
                </p>
              )}
              {aboutTab === 'values' && (
                <p>
                  100% verified transparency, zero private enrichment, unconditional empathy, and direct ground-level doorstep delivery to underprivileged communities.
                </p>
              )}
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#14382C] text-white hover:bg-[#1B4D3E] font-bold text-xs uppercase tracking-wider transition shadow-md group"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Large, Prominent Field Photo (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-slate-200/90 bg-slate-100 w-full h-[420px] sm:h-[490px] lg:h-[540px] group">
              <img
                src="/programs/children-development.jpg"
                alt="Children Learning & Community Care - RK Foundation"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1400&q=80';
                }}
              />

              {/* Clean Floating Trust Badge */}
              <div className="absolute bottom-5 left-5 right-5 sm:right-auto bg-[#121316]/85 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl flex items-center gap-3 border border-white/10 shadow-lg pointer-events-none">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <div className="text-left">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-white">
                    Direct Field Relief
                  </span>
                  <span className="block text-[10px] text-slate-300">
                    Delhi-NCR Slum Clusters & Rural Centers
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECTION: "PROGRAMS THAT SUPPORT AND PROTECT CHILDREN"
          (Numbered 01, 02, 03 Program Cards)
      ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              / Programs /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121316] tracking-tight">
              Programs That Support And Protect Children
            </h2>
          </div>

          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#121316] transition"
          >
            <span>View All Programs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPrograms.map((prog) => (
            <div
              key={prog.number}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = prog.fallbackImage;
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-black text-[#121316] shadow-sm">
                    {prog.number}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-[#121316] group-hover:text-[#121316] transition leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={prog.link}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#121316] transition"
                >
                  <span>Explore Program</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================
          5. SECTION: LIVE BENEFICIARY EMERGENCY CASES
          (Featured Child Support Campaigns)
      ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#121316]">
              / Urgent Appeals /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121316] tracking-tight">
              Featured Child Support Campaigns
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Every child appeal is independently doctor-verified with hospital treasury accounts. 100% of case funds go directly to patient care.
            </p>
          </div>

          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#121316] transition"
          >
            <span>View All Cases</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {emergencyCases.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#121316]" />
                    <span>Hospital Verified</span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/95 text-[#121316] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                    {c.tag}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                    <span>{c.age}</span>
                    <span>{c.gender}</span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-[#121316] group-hover:text-[#121316] transition-colors">
                      {c.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-1">
                      <Building2 className="w-3.5 h-3.5 text-[#121316] shrink-0" />
                      <span className="truncate">{c.hospital}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3">
                    {c.brief}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to={`/donate?campaignId=${encodeURIComponent(c.id)}&amount=2500`}
                  className="w-full py-3 px-4 rounded-full bg-[#14382C] hover:bg-[#1B4D3E] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Support {c.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* ========================================================
          6. SECTION: "FREQUENTLY ASKED QUESTIONS" (Accordion)
      ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto border-b border-slate-100">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            / FAQs /
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121316] tracking-tight">
            Frequently Asked Questions About Our Charity
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200/80 rounded-2xl overflow-hidden bg-white shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#121316] hover:text-[#121316] transition cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#121316] shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          7. SECTION: "LATEST STORIES AND UPDATES FOR CHILDREN"
      ======================================================== */}
      <section className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              / Our Stories /
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121316] tracking-tight">
              Latest Stories And Updates For Children
            </h2>
          </div>

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#121316] hover:text-[#121316] transition"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((st) => (
            <Link
              key={st.id}
              to={st.link}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={st.image}
                    alt={st.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6 space-y-2.5">
                  <span className="text-xs font-semibold text-slate-400">
                    {st.date} • {st.readTime}
                  </span>
                  <h3 className="text-lg font-bold text-[#121316] group-hover:text-[#121316] transition-colors leading-snug">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {st.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#121316] group-hover:text-[#121316] transition">
                  <span>Read Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
