import React, { useState, useEffect } from 'react';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import { Image as ImageIcon, MapPin, X, ZoomIn } from 'lucide-react';

export const Gallery = () => {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [lightboxItem, setLightboxItem] = useState(null);

  const categories = [
    'All',
    'Child Education',
    'Healthcare Relief',
    'Food & Ration Drives',
    'Women Empowerment',
    'Community Events',
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const query = selectedCategory === 'All' ? '' : `?category=${encodeURIComponent(selectedCategory)}`;
        const res = await api.get(`/gallery${query}`);
        if (res?.items) {
          setItems(res.items);
        }
      } catch (err) {
        console.warn('Error fetching gallery:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [selectedCategory]);

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Visual Documentation"
        title="Field Photo Archives"
        subtitle="High-resolution photography from our community bridge schools, emergency medical camps, nutrition distribution points, and vocational skill batches."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Field Gallery' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#036C6C] text-[#F67708] shadow-md'
                  : 'bg-white text-[#697777] hover:text-[#323D3D] hover:bg-white/80 border border-[#E3D9CF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-24 text-center text-[#A0A4AE] font-medium">Loading photos...</div>
        ) : items.length === 0 ? (
          <div className="py-24 text-center text-[#697777]">No photos found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                onClick={() => setLightboxItem(item)}
                className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer aspect-4/3 bg-white border border-[#E3D9CF]"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end text-white">
                  <span className="text-[11px] font-bold text-[#F67708] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="text-sm font-bold line-clamp-2 mt-1">{item.title}</h4>
                  {item.location && (
                    <p className="text-[11px] text-slate-300 flex items-center gap-1.5 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F67708]" />
                      <span>{item.location}</span>
                    </p>
                  )}
                  <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                    <ZoomIn className="w-4 h-4 text-[#F67708]" />
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
            className="relative max-w-4xl w-full bg-[#036C6C] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5 text-[#F67708]" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="p-6 space-y-2 bg-[#036C6C]">
              <span className="text-xs font-bold text-[#F67708] uppercase tracking-wider">
                {lightboxItem.category}
              </span>
              <h3 className="text-lg font-bold text-white">{lightboxItem.title}</h3>
              {lightboxItem.location && (
                <p className="text-xs text-[#A0A4AE] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#F67708]" />
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
