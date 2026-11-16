import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import api from '../services/api';
import { Heart, MapPin, ArrowLeft, ShieldCheck, Users, Calendar, AlertCircle } from 'lucide-react';

export const ProjectDetail = () => {
  const { slug } = useParams();
  const { formatINR } = useWebsite();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${slug}`);
        if (res?.project) {
          setProject(res.project);
        }
      } catch (err) {
        console.warn('Error fetching campaign detail:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-36 text-center text-[#A0A4AE] font-medium">
        Loading campaign details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen py-36 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#323D3D]">Campaign Not Found</h2>
        <Link to="/projects" className="text-[#036C6C] font-semibold underline hover:text-[#F67708]">
          Back to all campaigns
        </Link>
      </div>
    );
  }

  const percent = Math.min(
    100,
    Math.round(((project.raisedAmount || 0) / (project.targetAmount || 1)) * 100)
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge={project.isUrgent ? 'Urgent Live Appeal' : project.category}
        title={project.title}
        subtitle={project.summary}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Live Cases', path: '/projects' },
          { label: project.title },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#697777] hover:text-[#036C6C] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Campaigns</span>
        </Link>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-[#E3D9CF] relative h-72 sm:h-96">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-[#036C6C]/85 backdrop-blur-md text-white text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/10">
            <MapPin className="w-3.5 h-3.5 text-[#F67708]" />
            <span>Location: {project.location}</span>
          </div>
        </div>

        {/* Content & Donation Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E3D9CF] shadow-card space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#323D3D] mb-3">The Story & Appeal</h3>
                <p className="text-sm sm:text-base text-[#697777] leading-relaxed whitespace-pre-line">
                  {project.story}
                </p>
              </div>

              {project.beneficiaryNameOrGroup && (
                <div className="p-5 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF] text-xs sm:text-sm text-[#697777] space-y-1">
                  <p className="font-bold text-[#323D3D]">Direct Beneficiary Group:</p>
                  <p>{project.beneficiaryNameOrGroup}</p>
                </div>
              )}
            </div>
          </div>

          {/* Donation Progress & Action */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E3D9CF] shadow-card space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-[#323D3D]">Fundraising Status</h3>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[#323D3D] text-base">
                    {formatINR(project.raisedAmount || 0)}
                  </span>
                  <span className="text-[#036C6C] font-black text-base">{percent}%</span>
                </div>

                <div className="w-full h-3 bg-[#FAF7F2] border border-[#E3D9CF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#036C6C] to-[#F67708] rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-[#697777] pt-1">
                  <span>Goal: {formatINR(project.targetAmount)}</span>
                  <span>{project.donorsCount || 0} Generous Donors</span>
                </div>
              </div>

              <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E3D9CF] text-xs text-[#323D3D] space-y-1">
                <div className="flex items-center gap-2 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#036C6C]" />
                  <span>50% Tax Exemption Under 80G</span>
                </div>
                <p className="text-[11px] text-[#697777]">
                  Instant downloadable official 80G tax receipt provided upon payment.
                </p>
              </div>

              <Link
                to={`/donate?campaignId=${project._id}`}
                className="w-full py-3.5 rounded-full font-bold text-sm text-[#036C6C] bg-[#F67708] hover:bg-[#E06800] shadow-md text-center flex items-center justify-center gap-2 transition"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Donate to this Cause</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
