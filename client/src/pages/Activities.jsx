import React, { useState, useEffect } from 'react';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import { Calendar, MapPin, Filter, Search, Award } from 'lucide-react';
import { isBrokenOrLegacyAsset } from './Gallery';

const FALLBACK_ACTIVITIES = [
  {
    _id: 'act-dalit-1',
    title: 'Dalit Rights Legal Aid Clinic & Constitutional Awareness Drive',
    date: '2026-03-08',
    location: 'Ambedkar Basti, Trilokpuri & Kalyanpuri Clusters, Delhi-NCR',
    category: 'Dalit Upliftment & Rights',
    description:
      'Conducted a dedicated legal counseling and statutory rights camp providing free legal assistance, SC/ST welfare scheme enrollment, scholarship applications, and civic discrimination grievance redressal for 380 Dalit households.',
    beneficiariesCount: 380,
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
    status: 'completed',
  },
  {
    _id: 'act-dalit-2',
    title: 'Community Empowerment & Educational Rights Seminar for Dalit Youth',
    date: '2026-02-22',
    location: 'Dr. B.R. Ambedkar Community Bhavan, Ghaziabad',
    category: 'Dalit Upliftment & Rights',
    description:
      'Empowered 240 first-generation Dalit college and school aspirants with guidance on higher education entrance exams, Dr. Ambedkar national fellowships, and digital career skills mentorship.',
    beneficiariesCount: 240,
    coverImage: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1200&auto=format&fit=crop',
    status: 'completed',
  },
  {
    _id: 'act-health-1',
    title: 'Mega Health & Pediatric Checkup Camp at Nand Nagri',
    date: '2026-02-15',
    location: 'Community Center, Nand Nagri, East Delhi',
    category: 'Health Camp',
    description:
      'Over 420 children and mothers received free pediatric consultations, dental screenings, hemoglobin checkups, and necessary vitamin syrups and antibiotic treatments.',
    beneficiariesCount: 420,
    coverImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    status: 'completed',
  },
  {
    _id: 'act-winter-1',
    title: 'Winter Warmth & Quilt Distribution at Kashmere Gate',
    date: '2026-01-20',
    location: 'Kashmere Gate & Yamuna Pushta Settlements',
    category: 'Winter Blanket Drive',
    description:
      'Distributed 650 heavy winter quilts, thermal innerwear sets, and hot porridge to destitute elderly individuals and families sleeping without proper shelter.',
    beneficiariesCount: 650,
    coverImage: 'https://images.unsplash.com/photo-1516307365426-bea591f05011?q=80&w=1200&auto=format&fit=crop',
    status: 'completed',
  },
  {
    _id: 'act-edu-1',
    title: 'Back-to-School Learning Kit Handover for 300 Slum Children',
    date: '2026-03-02',
    location: 'RK Foundation Education Hub, Ghaziabad Cluster',
    category: 'Education Kit Distribution',
    description:
      'Provided sturdy school bags, Hindi-English workbooks, drawing sets, water bottles, and geometry boxes to 300 children enrolled in our foundation classes.',
    beneficiariesCount: 300,
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
    status: 'completed',
  },
  {
    _id: 'act-women-1',
    title: 'Graduation Ceremony for Batch 14 Vocational Sewing Students',
    date: '2026-02-28',
    location: 'RK Center of Excellence, Sector 62, Noida',
    category: 'Women Workshop',
    description:
      'Celebrated the successful graduation of 48 women from our 6-month tailoring and fashion stitching course. Sponsored sewing machines were distributed to the top 20 performers.',
    beneficiariesCount: 48,
    coverImage: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?q=80&w=1200&auto=format&fit=crop',
    status: 'completed',
  },
];

const CATEGORIES = [
  'All',
  'Dalit Upliftment & Rights',
  'Health Camp',
  'Winter Blanket Drive',
  'Education Kit Distribution',
  'Women Workshop',
  'Ration & Food Distribution',
];

export const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        let loaded = [];
        try {
          const res = await api.get('/activities');
          if (res?.activities && res.activities.length > 0) {
            const hasDalit = res.activities.some((a) => a.category === 'Dalit Upliftment & Rights');
            if (!hasDalit) {
              loaded = [
                ...FALLBACK_ACTIVITIES.filter((a) => a.category === 'Dalit Upliftment & Rights'),
                ...res.activities,
              ];
            } else {
              loaded = res.activities;
            }
          } else {
            loaded = FALLBACK_ACTIVITIES;
          }
        } catch (apiErr) {
          console.warn('Using fallback activities:', apiErr.message);
          loaded = FALLBACK_ACTIVITIES;
        }

        // Merge locally uploaded activity photos from Admin Media Library
        try {
          const stored = localStorage.getItem('rk_media_gallery_assets');
          if (stored) {
            const localAssets = JSON.parse(stored);
            if (Array.isArray(localAssets)) {
              const localAsActivities = localAssets
                .filter((a) => a.imageUrl && a.title && !isBrokenOrLegacyAsset(a))
                .map((a) => ({
                  _id: a._id,
                  title: a.title,
                  date: a.createdAt || new Date().toISOString(),
                  location: a.location || 'Delhi-NCR',
                  category: a.category || 'General Community Work',
                  description: a.caption || a.title,
                  beneficiariesCount: 200,
                  coverImage: a.imageUrl,
                  status: 'completed',
                }));

              const existingTitles = new Set(loaded.map((b) => b.title?.toLowerCase()));
              const existingUrls = new Set(loaded.map((b) => b.coverImage));
              const uniqueLocal = localAsActivities.filter(
                (l) => !existingTitles.has(l.title?.toLowerCase()) && !existingUrls.has(l.coverImage)
              );
              loaded = [...uniqueLocal, ...loaded];
            }
          }
        } catch {
          // ignore
        }

        setActivities(loaded);
      } catch (err) {
        setActivities(FALLBACK_ACTIVITIES);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();

    const handleUpdate = () => fetchActivities();
    window.addEventListener('storage', handleUpdate);
    window.addEventListener('rk_gallery_updated', handleUpdate);

    return () => {
      window.removeEventListener('storage', handleUpdate);
      window.removeEventListener('rk_gallery_updated', handleUpdate);
    };
  }, []);

  const filteredActivities = activities.filter((act) => {
    const matchesCategory =
      selectedCategory === 'All' || act.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      act.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Field Reports & Ground Action"
        title="Our On-Ground Activity Track"
        subtitle="Tracking verified grassroots relief drives, Dalit rights legal clinics, health camps, education distributions, and community outreach across India."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Activity Track' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Filter and Search Bar */}
        <div className="bg-white rounded-3xl p-6 border border-[#E3D9CF] shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#323D3D]">
              <Filter className="w-4 h-4 text-[#036C6C]" />
              <span>Filter by Program Area:</span>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#697777] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search location, drive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#E3D9CF] rounded-full text-xs text-[#323D3D] placeholder-[#A0A4AE] focus:outline-none focus:ring-2 focus:ring-[#036C6C]"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#E3D9CF]/60">
            {CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? activities.length
                  : activities.filter((a) => a.category?.toLowerCase() === cat.toLowerCase()).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#036C6C] text-white shadow-md'
                      : 'bg-[#FAF7F2] text-[#323D3D] hover:bg-[#E3D9CF]/60 border border-[#E3D9CF]'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-[#F67708] text-white' : 'bg-white text-[#697777]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-24 text-center text-[#A0A4AE] font-medium">Loading activity track...</div>
        ) : filteredActivities.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-[#E3D9CF] p-8">
            <p className="text-base font-semibold text-[#323D3D] mb-1">No activities found</p>
            <p className="text-xs text-[#697777]">Try selecting another category or clearing your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((act) => (
              <div
                key={act._id}
                className="bg-white rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 border border-[#E3D9CF] flex flex-col group hover:-translate-y-1"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={act.coverImage}
                    alt={act.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className="bg-[#036C6C]/90 backdrop-blur-md text-white border border-white/20 text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      {act.category}
                    </span>
                  </div>
                  {act.category === 'Dalit Upliftment & Rights' && (
                    <span className="absolute bottom-3 right-3 bg-[#F67708] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      Constitutional Rights
                    </span>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#697777]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#036C6C]" />
                        {new Date(act.date).toLocaleDateString('en-IN', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 line-clamp-1">
                        <MapPin className="w-3.5 h-3.5 text-[#036C6C] shrink-0" />
                        <span className="truncate">{act.location}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#323D3D] group-hover:text-[#036C6C] transition-colors leading-snug">
                      {act.title}
                    </h3>

                    <p className="text-xs text-[#697777] leading-relaxed whitespace-pre-line line-clamp-3">
                      {act.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E3D9CF] flex items-center justify-between text-xs">
                    <span className="text-[#697777]">Direct Beneficiaries:</span>
                    <strong className="text-[#036C6C] font-bold">
                      {act.beneficiariesCount} Individuals
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
