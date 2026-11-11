import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { PrimaryButton } from '../components/UIComponents';
import api from '../services/api';
import { CheckCircle2, Heart, ArrowLeft, ShieldCheck, Users } from 'lucide-react';
import { operationalProgramsData } from '../data/programsData';

export const ProgramDetail = () => {
  const { slug } = useParams();
  const { formatINR } = useWebsite();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const res = await api.get(`/programs/${slug}`);
        if (res?.program) {
          setProgram(res.program);
        } else {
          const fallback = operationalProgramsData.find((p) => p.slug === slug);
          if (fallback) setProgram(fallback);
        }
      } catch (err) {
        console.warn('Error fetching program detail, using fallback:', err.message);
        const fallback = operationalProgramsData.find((p) => p.slug === slug);
        if (fallback) setProgram(fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchProgram();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-[#F7F7F5] min-h-screen py-36 text-center text-[#A0A4AE] font-medium">
        Loading program details...
      </div>
    );
  }

  if (!program) {
    return (
      <div className="bg-[#F7F7F5] min-h-screen py-36 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#151A2D]">Program Not Found</h2>
        <Link to="/programs" className="text-[#0B0D17] font-semibold underline hover:text-[#FFC43D]">
          Back to all programs
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F7F5] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge={program.category}
        title={program.title}
        subtitle={program.shortDescription}
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Programs', path: '/programs' },
          { label: program.title },
        ]}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 space-y-10">
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#697386] hover:text-[#0B0D17] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Programs</span>
        </Link>

        {/* Cover Image */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-[#E8E8E5] relative h-72 sm:h-96">
          <img
            src={program.coverImage}
            alt={program.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Program Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-[#E8E8E5] shadow-card space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#151A2D] mb-3">Program Overview</h3>
                <p className="text-sm sm:text-base text-[#697386] leading-relaxed whitespace-pre-line">
                  {program.fullDescription}
                </p>
              </div>

              {program.objectives?.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-[#E8E8E5]">
                  <h4 className="text-base font-bold text-[#151A2D]">Key Objectives & Strategy</h4>
                  <div className="space-y-3">
                    {program.objectives.map((obj, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm text-[#151A2D]">
                        <CheckCircle2 className="w-4 h-4 text-[#FFC43D] shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E8E5] shadow-card space-y-6 sticky top-28">
              <h3 className="text-lg font-bold text-[#151A2D]">Sponsor This Initiative</h3>

              <div className="p-5 bg-[#F7F7F5] rounded-2xl border border-[#E8E8E5] space-y-1">
                <span className="text-xs text-[#697386] font-semibold">Estimated Monthly Support:</span>
                <p className="text-3xl font-black text-[#0B0D17]">
                  {formatINR(program.budgetOrCostPerChild || 1500)}
                </p>
                <p className="text-xs text-[#697386]">per child / beneficiary</p>
              </div>

              <div className="text-xs text-[#697386] space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-[#0B0D17] shrink-0" />
                  <span>Beneficiaries: <strong className="text-[#151A2D]">{program.beneficiariesCount?.toLocaleString('en-IN')}+</strong></span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#0B0D17] shrink-0" />
                  <span>50% 80G Tax Exemption Applicable</span>
                </div>
              </div>

              <Link
                to={`/donate?program=${encodeURIComponent(program.title)}&amount=${program.budgetOrCostPerChild || 1500}`}
                className="w-full py-3.5 rounded-full font-bold text-sm text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-md text-center flex items-center justify-center gap-2 transition"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Donate to this Program</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
