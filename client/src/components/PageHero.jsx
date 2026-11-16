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
    <section className="relative bg-[#036C6C] text-white overflow-hidden py-14 sm:py-20 border-b border-white/10">
      {/* Subtle organic pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#F67708_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Ambient Deep Teal / Orange Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F67708]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center flex-wrap gap-1.5 text-xs font-semibold text-teal-100/70">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-teal-300/40" />}
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="hover:text-[#F67708] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </li>
            ))}
            {title && (
              <li className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-teal-300/40" />
                <span className="text-[#F67708] truncate max-w-xs">{title}</span>
              </li>
            )}
          </ol>
        </nav>

        {/* Optional Pill Badge */}
        {badge && (
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold bg-white/15 text-white border border-white/20 mb-4 backdrop-blur-sm uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F67708]" />
            <span>{badge}</span>
          </div>
        )}

        {/* Title & Subtitle */}
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight leading-[1.15] max-w-3xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base sm:text-lg text-teal-100/90 leading-relaxed max-w-2xl font-normal">
            {subtitle}
          </p>
        )}

        {/* Optional Interactive Slots */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
