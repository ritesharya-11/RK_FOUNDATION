import React from 'react';
import { Link } from 'react-router-dom';

export const PrimaryButton = ({
  to,
  onClick,
  children,
  icon,
  variant = 'vermillion', // 'vermillion' | 'teal' | 'gold' | 'dark'
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2.5 font-bold text-xs sm:text-sm uppercase tracking-wide px-6 py-3 rounded-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

  let variantClasses = 'bg-[#F67708] hover:bg-[#E06800] text-white shadow-md hover:shadow-lg hover:shadow-[#F67708]/25';
  if (variant === 'teal' || variant === 'dark') {
    variantClasses = 'bg-[#036C6C] hover:bg-[#024747] text-white shadow-md hover:shadow-lg hover:shadow-[#036C6C]/25';
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
  const classes = `inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm uppercase tracking-wide px-5 py-3 rounded-lg bg-white hover:bg-[#FAF7F2] text-[#323D3D] border border-[#E3D9CF] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

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
      className={`bg-white rounded-2xl p-6 sm:p-8 border border-[#E3D9CF] shadow-soft ${
        hover ? 'hover:shadow-card hover:-translate-y-1 transition-all duration-300' : ''
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
        dark ? 'bg-[#036C6C] text-white' : 'bg-[#FAF7F2] text-[#323D3D]'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">{children}</div>
    </section>
  );
};
