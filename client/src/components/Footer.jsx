import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const Footer = () => {
  const { settings, showToast } = useWebsite();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const phone = settings.contact?.phone || '+91-9876543210';
  const emailAddr = settings.contact?.email || 'contact@rkfoundation.org';
  const address =
    settings.contact?.address ||
    'E-48, Institutional Area, Sector 62, Noida, Delhi-NCR, India - 201309';

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    if (showToast) {
      showToast('Thank you for subscribing to RK Foundation newsletter!', 'success');
    }
  };

  return (
    <footer className="w-full bg-[#036C6C] text-white pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ========================================================
            1. TOP NEWSLETTER STRIP (Exact Reference Image 11)
            Asymmetric Deep Teal container with rounded-tr-[40px]
        ======================================================== */}
        <div className="bg-[#025858] border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Title */}
            <div className="lg:col-span-4 space-y-1">
              <span className="text-[10px] font-bold tracking-widest uppercase text-[#F67708]">
                STAY UPDATED WITH OUR IMPACT
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                SIGN UP TO RK FOUNDATION
              </h3>
            </div>

            {/* Newsletter Form */}
            <div className="lg:col-span-8">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3 bg-white/10 rounded-xl text-emerald-300 text-xs font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>You have successfully joined our community updates!</span>
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3"
                >
                  <div className="sm:col-span-4">
                    <input
                      type="text"
                      placeholder="FULL NAME"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-[#014040] border border-white/15 text-white placeholder-teal-200/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F67708]"
                    />
                  </div>
                  <div className="sm:col-span-5">
                    <input
                      type="email"
                      placeholder="EMAIL"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-lg bg-[#014040] border border-white/15 text-white placeholder-teal-200/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#F67708]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <button
                      type="submit"
                      className="w-full btn-vermillion py-2.5 text-xs font-bold shadow-md tracking-wider uppercase cursor-pointer"
                    >
                      SUBMIT NOW
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MAIN 4-COLUMN FOOTER GRID (Exact Reference Image 11)
        ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Primary Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-teal-200 block border-b border-white/10 pb-2">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> HOME
                </Link>
              </li>
              <li>
                <Link to="/about" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> ABOUT US
                </Link>
              </li>
              <li>
                <Link to="/programs" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> OUR PROGRAMMES
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> GALLERY
                </Link>
              </li>
              <li>
                <Link to="/projects" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> LIVE CAUSES
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Legal & Transparency */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-teal-200 block border-b border-white/10 pb-2">
              COMPLIANCE
            </span>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <Link to="/contact" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> CONTACT US
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> PRIVACY POLICY
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> TERMS & CONDITIONS
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> REFUND POLICY
                </Link>
              </li>
              <li>
                <Link to="/receipt/verify" className="flex items-center gap-1.5 text-teal-100 hover:text-[#F67708] transition">
                  <span className="text-[#F67708] font-bold">›</span> 80G RECEIPT VERIFY
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info with Orange Circular Icons */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-[11px] font-bold tracking-widest uppercase text-teal-200 block border-b border-white/10 pb-2">
              REGISTERED OFFICE
            </span>
            <div className="space-y-3.5 text-xs text-teal-100">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F67708] flex items-center justify-center shrink-0 mt-0.5 shadow-sm text-white">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-relaxed">
                  {address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F67708] flex items-center justify-center shrink-0 shadow-sm text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <a href={`tel:${phone}`} className="hover:text-white transition font-mono">
                  {phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F67708] flex items-center justify-center shrink-0 shadow-sm text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <a href={`mailto:${emailAddr}`} className="hover:text-white transition">
                  {emailAddr}
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: Right Dark Box "LET'S START A CONVERSATION" */}
          <div className="lg:col-span-4 bg-[#024747] border border-white/10 rounded-2xl p-6 sm:p-7 space-y-3 shadow-lg">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F67708] block">
              COLLABORATE WITH US
            </span>
            <h4 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight">
              LET'S START A CONVERSATION
            </h4>
            <p className="text-xs text-teal-100/90 leading-relaxed">
              Whether it's about CSR collaboration, institutional support, volunteering, or field visits, we are here to listen and respond. Together, we can create lasting change.
            </p>
            <div className="pt-2">
              <Link
                to="/contact"
                className="btn-vermillion px-6 py-2.5 text-xs font-bold uppercase shadow-md"
              >
                CONTACT US
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-teal-200/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#F67708]" />
            <span>
              © 2026 RK FOUNDATION. Registered Public Charitable Trust. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>Tax Exemption 80G / 12A Certified</span>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-white transition text-teal-300/60">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
