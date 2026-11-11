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
    <div className="bg-[#F7F7F5] min-h-screen">
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
        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0B0D17] text-[#FFC43D] shadow-md'
                  : 'bg-white text-[#697386] hover:text-[#0B0D17] hover:bg-[#F7F7F5] border border-[#E8E8E5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Selected Category Header (if filtered) */}
        {selectedCategory !== 'All' && (
          <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-[#E8E8E5]">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFC43D]"></span>
              <span className="text-xs sm:text-sm font-bold text-[#151A2D]">
                Showing operational initiatives under: <strong>{selectedCategory}</strong>
              </span>
            </div>
            <button
              onClick={() => handleCategorySelect('All')}
              className="text-xs font-bold text-[#697386] hover:text-[#0B0D17] underline cursor-pointer"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Programs Grid */}
        {loading ? (
          <div className="py-24 text-center text-[#A0A4AE] font-medium">Loading programs...</div>
        ) : programs.length === 0 ? (
          <div className="py-24 text-center text-[#697386]">No programs found in this category.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog) => (
              <div
                key={prog._id}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-[#E8E8E5] flex flex-col group hover:-translate-y-1 hover:shadow-elevated transition-all duration-300"
              >
                <div className="h-56 overflow-hidden relative">
                  <img
                    src={prog.coverImage}
                    alt={prog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-[#0B0D17]/85 backdrop-blur-md text-[#FFC43D] border border-white/10 text-[11px] font-bold px-3 py-1 rounded-full">
                    {prog.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors leading-snug">
                      {prog.title}
                    </h3>
                    <p className="text-xs text-[#697386] leading-relaxed line-clamp-3">
                      {prog.shortDescription}
                    </p>

                    {prog.objectives?.length > 0 && (
                      <div className="space-y-1.5 pt-2">
                        {prog.objectives.slice(0, 3).map((obj, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-[#151A2D]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC43D] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{obj}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-[#E8E8E5] space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#697386]">Impact Metric:</span>
                      <strong className="text-[#151A2D] font-bold">
                        {prog.beneficiariesCount?.toLocaleString('en-IN')}+ Beneficiaries
                      </strong>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/donate?program=${encodeURIComponent(prog.title)}`}
                        className="flex-1 py-2.5 rounded-full text-xs font-bold text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] text-center transition flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Sponsor ({formatINR(prog.budgetOrCostPerChild || 1500)})</span>
                      </Link>

                      <Link
                        to={`/programs/${prog.slug}`}
                        className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#151A2D] bg-[#F7F7F5] hover:bg-[#E8E8E5] border border-[#E8E8E5] transition"
                      >
                        Details
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
