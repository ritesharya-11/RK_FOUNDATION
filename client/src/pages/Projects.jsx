import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  ShieldCheck,
  Activity,
  Building2,
} from 'lucide-react';

export const Projects = () => {
  // Verified Medical Emergency Cases
  const emergencyCases = [
    {
      _id: 'gita-kumari',
      name: 'Gita Kumari',
      age: '1 Year',
      gender: 'Female',
      coverImage: '/cases/gita-kumari.jpg',
      hospital: 'Safdarjung Hospital, New Delhi',
      brief: 'Undergoing treatment for congenital heart defect requiring corrective cardiac surgery and pediatric care.',
      tag: 'Critical Surgery',
    },
    {
      _id: 'baby-of-deepa',
      name: 'Baby of Deepa',
      age: '12 Days',
      gender: 'Male',
      coverImage: '/cases/baby-of-deepa.jpg',
      hospital: "Kalawati Saran Children's Hospital, New Delhi",
      brief: 'Receiving intensive phototherapy and specialized incubator care for newborn clinical complications.',
      tag: 'NICU Care',
    },
    {
      _id: 'baby-of-shivani',
      name: 'Baby of Shivani',
      age: '14 Days',
      gender: 'Male',
      coverImage: '/cases/baby-of-shivani.jpg',
      hospital: 'AIIMS NICU Department, New Delhi',
      brief: 'Receiving continuous neonatal respiratory monitoring and vital pediatric life-support.',
      tag: 'Urgent Care',
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen text-[#323D3D] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ========================================================
            1. SECTION HEADER (Exact Reference: media_1794818637454_2b67375f.jpg)
        ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-3 pt-2">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-[#FFF4EB] text-[#F67708] border border-[#F67708]/30 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-[#F67708]" />
            <span>Verified Medical Relief • Direct Hospital Disbursement</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E293B] tracking-tight">
            Live Beneficiary <span className="text-[#F67708]">Emergency Cases</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed max-w-2xl mx-auto">
            Critical medical appeals for newborns, children, and vulnerable patients requiring urgent hospital care.
            Every case has been independently verified with medical documentation and family consent.
          </p>
        </div>

        {/* ========================================================
            2. STATUTORY CONSENT & PRIVACY BOX (Exact Reference)
        ======================================================== */}
        <div className="bg-[#FAF7F2] border border-[#E8DFC9] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 max-w-5xl mx-auto shadow-xs">
          <div className="p-2 rounded-xl bg-[#FFF4EB] border border-[#F67708]/30 shrink-0 mt-0.5">
            <ShieldCheck className="w-5 h-5 text-[#F67708]" />
          </div>
          <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed pt-0.5">
            <strong className="text-[#1E293B] font-bold">Beneficiary Privacy & Statutory Consent Policy:</strong>{' '}
            Identifying details and hospital admission estimates are published only after written guardian consent has been reviewed. 100% of case donations are transferred directly to authorized hospital treasury accounts.
          </p>
        </div>

        {/* ========================================================
            3. COMPACT & CLEAN EMERGENCY CASES GRID
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto pt-2">
          {emergencyCases.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E3D9CF] shadow-xs hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={c.coverImage}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Hospital Verified Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-md text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Hospital Verified</span>
                  </div>
                  {/* Category Tag */}
                  <div className="absolute top-2.5 right-2.5 bg-white/95 text-[#036C6C] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                    {c.tag}
                  </div>
                </div>

                {/* Candidate Info */}
                <div className="p-4 sm:p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#697777] font-semibold">
                    <span>{c.age}</span>
                    <span>{c.gender}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#1E293B] group-hover:text-[#F67708] transition-colors">
                      {c.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-[#036C6C] font-semibold mt-1">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{c.hospital}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3">
                    {c.brief}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-4 sm:p-5 pt-0">
                <Link
                  to={`/donate?campaignId=${encodeURIComponent(c._id)}&amount=2500`}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F67708] hover:bg-[#E06800] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs hover:shadow transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Support {c.name}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
