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
        <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#121316] mb-2">
          {badge}
        </span>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
            dark ? 'text-white' : 'text-[#121316]'
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            dark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
