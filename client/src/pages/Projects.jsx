import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import api from '../services/api';
import {
  Heart,
  ShieldCheck,
  Activity,
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock,
  FileText,
  BadgeCheck,
} from 'lucide-react';

export const Projects = () => {
  const { formatINR } = useWebsite();
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Verified Medical Emergency Cases (Exact Reference: media_1794818637454_2b67375f.jpg)
  const emergencyCases = [
    {
      _id: 'gita-kumari',
      name: 'Gita Kumari',
      age: '1 Years',
      gender: 'Female',
      coverImage: '/cases/gita-kumari.jpg',
      category: 'Pediatric Cardiac',
      hospital: 'Safdarjung Hospital, New Delhi',
      condition:
        'Ventricular Septal Defect (VSD) & Severe Pulmonary Hypertension requiring immediate corrective open-heart surgery and pediatric ICU monitoring.',
      raisedAmount: 195000,
      targetAmount: 250000,
      caseNumber: 'RKF-MED-2026-081',
      tag: 'Critical Surgery',
      donorsCount: 142,
    },
    {
      _id: 'baby-of-deepa',
      name: 'Baby of Deepa',
      age: '12 Days',
      gender: 'Male',
      coverImage: '/cases/baby-of-deepa.jpg',
      category: 'Neonatal Care',
      hospital: "Kalawati Saran Children's Hospital, New Delhi",
      condition:
        'Extreme Neonatal Sepsis, severe clinical jaundice & intensive multi-spectrum phototherapy with urgent incubator support.',
      raisedAmount: 135000,
      targetAmount: 180000,
      caseNumber: 'RKF-MED-2026-084',
      tag: 'NICU Care',
      donorsCount: 98,
    },
    {
      _id: 'baby-of-shivani',
      name: 'Baby of Shivani',
      age: '14 Days',
      gender: 'Male',
      coverImage: '/cases/baby-of-shivani.jpg',
      category: 'Urgent NICU',
      hospital: 'AIIMS NICU Department, New Delhi',
      condition:
        'Preterm Neonatal Respiratory Distress Syndrome requiring synchronized mechanical ventilation and ongoing surfactant therapy.',
      raisedAmount: 245000,
      targetAmount: 320000,
      caseNumber: 'RKF-MED-2026-089',
      tag: 'Urgent Care',
      donorsCount: 176,
    },
  ];

  // Filter cases strictly among verified emergency beneficiaries
  const filteredCases = emergencyCases.filter((item) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Pediatric Cardiac') return item.category === 'Pediatric Cardiac';
    if (selectedFilter === 'Neonatal Care') return item.category === 'Neonatal Care';
    if (selectedFilter === 'Urgent NICU') return item.category === 'Urgent NICU';
    return true;
  });

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

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {['All', 'Pediatric Cardiac', 'Neonatal Care', 'Urgent NICU'].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${selectedFilter === filter
                ? 'bg-[#F67708] text-white shadow-sm'
                : 'bg-white text-slate-600 hover:text-[#323D3D] hover:bg-slate-50 border border-[#E3D9CF]'
                }`}
            >
              {filter === 'All' ? 'All Live Cases' : filter}
            </button>
          ))}
        </div>

        {/* ========================================================
            3. 3-COLUMN EMERGENCY CASES GRID (Exact Reference)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto pt-2">
          {filteredCases.map((c) => {
            const percent = Math.min(100, Math.round((c.raisedAmount / c.targetAmount) * 100));

            return (
              <div
                key={c._id}
                className="bg-white rounded-2xl overflow-hidden border border-[#E3D9CF] shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo container with Hospital Verified Pill */}
                  <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
                    <img
                      src={c.coverImage}
                      alt={c.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hospital Verified Badge (Top Left) */}
                    <div className="absolute top-3 left-3 bg-[#111827]/85 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm border border-white/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Hospital Verified</span>
                    </div>

                    {/* Category Tag (Top Right) */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-[#036C6C] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {c.tag}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    {/* Meta Row: Age & Gender */}
                    <div className="flex items-center justify-between text-xs text-slate-500 font-semibold tracking-wide">
                      <span>Age: {c.age}</span>
                      <span>Gender: {c.gender}</span>
                    </div>

                    {/* Patient Name */}
                    <div>
                      <h2 className="text-xl sm:text-2xl font-black text-[#1E293B] tracking-tight group-hover:text-[#F67708] transition-colors">
                        {c.name}
                      </h2>
                      <div className="flex items-center gap-1.5 text-xs text-[#036C6C] font-semibold mt-1">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{c.hospital}</span>
                      </div>
                    </div>

                    {/* EXACT CONDITION BOX FORMAT FROM SCREENSHOT */}
                    <div className="bg-[#FFF4EC] border border-[#F67708]/20 rounded-xl p-3 text-xs">
                      <span className="text-[#F67708] font-bold block mb-1">Condition:</span>
                      <p className="text-slate-700 leading-relaxed font-medium">
                        {c.condition}
                      </p>
                    </div>

                    {/* Progress Bar & Financials */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex justify-between items-baseline text-xs">
                        <span className="text-slate-500 font-medium">
                          Raised: <strong className="text-[#323D3D] font-bold">{formatINR(c.raisedAmount)}</strong>
                        </span>
                        <span className="text-[#F67708] font-black">{percent}%</span>
                      </div>
                      <div className="w-full bg-[#FAF7F2] border border-[#E3D9CF] h-2.5 rounded-full overflow-hidden p-0.5">
                        <div
                          className="bg-[#F67708] h-full rounded-full transition-all duration-700"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[11px] text-slate-400">
                        <span>Target: {formatINR(c.targetAmount)}</span>
                        <span>Case #{c.caseNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-5 sm:p-6 pt-0 space-y-2">
                  <Link
                    to={`/donate?campaignId=${encodeURIComponent(c._id)}&amount=2500`}
                    className="w-full py-3 px-4 rounded-xl bg-[#F67708] hover:bg-[#E06800] text-white font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Donate to this Case</span>
                  </Link>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Direct Hospital Transfer • 80G Tax Exemption</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================
            4. TRUST & STATUTORY VERIFICATION ASSURANCE
        ======================================================== */}
        <div className="max-w-5xl mx-auto pt-8 border-t border-[#E3D9CF]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-5 rounded-2xl border border-[#E3D9CF] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FFF4EB] border border-[#F67708]/30 flex items-center justify-center mx-auto text-[#F67708]">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1E293B]">Hospital Disbursement</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                100% of case donations are transferred directly to authorized hospital treasury accounts.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E3D9CF] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FFF4EB] border border-[#F67708]/30 flex items-center justify-center mx-auto text-[#F67708]">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1E293B]">Doctor Verified</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hospital admission estimates and patient documentation verified with treating physicians.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-[#E3D9CF] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FFF4EB] border border-[#F67708]/30 flex items-center justify-center mx-auto text-[#F67708]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-[#1E293B]">80G Tax Exemption</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Receive instant 80G compliant receipt with 50% income tax exemption under Indian IT laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
