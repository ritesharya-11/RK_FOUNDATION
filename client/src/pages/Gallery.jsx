import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Camera,
  Search,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  MapPin,
  X,
  ZoomIn,
  Image as ImageIcon,
} from 'lucide-react';

const BROKEN_LEGACY_PATTERNS = [
  'rct-ground-',
  'protective mask distribution',
  'elderly health support',
  'on-ground hand sanitization',
  'dignified clothing',
  'dry ration & nutritional staple',
  'community protective gear',
  'community hand hygiene',
  'direct assistance for differently-abled',
  'apparel & festive clothing',
  'orderly beneficiary queue',
  'rebirth care trust ground volunteer',
  'warm cloth & winter essential',
  'comprehensive textile',
  'dignity kit presentation',
  'mask distribution & contactless sanitizer',
  '/gallery/rct-',
];

export const isBrokenOrLegacyAsset = (item) => {
  if (!item) return true;
  const id = String(item._id || item.id || '').toLowerCase();
  const title = String(item.title || '').toLowerCase();
  const url = String(item.imageUrl || item.coverImage || '').toLowerCase();

  if (BROKEN_LEGACY_PATTERNS.some((p) => id.includes(p) || title.includes(p) || url.includes(p))) {
    return true;
  }
  if (!item.imageUrl || typeof item.imageUrl !== 'string' || item.imageUrl.trim() === '') {
    return true;
  }
  return false;
};

const CURATED_FALLBACK_GALLERY = [
  {
    _id: 'gallery-dalit-1',
    title: 'Constitutional Rights & Legal Literacy Drive in Ambedkar Basti',
    category: 'Dalit Upliftment & Rights',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800',
    location: 'Trilokpuri & Kalyanpuri Clusters, Delhi',
  },
  {
    _id: 'gallery-edu-1',
    title: 'Slum Bridge School Morning Literacy Circle',
    category: 'Child Education',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800',
    location: 'Yamuna Khadar, Delhi',
  },
  {
    _id: 'gallery-health-1',
    title: 'Emergency Pediatric Relief Camp at GTB Hospital',
    category: 'Healthcare Relief',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800',
    location: 'GTB Hospital, Delhi',
  },
  {
    _id: 'gallery-food-1',
    title: 'Freshly Cooked Community Meal Kitchen Operations',
    category: 'Food & Ration Drives',
    imageUrl: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=800',
    location: 'Seelampur Community Kitchen',
  },
  {
    _id: 'gallery-women-1',
    title: 'Women Tailoring & Skill Graduation Day',
    category: 'Women Empowerment',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800',
    location: 'Loni Border Center',
  },
  {
    _id: 'gallery-general-1',
    title: 'Free Ration & Blanket Drive in Nand Nagri',
    category: 'General Community Work',
    imageUrl: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb9?q=80&w=800',
    location: 'Nand Nagri, Seemapuri',
  },
];

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = [
    'All',
    'Dalit Upliftment & Rights',
    'Child Education',
    'Healthcare Relief',
    'Food & Ration Drives',
    'Women Empowerment',
    'General Community Work',
    'Community Events',
  ];

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const query = selectedCategory === 'All' ? '' : `?category=${encodeURIComponent(selectedCategory)}`;
      let apiItems = [];
      try {
        const res = await api.get(`/gallery${query}`);
        if (res?.items && Array.isArray(res.items)) {
          apiItems = res.items.filter((item) => !isBrokenOrLegacyAsset(item));
        }
      } catch (err) {
        console.warn('API gallery notice:', err.message);
      }

      // Merge with locally stored admin media assets, strictly filtering out broken legacy entries
      try {
        const stored = localStorage.getItem('rk_media_gallery_assets');
        if (stored) {
          const localAssets = JSON.parse(stored);
          if (Array.isArray(localAssets)) {
            // Actively purge broken entries from localStorage so they never persist in user browser
            const cleanLocal = localAssets.filter((a) => !isBrokenOrLegacyAsset(a));
            if (cleanLocal.length !== localAssets.length) {
              localStorage.setItem('rk_media_gallery_assets', JSON.stringify(cleanLocal));
            }

            // Apply category filter if not 'All'
            const filteredLocal = selectedCategory === 'All'
              ? cleanLocal
              : cleanLocal.filter((a) => {
                  const c = (a.category || '').toLowerCase();
                  const target = selectedCategory.toLowerCase();
                  if (c === target) return true;
                  if (target.includes('education') && c.includes('education')) return true;
                  if (target.includes('health') && (c.includes('health') || c.includes('medic'))) return true;
                  if (target.includes('food') && (c.includes('food') || c.includes('ration') || c.includes('nutrition'))) return true;
                  if (target.includes('women') && (c.includes('women') || c.includes('tailor') || c.includes('livelihood'))) return true;
                  if (target.includes('dalit') && (c.includes('dalit') || c.includes('rights'))) return true;
                  if (target.includes('community') && (c.includes('community') || c.includes('general') || c.includes('awareness'))) return true;
                  return false;
                });

            const existingIds = new Set(apiItems.map((i) => i._id));
            const existingUrls = new Set(apiItems.map((i) => i.imageUrl));
            const uniqueLocal = filteredLocal.filter(
              (l) => l.imageUrl && !existingIds.has(l._id) && !existingUrls.has(l.imageUrl)
            );
            apiItems = [...uniqueLocal, ...apiItems];
          }
        }
      } catch {
        // ignore
      }

      // If empty after purge, supply curated fallback gallery
      if (apiItems.length === 0) {
        const fallbacks = selectedCategory === 'All'
          ? CURATED_FALLBACK_GALLERY
          : CURATED_FALLBACK_GALLERY.filter((f) => f.category.toLowerCase().includes(selectedCategory.toLowerCase()));
        apiItems = fallbacks.length > 0 ? fallbacks : CURATED_FALLBACK_GALLERY;
      }

      setItems(apiItems);
    } catch (err) {
      console.warn('Error fetching gallery:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();

    const handleStorageUpdate = () => fetchGallery();
    window.addEventListener('storage', handleStorageUpdate);
    window.addEventListener('rk_gallery_updated', handleStorageUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageUpdate);
      window.removeEventListener('rk_gallery_updated', handleStorageUpdate);
    };
  }, [selectedCategory]);

  const displayedItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const title = (item.title || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();
    const loc = (item.location || '').toLowerCase();
    return title.includes(q) || cat.includes(q) || loc.includes(q);
  });

  return (
    <div className="bg-white min-h-screen text-[#121316]">
      {/* Modern NGO Header Section */}
      <section className="bg-gradient-to-b from-[#F6FAF7] via-[#FAFDFB] to-white border-b border-slate-200/80 pt-8 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-[13px] font-medium text-slate-500 mb-6">
            <Link to="/" className="hover:text-[#14382C] transition">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-600">Field Gallery</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-[#14382C] font-semibold">Photo Archives</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-7 border-b border-slate-200/80">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#14382C]/20 text-[#14382C] text-xs sm:text-[13px] font-bold uppercase tracking-wider shadow-sm">
                <Camera className="w-3.5 h-3.5 text-[#14382C]" />
                <span>Verified Field Documentation</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-semibold text-[#121316] tracking-tight leading-[1.15]">
                Field Photo <span className="italic text-[#14382C]">Archives</span>
              </h1>
              <p className="text-base sm:text-[17px] text-slate-600 leading-[1.65] font-normal">
                Authentic, ground-level photography from our community bridge schools, emergency medical camps, nutrition distribution points, and vocational skill batches.
              </p>
            </div>

            {/* Quick NGO Trust Highlights */}
            <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2.5 text-xs sm:text-[13px] shrink-0">
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#14382C]/15 text-[#121316] font-semibold shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#14382C]" />
                <span>100% Genuine Field Drives</span>
              </span>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#14382C]/15 text-[#121316] font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 text-[#14382C]" />
                <span>Zero Stock / Staged Media</span>
              </span>
            </div>
          </div>

          {/* Interactive Controls Bar: Search & Counter */}
          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#14382C]" />
              <input
                type="text"
                placeholder="Search photos by title, cause, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-[#121316] placeholder-slate-400 focus:outline-none focus:border-[#14382C] shadow-sm transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#14382C] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="text-xs sm:text-[13px] font-semibold text-slate-600 flex items-center justify-between sm:justify-end gap-2.5">
              <span>Showing</span>
              <span className="px-3.5 py-1.5 rounded-full bg-[#14382C] text-[#F2D869] font-bold shadow-sm">
                {displayedItems.length} Photos
              </span>
            </div>
          </div>

          {/* Cause Category Filter Pills */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    isActive
                      ? 'bg-[#14382C] text-white shadow-sm'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-[#14382C]/40 hover:text-[#14382C]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-12">
        {/* Gallery Grid */}
        {loading ? (
          <div className="py-24 text-center text-slate-400 font-medium">Loading photos...</div>
        ) : displayedItems.length === 0 ? (
          <div className="py-20 text-center bg-[#F6FAF7] border border-[#14382C]/15 rounded-2xl p-8 max-w-md mx-auto space-y-3">
            <ImageIcon className="w-10 h-10 text-[#14382C]/60 mx-auto" />
            <h4 className="text-base font-bold text-[#121316]">No photos match your search</h4>
            <p className="text-sm text-slate-600">
              Try adjusting your search keyword or check back later for newly added field archives.
            </p>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-block mt-2 px-5 py-2 rounded-full bg-[#14382C] hover:bg-[#1B4D3E] text-white text-xs font-bold uppercase tracking-wider cursor-pointer transition"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedItems.map((item) => (
              <div
                key={item._id}
                onClick={() => setLightboxItem(item)}
                className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer aspect-[4/3] bg-slate-100 border border-slate-200/90 hover:border-[#14382C]/50"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  onError={() => {
                    // Silently drop broken images from state so broken boxes never display
                    setItems((prev) => prev.filter((i) => i._id !== item._id));
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-bold text-[#F2D869] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold line-clamp-2 mt-1 leading-snug">{item.title}</h4>
                  {item.location && (
                    <p className="text-xs text-slate-200 flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F2D869]" />
                      <span>{item.location}</span>
                    </p>
                  )}
                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#14382C]/90 backdrop-blur-md flex items-center justify-center text-[#F2D869] border border-[#F2D869]/30 shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0E241C] text-white rounded-2xl overflow-hidden shadow-2xl border border-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-[#14382C] text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 space-y-2 bg-[#0E241C]">
              <span className="text-xs font-bold text-[#F2D869] uppercase tracking-wider">
                {lightboxItem.category}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">{lightboxItem.title}</h3>
              {lightboxItem.location && (
                <p className="text-xs sm:text-sm text-emerald-100/80 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#F2D869]" />
                  <span>{lightboxItem.location}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
