import React from 'react';

export const SectionHeading = ({
  badge,
  title,
  description,
  align = 'center',
  dark = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`max-w-2xl ${
        isCenter ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center px-3.5 py-1 rounded-full text-xs sm:text-[13px] font-bold uppercase tracking-wider bg-[#F2F8F5] text-[#14382C] border border-[#14382C]/15 mb-3">
          {badge}
        </span>
      )}

      {title && (
        <h2
          className={`text-3xl sm:text-4xl lg:text-[42px] font-serif font-semibold tracking-tight leading-[1.15] ${
            dark ? 'text-white' : 'text-[#121316]'
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`mt-3 text-base sm:text-[17px] leading-[1.65] ${
            dark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
