import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const WebsiteContext = createContext(null);

const DEFAULT_SETTINGS = {
  siteName: 'RK FOUNDATION',
  tagline: 'Empowering Underprivileged Communities & Restoring Hope',
  missionStatement:
    'To transform lives through accessible child education, emergency healthcare relief, women livelihood empowerment, and holistic community rehabilitation across marginalized sectors of society.',
  contact: {
    phone: '+91-9876543210',
    altPhone: '+91-9812345678',
    email: 'contact@rkfoundation.org',
    donorEmail: 'donate@rkfoundation.org',
    address: 'E-48, Institutional Area, Sector 62, Noida, Delhi-NCR, India - 201309',
    officeHours: 'Mon - Sat: 9:00 AM - 6:30 PM (IST)',
  },
  compliance: {
    trustRegistrationNo: 'TRUST/DL/2021/887412',
    ngoDarpanUid: 'DL/2021/0298412',
    panNumber: 'AAETR5566K',
    section80GRegNo: 'CIT(E)/DELHI/80G/2021-22/A/1045',
    section12ARegNo: 'CIT(E)/DELHI/12A/2021-22/A/2088',
    taxExemptionNote:
      'All donations made to RK FOUNDATION are eligible for 50% tax exemption under Section 80G of the Income Tax Act, 1961.',
  },
  socialLinks: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
    twitter: 'https://x.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
    whatsapp: '+919876543210',
  },
  donationSettings: {
    presetAmounts: [500, 1000, 2500, 5000, 10000, 25000],
    defaultPreset: 2500,
    bankAccountName: 'RK FOUNDATION CHARITABLE TRUST',
    bankName: 'State Bank of India',
    accountNumber: '394857201948',
    ifscCode: 'SBIN0004052',
    branchName: 'Sector 62 Institutional Branch, Noida',
    upiId: 'rkfoundation@sbi',
  },
  announcementBar: {
    isEnabled: false,
    text: 'Urgent Winter Relief & Pediatric Nutrition Mission 2026 is Live. 50% Tax Exemption under Section 80G.',
    linkUrl: '/donate',
    linkText: 'Donate Now',
  },
  hero: {
    badge: 'Govt. Registered Public Charitable Trust (80G & 12A Certified)',
    heading: 'Restoring Dignity, Educating Children, and Transforming Communities',
    subheading:
      'Join RK FOUNDATION across Delhi-NCR and rural India. We bridge inequality through foundational schooling for slum children, women vocational training, and critical emergency medical assistance.',
    ctaPrimaryText: 'Donate to a Cause',
    ctaPrimaryLink: '/donate',
    ctaSecondaryText: 'Explore Our Programs',
    ctaSecondaryLink: '/programs',
    volunteerCtaText: 'Join as a Volunteer',
    volunteerCtaLink: '/volunteer',
  },
  impactStats: {
    livesImpacted: 48500,
    childrenEducated: 12400,
    womenEmpowered: 4200,
    mealsServed: 185000,
    healthCampsConducted: 340,
    activeVolunteers: 1250,
  },
};

export const WebsiteProvider = ({ children }) => {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const res = await api.get('/settings');
      if (res?.settings) {
        setSettings((prev) => ({
          ...prev,
          ...res.settings,
          contact: { ...prev.contact, ...(res.settings.contact || {}) },
          compliance: { ...prev.compliance, ...(res.settings.compliance || {}) },
          socialLinks: { ...prev.socialLinks, ...(res.settings.socialLinks || {}) },
          donationSettings: { ...prev.donationSettings, ...(res.settings.donationSettings || {}) },
          announcementBar: { ...prev.announcementBar, ...(res.settings.announcementBar || {}) },
          hero: { ...prev.hero, ...(res.settings.hero || {}) },
          impactStats: { ...prev.impactStats, ...(res.settings.impactStats || {}) },
        }));
      }
    } catch (err) {
      console.warn('[Website Settings] Using built-in settings defaults:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const formatINR = (amount) => {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <WebsiteContext.Provider
      value={{
        settings,
        setSettings,
        loading,
        refreshSettings: fetchSettings,
        toast,
        showToast,
        formatINR,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl text-white font-medium animate-bounce text-sm max-w-md transition-all border border-white/20"
          style={{
            backgroundColor:
              toast.type === 'success'
                ? '#059669'
                : toast.type === 'error'
                ? '#DC2626'
                : '#0A2540',
          }}
        >
          <span>{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-white/80 hover:text-white font-bold text-lg leading-none"
          >
            ×
          </button>
        </div>
      )}
    </WebsiteContext.Provider>
  );
};

export const useWebsite = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useWebsite must be used within a WebsiteProvider');
  }
  return context;
};

