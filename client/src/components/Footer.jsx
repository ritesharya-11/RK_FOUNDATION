import React from 'react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Heart,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const Footer = () => {
  const { settings } = useWebsite();

  const phone = settings.contact?.phone || '+91-9876543210';
  const emailAddr = settings.contact?.email || 'contact@rkfoundation.org';
  const address =
    settings.contact?.address ||
    'E-48, Institutional Area, Sector 62, Noida, Delhi-NCR, India - 201309';

  return (
    <footer className="w-full bg-[#036C6C] text-white pt-12 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* ========================================================
            MAIN 4-COLUMN FOOTER GRID (Exact Reference Image 11)
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

              {/* Connect with RCT - Social Media Links */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <span className="text-[11px] font-bold tracking-widest uppercase text-teal-200 block">
                  CONNECT WITH RCT
                </span>
                <div className="flex items-center gap-2.5">
                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/RebirthCareTrust"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#024747] hover:bg-[#F67708] border border-white/15 text-white flex items-center justify-center transition shadow-sm hover:scale-110"
                    title="Facebook - Rebirth Care Trust"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>

                  {/* X (Twitter) */}
                  <a
                    href="https://x.com/CareRebirth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#024747] hover:bg-[#F67708] border border-white/15 text-white flex items-center justify-center transition shadow-sm hover:scale-110"
                    title="X (Twitter) - @CareRebirth"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://www.youtube.com/channel/UC7Wmeu7CyiH8jvdVpBrmHhA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#024747] hover:bg-[#F67708] border border-white/15 text-white flex items-center justify-center transition shadow-sm hover:scale-110"
                    title="YouTube - Rebirth Care Trust"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/rebirthcaretrust4/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-[#024747] hover:bg-[#F67708] border border-white/15 text-white flex items-center justify-center transition shadow-sm hover:scale-110"
                    title="Instagram - @rebirthcaretrust4"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Modern Action Card (Font Sizes & Visibility Matching Official Desk) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="w-full max-w-[380px] bg-gradient-to-br from-[#024747] via-[#013838] to-[#012222] border border-white/20 hover:border-[#F67708]/60 transition-colors duration-300 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative overflow-hidden space-y-4">
              {/* Ambient decorative glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F67708]/20 rounded-full blur-2xl pointer-events-none" />

              {/* 1. Top Section: Badge & Headline */}
              <div className="space-y-2.5 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F67708]/15 border border-[#F67708]/40 text-[#F67708] text-[11px] font-bold uppercase tracking-wider">
                    <Heart className="w-3.5 h-3.5 fill-[#F67708]" />
                    50% Tax Exemption (80G)
                  </span>
                  <span className="text-xs font-semibold text-teal-200/80">
                    100% Verified
                  </span>
                </div>

                <div>
                  <h4 className="text-lg sm:text-xl font-black uppercase text-white tracking-tight leading-snug">
                    Transform A Child's Life
                  </h4>
                  <p className="text-xs sm:text-[13px] text-teal-100/90 leading-relaxed mt-1 font-medium">
                    Every rupee directly supports nutritious meals, schooling kits, and critical medical care.
                  </p>
                </div>
              </div>

              {/* 2. Middle Section: Quick Preset Amount Buttons */}
              <div className="space-y-2 relative z-10">
                <div className="flex justify-between text-xs text-teal-200/90 font-bold uppercase tracking-wider">
                  <span>Quick Contribution:</span>
                  <span className="text-[#F67708] font-bold">Sec 80G Certified</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to="/donate?amount=500"
                    className="py-2.5 px-2 rounded-xl bg-white/10 hover:bg-[#F67708] hover:text-white border border-white/20 text-white text-xs sm:text-sm font-extrabold text-center transition shadow-xs hover:scale-105"
                  >
                    ₹500
                  </Link>
                  <Link
                    to="/donate?amount=1000"
                    className="py-2.5 px-2 rounded-xl bg-white/10 hover:bg-[#F67708] hover:text-white border border-white/20 text-white text-xs sm:text-sm font-extrabold text-center transition shadow-xs hover:scale-105"
                  >
                    ₹1,000
                  </Link>
                  <Link
                    to="/donate?amount=2500"
                    className="py-2.5 px-2 rounded-xl bg-white/10 hover:bg-[#F67708] hover:text-white border border-white/20 text-white text-xs sm:text-sm font-extrabold text-center transition shadow-xs hover:scale-105"
                  >
                    ₹2,500
                  </Link>
                </div>
              </div>

              {/* 3. Bottom Section: Main CTA & CSR Link */}
              <div className="space-y-2.5 pt-1 relative z-10">
                <Link
                  to="/donate"
                  className="w-full flex items-center justify-center gap-2 bg-[#F67708] hover:bg-[#e06800] text-white font-black text-xs sm:text-sm uppercase py-3 px-5 rounded-xl shadow-lg transition hover:scale-[1.02] tracking-wider"
                >
                  <span>DONATE NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs text-teal-100/90 font-medium">
                  <span>CSR Collaboration?</span>
                  <Link
                    to="/contact"
                    className="text-[#F67708] hover:text-white font-bold underline transition inline-flex items-center gap-1"
                  >
                    <span>Inquire Here</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
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
