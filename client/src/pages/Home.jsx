import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import api from '../services/api';
import {
  Play,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Heart,
  Users,
  Smile,
  Activity,
  Building2,
  X,
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
  const [activeDonationPreset, setActiveDonationPreset] = useState(5000);

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

  // Verified Medical Emergency Cases
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

  // Circular Categories for "What we do" (Exact Reference Image 2)
  const whatWeDoCategories = [
    {
      id: 'bridge-schooling',
      title: 'Bridge Schooling',
      isImage: true,
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80',
      scriptText: 'Child Education',
      link: '/programs',
    },
    {
      id: 'healthcare-relief',
      title: 'Healthcare Relief',
      isImage: false,
      link: '/programs',
    },
    {
      id: 'nutrition-ration',
      title: 'Nutrition & Ration',
      isImage: false,
      link: '/programs',
    },
    {
      id: 'women-empowerment',
      title: 'Women Empowerment',
      isImage: false,
      link: '/programs',
    },
    {
      id: 'emergency-medical',
      title: 'Medical Surgeries',
      isImage: false,
      link: '/projects',
    },
  ];

  // Editorial Stories (Exact Reference Image 3)
  const stories = [
    {
      id: 1,
      author: 'R. K. Sharma',
      role: 'Managing Trustee',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      title: 'Illuminating Futures: From Slum Clusters to Classrooms',
      excerpt:
        'How daily evening bridge classes and fresh fruit nutrition are transforming young dropouts in East Delhi into motivated learners.',
      date: 'May 12',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
      link: '/news',
    },
    {
      id: 2,
      author: 'Medical Relief Team',
      role: 'Health Operations',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      title: 'Saving Baby Gita: A Journey of Corrective Heart Surgery',
      excerpt:
        'Direct hospital disbursement and intensive pediatric ICU monitoring for a 1-year-old child fighting Ventricular Septal Defect.',
      date: 'April 28',
      readTime: '5 min read',
      image: '/cases/gita-kumari.jpg',
      link: '/projects',
    },
    {
      id: 3,
      author: 'Ground Volunteer Force',
      role: 'Disaster Relief',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
      title: 'Nourishing 500+ Destitute Families in Loni Border',
      excerpt:
        'Direct distribution of essential nutritional dry ration kits, mustard oil, and winter blankets at doorstep points.',
      date: 'April 15',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80',
      link: '/activities',
    },
  ];

  // How Can You Help Us Cards (Exact Reference Image 4)
  const helpCards = [
    {
      id: 'join-funding',
      icon: Smile,
      title: 'Join the funding',
      description:
        'Be a part of our funding efforts and help us bring about lasting impact in underserved communities. Your contribution plays a crucial role in empowering children and fostering sustainable change.',
      link: '/donate',
    },
    {
      id: 'donate-medical',
      icon: Sparkles,
      title: 'Donate for medical care',
      description:
        'Make a donation towards our live medical cases and emergency pediatric treatments. Your support will directly contribute to hospital accounts, surgeries, and life-saving care.',
      link: '/projects',
    },
    {
      id: 'volunteer-community',
      icon: Users,
      title: 'Volunteer for community',
      description:
        'Join us as a volunteer and make a difference in the lives of vulnerable families. By dedicating your time and skills, you can provide support, compassion, and empowerment to those in need.',
      link: '/volunteer',
    },
  ];

  return (
    <div className="w-full bg-white text-[#121316] overflow-x-hidden selection:bg-[#8bb5ff] selection:text-[#121316]">
      {/* ========================================================
          1. HERO SECTION: EXACT REFERENCE IMAGE 1
          (Natural Children Photography + Large Title + Script Overlay)
      ======================================================== */}
      <section className="relative w-full min-h-[580px] sm:min-h-[680px] lg:min-h-[760px] flex items-center justify-center overflow-hidden bg-[#18191E]">
        {/* Full-bleed Background Photography */}
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920"
          alt="Children smiling together - RK Foundation Grassroots Initiative"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.05]"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60 pointer-events-none" />

        {/* Center Typography & Script Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white space-y-4 pt-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-xs font-semibold uppercase tracking-widest border border-white/15 mb-2">
            <span>RK Foundation Grassroots Mission</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl mx-auto">
            Education, Healthcare
            <br className="hidden sm:inline" /> and Human rights initiative
          </h1>

          {/* Signature Handwritten Flourish (Matching Screenshot 1) */}
          <div className="pt-1">
            <span className="font-handwriting text-4xl sm:text-6xl lg:text-7xl text-[#8bb5ff] font-bold block -rotate-3 drop-shadow-lg tracking-wide">
              in charge of future
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto font-normal leading-relaxed pt-3">
            Empowering less privileged children, striving mothers, and vulnerable families through holistic bridge schooling, direct hospital aid, and daily nutrition across Delhi-NCR.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/donate"
              className="px-8 py-3.5 rounded-full bg-white text-[#121316] hover:bg-slate-100 font-bold text-xs sm:text-sm uppercase tracking-wider transition shadow-lg hover:scale-105"
            >
              Donate Now
            </Link>
            <Link
              to="/programs"
              className="px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/30 backdrop-blur-md transition"
            >
              Explore Programs
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SECTION: "WHAT WE DO" (Exact Reference Image 2)
          (Large Title + Horizontal Circular Discs + Mission Paragraph)
      ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          {/* Big Bold Section Title */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#121316] tracking-tight">
            What we do
          </h2>

          {/* Horizontal Circular Cards Row (Matching Screenshot 2) */}
          <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none">
            {whatWeDoCategories.map((cat, idx) => (
              <Link
                key={cat.id}
                to={cat.link}
                className="group shrink-0 w-36 h-36 sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-full relative overflow-hidden flex items-center justify-center text-center p-4 transition-all duration-300 hover:scale-105 shadow-xs"
              >
                {cat.isImage ? (
                  <>
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] group-hover:scale-110 transition duration-500"
                    />
                    <div className="relative z-10">
                      <span className="font-handwriting text-2xl sm:text-4xl text-white font-bold block -rotate-6 drop-shadow-md">
                        {cat.scriptText}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full rounded-full border border-slate-300 group-hover:border-[#121316] group-hover:bg-[#FAF9F6] flex items-center justify-center p-4 transition-all">
                    <span className="text-sm sm:text-base font-semibold text-[#121316] group-hover:text-[#F67708] transition-colors leading-tight">
                      {cat.title}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Bottom Mission Paragraph & Link (Matching Screenshot 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-6 border-t border-slate-100">
            <div className="lg:col-span-8">
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-3xl">
                RK Foundation's missions tend towards closing the opportunity gap between underserved slum communities and access to holistic education, emergency medical care, and daily nutrition that promotes self-reliance and dignity, essential for the creation of compassionate and inclusive societies.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#121316] hover:text-[#F67708] transition group"
              >
                <div className="w-7 h-7 rounded-full border border-slate-300 group-hover:border-[#F67708] flex items-center justify-center transition">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
                <span>Learn more about how we work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SECTION: "OUR STORIES" (Exact Reference Image 3)
          (Left Editorial Title + Right Vertical Story Stack with Thumbnails)
      ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 block">
              OUR STORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121316] leading-snug tracking-tight">
              Through my collections of stories and photos here, I hope to preserve the stories and artistic creations of the phenomenal individuals
            </h2>
            <div className="pt-2">
              <Link
                to="/news"
                className="inline-block px-6 py-2.5 rounded-full border border-slate-300 hover:border-[#121316] text-xs font-bold text-[#121316] transition"
              >
                Show all stories
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Story Cards Stack */}
          <div className="lg:col-span-7 space-y-8">
            {stories.map((story) => (
              <Link
                key={story.id}
                to={story.link}
                className="group flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-slate-100 transition"
              >
                <div className="space-y-2.5 flex-1 pr-2">
                  {/* Author Row */}
                  <div className="flex items-center gap-2.5">
                    <img
                      src={story.avatar}
                      alt={story.author}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {story.author}
                    </span>
                  </div>

                  {/* Story Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#121316] group-hover:text-[#F67708] transition leading-snug">
                    {story.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="text-[11px] text-slate-400 pt-1">
                    <span>{story.date}</span> • <span>{story.readTime}</span>
                  </div>
                </div>

                {/* Right-aligned Thumbnail */}
                <div className="w-full sm:w-36 h-36 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-slate-100">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECTION: "HOW CAN YOU HELP US" (Exact Reference Image 4)
          (Clean Minimalist Rounded Cards with Pill CTA Buttons)
      ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#121316] tracking-tight">
              How can you help us
            </h2>
            <p className="text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
              RK Foundation operates on 100% verified transparency and direct doorstep delivery. Choose how you would like to create an enduring difference today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {helpCards.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.id}
                  className="bg-[#F8F9FA] rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-slate-100 hover:shadow-card transition"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full border border-slate-300 bg-white flex items-center justify-center text-[#121316]">
                      <IconComp className="w-4 h-4 text-[#121316]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#121316] tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={card.link}
                      className="inline-block px-5 py-2 rounded-full border border-slate-300 hover:border-[#121316] text-xs font-semibold text-[#121316] transition"
                    >
                      Show more
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          5. STATEMENT & STATS PILL (Exact Reference: Images 5 & 6)
          (Giant Smooth Dark Capsule Pill with Script Handwritten Stats)
      ======================================================== */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 max-w-6xl mx-auto">
        <div className="bg-[#121316] text-white rounded-[45px] sm:rounded-[70px] lg:rounded-[90px] p-8 sm:p-14 lg:p-20 text-center relative overflow-hidden shadow-2xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-normal leading-relaxed max-w-3xl mx-auto text-slate-100 tracking-tight">
            It is our fundamental conviction that every child deserves an opportunity to learn, heal, and thrive with dignity.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mt-12 sm:mt-16 pt-8 border-t border-white/10">
            <div>
              <span className="font-handwriting text-5xl sm:text-6xl text-[#8bb5ff] font-bold block mb-2">
                100 +
              </span>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Grassroots bridge learning batches and health relief drives conducted across Delhi-NCR
              </p>
            </div>

            <div>
              <span className="font-handwriting text-5xl sm:text-6xl text-[#8bb5ff] font-bold block mb-2">
                15 k
              </span>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Underprivileged children and families reached with direct doorstep care and nutrition
              </p>
            </div>

            <div>
              <span className="font-handwriting text-5xl sm:text-6xl text-[#8bb5ff] font-bold block mb-2">
                100 %
              </span>
              <p className="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">
                Direct hospital disbursement and audited transparency under Indian public charitable laws
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. LIVE EMERGENCY CASES GRID (Compact, Simple & Clean)
      ======================================================== */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-slate-100">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-[#FFF4EB] text-[#F67708] border border-[#F67708]/30">
            <Activity className="w-3.5 h-3.5" />
            <span>Direct Hospital Disbursement</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#121316] tracking-tight">
            Live Beneficiary Emergency Cases
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            Critical pediatric appeals requiring urgent surgeries and ICU admission. Every case is doctor-verified with written guardian consent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {emergencyCases.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-card transition flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Hospital Verified</span>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-white/95 text-[#036C6C] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                    {c.tag}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>{c.age}</span>
                    <span>{c.gender}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#121316] group-hover:text-[#F67708] transition-colors">
                      {c.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-0.5">
                      <Building2 className="w-3.5 h-3.5 text-[#F67708] shrink-0" />
                      <span className="truncate">{c.hospital}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3">
                    {c.brief}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to={`/donate?campaignId=${encodeURIComponent(c.id)}&amount=2500`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F67708] hover:bg-[#E06800] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs transition"
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
          VIDEO MODAL PREVIEW
      ======================================================== */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 relative border border-slate-200 shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition cursor-pointer"
              aria-label="Close Video"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F67708] block mb-1">
              DOCUMENTARY FILM
            </span>
            <h3 className="text-lg font-bold text-[#121316] mb-4">
              RK Foundation: From Grassroots Care to Sustainable Change
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
    </div>
  );
};
