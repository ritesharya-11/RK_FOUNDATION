import React, { useState } from 'react';
import {
  Video,
  Play,
  X,
  Users,
  MapPin,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Heart,
  ExternalLink,
} from 'lucide-react';

const PARENT_VIDEOS = [
  {
    _id: 'vid-1',
    title: 'RK Foundation – Patient Recovery & Doctor Consultation',
    beneficiaryName: 'Child Critical Care',
    youtubeUrl: 'https://www.youtube.com/shorts/VVBh_j3XFkk',
    youtubeId: 'VVBh_j3XFkk',
    category: 'CHILD HEALTHCARE',
    organization: 'RK Foundation',
    location: 'Delhi NCR',
    description:
      'Heartfelt testimony and medical review following direct hospital financial assistance and emergency surgical treatment.',
  },
  {
    _id: 'vid-2',
    title: 'RK Foundation – Bedside Ground Review & Recovery',
    beneficiaryName: 'Inpatient Pediatric Support',
    youtubeUrl: 'https://www.youtube.com/watch?v=0p7ChGjMayU',
    youtubeId: '0p7ChGjMayU',
    category: 'CHILD HEALTHCARE',
    organization: 'RK Foundation',
    location: 'Delhi NCR',
    description:
      'Mother shares gratitude bedside at the hospital after complete treatment costs were disbursed to the hospital treasury.',
  },
  {
    _id: 'vid-3',
    title: 'RK Foundation – Parent Testimonial & Hospital Verification',
    beneficiaryName: 'Emergency Pediatric Relief',
    youtubeUrl: 'https://www.youtube.com/watch?v=_nEpnWdtzz',
    youtubeId: '_nEpnWdtzz',
    category: 'CHILD HEALTHCARE',
    organization: 'RK Foundation',
    location: 'Delhi NCR',
    description:
      'Parents recount their journey from financial distress to relief as their child receives timely medical care.',
  },
  {
    _id: 'vid-4',
    title: 'RK Foundation – Ground Field Testimonial & Family Voice',
    beneficiaryName: 'Pediatric Medical Aid',
    youtubeUrl: 'https://youtu.be/gXJ2WrFNQQI?si=iMStFedN1rFURkqz',
    youtubeId: 'gXJ2WrFNQQI',
    category: 'CHILD HEALTHCARE',
    organization: 'RK Foundation',
    location: 'Delhi NCR',
    description:
      'Authentic ground video documentation of parents thanking donors and the foundation for emergency hospital care.',
  },
];

export const ParentsVideo = () => {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="bg-white min-h-screen text-[#121316] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ========================================================
            1. SECTION HEADER (Exact Reference: media_1794820375198_ac4b4dfa.jpg)
        ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-3 pt-2">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FFF4EB] text-[#121316] border border-slate-300 shadow-xs">
            <Video className="w-3.5 h-3.5 text-[#121316]" />
            <span>Verified YouTube Video Reviews & Testimonials</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Parents Video & <span className="text-[#121316]">Ground Reviews</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-3xl mx-auto">
            Direct video reviews and heartfelt testimonials from parents, families, and guardians who received critical healthcare aid, life-saving surgeries, and child relief support through RK Foundation.
          </p>

          {/* 3 Trust Guarantee Badges (Exact Reference) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 pt-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#121316] shrink-0" />
              <span>100% Verified Parent Testimonials</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-[#121316] shrink-0" />
              <span>Registered Public Charitable Trust</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="w-4 h-4 text-[#121316] shrink-0" />
              <span>80G Tax Exemption on All Aid</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. VIDEO CARDS GRID (Exact Reference)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto pt-4">
          {PARENT_VIDEOS.map((v) => (
            <div
              key={v._id}
              onClick={() => setActiveVideo(v)}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              {/* Video Thumbnail with Category Tag & Play Button */}
              <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900 flex items-center justify-center">
                <img
                  src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                  alt={v.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  onError={(e) => {
                    // Fallback to high-res or neutral placeholder if needed
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80';
                  }}
                />

                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

                {/* Category Badge Top Left */}
                <div className="absolute top-3 left-3 bg-[#111827]/85 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm border border-white/10">
                  {v.category}
                </div>

                {/* YouTube Red Play Button in Center */}
                <div className="w-14 h-14 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-[#CC0000] transition-all duration-300">
                  <Play className="w-6 h-6 fill-white translate-x-0.5" />
                </div>
              </div>

              {/* Card Meta & Title */}
              <div className="p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#121316]">
                    <Users className="w-3.5 h-3.5" />
                    <span>{v.organization}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{v.location}</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm sm:text-base text-[#1E293B] group-hover:text-[#121316] transition-colors line-clamp-2">
                  {v.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================
            3. INTERACTIVE YOUTUBE VIDEO MODAL
        ======================================================== */}
        {activeVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
            <div className="bg-[#111827] rounded-3xl max-w-3xl w-full p-4 sm:p-6 relative shadow-2xl space-y-4">
              {/* Header with Close */}
              <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#121316] animate-pulse" />
                  <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-lg">
                    {activeVideo.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition cursor-pointer"
                  aria-label="Close Video"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* YouTube Video Embed Player */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              {/* Footer Note */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-white" />
                  <span>100% Verified Beneficiary Family Ground Documentation</span>
                </div>
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#121316] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
