import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

export const PageHero = ({
  title,
  subtitle,
  badge,
  breadcrumbs = [{ label: 'Home', path: '/' }],
  children,
}) => {
  return (
    <section className="relative bg-[#0B0D17] text-white overflow-hidden py-14 sm:py-20">
      {/* Subtle geometric dot pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-15 bg-[radial-gradient(#FFC43D_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Radial ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFC43D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs font-semibold text-[#A0A4AE]">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="hover:text-[#FFC43D] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#FFC43D]">{crumb.label}</span>
                )}
              </li>
            ))}
            {title && (
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-white truncate max-w-xs">{title}</span>
              </li>
            )}
          </ol>
        </nav>

        {/* Optional Pill Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-[#FFC43D] border border-[#FFC43D]/25 mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFC43D]" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[#A0A4AE] leading-relaxed max-w-2xl font-normal">
            {subtitle}
          </p>
        )}

        {/* Optional Interactive Slots (e.g. Filters, Tabs, Action buttons) */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
