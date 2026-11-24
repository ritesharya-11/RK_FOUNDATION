import React from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { PrimaryButton } from '../components/UIComponents';
import { Eye, Target, Heart, Shield, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const MissionVision = () => {
  const { settings } = useWebsite();

  return (
    <div className="bg-white min-h-screen">
      {/* Page Hero */}
      <PageHero
        badge="Our Purpose & Compass"
        title="Mission, Vision & Core Values"
        subtitle="The guiding philosophy shaping every classroom we construct, every medical camp we deploy, and every meal we serve across India."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'About Us', path: '/about' },
          { label: 'Mission & Vision' },
        ]}
      />

      <div className="space-y-20 py-16">
        {/* Mission & Vision Dual Cards */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-[#121316] text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-card space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#121316]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#121316] border border-white/10">
                <Eye className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#121316]">
                Where We Are Heading
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Vision</h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                An equitable, self-reliant India where no child is deprived of education due to poverty, no mother suffers without livelihood dignity, and no family battles critical illness without access to compassionate healthcare.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#18191E] text-white p-8 sm:p-10 rounded-3xl border border-white/10 shadow-card space-y-5 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#121316]/10 rounded-full blur-2xl pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#121316] border border-white/10">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#121316]">
                What We Do Everyday
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Our Mission</h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {settings.missionStatement ||
                  'To transform lives through accessible child education, emergency healthcare relief, women livelihood empowerment, and holistic community rehabilitation across marginalized sectors of society.'}
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Foundation Principles"
            title="Our Core Values"
            description="Our non-negotiable commitments to beneficiaries, donors, and society at large."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-3 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#121316] text-[#121316] flex items-center justify-center mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#121316]">Deep Empathy</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Putting human dignity and genuine care at the heart of every single field project we design and implement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-3 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#121316] text-[#121316] flex items-center justify-center mb-3">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#121316]">Integrity & Trust</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero tolerance for financial opacity. 100% verifiable audits, open books, and direct accountability to our donors.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-3 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#121316] text-[#121316] flex items-center justify-center mb-3">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#121316]">Lasting Self-Reliance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Equipping communities with skills, tools, and knowledge so they can independently sustain their families.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card space-y-3 hover:border-slate-300 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-[#121316] text-[#121316] flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#121316]">Complete Inclusivity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Serving the most marginalized unconditionally without prejudice of gender, faith, caste, or background.
              </p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <PrimaryButton to="/donate" variant="gold">
              Support Our Mission Today
            </PrimaryButton>
          </div>
        </section>
      </div>
    </div>
  );
};
