import React from 'react';
import { useWebsite } from '../context/WebsiteContext';
import { PageHero } from '../components/PageHero';
import { ShieldCheck, FileText } from 'lucide-react';

export const TermsConditions = () => {
  const { settings } = useWebsite();

  return (
    <div className="bg-[#F7F7F5] min-h-screen">
      {/* Standardized Hero */}
      <PageHero
        badge="Platform Governance"
        title="Terms & Conditions of Service"
        subtitle="Governing rules, legal definitions, and terms of service for utilizing the digital platform and contributing to our charitable programs."
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: 'Terms & Conditions' },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed space-y-8 text-[#697386] bg-white p-8 sm:p-12 rounded-3xl border border-[#E8E8E5] shadow-card">
          <div className="pb-4 border-b border-[#E8E8E5]">
            <p className="text-xs text-[#A0A4AE]">
              Effective Date: January 2026 | RK FOUNDATION (Public Charitable Trust)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#151A2D]">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or utilizing the web portal of <strong>{settings.siteName || 'RK FOUNDATION'}</strong>, you signify your unreserved consent to abide by these terms and conditions and all applicable laws of the Republic of India.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#151A2D]">2. Charitable Nature of Contributions</h2>
            <p>
              All contributions remitted to RK FOUNDATION constitute irrevocable voluntary donations to a public charitable trust. Donations are utilized directly in accordance with the Trust Deed for child education, healthcare relief, malnutrition alleviation, and emergency community aid.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#151A2D]">3. Tax Deductions Under Section 80G</h2>
            <p>
              Contributions qualify for 50% deduction under Section 80G of the Indian Income Tax Act, 1961 (Registration No: <strong>{settings.compliance?.section80GRegNo || 'CIT(E)/DELHI/80G/2021-22/A/1045'}</strong>). It is the sole responsibility of the donor to provide accurate PAN credentials to ensure tax deduction eligibility on their income tax filings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#151A2D]">4. Intellectual Property & Visual Copyrights</h2>
            <p>
              All photographs, videos, textual stories, brand logos, and content published on this platform are proprietary assets of RK FOUNDATION or used with explicit consent of community beneficiaries. Unauthorized commercial reproduction is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#151A2D]">5. Jurisdiction</h2>
            <p>
              Any disputes, controversies, or legal claims arising out of the use of this portal or donations shall be subject to the exclusive jurisdiction of the competent courts in New Delhi / Gautam Buddha Nagar, Uttar Pradesh, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
