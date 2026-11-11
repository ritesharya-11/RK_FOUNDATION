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
        <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#FFC43D] mb-2">
          {badge}
        </span>
      )}

      {title && (
        <h2
          className={`text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight ${
            dark ? 'text-white' : 'text-[#151A2D]'
          }`}
        >
          {title}
        </h2>
      )}

      {description && (
        <p
          className={`mt-3 text-sm sm:text-base leading-relaxed ${
            dark ? 'text-[#A0A4AE]' : 'text-[#697386]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};

