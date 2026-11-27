import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const PageHero = ({
  title,
  subtitle,
  badge,
  breadcrumbs = [{ label: 'Home', path: '/' }],
  children,
}) => {
  return (
    <section className="relative bg-gradient-to-b from-[#F4F9F6] to-white text-[#111827] overflow-hidden py-6 sm:py-8 border-b border-[#E5E7EB]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Compact Top Row: Breadcrumb + Optional Eyebrow Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center flex-wrap gap-1.5 text-[12px] font-medium text-[#6B7280]">
              {breadcrumbs.map((crumb, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />}
                  {crumb.path ? (
                    <Link
                      to={crumb.path}
                      className="hover:text-[#14382C] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#374151] font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
              {title && (
                <li className="flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
                  <span className="text-[#14382C] font-semibold truncate max-w-xs sm:max-w-md">{title}</span>
                </li>
              )}
            </ol>
          </nav>

          {badge && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[11px] font-semibold bg-[#EAF3EE] text-[#14382C] border border-[#14382C]/15 uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14382C]" />
              <span>{badge}</span>
            </div>
          )}
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl sm:text-3xl font-sans font-bold text-[#111827] tracking-tight leading-snug max-w-4xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1.5 text-sm sm:text-[14.5px] text-[#4B5563] leading-relaxed max-w-3xl font-normal">
            {subtitle}
          </p>
        )}

        {/* Optional Interactive Slots */}
        {children && <div className="mt-5">{children}</div>}
      </div>
    </section>
  );
};
