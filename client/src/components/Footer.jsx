import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import {
  Heart,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Play,
  ArrowUp,
  Info,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const Footer = () => {
  const { settings } = useWebsite();
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const phone = settings.contact?.phone || '+91-9876543210';
  const email = settings.contact?.email || 'contact@rkfoundation.org';
  const address = settings.contact?.address || 'E-48, Institutional Area, Sector 62, Noida, Delhi-NCR, India - 201309';
  const darpanUid = settings.compliance?.ngoDarpanUid || 'DL/2021/0298412';
  const pan = settings.compliance?.panNumber || 'AAETR5566K';
  const regNo = settings.compliance?.trustRegistrationNo || 'TRUST/DL/2021/887412';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B0D17] text-[#A0A4AE] pt-16 pb-12 border-t border-[#171923] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* ========================================================
            1. TOP IMPACT CALLOUT BOX
            Matches Signature Theme (#171923, #FFC43D)
        ======================================================== */}
        <div className="bg-[#171923] border border-white/10 rounded-3xl p-6 sm:p-10 mb-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFC43D]/10 text-[#FFC43D] border border-[#FFC43D]/25">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFC43D]" />
              <span>50% Tax Benefit Under Section 80G</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Transform a Child's Future or Save a Life Today
            </h3>
            <p className="text-sm text-[#A0A4AE] max-w-xl font-normal">
              Every single rupee contributed goes towards child education, women livelihood training, or life-saving pediatric healthcare. 100% transparent and audited.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/donate"
              className="px-7 py-3 rounded-full font-bold text-sm text-[#0B0D17] bg-[#FFC43D] hover:bg-[#EBAF20] shadow-md transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Donate Now</span>
              <span className="w-5 h-5 rounded-full bg-[#0B0D17] text-white flex items-center justify-center font-bold text-[10px]">
                ↗
              </span>
            </Link>
            <Link
              to="/volunteer"
              className="px-6 py-3 rounded-full font-semibold text-sm text-white bg-white/10 hover:bg-white/20 border border-white/10 transition"
            >
              Become a Volunteer
            </Link>
          </div>
        </div>

        {/* ========================================================
            2. 4-COLUMN FOOTER GRID (Matching Reference UI)
            Col 1: Trust Info & View Certificates
            Col 2: Quick Navigation
            Col 3: Our Work in Action (Video Card)
            Col 4: Registered Office & Socials
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-[#171923]">
          {/* Column 1: Trust Info & Certificates (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <Link to="/" className="inline-block group py-1">
                <img
                  src="/logo-dark.png"
                  alt={settings.siteName || 'RK FOUNDATION'}
                  className="h-11 sm:h-12 w-auto object-contain transition-opacity group-hover:opacity-90"
                />
              </Link>
              <div className="flex flex-col justify-center px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] leading-tight font-medium text-slate-300">
                <span>Reg: <strong className="text-white font-mono">887412</strong></span>
                <span>PAN: <strong className="text-white font-mono">AAETR5566K</strong></span>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-[#A0A4AE]">
              Dedicated to uplifting underprivileged children through education, nutrition, healthcare, and empowering women in difficult socioeconomic circumstances across Delhi-NCR.
            </p>

            <div className="pt-2">
              <Link
                to="/about#compliance"
                className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition group"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Registered Public Trust</span>
                <span className="text-[#FFC43D] group-hover:translate-x-1 transition-transform ml-1">
                  View Certificates →
                </span>
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Navigation (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <span className="w-1 h-4 bg-[#FFC43D] rounded-full inline-block" />
              <span>Quick Navigation</span>
            </div>

            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>About Our Organization</span>
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Our Charitable Programs</span>
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Verified Live Cases</span>
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Photo Gallery & Archives</span>
                </Link>
              </li>
              <li>
                <Link to="/about#compliance" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Certificates & Legal Compliance</span>
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Documented Success Stories</span>
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Parents Video Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-[#A0A4AE] hover:text-[#FFC43D] transition flex items-center gap-1.5">
                  <span className="text-slate-500">›</span>
                  <span>Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Our Work in Action - Video Card (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <span className="w-1 h-4 bg-[#FFC43D] rounded-full inline-block" />
              <span>Our Work in Action</span>
            </div>

            {/* Video Preview Card */}
            <div className="bg-[#171923] rounded-2xl overflow-hidden border border-white/10 group shadow-md">
              <div
                onClick={() => setVideoModalOpen(true)}
                className="relative h-28 w-full overflow-hidden cursor-pointer"
              >
                <img
                  src="/programs/children-development.jpg"
                  alt="RK Foundation ground relief documentary"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <div className="w-10 h-7 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
                <span className="absolute top-2 left-2 bg-[#0B0D17]/85 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  RK Foundation | NGO
                </span>
              </div>

              <div className="p-3">
                <p className="text-[11px] text-[#A0A4AE] leading-relaxed">
                  Watch our on-ground food distribution, education drives, and healthcare relief camps across Delhi-NCR.
                </p>
                <Link
                  to="/activities"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#FFC43D] hover:underline mt-2"
                >
                  <span>Watch Parents Video Reviews</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Column 4: Registered Office & Socials (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider">
              <span className="w-1 h-4 bg-[#FFC43D] rounded-full inline-block" />
              <span>Registered Office</span>
            </div>

            <div className="space-y-2.5 text-xs text-[#A0A4AE]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FFC43D] shrink-0 mt-0.5" />
                <span className="leading-snug">{address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FFC43D] shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition font-mono">
                  {phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#FFC43D] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition truncate" title={email}>
                  {email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Connect with RK Foundation
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={settings.socialLinks?.facebook || 'https://facebook.com'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center text-xs text-white transition-all"
                >
                  f
                </a>
                <a
                  href={settings.socialLinks?.twitter || 'https://x.com'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X (Twitter)"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center text-xs text-white transition-all font-bold"
                >
                  𝕏
                </a>
                <a
                  href={settings.socialLinks?.youtube || 'https://youtube.com'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center text-xs text-white transition-all"
                >
                  ▶
                </a>
                <a
                  href={settings.socialLinks?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#FFC43D] hover:text-[#0B0D17] flex items-center justify-center text-xs text-white transition-all font-bold"
                >
                  ig
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. STATUTORY NOTICE BANNER
            Matches Reference Notice Layout Exactly
        ======================================================== */}
        <div className="bg-[#171923] border border-white/10 rounded-2xl p-4 sm:p-5 my-8 flex items-start sm:items-center gap-3.5 text-xs text-[#A0A4AE]">
          <div className="w-7 h-7 rounded-full bg-[#FFC43D]/20 text-[#FFC43D] flex items-center justify-center shrink-0">
            <Info className="w-4 h-4" />
          </div>
          <p className="leading-relaxed">
            <strong className="text-white">Statutory Notice:</strong> RK FOUNDATION is registered under the Indian Trusts Act with NGO Darpan UID <strong className="text-white font-mono">{darpanUid}</strong> and PAN <strong className="text-white font-mono">{pan}</strong>. Official computer-generated receipts are issued for all contributions. Tax exemption eligibility is subject to prevailing provisions of the Income Tax Act, 1961.
          </p>
        </div>

        {/* ========================================================
            4. BOTTOM BAR: COPYRIGHT & POLICIES
        ======================================================== */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#697386]">
          <p>
            © {new Date().getFullYear()} {settings.siteName || 'RK FOUNDATION'}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/terms-conditions" className="hover:text-white transition">
              Terms & Conditions
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/refund-policy" className="hover:text-white transition">
              7-Day Refund Policy
            </Link>
            <span className="text-white/20">•</span>
            <Link to="/admin" className="hover:text-white transition">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to Top"
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#FFC43D] hover:bg-[#EBAF20] text-[#0B0D17] flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 z-50 group border border-white/20"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

      {/* Simple Video Modal */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="bg-[#171923] border border-white/20 rounded-3xl p-6 max-w-2xl w-full text-white space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">RK Foundation — Field Operations & Relief</h3>
              <button
                onClick={() => setVideoModalOpen(false)}
                className="text-slate-400 hover:text-white text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="RK Foundation Field Operations Documentary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-[#A0A4AE]">
              Documentary footage of ongoing food distribution drives, non-formal bridge schooling, and medical aid camps conducted across Delhi-NCR bastis.
            </p>
          </div>
        </div>
      )}
    </footer>
  );
};
