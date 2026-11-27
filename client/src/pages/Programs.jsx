import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import api from '../services/api';
import { CheckCircle2, Heart, ArrowRight, ChevronRight, Sparkles } from 'lucide-react';
import { operationalProgramsData } from '../data/programsData';

export const Programs = () => {
  const { formatINR } = useWebsite();
  const [searchParams, setSearchParams] = useSearchParams();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read category from URL query param if present
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');

  const categories = [
    'All',
    'Children Development',
    'Aged / Elderly Care',
    'Education and Literacy',
    'Dalit Upliftment & Rights',
    'Drinking Water & Sanitation',
    "Women's Development and Empowerment",
    'Differently Abled Support',
    'Health and Family Welfare',
    'Environment and Forest Protection',
    'Disaster Management & Emergency Relief',
  ];

  // Update selectedCategory when URL query changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('All');
    }
  }, [categoryParam]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const query = selectedCategory === 'All' ? '' : `?category=${encodeURIComponent(selectedCategory)}`;
        const res = await api.get(`/programs${query}`);
        if (res?.programs && res.programs.length > 0) {
          setPrograms(res.programs);
        } else {
          // Fallback matching to guarantee 100% reliable UI display
          if (selectedCategory === 'All') {
            setPrograms(operationalProgramsData);
          } else {
            const matched = operationalProgramsData.filter(
              (p) =>
                p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
                selectedCategory.toLowerCase().includes(p.category.toLowerCase())
            );
            setPrograms(matched.length > 0 ? matched : operationalProgramsData);
          }
        }
      } catch (err) {
        console.warn('Error fetching programs, using fallback:', err.message);
        if (selectedCategory === 'All') {
          setPrograms(operationalProgramsData);
        } else {
          const matched = operationalProgramsData.filter(
            (p) =>
              p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
              selectedCategory.toLowerCase().includes(p.category.toLowerCase())
          );
          setPrograms(matched.length > 0 ? matched : operationalProgramsData);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [selectedCategory]);

  return (
    <div className="bg-white min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Operational Charitable Initiatives"
        title="10 Core Programs Transforming India"
        subtitle="From early childhood bridge education and women vocational tailoring to clean drinking water, elderly care, and emergency disaster relief, explore our on-ground impact."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Our Programs' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Category Filter Tabs (Crisp Square Geometry) */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3.5 py-2 rounded-sm text-xs font-semibold transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#14382C] text-white border-[#14382C] shadow-sm'
                  : 'bg-white text-[#4B5563] hover:text-[#14382C] hover:bg-[#EAF3EE]/60 border-[#E5E7EB]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Selected Category Header (if filtered) */}
        {selectedCategory !== 'All' && (
          <div className="flex items-center justify-between p-4 bg-[#F9FAFB] rounded-sm border border-[#E5E7EB]">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#14382C]"></span>
              <span className="text-xs sm:text-sm font-medium text-[#374151]">
                Showing operational initiatives under: <strong className="text-[#111827]">{selectedCategory}</strong>
              </span>
            </div>
            <button
              onClick={() => handleCategorySelect('All')}
              className="text-xs font-semibold text-[#14382C] hover:underline cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Programs Grid */}
        {loading ? (
          <div className="py-24 text-center text-[#6B7280] font-medium">Loading programs...</div>
        ) : programs.length === 0 ? (
          <div className="py-24 text-center text-[#4B5563]">No programs found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, index) => (
              <div
                key={prog._id || prog.slug || index}
                className="bg-white rounded-sm overflow-hidden border border-[#E5E7EB] hover:border-[#14382C]/50 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Media Frame */}
                <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-100 border-b border-[#E5E7EB]">
                  <img
                    src={
                      prog.coverImage && !prog.coverImage.includes('photo-1542838132-92c53300491e')
                        ? prog.coverImage
                        : '/programs/children-development.jpg'
                    }
                    alt={prog.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = '/programs/children-development.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-sm bg-[#14382C] text-[#F2D869] font-mono font-bold text-[10.5px] shadow-xs">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-sm bg-white/95 text-[#14382C] border border-[#14382C]/15 text-[10.5px] font-bold uppercase tracking-wider shadow-xs">
                      {prog.category}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2.5">
                    <h3 className="text-[17px] font-bold text-[#111827] group-hover:text-[#14382C] transition-colors leading-snug tracking-tight">
                      {prog.title}
                    </h3>
                    <p className="text-[13px] text-[#4B5563] leading-relaxed line-clamp-3">
                      {prog.shortDescription}
                    </p>

                    {prog.objectives?.length > 0 && (
                      <div className="space-y-1.5 pt-2 border-t border-[#F1F5F9]">
                        {prog.objectives.slice(0, 2).map((obj, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[12px] text-[#374151]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#14382C] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{obj}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Impact Summary & Square Action Buttons */}
                  <div className="pt-3 border-t border-[#F1F5F9] space-y-3">
                    <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E5E7EB] rounded-sm px-3 py-2 text-xs">
                      <span className="text-[#6B7280] font-medium">Beneficiaries Reached</span>
                      <strong className="text-[#14382C] font-bold tabular-nums">
                        {(prog.beneficiariesCount || 0).toLocaleString('en-IN')}+
                      </strong>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Link
                        to={`/donate?program=${encodeURIComponent(prog.title)}`}
                        className="flex-1 py-2.5 px-3 rounded-sm text-xs font-bold text-white bg-[#14382C] hover:bg-[#1B4D3E] text-center transition flex items-center justify-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 text-[#F2D869] fill-[#F2D869]" />
                        <span>Sponsor ({formatINR(prog.budgetOrCostPerChild || 1500)})</span>
                      </Link>

                      <Link
                        to={`/programs/${prog.slug}`}
                        className="px-3.5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider text-[#14382C] bg-white hover:bg-[#EAF3EE] border border-[#E5E7EB] hover:border-[#14382C]/35 transition inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
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
