import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Consistent page header bar for every admin page.
 */
export const AdminPageHeader = ({
  breadcrumb,
  badge,
  title,
  subtitle,
  icon: Icon,
  count,
  actions,
}) => (
  <div className="space-y-2.5">
    {breadcrumb && (
      <div className="flex items-center gap-1.5 text-[12px] font-medium text-[#6B7280]">
        <Link to="/admin/dashboard" className="hover:text-[#14382C] transition-colors">
          Admin
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF]" />
        <span className="text-[#111827] font-medium">{breadcrumb}</span>
      </div>
    )}

    <div className="bg-white border border-[#E5E7EB] rounded-sm px-4 py-3.5 sm:px-5 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-3.5">
      <div className="space-y-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {Icon && (
            <span className="text-[#4B5563] shrink-0">
              {React.isValidElement(Icon)
                ? Icon
                : typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null && Icon.$$typeof)
                  ? <Icon className="w-4 h-4" />
                  : Icon}
            </span>
          )}
          <h1 className="text-[16px] sm:text-[18px] font-semibold text-[#111827] tracking-[-0.01em] leading-snug">
            {title}
          </h1>
          {count !== undefined && count !== null && (
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm text-[11px] font-medium bg-[#F9FAFB] text-[#4B5563] border border-[#E5E7EB] tabular-nums">
              {count}
            </span>
          )}
          {badge && (
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-[11px] font-medium bg-[#F9FAFB] text-[#4B5563] border border-[#E5E7EB]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14382C]" />
              <span>{badge}</span>
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[12.5px] sm:text-[13px] text-[#6B7280] font-normal leading-relaxed max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          {actions}
        </div>
      )}
    </div>
  </div>
);

/**
 * Consistent KPI stat card for admin overview grids.
 */
export const AdminStatCard = ({
  label,
  value,
  subtext,
  icon: Icon,
  accent = 'emerald',
}) => {
  const accentStyles = {
    emerald: {
      strip: 'bg-gradient-to-b from-[#E8F4EE] to-white border-[#E5E7EB]',
      dot: 'bg-[#14382C]',
      stripText: 'text-[#14382C]',
      iconBox: 'bg-[#EAF3EE] text-[#14382C] border-[#14382C]/15',
    },
    gold: {
      strip: 'bg-gradient-to-b from-[#FDF5DC] to-white border-[#E5E7EB]',
      dot: 'bg-[#D97706]',
      stripText: 'text-[#92400E]',
      iconBox: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
    },
    blue: {
      strip: 'bg-gradient-to-b from-[#EAF3FB] to-white border-[#E5E7EB]',
      dot: 'bg-[#2563EB]',
      stripText: 'text-[#1D4ED8]',
      iconBox: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
    },
    rose: {
      strip: 'bg-gradient-to-b from-[#FCECEE] to-white border-[#E5E7EB]',
      dot: 'bg-[#E11D48]',
      stripText: 'text-[#BE123C]',
      iconBox: 'bg-[#FFF1F2] text-[#BE123C] border-[#FECDD3]',
    },
  };

  const style = accentStyles[accent] || accentStyles.emerald;

  return (
    <div className="bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] rounded-sm overflow-hidden transition-colors flex flex-col">
      <div className={`px-3.5 py-2 border-b flex items-center gap-1.5 ${style.strip}`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${style.dot}`} />
        <p className={`text-[11px] font-semibold uppercase tracking-[0.05em] truncate ${style.stripText}`}>
          {label}
        </p>
      </div>
      <div className="p-4 flex items-center justify-between gap-3 flex-1">
        <div className="min-w-0">
          <p className="text-[22px] font-semibold text-[#111827] tracking-tight tabular-nums leading-none">
            {value}
          </p>
          {subtext && (
            <p className="text-[12px] text-[#6B7280] font-normal mt-1.5 truncate">
              {subtext}
            </p>
          )}
        </div>
        {Icon && (
          <div
            className={`w-9 h-9 rounded-sm border flex items-center justify-center shrink-0 ${style.iconBox}`}
          >
            {React.isValidElement(Icon)
              ? Icon
              : typeof Icon === 'function' || (typeof Icon === 'object' && Icon !== null && Icon.$$typeof)
                ? <Icon className="w-4 h-4" />
                : Icon}
          </div>
        )}
      </div>
    </div>
  );
};
