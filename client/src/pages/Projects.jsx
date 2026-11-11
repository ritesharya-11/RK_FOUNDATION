import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import api from '../services/api';
import { Heart, MapPin, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';

export const Projects = () => {
  const { formatINR } = useWebsite();
  const [projects, setProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = '/projects';
        if (selectedFilter === 'urgent') {
          url = '/projects?urgent=true';
        } else if (selectedFilter !== 'All') {
          url = `/projects?category=${encodeURIComponent(selectedFilter)}`;
        }
        const res = await api.get(url);
        if (res?.projects) {
          setProjects(res.projects);
        }
      } catch (err) {
        console.warn('Error fetching campaigns:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [selectedFilter]);

  return (
    <div className="bg-[#F7F7F5] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Active Appeals & Live Cases"
        title="Verified Emergency Relief Campaigns"
        subtitle="Support critical pediatric medical surgeries, slum learning centers, and emergency nutrition drives. 100% of your gift reaches verified beneficiaries with full 80G tax receipts."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Live Cases' },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-12">
        {/* Filter Options */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setSelectedFilter('All')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
              selectedFilter === 'All'
                ? 'bg-[#0B0D17] text-[#FFC43D] shadow-md'
                : 'bg-white text-[#697386] hover:text-[#151A2D] hover:bg-white/80 border border-[#E8E8E5]'
            }`}
          >
            All Campaigns
          </button>
          <button
            onClick={() => setSelectedFilter('urgent')}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              selectedFilter === 'urgent'
                ? 'bg-[#0B0D17] text-[#FFC43D] shadow-md border border-[#FFC43D]/40'
                : 'bg-white text-[#151A2D] hover:bg-white/80 border border-[#E8E8E5]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#FFC43D] animate-ping" />
            <span>Urgent Cases Only</span>
          </button>
        </div>

        {/* Campaigns Grid */}
        {loading ? (
          <div className="py-24 text-center text-[#A0A4AE] font-medium">Loading campaigns...</div>
        ) : projects.length === 0 ? (
          <div className="py-24 text-center text-[#697386]">No campaigns found in this view.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((proj) => {
              const percent = Math.min(
                100,
                Math.round(((proj.raisedAmount || 0) / (proj.targetAmount || 1)) * 100)
              );

              return (
                <div
                  key={proj._id}
                  className="bg-white rounded-3xl overflow-hidden shadow-card border border-[#E8E8E5] flex flex-col group hover:-translate-y-1 hover:shadow-elevated transition-all duration-300"
                >
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    {proj.isUrgent && (
                      <span className="absolute top-3 right-3 bg-[#0B0D17]/90 text-[#FFC43D] border border-[#FFC43D]/40 text-[11px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                        Urgent Appeal
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 bg-[#0B0D17]/85 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/10">
                      <MapPin className="w-3 h-3 text-[#FFC43D]" />
                      <span>{proj.location}</span>
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2">
                      <span className="text-[11px] font-bold text-[#FFC43D] uppercase tracking-wider">
                        {proj.category}
                      </span>
                      <h3 className="text-lg font-bold text-[#151A2D] group-hover:text-[#0B0D17] transition-colors line-clamp-2 leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#697386] line-clamp-3 leading-relaxed">
                        {proj.summary}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-[#151A2D]">
                          Raised: {formatINR(proj.raisedAmount || 0)}
                        </span>
                        <span className="text-[#0B0D17] font-black">{percent}%</span>
                      </div>

                      <div className="w-full h-2.5 bg-[#F7F7F5] border border-[#E8E8E5] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0B0D17] to-[#FFC43D] rounded-full transition-all duration-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-[#697386]">
                        <span>Goal: {formatINR(proj.targetAmount)}</span>
                        <span>{proj.donorsCount || 0} Donors</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E8E8E5] flex items-center gap-3">
                      <Link
                        to={`/donate?campaignId=${proj._id}`}
                        className="flex-1 py-2.5 rounded-full font-bold text-xs text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-sm text-center transition flex items-center justify-center gap-1.5"
                      >
                        <Heart className="w-3.5 h-3.5 fill-current" />
                        <span>Support Cause</span>
                      </Link>

                      <Link
                        to={`/projects/${proj.slug}`}
                        className="px-4 py-2.5 rounded-full font-semibold text-xs text-[#151A2D] bg-[#F7F7F5] hover:bg-[#E8E8E5] border border-[#E8E8E5] transition"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
