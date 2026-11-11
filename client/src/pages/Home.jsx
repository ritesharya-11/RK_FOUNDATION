import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import api from '../services/api';
import {
  Heart,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  HeartHandshake,
  Utensils,
  Users,
  CheckCircle2,
  Award,
  Quote,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

export const Home = () => {
  const { settings, formatINR } = useWebsite();
  const navigate = useNavigate();

  const [programs, setPrograms] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activities, setActivities] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [progRes, projRes, actRes, testRes, newsRes] = await Promise.allSettled([
          api.get('/programs?featured=true'),
          api.get('/projects?featured=true'),
          api.get('/activities'),
          api.get('/testimonials'),
          api.get('/news'),
        ]);

        if (progRes.status === 'fulfilled' && progRes.value?.programs) {
          setPrograms(progRes.value.programs.slice(0, 6));
        }
        if (projRes.status === 'fulfilled' && projRes.value?.projects) {
          setProjects(projRes.value.projects.slice(0, 3));
        }
        if (actRes.status === 'fulfilled' && actRes.value?.activities) {
          setActivities(actRes.value.activities.slice(0, 3));
        }
        if (testRes.status === 'fulfilled' && testRes.value?.testimonials) {
          setTestimonials(testRes.value.testimonials);
        }
        if (newsRes.status === 'fulfilled' && newsRes.value?.articles) {
          setNews(newsRes.value.articles.slice(0, 3));
        }
      } catch (err) {
        console.warn('[Home Data Fetch Error]:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getProgramIcon = (iconName) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-[#151A2D]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#FFC43D]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-[#151A2D]" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-[#151A2D]" />;
      default:
        return <Users className="w-6 h-6 text-[#151A2D]" />;
    }
  };

  return (
    <div className="w-full">
      {/* ========================================================
          1. HERO SECTION (Exact Carenest Design Benchmark)
      ======================================================== */}
      <section className="relative min-h-[82vh] sm:min-h-[88vh] flex flex-col justify-end pt-16 sm:pt-24 pb-14 sm:pb-20 px-4 sm:px-8 overflow-hidden bg-[#0B0D17]">
        {/* Full-bleed Background Image with Clean Wall at Top and Kids in Center */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-carenest.jpg"
            alt="Helping Children Grow With Care"
            className="w-full h-full object-cover object-center filter brightness-[0.94]"
          />
          {/* Subtle cinematic gradient overlay for high text clarity */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30 pointer-events-none" />
        </div>

        {/* HERO BOTTOM CONTENT: Large Headline on Left, Subtext & CTA on Right */}
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Column: Bold White Typography */}
            <div className="lg:col-span-7">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-md">
                Helping Children <br />
                Grow With Care
              </h1>
            </div>

            {/* Right Column: Mission Paragraph & Dark Pill CTA with Golden Circular Arrow */}
            <div className="lg:col-span-5 space-y-5 lg:pl-6">
              <p className="text-slate-200 text-base sm:text-lg leading-relaxed drop-shadow-sm font-normal">
                We are a children-focused charity organization dedicated to improving young lives through education, healthcare, protection, and community support.
              </p>

              <div>
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-3 bg-[#0B0D17] hover:bg-black text-white font-semibold text-sm sm:text-base px-6 py-3 rounded-full border border-white/20 shadow-2xl transition-all transform hover:scale-105 group"
                >
                  <span>Donate Now</span>
                  <span className="w-8 h-8 rounded-full bg-[#FFC43D] text-[#0B0D17] flex items-center justify-center font-black text-sm group-hover:rotate-45 transition-transform duration-200">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. CORE INITIATIVES: CHARITABLE PROGRAMS TRANSFORMING LIVES
          Centered in the middle, placed at the top below Hero
      ======================================================== */}
      <section className="bg-white py-16 sm:py-24 border-b border-[#E8E8E5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
          {/* Centered Heading in the Middle */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FFC43D]/20 text-[#0B0D17] border border-[#FFC43D]/40 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#0B0D17]" />
                <span>Our Core Initiatives</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#151A2D] tracking-tight leading-tight">
              Charitable Programs Transforming Lives
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-[#697386] leading-relaxed max-w-2xl mx-auto">
              Addressing foundational challenges in child schooling, healthcare access, women livelihood, and emergency disaster relief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {[
              {
                _id: 'ci-1',
                title: 'Children Development',
                category: 'Child Welfare',
                shortDescription:
                  'Protecting child rights, fighting infant mortality, eliminating child labor, and providing free meals, clothes, and medicines.',
                coverImage: '/programs/children-development.jpg',
                slug: 'children-development',
              },
              {
                _id: 'ci-2',
                title: "Women's Development and Empowerment",
                category: 'Women Empowerment',
                shortDescription:
                  'Empowering women to live with dignity and equal rights in violence-free environments through literacy and self-help groups.',
                coverImage: '/programs/womens-empowerment.jpg',
                slug: 'womens-development-and-empowerment',
              },
              {
                _id: 'ci-3',
                title: 'Aged / Elderly Care',
                category: 'Elderly Support',
                shortDescription:
                  'Providing medical aid, nutrition, and companionship to destitute and abandoned senior citizens living without family support.',
                coverImage: '/programs/elderly-care.jpg',
                slug: 'aged-elderly-care',
              },
              {
                _id: 'ci-4',
                title: 'Differently Abled Support',
                category: 'Special Needs',
                shortDescription:
                  'Ensuring differently-abled citizens enjoy equal rights, assistive equipment, dignity, and inclusive opportunities in nation-building.',
                coverImage: '/programs/differently-abled.jpg',
                slug: 'differently-abled-support',
              },
              {
                _id: 'ci-5',
                title: 'Education and Literacy',
                category: 'Education',
                shortDescription:
                  'Bridging educational gaps for slum children and school dropouts with non-formal evening schooling and free learning materials.',
                coverImage: '/programs/education-literacy.jpg',
                slug: 'education-and-literacy',
              },
              {
                _id: 'ci-6',
                title: 'Health and Family Welfare',
                category: 'Healthcare',
                shortDescription:
                  'Community health camps, preventative medical care, and quality mother-child health guidance across rural and slum settlements.',
                coverImage: '/programs/health-welfare.jpg',
                slug: 'health-and-family-welfare',
              },
            ].map((prog) => (
              <div
                key={prog._id || prog.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/80 flex flex-col group"
              >
                {/* Photo with Badge in Top-Right Corner */}
                <div className="h-48 sm:h-52 overflow-hidden relative bg-slate-100">
                  <img
                    src={prog.coverImage}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 bg-[#0B0D17]/85 backdrop-blur-md text-[#FFC43D] border border-white/15 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {prog.category || 'Initiative'}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors line-clamp-2 leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#697386] mt-2.5 line-clamp-3 leading-relaxed">
                      {prog.shortDescription}
                    </p>
                  </div>

                  {/* Card Footer: View Details & Support Button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={prog.slug ? `/programs/${prog.slug}` : '/programs'}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B0D17] hover:text-[#EBAF20] transition group/link"
                    >
                      <span>View Details</span>
                      <span className="text-[#EBAF20] font-black group-hover/link:translate-x-1 transition-transform">→</span>
                    </Link>

                    <Link
                      to={`/donate?program=${prog.slug || 'general'}`}
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-xs hover:shadow transition-all duration-200 transform hover:scale-105"
                    >
                      Support
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Explore All Programs Action */}
          <div className="text-center pt-2">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-md transition transform hover:-translate-y-0.5 group"
            >
              <span>Explore All 10 Operational Programs</span>
              <ArrowRight className="w-4 h-4 text-[#0B0D17] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. MEASURABLE SOCIAL IMPACT NUMBERS
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <SectionHeading
          badge="Measurable Change on the Ground"
          title="Our Community Impact Across India"
          description="Documented transformations across marginalized rural settlements and urban clusters."
          className="mb-12"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 text-center">
          <div className="p-5 rounded-3xl bg-white border border-[#E8E8E5] shadow-soft hover:shadow-card transition">
            <span className="block text-2xl sm:text-3xl font-black text-[#0B0D17]">
              {(settings.impactStats?.livesImpacted || 48500).toLocaleString('en-IN')}+
            </span>
            <span className="block text-xs font-semibold text-[#697386] mt-1">
              Lives Impacted
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E8E8E5] shadow-soft hover:shadow-card transition">
            <span className="block text-2xl sm:text-3xl font-black text-[#151A2D]">
              {(settings.impactStats?.childrenEducated || 12400).toLocaleString('en-IN')}+
            </span>
            <span className="block text-xs font-semibold text-[#697386] mt-1">
              Children Educated
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E8E8E5] shadow-soft hover:shadow-card transition">
            <span className="block text-2xl sm:text-3xl font-black text-[#151A2D]">
              {(settings.impactStats?.womenEmpowered || 4200).toLocaleString('en-IN')}+
            </span>
            <span className="block text-xs font-semibold text-[#697386] mt-1">
              Women Empowered
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E8E8E5] shadow-soft hover:shadow-card transition">
            <span className="block text-2xl sm:text-3xl font-black text-[#151A2D]">
              {(settings.impactStats?.mealsServed || 185000).toLocaleString('en-IN')}+
            </span>
            <span className="block text-xs font-semibold text-[#697386] mt-1">
              Nutritional Meals
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E8E8E5] shadow-soft hover:shadow-card transition">
            <span className="block text-2xl sm:text-3xl font-black text-[#151A2D]">
              {(settings.impactStats?.healthCampsConducted || 340).toLocaleString('en-IN')}+
            </span>
            <span className="block text-xs font-semibold text-[#697386] mt-1">
              Free Health Camps
            </span>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#E8E8E5] shadow-soft hover:shadow-card transition">
            <span className="block text-2xl sm:text-3xl font-black text-[#151A2D]">
              {(settings.impactStats?.activeVolunteers || 1250).toLocaleString('en-IN')}+
            </span>
            <span className="block text-xs font-semibold text-[#697386] mt-1">
              Active Volunteers
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. ABOUT RK FOUNDATION PREVIEW SECTION
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-card border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1200&auto=format&fit=crop"
                alt="Teacher helping children with school work"
                className="w-full h-[420px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-5 rounded-3xl shadow-card border border-[#E8E8E5] hidden sm:flex items-center gap-4 max-w-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#FFC43D]/20 flex items-center justify-center text-[#0B0D17] font-bold">
                <Award className="w-6 h-6 text-[#0B0D17]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#151A2D]">100% Transparency</p>
                <p className="text-[11px] text-[#697386]">
                  Every rupee accounted for with audited annual returns and receipts.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#FFC43D] uppercase tracking-wider">
              About RK FOUNDATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151A2D] tracking-tight leading-tight">
              A Dedicated Public Charitable Trust Working For The Last Mile
            </h2>
            <p className="text-[#697386] leading-relaxed text-sm sm:text-base">
              {settings.missionStatement ||
                'To transform lives through accessible child education, emergency healthcare relief, women livelihood empowerment, and holistic community rehabilitation across marginalized sectors of society.'}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0B0D17] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#151A2D]">Child Welfare & Bridge Schooling</h4>
                  <p className="text-xs text-[#697386]">
                    Mainstreaming slum dropout children into certified government education.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0B0D17] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#151A2D]">Women Vocational Tailoring Centers</h4>
                  <p className="text-xs text-[#697386]">
                    Imparting garment construction, tailoring, and livelihood dignity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0B0D17] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#151A2D]">Pediatric Health & Nutrition Drives</h4>
                  <p className="text-xs text-[#697386]">
                    Free diagnostic camps and supplementary nutrition ration for malnourished children.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/about"
                className="px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-[#0B0D17] hover:bg-black shadow-md transition flex items-center gap-2"
              >
                <span>Discover Our Story</span>
                <ArrowRight className="w-4 h-4 text-[#FFC43D]" />
              </Link>
              <Link
                to="/volunteer"
                className="px-6 py-3 rounded-full font-semibold text-xs sm:text-sm text-[#151A2D] bg-white border border-[#E8E8E5] hover:bg-[#F7F7F5] transition"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. URGENT LIVE CASES / CAMPAIGNS (Causes)
      ======================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold text-[#FFC43D] uppercase tracking-wider">
              Urgent Appeals
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#151A2D] mt-1">
              Live Cases & Active Campaigns
            </h2>
            <p className="text-xs sm:text-sm text-[#697386] mt-2">
              Every small contribution counts directly toward saving a life or educating a child.
            </p>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B0D17] hover:text-[#EBAF20] transition"
          >
            <span>View All Live Cases</span>
            <ArrowRight className="w-4 h-4 text-[#FFC43D]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {(projects.length > 0 ? projects : [
            {
              _id: '1',
              title: 'Urgent Pediatric Heart Surgery for Baby Aarav',
              category: 'Medical Relief',
              slug: 'pediatric-heart-surgery-aarav',
              targetAmount: 350000,
              raisedAmount: 245000,
              coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop',
              shortDescription: 'Baby Aarav requires urgent corrective open-heart surgery at AIIMS Delhi to treat congenital heart disease.',
            },
            {
              _id: '2',
              title: 'Winter Warmth & Nutrition Kits for 500 Slum Children',
              category: 'Child Care',
              slug: 'winter-warmth-and-nutrition',
              targetAmount: 500000,
              raisedAmount: 380000,
              coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
              shortDescription: 'Distributing insulated thermal jackets, blankets, and dry protein ration to migrant settlements across NCR.',
            },
            {
              _id: '3',
              title: 'Sewing Machine Kits for 50 Destitute Women Artisans',
              category: 'Women Empowerment',
              slug: 'sewing-machine-kits-empowerment',
              targetAmount: 250000,
              raisedAmount: 195000,
              coverImage: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=800&auto=format&fit=crop',
              shortDescription: 'Gifting commercial sewing machines and tailoring startup materials to single mothers and widows.',
            },
          ]).map((project) => {
            const percent = Math.min(100, Math.round(((project.raisedAmount || 0) / (project.targetAmount || 1)) * 100));

            return (
              <div
                key={project._id}
                className="bg-white rounded-3xl overflow-hidden shadow-soft hover:shadow-card transition-all duration-300 border border-[#E8E8E5] flex flex-col group"
              >
                <div className="h-52 overflow-hidden relative">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#0B0D17] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {project.category || 'Live Case'}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition line-clamp-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#697386] mt-2 line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-[#151A2D]">Raised: {formatINR(project.raisedAmount || 0)}</span>
                      <span className="text-[#0B0D17] font-extrabold">{percent}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F7F7F5] overflow-hidden border border-[#E8E8E5]">
                      <div
                        className="h-full bg-gradient-to-r from-[#171923] to-[#FFC43D] rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#A0A4AE] font-medium">
                      <span>Goal: {formatINR(project.targetAmount || 0)}</span>
                      <span>50% 80G Tax Exempt</span>
                    </div>
                  </div>

                  <Link
                    to={`/donate?campaignId=${project._id}`}
                    className="w-full py-2.5 rounded-full font-bold text-xs text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-sm transition text-center flex items-center justify-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#0B0D17] text-[#0B0D17]" />
                    <span>Support This Case</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================
          8. TESTIMONIALS / WORDS OF TRUST
      ======================================================== */}
      <section className="bg-[#0B0D17] text-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Voices of Humanity"
            title="Words From Beneficiaries & Patrons"
            dark={true}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(testimonials.length > 0 ? testimonials.slice(0, 3) : [
              {
                name: 'Sunita Devi',
                role: 'Mother of Beneficiary Child',
                quote: 'My daughter Priya had dropped out due to our poverty. RK Foundation provided books, uniform, and bridge tutoring. Today she is enrolled in a formal CBSE school with a bright smile.',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
              },
              {
                name: 'Vikramaditya Sharma',
                role: 'Corporate CSR Director',
                quote: 'The transparency, Section 80G audit compliance, and real-time impact tracking make RK Foundation one of the most reliable and accountable charitable organizations in India.',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
              },
              {
                name: 'Rekha Bano',
                role: 'Vocational Center Graduate',
                quote: 'Completing the 6-month tailoring course gave me the skills and confidence to earn independently. I received a sewing machine kit and now support my family with pride.',
                avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
              },
            ]).map((t, idx) => (
              <div
                key={idx}
                className="bg-[#171923] rounded-3xl p-8 border border-white/10 flex flex-col justify-between space-y-6 shadow-card"
              >
                <Quote className="w-8 h-8 text-[#FFC43D] opacity-80" />
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <img
                    src={t.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#FFC43D]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white">{t.name}</h4>
                    <p className="text-xs text-[#A0A4AE]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
