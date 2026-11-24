import React from 'react';
import { Link } from 'react-router-dom';

export const PrimaryButton = ({
  to,
  onClick,
  children,
  icon,
  variant = 'vermillion', // 'vermillion' | 'dark' | 'outline'
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm tracking-wide px-6 py-3 rounded-full transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  let variantClasses = 'bg-[#121316] hover:bg-[#252830] text-white shadow-md hover:shadow-lg hover:shadow-black/25';
  if (variant === 'teal' || variant === 'dark') {
    variantClasses = 'bg-[#121316] hover:bg-[#252830] text-white shadow-md hover:shadow-lg hover:shadow-black/25';
  }

  const content = (
    <>
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${variantClasses} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {content}
    </button>
  );
};

export const SecondaryButton = ({
  to,
  onClick,
  children,
  icon,
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const classes = `inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm tracking-wide px-5 py-3 rounded-full bg-white hover:bg-slate-50 text-[#121316] border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        <span>{children}</span>
        {icon && <span className="shrink-0">{icon}</span>}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      <span>{children}</span>
      {icon && <span className="shrink-0">{icon}</span>}
    </button>
  );
};

export const ContentCard = ({ children, className = '', hover = true }) => {
  return (
    <div
      className={`bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-card ${
        hover ? 'hover:shadow-elevated hover:-translate-y-1 transition-all duration-300' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export const SectionContainer = ({ children, className = '', dark = false }) => {
  return (
    <section
      className={`py-16 sm:py-24 ${
        dark ? 'bg-[#121316] text-white' : 'bg-white text-[#121316]'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">{children}</div>
    </section>
  );
};
